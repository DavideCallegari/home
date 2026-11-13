(() => {
    'use strict';

    const printButton = document.getElementById('printButton');
    const printStatus = document.getElementById('printStatus');
    if (!printButton) return;

    const originalLabel = printButton.textContent;
    let printInProgress = false;
    let restoreTimer = null;

    function nextFrame() {
        return new Promise((resolve) => requestAnimationFrame(resolve));
    }

    function getJpegFallback(src) {
        if (!src || !/\.webp(?:[?#].*)?$/i.test(src)) return null;
        return src
            .replace(/\/webp\//i, '/originals/')
            .replace(/\.webp(?=([?#]|$))/i, '.jpg');
    }

    async function waitForImage(image, timeout = 10000) {
        const deadline = performance.now() + timeout;

        if (!image.complete) {
            const loaded = await new Promise((resolve) => {
                let timer;

                const finish = (success) => {
                    window.clearTimeout(timer);
                    image.removeEventListener('load', onLoad);
                    image.removeEventListener('error', onError);
                    resolve(success && image.naturalWidth > 0);
                };

                const onLoad = () => finish(true);
                const onError = () => finish(false);

                timer = window.setTimeout(() => finish(false), timeout);
                image.addEventListener('load', onLoad, { once: true });
                image.addEventListener('error', onError, { once: true });
            });

            if (!loaded) return false;
        } else if (image.naturalWidth === 0) {
            return false;
        }

        if (typeof image.decode === 'function') {
            const remaining = deadline - performance.now();
            if (remaining <= 0) return false;

            let timer;
            try {
                await Promise.race([
                    image.decode(),
                    new Promise((_, reject) => {
                        timer = window.setTimeout(
                            () => reject(new Error('Timeout durante la decodifica dell’immagine.')),
                            remaining
                        );
                    })
                ]);
            } catch (_) {
                return false;
            } finally {
                window.clearTimeout(timer);
            }
        }

        return image.naturalWidth > 0;
    }

    async function decodeImage(image) {
        image.loading = 'eager';
        image.fetchPriority = image.closest('.cover-page') ? 'high' : 'auto';

        if (await waitForImage(image)) return;

        const fallback = getJpegFallback(image.getAttribute('src'));
        if (fallback) {
            image.src = fallback;
            if (await waitForImage(image)) return;
        }

        throw new Error(`Immagine non disponibile: ${image.alt || image.getAttribute('src') || 'risorsa senza nome'}`);
    }

    async function prepareFonts() {
        if (!document.fonts) {
            throw new Error('Il browser non supporta il caricamento controllato dei font.');
        }

        const documentText = document.querySelector('.portfolio-document')?.textContent || 'Portfolio';
        let timeoutId;

        try {
            const fontFaces = await Promise.race([
                Promise.all([
                    document.fonts.load('600 16px "Fraunces Variable"', documentText),
                    document.fonts.load('500 14px "Quicksand Variable"', documentText)
                ]).then((loadedFaces) => Promise.all([document.fonts.ready]).then(() => loadedFaces)),
                new Promise((_, reject) => {
                    timeoutId = window.setTimeout(
                        () => reject(new Error('Il caricamento dei font non è terminato.')),
                        7000
                    );
                })
            ]);

            if (!fontFaces[0].length || !fontFaces[1].length) {
                throw new Error('Uno o più font locali non risultano disponibili.');
            }

            if (
                !document.fonts.check('600 16px "Fraunces Variable"', documentText) ||
                !document.fonts.check('500 14px "Quicksand Variable"', documentText)
            ) {
                throw new Error('Il browser non ha completato il caricamento dei font locali.');
            }
        } finally {
            window.clearTimeout(timeoutId);
        }
    }

    function restoreButton() {
        if (restoreTimer !== null) {
            window.clearTimeout(restoreTimer);
            restoreTimer = null;
        }
        printInProgress = false;
        printButton.disabled = false;
        printButton.setAttribute('aria-busy', 'false');
        printButton.textContent = originalLabel;
        if (printStatus) printStatus.textContent = '';
    }

    async function prepareAndPrint() {
        if (printInProgress) return;

        printInProgress = true;
        printButton.disabled = true;
        printButton.setAttribute('aria-busy', 'true');
        printButton.textContent = 'Preparazione PDF…';
        if (printStatus) printStatus.textContent = 'Preparazione del documento per la stampa.';

        try {
            if (printStatus) printStatus.textContent = 'Caricamento dei caratteri.';
            await prepareFonts();

            const images = Array.from(document.querySelectorAll('.pdf-page img'));
            if (printStatus) printStatus.textContent = 'Caricamento e controllo delle fotografie.';
            const results = await Promise.allSettled(images.map(decodeImage));
            const failedImages = results
                .map((result, index) => result.status === 'rejected' ? images[index].alt || `Immagine ${index + 1}` : null)
                .filter(Boolean);

            if (failedImages.length) {
                throw new Error(`Non è stato possibile caricare ${failedImages.length} immagini del portfolio.`);
            }

            document.documentElement.getBoundingClientRect();
            await nextFrame();
            await nextFrame();

            printButton.textContent = originalLabel;
            if (printStatus) printStatus.textContent = 'Documento pronto. Si apre la finestra di stampa.';
            window.print();
            restoreTimer = window.setTimeout(restoreButton, 60000);
        } catch (error) {
            restoreButton();
            if (printStatus) printStatus.textContent = 'Preparazione non riuscita. Il PDF non è stato avviato.';
            window.alert(
                `Il PDF non è stato avviato perché la preparazione del documento non è riuscita.\n\n${error.message}\n\nVerifica che le risorse del documento siano disponibili, quindi ricarica la pagina e riprova.`
            );
        }
    }

    printButton.addEventListener('click', prepareAndPrint);
    window.addEventListener('afterprint', restoreButton);
})();
