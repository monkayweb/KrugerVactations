# Walkthrough media

The live hero uses versioned files in public/assets/hero, served as static CDN assets. Legacy /tour-media routes remain available but are no longer used by the hero.

Each of the three scenes has a 1920px desktop, 1080px mobile, and 960px data-saving variant. The data-saving version is selected only when the browser reports Save-Data. CPU count, device-memory estimates, and decoder power-efficiency reports no longer silently reduce image quality.

Encoding: H.264, yuv420p, 24fps, closed GOP of 8 frames, no B frames, faststart, no audio. Short GOPs reduce random-seek decoding work. Desktop CRF 22 (first clip 23), mobile CRF 24, data CRF 27. Source: the existing owner high-quality clips, with no new footage or changed scenes. Posters are extracted from the first frame of each final encoded file.

Total clip budgets: desktop 31.89 MiB, mobile 14.88 MiB, data-saving 8.61 MiB. Later scenes receive low-priority browser prefetch hints. The existing scroll controller, crossfades, captions, navigation, and CTA behavior are preserved.

Validation: all nine clips decode completely without errors. Local Chrome benchmark compared eight random seeks in the previous first high-quality clip and the replacement. The new clip took 5-14ms per seek versus 8-27ms previously on this machine; actual devices and network conditions vary.

Production diagnosis: https://kruger-vactations.vercel.app served owner-01-lite.mp4 at 640x426 in a 1440x900 desktop Chrome viewport. Updated local browser checks verified all three scenes advance at 1920x1278 desktop and 1080x718 mobile, with no JavaScript errors; See Details lands at the intended 118px scroll margin.

The branded preloader waits for the first video to have a decodable frame. Later-scene prefetch begins after it clears so the opening download gets priority. Visitors can skip to details at any time; scrolling past the opening viewport, reduced-motion preference, media failure, or a 12-second ceiling also dismisses it. It does not lock document scrolling or use a simulated percentage. Local Chrome checks cover ready, skip, failed-media, and reduced-motion cases.
