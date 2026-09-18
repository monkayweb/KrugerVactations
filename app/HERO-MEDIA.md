# Walkthrough media

The live hero uses versioned files in public/assets/hero, served as static CDN assets. Legacy /tour-media routes remain available but are no longer used by the hero.

Each of the three scenes has a 1920px desktop, 1080px mobile, and 960px data-saving variant. The data-saving version is selected only when the browser reports Save-Data. CPU count, device-memory estimates, and decoder power-efficiency reports no longer silently reduce image quality.

Encoding: H.264, yuv420p, 24fps, closed GOP of 8 frames, no B frames, faststart, no audio. Short GOPs reduce random-seek decoding work. Desktop CRF 22 (first clip 23), mobile CRF 24, data CRF 27. Source: the existing owner high-quality clips, with no new footage or changed scenes. Posters are extracted from the first frame of each final encoded file.

Total clip budgets: desktop 31.89 MiB, mobile 14.88 MiB, data-saving 8.61 MiB. All three clips are loaded into the scroll runtime before entering the walkthrough. The existing scroll controller, crossfades, captions, navigation, and CTA behavior are preserved.

Validation: all nine clips decode completely without errors. Local Chrome benchmark compared eight random seeks in the previous first high-quality clip and the replacement. The new clip took 5-14ms per seek versus 8-27ms previously on this machine; actual devices and network conditions vary.

Production diagnosis: https://kruger-vactations.vercel.app served owner-01-lite.mp4 at 640x426 in a 1440x900 desktop Chrome viewport. Updated local browser checks verified all three scenes advance at 1920x1278 desktop and 1080x718 mobile, with no JavaScript errors; See Details lands at the intended 118px scroll margin.

The branded preloader waits for all three videos to have decodable frames in the scroll controller's actual runtime. The optional preloadAll flag reuses the controller's existing fetch, Blob, video, abort, and teardown logic; other consumers retain lazy loading. The loader displays the real number of ready clips and has no timeout or scroll-based early release. Media failures retain the loader and offer a retry that resets the controller. See Details remains available to skip the journey, and reduced motion goes straight to static posters. No document scroll interception or separate video timeline is added.

Cold-load validation deliberately holds the third clip after the first two are ready, including beyond the old 12-second timeout. The loader must remain visible until that clip is decoded. Forward and reverse scrolling then makes no additional media requests. A separate failure/retry case checks the journey remains gated until every retried video is ready.

Mobile direction-change fix: capture the opening viewport height before the scroll controller measures its scene bands, and hold it through height-only viewport changes. Update the captured height when viewport width changes (orientation). The stage, story offset, and all three scene bands use that same stable measurement; mobile anchor scrolling uses native immediate behavior and the walkthrough opts out of browser scroll anchoring. A local mobile Chrome check kept bands, scroll position, and stage height unchanged through four simulated toolbar resizes, then verified video time follows repeated forward/reverse scroll movements.
