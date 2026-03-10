# Procrastinator's Roastmaster

A Chrome extension that tracks your procrastination on social media and entertainment sites, then delivers humorous "roasts" to motivate productivity.

## Features

- **Smart Tracking**: Monitors time spent on procrastination-prone sites (YouTube, Facebook, Twitter, etc.)
- **Customizable Thresholds**: Set warning and escalation times for roasts
- **Multiple Roast Types**: Mild, medium, and harsh roasts based on severity
- **Dual Notifications**: Browser notifications + on-site overlay messages
- **Privacy Controls**: User consent and data export options
- **Daily Stats**: View your procrastination patterns in the popup

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension is now installed!

## Usage

1. **Basic Monitoring**: The extension automatically tracks time on monitored sites
2. **View Stats**: Click the extension icon to see today's procrastination stats
3. **Get Roasted**: When you exceed thresholds, receive notifications and on-site messages
4. **Customize**: Click "Settings" in the popup to adjust thresholds and monitored sites

## Settings

Access settings through the popup or by right-clicking the extension icon and selecting "Options":

- **Thresholds**: Set minutes for warnings and harsh roasts
- **Monitored Sites**: Enable/disable specific domains
- **Notifications**: Toggle browser notifications and site overlays
- **Privacy**: Control data collection and export your data

## Privacy

- Data is stored locally in your browser
- No data is sent to external servers
- You can export or delete your data anytime
- Extension requires consent for tracking

## Development

### Project Structure
```
├── manifest.json          # Extension manifest
├── background.js          # Background service worker
├── content.js             # Content script for overlays
├── popup/                 # Extension popup UI
├── options/               # Settings page
├── assets/                # Icons and assets
└── ROADMAP.md            # Development roadmap
```

### Building & Testing
- Load as unpacked extension in Chrome
- Test on various sites to ensure tracking works
- Check console for errors during development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source. Feel free to use and modify.

## Disclaimer

This extension is meant for fun and self-improvement. Use responsibly!</content>
<parameter name="filePath">d:\Procrastinators-Roastmaster\README.md