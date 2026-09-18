# Walkthrough media

The live hero uses versioned files in public/assets/hero, served as static CDN assets. Legacy /tour-media routes remain available but are no longer used by the hero.

Each of the three scenes has a 1920px desktop, 1080px tablet/landscape, 540x1170 portrait phone, and 960px legacy data-saving variant. Portrait phones use the smaller phone assets; other devices use the data-saving version only when the browser reports Save-Data. CPU count, device-memory estimates, and decoder power-efficiency reports no longer silently reduce image quality.

Encoding: H.264, yuv420p, 24fps, closed GOP of 8 frames, no B frames, faststart, no audio. Short GOPs reduce random-seek decoding work. Desktop CRF 22 (first clip 23), mobile CRF 24, data CRF 27. Source: the existing owner high-quality clips, with no new footage or changed scenes. Posters are extracted from the first frame of each final encoded file.

Total clip budgets: desktop 31.89 MiB, portrait phone 4.82 MiB, tablet/landscape 9.41 MiB, data-saving 8.61 MiB. All three clips are loaded into the scroll runtime before entering the walkthrough. The existing scroll controller, crossfades, captions, navigation, and CTA behavior are preserved.

Validation: all nine clips decode completely without errors. Local Chrome benchmark compared eight random seeks in the previous first high-quality clip and the replacement. The new clip took 5-14ms per seek versus 8-27ms previously on this machine; actual devices and network conditions vary.

Production diagnosis: https://kruger-vactations.vercel.app served owner-01-lite.mp4 at 640x426 in a 1440x900 desktop Chrome viewport. Updated local browser checks verified all three scenes advance at 1920x1278 desktop and 1080x718 mobile, with no JavaScript errors; See Details lands at the intended 118px scroll margin.

The minimal loading bar waits for all three complete video downloads and readable metadata in the scroll controller's actual runtime. The optional preloadAll flag reuses the controller's existing fetch, Blob, video, abort, and teardown logic; other consumers retain lazy loading. The loader displays a byte-weighted 0–100% percentage from response stream chunks and the versioned files' known sizes. It has no timeout or scroll-based early release. Media failures retain the loader and offer a retry that resets the controller. The loader has no See Details link; reduced motion goes straight to static posters. No document scroll interception or separate video timeline is added.

Cold-load validation deliberately holds the third clip after the first two are ready, including beyond the old 12-second timeout. The loader must remain visible until that clip is fully downloaded and metadata is available. Forward and reverse scrolling then makes no additional media requests. A separate failure/retry case checks the journey remains gated until every retried download is complete and its metadata is available.

Mobile direction-change fix: capture the opening viewport height before the scroll controller measures its scene bands, and hold it through height-only viewport changes. Update the captured height when viewport width changes (orientation). The stage, story offset, and all three scene bands use that same stable measurement; mobile anchor scrolling uses native immediate behavior and the walkthrough opts out of browser scroll anchoring. A local mobile Chrome check kept bands, scroll position, and stage height unchanged through four simulated toolbar resizes, then verified video time follows repeated forward/reverse scroll movements.


Phone download optimization: portrait screens up to 600px receive centered portrait crops (540x1170, 18fps, CRF27, closed GOP9, no B frames). Their three clips total 5,052,525 bytes versus 15,606,177 bytes previously, a 67.6 percent reduction. Tablet/landscape mobile assets retain 1080px width at 18fps, CRF26, closed GOP12, totaling 9,865,324 bytes. Desktop sources stay unchanged. Device selection happens before mounting the scroll runtime, avoiding downloads of an initial wrong variant. Phone variants also take priority over the larger legacy Save-Data clips. Posters are exact first frames extracted from the final encoded files.

A cold browser test at 5Mbps/80ms latency measured the previous production opening at 27.6 seconds and the updated local production build at 11.1 seconds. Both decoded all three clips; the updated build requested only the three portrait assets and made no media requests during subsequent forward/reverse scrolling. Network and device timings vary.


Mobile zero-counter fix: completion no longer requires HAVE_CURRENT_DATA (readyState2). That frame state may depend on mobile playback policy or data-saving settings; downloaded bytes plus HAVE_METADATA (readyState1) suffice to release the loader, keeping all media in memory while the controller's existing touch priming handles playback. [MDN loadeddata notes](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event). A throttled mobile test simulating metadata-only media state advanced through real intermediate percentages to 100 without user interaction; all three downloaded byte counts matched the file-size manifest.
