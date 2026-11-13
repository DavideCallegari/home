(() => {
    'use strict';

    const TOTAL_PHOTOS = 68;
    const IMAGE_DIRECTORIES = Object.freeze({
        original: 'assets/images/originals',
        webp: 'assets/images/webp'
    });
    const imagePath = (format, fileName) => `${IMAGE_DIRECTORIES[format]}/${fileName}`;
    const PHOTO_ALT_TEXT = {
        1: "Orchestra ripresa dall’alto durante una prova musicale.",
        2: "Orchestra e direttori durante una sessione di prova in sala.",
        3: "Cantante con microfono durante un’esibizione su sfondo scuro.",
        4: "Dettaglio delle mani che suonano una chitarra elettrica.",
        5: "Pubblico che balla durante un’esibizione musicale.",
        6: "Set di produzione video in interni con videocamera e luci.",
        7: "Musicisti che suonano all’aperto vicino all’acqua.",
        8: "Attrice ripresa sul set, osservata attraverso la videocamera.",
        9: "Operatore alla macchina da presa durante una ripresa all’aperto.",
        10: "Pubblico riunito durante un evento in uno spazio commerciale.",
        11: "Danzatori impegnati in una coreografia su un palco buio.",
        12: "Gruppo di interpreti in scena durante una rappresentazione teatrale.",
        13: "Performer seduta su una sedia durante uno spettacolo sul palco.",
        14: "Ritratto di un performer in controluce su sfondo nero.",
        15: "Giostra illuminata durante una festa serale.",
        16: "Danzatrice seduta da sola sul palco, illuminata da una luce calda.",
        17: "Piccolo edificio illuminato nella notte.",
        18: "Fuochi d’artificio nel cielo notturno.",
        19: "Giardino con una torre in pietra sullo sfondo.",
        20: "Passaggio ad arco che incornicia un canale e una barca.",
        21: "Vetrina di un negozio con tavolini e oggetti esposti.",
        22: "Persona al lavoro alla scrivania in una stanza illuminata da una lampada.",
        23: "Dettaglio di un quaderno illustrato con appunti e disegni.",
        24: "Silhouette di una persona seduta al tavolo davanti a una finestra.",
        25: "Dettaglio di una mano che impugna un arco in un ambiente boschivo.",
        26: "Due interpreti in costume si incontrano in un bosco.",
        27: "Persona che attraversa una passerella in un parco alberato.",
        28: "Piccolo pontile sul mare in una giornata velata.",
        29: "Due interpreti in primo piano durante una scena.",
        30: "Due persone sedute sulla spiaggia con lo sguardo rivolto al mare.",
        31: "Persona in un campo vicino a un filare di alberi.",
        32: "Primo piano di una donna sdraiata su una superficie imbottita.",
        33: "Persona sola sulla battigia, ripresa in campo lungo.",
        34: "Attore in abiti d’epoca sotto una struttura in legno.",
        35: "Scena rurale con una casa in pietra e un animale al pascolo.",
        36: "Dettaglio di una mano che apre una piccola scatola in legno.",
        37: "Figura distesa su un terreno arido, ripresa in campo lungo.",
        38: "Primo piano del muso di un cavallo chiaro.",
        39: "Persona in abiti scuri con cappello, in un campo circondato da vegetazione.",
        40: "Donna accovacciata tra l’erba alta al crepuscolo.",
        41: "Ritratto di una donna su sfondo di vegetazione scura.",
        42: "Due persone in piedi in un giardino alberato.",
        43: "Ritratto di una donna attraversata dalla luce filtrata tra le foglie.",
        44: "Due figure sedute in una radura tra gli alberi.",
        45: "Riflessi di luce e bagliori colorati tra foglie e rami.",
        46: "Ritratto in bianco e nero di una donna di profilo.",
        47: "Primo piano di una donna con ombre di foglie sul volto.",
        48: "Donna in abito chiaro in un paesaggio naturale vicino all’acqua.",
        49: "Persona che cammina lungo un vicolo stretto tra muri in pietra.",
        50: "Donna che fotografa con una macchina fotografica in un paesaggio verde.",
        51: "Tre donne sedute insieme in un parco alberato.",
        52: "Tre persone attorno a un tavolo in uno spazio di ripresa con fondale verde.",
        53: "Persona seduta sotto un porticato di colonne in pietra.",
        54: "Performer seduta su una sedia durante uno spettacolo teatrale.",
        55: "Ritratto di una donna davanti a un edificio in mattoni.",
        56: "Performer ripresa di spalle su un palco buio, con le braccia sollevate.",
        57: "Donna che presenta piccoli prodotti in un giardino.",
        58: "Prodotti cosmetici raccolti in un cestino su una coperta a quadri.",
        59: "Donna in abito rosso accanto a una pianta, con prodotti in mano.",
        60: "Persona seduta davanti all’ingresso di una casa in pietra.",
        61: "Persone riunite intorno a un banco durante un evento.",
        62: "Casa con facciata e ingresso decorati da fiori.",
        63: "Persone che osservano e maneggiano oggetti su un banco espositivo.",
        64: "Pubblico davanti a uno stand durante un evento.",
        65: "Mani che preparano pietanze in contenitori.",
        66: "Tavolo da lavoro con fotografie, fogli e materiali disposti in ordine.",
        67: "Area all’aperto con food truck e banchi di un mercato.",
        68: "Mani che servono una torta al cioccolato durante un evento.",
    };

    const BTS_ALT_TEXT = {
        1: "Piccolo gruppo di persone riunito su una scalinata durante le riprese.",
        2: "Gruppo di persone in abiti di scena riunito all’aperto.",
        3: "Dettaglio di un quaderno aperto con disegni e appunti.",
        4: "Mani che disegnano con gessetti colorati su una superficie a terra.",
        5: "Persone sul set intorno a un albero durante una ripresa all’aperto.",
        6: "Attrice in posa durante una ripresa in studio.",
        7: "Persona che mostra un disegno realizzato a mano davanti alla camera.",
        8: "Edifici illuminati di notte durante uno spettacolo pirotecnico.",
        9: "Set video in interni con una videocamera e luci di produzione.",
        10: "Fotografa che tiene una macchina fotografica durante il backstage.",
        11: "Persona in abito rosa in un prato, ripresa in campo lungo.",
        12: "Vicolo tra edifici storici ripreso durante una passeggiata.",
        13: "Due persone sorridono davanti a un tavolo con attrezzature di produzione.",
        14: "Donna seduta all’aperto durante una pausa delle riprese.",
    };

    const pad3 = (n) => String(n).padStart(3, '0');

    function getPhotoSection(num) {
        if (num <= 18) return 1;
        if (num <= 39) return 2;
        if (num <= 56) return 3;
        return 4;
    }

    function copyText(text, toastEl, statusEl, successMessage) {
        if (!navigator.clipboard?.writeText) {
            if (statusEl) statusEl.textContent = 'Copia non disponibile in questo browser.';
            if (toastEl) showToast(toastEl, 'Errore', true);
            return Promise.reject(new Error('Clipboard API non disponibile'));
        }

        return navigator.clipboard.writeText(text).then(() => {
            if (statusEl) statusEl.textContent = successMessage;
            if (toastEl) showToast(toastEl, 'Copiato!');
        }).catch((error) => {
            if (statusEl) statusEl.textContent = 'Impossibile copiare negli appunti.';
            if (toastEl) showToast(toastEl, 'Errore', true);
            throw error;
        });
    }

    function showToast(toastEl, message, isError = false) {
        toastEl.textContent = message;
        toastEl.classList.toggle('error', isError);
        toastEl.classList.add('show');
        clearTimeout(toastEl._timer);
        toastEl._timer = setTimeout(() => toastEl.classList.remove('show'), 1800);
    }

    /* Video hero: sincronizzazione dello stato audio con YouTube. */
    const heroContainer = document.getElementById('heroContainer');
    const heroOverlay = document.getElementById('heroOverlay');
    const heroSoundBtn = document.getElementById('heroSoundBtn');
    const heroIframe = document.getElementById('heroIframe');
    let heroUnmuted = false;
    let heroPlayerReady = false;
    let pendingHeroSound = null;
    const pendingVideoCommands = new WeakMap();

    function sendYtCommand(iframeEl, func, args = []) {
        if (!iframeEl || !iframeEl.contentWindow) return;
        iframeEl.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args }), 'https://www.youtube.com');
    }

    function sendVideoCommand(iframeEl, func, args = []) {
        if (!iframeEl) return;
        if (iframeEl.dataset.playerReady === 'true') {
            sendYtCommand(iframeEl, func, args);
            return;
        }

        const commands = pendingVideoCommands.get(iframeEl) || [];
        commands.push({ func, args });
        pendingVideoCommands.set(iframeEl, commands);
    }

    function syncHeroSoundUi(unmuted) {
        heroUnmuted = unmuted;
        if (!heroSoundBtn) return;
        heroSoundBtn.classList.toggle('unmuted', unmuted);
        const label = unmuted ? 'Disattiva audio' : 'Attiva audio';
        heroSoundBtn.setAttribute('title', label);
        heroSoundBtn.setAttribute('aria-label', label);
    }

    function handleHeroPlayerError() {
        heroPlayerReady = false;
        pendingHeroSound = null;
        heroUnmuted = false;
        heroContainer?.classList.remove('video-loaded', 'interactive');
        heroContainer?.classList.add('video-error');
        if (heroOverlay) heroOverlay.title = 'Video non disponibile';
        if (heroSoundBtn) {
            syncHeroSoundUi(false);
            heroSoundBtn.disabled = true;
            heroSoundBtn.setAttribute('aria-label', 'Audio non disponibile');
            heroSoundBtn.setAttribute('title', 'Video non disponibile');
        }
    }

    function initYtListening() {
        if (!heroIframe || !heroIframe.contentWindow) return;
        heroIframe.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 'heroIframe' }), 'https://www.youtube.com');
    }

    if (heroIframe) {
        heroIframe.addEventListener('load', initYtListening, { once: true });
        heroIframe.addEventListener('error', handleHeroPlayerError, { once: true });
        initYtListening();
    }

    window.addEventListener('message', (e) => {
        if (e.origin !== 'https://www.youtube.com') return;

        try {
            const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
            if (!data || typeof data !== 'object') return;

            // I comandi inviati prima di onReady vengono eseguiti quando il player è disponibile.
            const videoIframe = Array.from(document.querySelectorAll('.video-item iframe'))
                .find((iframe) => iframe.contentWindow === e.source);
            if (videoIframe) {
                if (data.event === 'onReady') {
                    videoIframe.dataset.playerReady = 'true';
                    const commands = pendingVideoCommands.get(videoIframe) || [];
                    pendingVideoCommands.delete(videoIframe);
                    commands.forEach(({ func, args }) => sendYtCommand(videoIframe, func, args));
                } else if (data.event === 'onError') {
                    const item = videoIframe.closest('.video-item');
                    if (item) showEmbedFallback(item);
                }
                return;
            }

            if (e.source !== heroIframe?.contentWindow) return;
            if (data.event === 'onReady') {
                heroPlayerReady = true;
                heroContainer?.classList.remove('video-error');
                heroContainer?.classList.add('video-loaded');
                if (heroOverlay) heroOverlay.title = 'Clicca per attivare l’audio';
                if (heroSoundBtn) heroSoundBtn.disabled = false;
                syncHeroSoundUi(heroUnmuted);
            } else if (data.event === 'onError') {
                handleHeroPlayerError();
                return;
            }

            if (heroPlayerReady && pendingHeroSound !== null) {
                const shouldUnmute = pendingHeroSound;
                pendingHeroSound = null;
                if (shouldUnmute) {
                    sendYtCommand(heroIframe, 'unMute');
                    sendYtCommand(heroIframe, 'setVolume', [100]);
                } else {
                    sendYtCommand(heroIframe, 'mute');
                }
                // Ignora lo stato precedente mentre viene applicata la scelta audio in coda.
                if (data.event === 'infoDelivery') return;
            }

            if (data.event === 'infoDelivery' && data.info) {
                if (typeof data.info.muted === 'boolean' || typeof data.info.volume === 'number') {
                    const isMuted = data.info.muted ?? !heroUnmuted;
                    const vol = data.info.volume ?? 100;
                    syncHeroSoundUi(!isMuted && vol > 0);
                }
            }
        } catch (_) {}
    });

    function toggleHeroSound() {
        if (heroContainer?.classList.contains('video-error')) return;
        const shouldUnmute = !heroUnmuted;
        syncHeroSoundUi(shouldUnmute);
        if (shouldUnmute) heroContainer.classList.add('interactive');

        if (!heroPlayerReady) {
            // Conserva l’ultima scelta audio fino alla disponibilità del player.
            pendingHeroSound = shouldUnmute;
            return;
        }

        if (shouldUnmute) {
            sendYtCommand(heroIframe, 'unMute');
            sendYtCommand(heroIframe, 'setVolume', [100]);
        } else {
            sendYtCommand(heroIframe, 'mute');
        }
    }

    if (heroOverlay) heroOverlay.addEventListener('click', toggleHeroSound);
    if (heroSoundBtn) heroSoundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleHeroSound();
    });

    /* Biografia espandibile. */
    const bioArrowBtn = document.getElementById('bioArrowBtn');
    const bioDrawer = document.getElementById('bioDrawer');

    if (bioArrowBtn && bioDrawer) {
        bioDrawer.inert = true;
        bioArrowBtn.addEventListener('click', () => {
            const isOpen = bioDrawer.classList.toggle('open');
            bioArrowBtn.classList.toggle('open', isOpen);
            bioArrowBtn.setAttribute('aria-expanded', String(isOpen));
            bioDrawer.inert = !isOpen;
        });
    }

    /* Navigazione animata tra intestazione e contatti. */
    const magicTravelBtn = document.getElementById('magicTravelBtn');
    const contactFooter = document.getElementById('contactFooter');
    const nameHeading = document.querySelector('.header-text h1');
    let isAtBottom = false;
    let travelAnimId = null;
    let lastTravelY = '';

    function getMaxScrollY() {
        const scrollElement = document.scrollingElement || document.documentElement;
        return Math.max(0, scrollElement.scrollHeight - window.innerHeight);
    }

    function getTravelTarget(goingUp) {
        if (!goingUp) return getMaxScrollY();

        if (heroContainer) {
            const showreelBottom = heroContainer.getBoundingClientRect().bottom + window.scrollY;
            const visibleShowreel = window.innerWidth <= 650 ? 30 : 52;
            return Math.max(0, showreelBottom - visibleShowreel);
        }

        if (!nameHeading) return 0;
        return Math.max(0, nameHeading.getBoundingClientRect().top + window.scrollY);
    }

    function setBalloonMode(atBottom) {
        if (isAtBottom === atBottom || !magicTravelBtn) return;
        isAtBottom = atBottom;
        magicTravelBtn.classList.toggle('is-balloon', atBottom);
        magicTravelBtn.setAttribute('aria-label', atBottom ? 'Torna al mio nome' : 'Vai ai contatti');
        magicTravelBtn.setAttribute('title', atBottom ? 'Torna su' : 'Contatti');
    }

    function syncTravelBtn() {
        if (!magicTravelBtn || !contactFooter) return;

        const rect = contactFooter.getBoundingClientRect();
        const visibleFooter = Math.max(0, window.innerHeight - rect.top);
        const progress = Math.min(1, visibleFooter / Math.max(1, rect.height));
        const maxLift = window.innerWidth <= 650 ? 8 : 76;
        const nextTravelY = `-${(progress * maxLift).toFixed(1)}px`;

        if (nextTravelY !== lastTravelY) {
            lastTravelY = nextTravelY;
            magicTravelBtn.style.setProperty('--travel-y', nextTravelY);
        }

        if (!travelAnimId) setBalloonMode(window.scrollY >= getMaxScrollY() - 2);
    }

    function cancelTravel() {
        if (!travelAnimId) return;
        cancelAnimationFrame(travelAnimId);
        travelAnimId = null;
        syncTravelBtn();
    }

    function cancelTravelOnKeydown(e) {
        if (!travelAnimId) return;

        const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];
        const isSpace = e.code === 'Space';
        if (!scrollKeys.includes(e.key) && !isSpace) return;

        const target = e.target instanceof Element ? e.target : null;
        if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
        if (isSpace && target?.closest('button')) return;

        cancelTravel();
    }

    window.addEventListener('wheel', cancelTravel, { passive: true });
    window.addEventListener('touchstart', cancelTravel, { passive: true });
    window.addEventListener('keydown', cancelTravelOnKeydown);
    window.addEventListener('scroll', syncTravelBtn, { passive: true });
    window.addEventListener('resize', () => {
        if (isAtBottom && !travelAnimId) window.scrollTo(0, getMaxScrollY());
        syncTravelBtn();
    }, { passive: true });

    // Mantiene il fondo raggiunto quando il contenuto differito modifica l’altezza della pagina.
    if ('ResizeObserver' in window && document.body) {
        const pageSizeObserver = new ResizeObserver(() => {
            if (isAtBottom && !travelAnimId) window.scrollTo(0, getMaxScrollY());
            syncTravelBtn();
        });
        pageSizeObserver.observe(document.body);
    }

    function flyTo(goingUp) {
        cancelTravel();

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            window.scrollTo(0, getTravelTarget(goingUp));
            setBalloonMode(!goingUp);
            syncTravelBtn();
            return;
        }

        const startY = window.scrollY;
        const startTime = performance.now();
        // Mantiene le durate e la curva dell’animazione di navigazione.
        const duration = goingUp ? 1800 : 950;

        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const easedProgress = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            // Ricalcola la destinazione durante l’animazione per includere i contenuti caricati in ritardo.
            const targetY = getTravelTarget(goingUp);
            window.scrollTo(0, startY + (targetY - startY) * easedProgress);

            if (progress < 1) {
                travelAnimId = requestAnimationFrame(step);
                return;
            }

            // Allinea la posizione finale alla destinazione corrente.
            window.scrollTo(0, getTravelTarget(goingUp));
            travelAnimId = null;
            setBalloonMode(!goingUp);
            syncTravelBtn();
        }

        travelAnimId = requestAnimationFrame(step);
    }

    if (magicTravelBtn && contactFooter) {
        syncTravelBtn();
        magicTravelBtn.addEventListener('click', () => flyTo(isAtBottom));
    }

    /* Galleria fotografica a colonne. */
    const photoGrids = Array.from(document.querySelectorAll('.photo-grid'));
    const gridCaches = new Map();
    let currentColsCount = window.innerWidth <= 950 ? 2 : 3;

    function revealImageWithFade(img) {
        const show = () => requestAnimationFrame(() => img.classList.add('loaded'));
        if (typeof img.decode === 'function') img.decode().then(show).catch(show);
        else show();
    }

    function fallbackToJpgAfterWebpError(img) {
        const fallbackSrc = img.dataset.fallbackSrc;
        if (!fallbackSrc || !img.currentSrc.includes('/webp/')) return false;

        img.closest('picture')?.querySelector('source')?.removeAttribute('srcset');
        delete img.dataset.fallbackSrc;
        img.src = fallbackSrc;
        return true;
    }

    function markImageUnavailable(img) {
        const description = img.alt.trim();
        const photoLink = img.closest('a[data-photo-num]');
        img.closest('picture')?.querySelector('source')?.removeAttribute('srcset');
        img.removeAttribute('src');
        img.classList.add('loaded', 'image-unavailable');
        img.alt = description
            ? `${description} (immagine non disponibile)`
            : 'Immagine non disponibile';
        if (photoLink) {
            photoLink.removeAttribute('href');
            photoLink.removeAttribute('target');
            delete photoLink.dataset.photoNum;
        }
        delete img.dataset.fallbackSrc;
    }

    function createPhotoNode(num) {
        const idStr = pad3(num);
        const link = document.createElement('a');
        link.href = imagePath('original', `img${idStr}.jpg`);
        link.target = '_blank';
        link.rel = 'noopener';
        link.dataset.photoNum = String(num);
        const altText = PHOTO_ALT_TEXT[num] || `Fotografia ${num}`;
        link.setAttribute('aria-label', `Apri fotografia: ${altText}`);

        const picture = document.createElement('picture');

        const source = document.createElement('source');
        source.srcset = imagePath('webp', `img${idStr}.webp`);
        source.type = 'image/webp';

        const img = document.createElement('img');
        // Assegna il JPEG di fallback dopo l’inserimento del picture, così il browser può selezionare il WebP.
        img.dataset.fallbackSrc = imagePath('original', `img${idStr}.jpg`);
        img.alt = altText;
        img.decoding = 'async';
        img.addEventListener('load', () => {
            delete img.dataset.fallbackSrc;
            revealImageWithFade(img);
        }, { once: true });
        img.addEventListener('error', () => {
            if (!fallbackToJpgAfterWebpError(img)) markImageUnavailable(img);
        });

        if (num <= 3) img.fetchPriority = 'high';
        else if (num > 6) img.loading = 'lazy';

        picture.append(source, img);
        link.append(picture);
        return link;
    }

    function renderGrids(colsCount) {
        photoGrids.forEach((grid) => {
            let items = gridCaches.get(grid);
            if (!items) {
                const start = parseInt(grid.dataset.start, 10);
                const end = parseInt(grid.dataset.end, 10);
                items = [];
                for (let n = start; n <= end; n++) items.push(createPhotoNode(n));
                gridCaches.set(grid, items);
            }

            const cols = Array.from({ length: colsCount }, () => {
                const col = document.createElement('div');
                col.className = 'masonry-col';
                return col;
            });

            items.forEach((node, idx) => cols[idx % colsCount].appendChild(node));
            grid.replaceChildren(...cols);

            // Assegna il fallback JPEG dopo aver inserito il picture nel documento.
            grid.querySelectorAll('img[data-fallback-src]').forEach((img) => {
                img.src = img.dataset.fallbackSrc;
                if (img.complete && img.naturalWidth > 0) {
                    delete img.dataset.fallbackSrc;
                    img.classList.add('loaded');
                }
            });
        });
    }

    renderGrids(currentColsCount);

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const nextCols = window.innerWidth <= 950 ? 2 : 3;
            if (nextCols !== currentColsCount) {
                currentColsCount = nextCols;
                renderGrids(currentColsCount);
            }
        }, 120);
    });

    /* Player esterni e immagini backstage. */
    function pauseAllOtherVideos(currentItem) {
        if (heroUnmuted) {
            sendYtCommand(heroIframe, 'mute');
            syncHeroSoundUi(false);
        }

        // Mantiene montati i player YouTube e ne sospende la riproduzione.
        document.querySelectorAll('.video-item[data-playing="true"]').forEach((other) => {
            if (other !== currentItem) sendVideoCommand(other.querySelector('iframe'), 'pauseVideo');
        });

        // Instagram non espone un comando di pausa affidabile: rimuovere l’iframe interrompe il reel.
        document.querySelectorAll('.reel-item[data-playing="true"]').forEach((other) => {
            if (other === currentItem) return;
            other.querySelector('iframe')?.remove();
            other.classList.remove('is-playing');
            delete other.dataset.playing;
            // Lo stato dei crediti è persistente dopo la prima attivazione.
        });
    }

    function showEmbedFallback(item) {
        if (item.dataset.playerError === 'true') return;

        const hadPlayerFocus = item.contains(document.activeElement);
        const { videoId, reelId } = item.dataset;
        const provider = videoId ? 'YouTube' : 'Instagram';
        const url = videoId
            ? `https://www.youtube.com/watch?v=${videoId}`
            : `https://www.instagram.com/reel/${reelId}/`;

        item.querySelector('iframe')?.remove();
        item.classList.remove('is-playing');
        item.classList.add('has-embed-error');
        delete item.dataset.playing;
        // Mantiene visibili i crediti anche se il player non è disponibile.

        const fallbackLink = document.createElement('a');
        fallbackLink.className = 'embed-error-link';
        fallbackLink.href = url;
        fallbackLink.target = '_blank';
        fallbackLink.rel = 'noopener noreferrer';
        fallbackLink.textContent = `Contenuto non disponibile. Apri su ${provider}.`;
        fallbackLink.setAttribute('aria-label', `Apri il contenuto su ${provider}`);
        item.appendChild(fallbackLink);
        item.dataset.playerError = 'true';

        if (hadPlayerFocus) fallbackLink.focus({ preventScroll: true });
    }

    function activateVideoItem(item, event) {
        pauseAllOtherVideos(item);

        if (item.dataset.playing === 'true') {
            if (item.classList.contains('video-item')) {
                sendVideoCommand(item.querySelector('iframe'), 'playVideo');
            }
            return;
        }

        item.dataset.playing = 'true';
        item.classList.add('is-playing');
        item.closest('.media-card')?.classList.add('has-been-activated');

        const { videoId, reelId } = item.dataset;
        const iframe = document.createElement('iframe');
        iframe.title = item.querySelector('.video-trigger')?.getAttribute('aria-label') || 'Video player';
        iframe.addEventListener('error', () => showEmbedFallback(item), { once: true });

        if (videoId) {
            iframe.addEventListener('load', () => {
                iframe.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'portfolio-video' }), 'https://www.youtube.com');
            });
            const originParam = window.location.origin === 'null'
                ? ''
                : `&origin=${encodeURIComponent(window.location.origin)}`;
            iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1${originParam}&autoplay=1&rel=0&modestbranding=1&playsinline=1`;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.allowFullscreen = true;
        } else if (reelId) {
            iframe.className = 'ig-embed-clean';
            iframe.src = `https://www.instagram.com/reel/${reelId}/embed/`;
            iframe.allow = 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share';
            iframe.scrolling = 'no';
        }

        // Mantiene il focus nel player quando l’attivazione proviene dalla tastiera.
        item.appendChild(iframe);
        if (event?.detail === 0) iframe.focus({ preventScroll: true });
    }

    document.querySelectorAll('.video-item, .reel-item').forEach((item) => {
        const trigger = item.querySelector('.video-trigger');
        trigger?.addEventListener('click', (event) => activateVideoItem(item, event));
    });

    const BTS_CAT_CONFIG = {
        1: { symbol: '#cat-pose-top', cls: 'cat-top-left' },
        3: { symbol: '#cat-pose-top', cls: 'cat-top' },
        5: { symbol: '#cat-pose-side', cls: 'cat-side-left' },
        7: { symbol: '#cat-pose-side', cls: 'cat-side-right' }
    };

    async function populateBtsLayer(wrapper) {
        const layer = wrapper.querySelector('.bts-layer');
        if (!layer || layer.children.length) return;

        const startNum = Number(wrapper.dataset.btsStart) || 1;
        const cards = document.createDocumentFragment();
        const imageLoads = [];

        for (let i = 1; i <= 7; i++) {
            const number = pad3(startNum + i - 1);
            const card = document.createElement('div');
            card.className = `bts-card bts-pos-${i}`;

            const cat = BTS_CAT_CONFIG[i];
            if (cat) {
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                svg.setAttribute('class', `leaning-cat ${cat.cls}`);
                use.setAttribute('href', cat.symbol);
                svg.appendChild(use);
                card.appendChild(svg);
            }

            const picture = document.createElement('picture');
            const source = document.createElement('source');
            source.type = 'image/webp';
            source.srcset = imagePath('webp', `bts${number}.webp`);

            const img = document.createElement('img');
            img.alt = BTS_ALT_TEXT[Number(number)] || `Fotografia backstage ${number}`;
            img.loading = 'eager';
            img.decoding = 'async';
            img.dataset.fallbackSrc = imagePath('original', `bts${number}.jpg`);

            // La foto deve essere pronta prima di avviare l'animazione.
            imageLoads.push(new Promise((resolve) => {
                img.addEventListener('load', async () => {
                    delete img.dataset.fallbackSrc;
                    try {
                        await img.decode();
                    } catch (_) {
                        // Il browser può averla già decodificata.
                    }
                    resolve();
                }, { once: true });

                img.addEventListener('error', () => {
                    if (!fallbackToJpgAfterWebpError(img)) {
                        markImageUnavailable(img);
                        resolve();
                    }
                }, { once: true });
            }));

            picture.append(source, img);
            card.appendChild(picture);
            cards.appendChild(card);
        }

        layer.appendChild(cards);

        // Avvia il caricamento dopo aver collegato i picture al documento.
        layer.querySelectorAll('img[data-fallback-src]').forEach((img) => {
            img.src = img.dataset.fallbackSrc;
        });

        await Promise.all(imageLoads);
    }

    document.querySelectorAll('.video-strip-wrapper[data-bts-start]').forEach((wrapper) => {
        const button = wrapper.querySelector('.cat-toggle-btn');
        if (!button) return;

        button.addEventListener('click', async () => {
            if (wrapper.classList.contains('show-bts')) {
                wrapper.classList.remove('show-bts');
                button.classList.remove('active');
                button.setAttribute('aria-expanded', 'false');
                button.setAttribute('aria-label', 'Mostra foto backstage');
            } else {
                button.disabled = true;
                button.setAttribute('aria-busy', 'true');

                try {
                    await populateBtsLayer(wrapper);

                    // Fissa lo stato iniziale nascosto prima della transizione.
                    wrapper.querySelector('.bts-layer')?.offsetWidth;

                    wrapper.classList.add('show-bts');
                    button.classList.add('active');
                    button.setAttribute('aria-expanded', 'true');
                    button.setAttribute('aria-label', 'Nascondi foto backstage');
                } finally {
                    button.disabled = false;
                    button.removeAttribute('aria-busy');
                }
            }

            button.classList.remove('pop-anim');
            void button.offsetWidth;
            button.classList.add('pop-anim');
        });
    });

    /* Lightbox: navigazione, cronologia e caricamento delle fotografie. */
    const lbModal = document.getElementById('lightboxModal');
    const lbStage = document.getElementById('lightboxStage');
    const lbImg = document.getElementById('lightboxImg');
    const lbCloseBtn = document.getElementById('lbCloseBtn');
    const lbPrevBtn = document.getElementById('lbPrevBtn');
    const lbNextBtn = document.getElementById('lbNextBtn');
    const lbShareBtn = document.getElementById('lbShareBtn');
    const shareToast = document.getElementById('shareToast');
    const lightboxError = document.getElementById('lightboxError');

    let currentPhoto = 1;
    let isLbOpen = false;
    let lastFocusedEl = null;
    let activeLoadToken = 0;
    let inertBackground = [];
    const preloadedSet = new Set();

    function setLightboxBackgroundInert(inert) {
        if (inert) {
            inertBackground = Array.from(document.body.children)
                .filter((element) => element !== lbModal && element.tagName !== 'SCRIPT')
                .map((element) => ({ element, wasInert: element.inert }));
            inertBackground.forEach(({ element }) => { element.inert = true; });
            return;
        }

        inertBackground.forEach(({ element, wasInert }) => {
            element.inert = wasInert;
        });
        inertBackground = [];
    }

    function preloadAdjacentPhotos(num) {
        const prev = num > 1 ? num - 1 : TOTAL_PHOTOS;
        const next = num < TOTAL_PHOTOS ? num + 1 : 1;
        [prev, next].forEach((n) => {
            if (preloadedSet.has(n)) return;
            const pre = new Image();
            pre.onload = () => preloadedSet.add(n);
            pre.src = imagePath('original', `img${pad3(n)}.jpg`);
        });
    }

    function updateUrlParam(num, push = false) {
        const url = new URL(window.location.href);
        if (num) url.searchParams.set('photo', num);
        else url.searchParams.delete('photo');

        if (push) window.history.pushState({ lb: true }, '', url);
        else window.history.replaceState(window.history.state, '', url);
    }

    function showPhoto(num, isInitialOpen = false) {
        currentPhoto = ((num - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS) + 1;
        const photoNum = currentPhoto;
        const idStr = pad3(photoNum);
        const jpgSrc = imagePath('original', `img${idStr}.jpg`);
        const webpSrc = imagePath('webp', `img${idStr}.webp`);
        const token = ++activeLoadToken;
        const altText = PHOTO_ALT_TEXT[photoNum] || `Fotografia ${photoNum}`;

        lbImg.alt = altText;
        lbStage.classList.remove('has-image-error');
        if (lightboxError) lightboxError.hidden = true;
        updateUrlParam(photoNum, isInitialOpen);
        preloadAdjacentPhotos(photoNum);

        function showImageError() {
            if (token !== activeLoadToken || !isLbOpen) return;
            lbImg.removeAttribute('src');
            lbImg.alt = `${altText} (immagine non disponibile)`;
            lbImg.classList.remove('is-loading');
            lbStage.classList.add('has-image-error');
            if (lightboxError) lightboxError.hidden = false;
        }

        function displayPhoto(src) {
            if (token !== activeLoadToken || !isLbOpen) return;
            lbStage.dataset.section = String(getPhotoSection(photoNum));
            lbStage.classList.remove('has-image-error');
            if (lightboxError) lightboxError.hidden = true;
            lbImg.alt = altText;
            lbImg.onload = () => lbImg.classList.remove('is-loading');
            lbImg.onerror = showImageError;
            lbImg.src = src;
            if (lbImg.complete && lbImg.naturalWidth > 0) lbImg.classList.remove('is-loading');
        }

        function loadWebpFallback() {
            if (token !== activeLoadToken || !isLbOpen) return;
            const fallback = new Image();
            fallback.addEventListener('load', () => displayPhoto(webpSrc), { once: true });
            fallback.addEventListener('error', showImageError, { once: true });
            fallback.src = webpSrc;
        }

        const hiResLoader = new Image();
        let handled = false;

        function onHiResLoaded() {
            if (handled) return;
            handled = true;
            const reveal = () => {
                if (token !== activeLoadToken || !isLbOpen) return;
                preloadedSet.add(photoNum);
                displayPhoto(jpgSrc);
            };
            if (typeof hiResLoader.decode === 'function') {
                hiResLoader.decode().then(reveal, loadWebpFallback);
            } else {
                reveal();
            }
        }

        hiResLoader.addEventListener('load', onHiResLoaded, { once: true });
        hiResLoader.addEventListener('error', loadWebpFallback, { once: true });
        hiResLoader.src = jpgSrc;
        if (hiResLoader.complete) {
            if (hiResLoader.naturalWidth > 0) onHiResLoaded();
            else loadWebpFallback();
        }
    }

    function openLightbox(num, triggerEl = null, fromUrl = false, fromPopState = false) {
        lastFocusedEl = triggerEl || document.activeElement;
        if (!isLbOpen) {
            lbImg.classList.add('is-loading');
            lbImg.removeAttribute('src');
            if (lightboxError) lightboxError.hidden = true;
            lbStage.classList.remove('has-image-error');
        }
        isLbOpen = true;

        if (fromUrl) {
            updateUrlParam(null, false);
        }

        showPhoto(num, !fromPopState);
        lbModal.classList.add('open');
        lbModal.setAttribute('aria-hidden', 'false');
        setLightboxBackgroundInert(true);
        document.body.style.overflow = 'hidden';
        lbCloseBtn.focus({ preventScroll: true });
    }

    function closeLightbox(fromPopState = false) {
        if (!isLbOpen) return;
        isLbOpen = false;
        activeLoadToken++;
        lbModal.classList.remove('open');
        lbModal.setAttribute('aria-hidden', 'true');
        setLightboxBackgroundInert(false);
        document.body.style.overflow = '';

        if (!fromPopState && window.history.state?.lb) {
            window.history.back();
        } else {
            updateUrlParam(null, false);
        }

        if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
            lastFocusedEl.focus({ preventScroll: true });
        }
    }

    // Sincronizza la lightbox con la cronologia di navigazione del browser.
    window.addEventListener('popstate', () => {
        const photoParam = parseInt(new URLSearchParams(window.location.search).get('photo'), 10);
        if (isLbOpen && !photoParam) {
            closeLightbox(true);
        } else if (isLbOpen && photoParam >= 1 && photoParam <= TOTAL_PHOTOS) {
            showPhoto(photoParam, false);
        } else if (!isLbOpen && photoParam >= 1 && photoParam <= TOTAL_PHOTOS) {
            openLightbox(photoParam, lastFocusedEl, false, true);
        }
    });

    photoGrids.forEach((grid) => {
        grid.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-photo-num]');
            if (!link) return;

            // I click modificati mantengono il comportamento nativo del link al JPEG.
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            openLightbox(parseInt(link.dataset.photoNum, 10), link);
        });
        grid.addEventListener('keydown', (e) => {
            if (e.key !== ' ') return;
            const link = e.target.closest('a[data-photo-num]');
            if (!link) return;
            e.preventDefault();
            openLightbox(parseInt(link.dataset.photoNum, 10), link);
        });
    });

    lbCloseBtn.addEventListener('click', () => closeLightbox(false));
    lbPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPhoto(currentPhoto - 1); });
    lbNextBtn.addEventListener('click', (e) => { e.stopPropagation(); showPhoto(currentPhoto + 1); });
    lbModal.addEventListener('click', (e) => { if (e.target === lbModal) closeLightbox(false); });

    lbShareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const shareUrl = new URL(window.location.href);
        shareUrl.searchParams.set('photo', currentPhoto);
        copyText(shareUrl.toString(), shareToast, null, 'Link copiato negli appunti.').catch(() => {});
    });

    window.addEventListener('keydown', (e) => {
        if (!isLbOpen) return;
        if (e.key === 'Escape') {
            closeLightbox(false);
        } else if (e.key === 'ArrowLeft') {
            showPhoto(currentPhoto - 1);
        } else if (e.key === 'ArrowRight') {
            showPhoto(currentPhoto + 1);
        } else if (e.key === 'Tab') {
            const focusable = Array.from(lbModal.querySelectorAll('button:not([disabled])'));
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (!first || !last) return;
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    let touchStartX = 0;
    let touchStartY = 0;

    lbModal.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    lbModal.addEventListener('touchend', (e) => {
        if (!isLbOpen || e.changedTouches.length !== 1) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            showPhoto(dx < 0 ? currentPhoto + 1 : currentPhoto - 1);
        }
    }, { passive: true });

    const initialPhotoParam = parseInt(new URLSearchParams(window.location.search).get('photo'), 10);
    if (initialPhotoParam >= 1 && initialPhotoParam <= TOTAL_PHOTOS) {
        openLightbox(initialPhotoParam, null, true);
    }

    /* Copia dei contatti nel footer. */
    const contactStatus = document.getElementById('contactStatus');
    document.querySelectorAll('footer a[data-copy]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const isEmail = link.href.startsWith('mailto:');
            const isPhone = link.href.startsWith('tel:');
            const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
            const canCopy = window.isSecureContext && typeof navigator.clipboard?.writeText === 'function';

            // Su dispositivi touch o senza Clipboard API, conserva mailto e tel.
            if (isCoarsePointer || !canCopy || (!isEmail && !isPhone)) return;

            event.preventDefault();
            const message = isEmail
                ? 'Indirizzo email copiato negli appunti.'
                : 'Numero di telefono copiato negli appunti.';

            copyText(link.dataset.copy, link.querySelector('.copy-toast'), contactStatus, message)
                .catch(() => {
                    // Se la copia viene rifiutata, ripristina l’azione mailto o tel.
                    window.location.href = link.href;
                });
        });
    });
})();