# Chrome Web Store Listing — Aspect Ratio Changer for YouTube™

> Last Updated: 2026-08-25

## Store Listing

**Extension Name** [REQUIRED]
Aspect Ratio Changer for YouTube™

**Short Description** [REQUIRED]
Change the aspect ratio, zoom, and stretch settings of YouTube videos directly from the video player controls.

**Detailed Description** [REQUIRED]
Aspect Ratio Changer for YouTube™ allows you to easily adjust the video display aspect ratio, zoom, and stretch settings directly inside the YouTube player.

Whether you are watching classic 4:3 content, ultrawide 21:9 videos on a standard screen, or 16:9 content on an ultrawide monitor, this extension gives you full control over how your videos are framed and scaled.

FEATURES
• 21 carefully calibrated aspect ratio presets (including 4:3, 16:9, 16:10, 21:9, 14:9, 5:4, and custom vertical/horizontal scaling)
• Seamless native integration right in the YouTube video control bar
• Quick one-click selection menu with live transformation preview
• Intelligent keyboard navigation support (Enter, Space, Escape)
• Lightweight and zero-lag performance with zero external runtime dependencies

HOW TO USE
1. Open any video on YouTube.
2. Click the new Aspect Ratio icon in the bottom player control bar (next to Settings).
3. Select your desired aspect ratio preset from the dropdown menu.
4. The video immediately scales and centers to your selected framing.

PRIVACY & PERMISSIONS
This extension does not collect, store, or transmit any user data, personal information, or browsing history. All adjustments happen entirely locally on your device.
• Matches "https://www.youtube.com/*" and "https://youtube.com/*" strictly to render the aspect ratio selector button and scale the video container.

SUPPORT
Found an issue or have a feature request?
• Open an issue on GitHub: https://github.com/thienlhh/youtube-aspect-ratio
• Contact: thienlhh91@gmail.com

TRADEMARK DISCLAIMER
YouTube is a trademark of Google LLC. This extension is an independent project and is not affiliated with, sponsored by, or endorsed by Google LLC or YouTube.

**Category** [REQUIRED]
Accessibility

**Single Purpose** [REQUIRED]
Adjusts the display aspect ratio and zoom level of YouTube videos directly within the player.

**Primary Language** [REQUIRED]
English

---

## Graphics & Assets

| Asset | Dimensions | Status | Filename / Notes |
| :--- | :--- | :--- | :--- |
| **Store Icon** [REQUIRED] | 128×128 PNG | ✅ Ready | `icons/icon128.png` |
| **Screenshot 1** [REQUIRED] | 1280×800 or 640×400 | 🟡 Pending Capture | Player view showing the aspect ratio menu open |
| **Screenshot 2** [RECOMMENDED] | 1280×800 or 640×400 | 🟡 Pending Capture | Before & After comparison (e.g. 4:3 stretched to 16:9) |
| **Small Promo Tile** [RECOMMENDED] | 440×280 PNG | 🟡 Optional | Promotional graphic for featured store placements |
| **Marquee Promo Tile** | 1400×560 PNG | 🟡 Optional | Large promotional banner |

### Screenshot Guidelines for Submission
1. **Screenshot 1 (Main Action)**: Play a YouTube video with the Aspect Ratio menu opened from the bottom control bar, showing preset options.
2. **Screenshot 2 (Aspect Ratio Demo)**: Ultrawide or 4:3 video scaled to fit without black bars.

---

## Permissions Justification

| Permission / Match | Type | Justification |
| :--- | :--- | :--- |
| `https://www.youtube.com/*` | `content_scripts` | Injects the aspect ratio control button into the YouTube player UI and applies CSS container scaling to video elements. |
| `https://youtube.com/*` | `content_scripts` | Ensures the extension functions across YouTube URL variations. |

*Note: No broad permissions (such as `<all_urls>`, `storage`, or `tabs`) are requested.*

---

## Privacy & Data Use

### Data Collection
**Does the extension collect user data?** No

| Data Type | Collected? | Transmitted Off-Device? | Purpose | Shared with Third Parties? |
| :--- | :--- | :--- | :--- | :--- |
| Personally identifiable info | No | No | N/A | No |
| Health info | No | No | N/A | No |
| Financial info | No | No | N/A | No |
| Authentication info | No | No | N/A | No |
| Personal communications | No | No | N/A | No |
| Location | No | No | N/A | No |
| Web history | No | No | N/A | No |
| User activity | No | No | N/A | No |
| Website content | No | No | N/A | No |

### Data Use Certification
- [x] Data is NOT sold to third parties
- [x] Data is NOT used for purposes unrelated to the extension's core functionality
- [x] Data is NOT used for creditworthiness or lending purposes

---

## Privacy Policy

**Privacy Policy URL** [REQUIRED]
`https://github.com/thienlhh/youtube-aspect-ratio/blob/main/PRIVACY.md` (or hosted GitHub Pages URL)

---

## Distribution

**Visibility**: Public  
**Regions**: All regions  

---

## Developer Info

**Publisher Name**: Thien Le  
**Contact Email**: thienlhh91@gmail.com  
**Support URL**: https://github.com/thienlhh/youtube-aspect-ratio/issues  

---

## Version History

| Version | Date | Changes | Status |
| :--- | :--- | :--- | :--- |
| 1.0.0 | 2026-08-25 | Initial release with 21 aspect ratio presets, seamless player integration, and safe SVG icons. | Ready for Submission |
