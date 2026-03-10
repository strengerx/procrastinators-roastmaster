# Project Review: Procrastinator's Roastmaster

## What could break the extension (highest risk)

1. **Background script has a duplicate `isProcrastinationSite` function and the second version references an undefined constant (`PROCRASTINATION_SITES`)**.
   - The second declaration overrides the first in JavaScript function hoisting rules.
   - When called, it can throw `ReferenceError: PROCRASTINATION_SITES is not defined`, breaking time tracking and roast triggering.

2. **`notifications` permission is missing from `manifest.json`, but `chrome.notifications.create(...)` is called in `background.js`**.
   - In MV3, this can cause notification calls to fail, reducing core functionality (roasts + achievement alerts).

3. **Options page JS binds listeners for elements that do not exist in `options/options.html`** (`#export-data`, `#clear-data`, and `#data-consent`).
   - `document.getElementById(...).addEventListener(...)` on missing elements can throw and stop initialization.
   - `populateForm(...)` also assumes `#data-consent` exists and can throw when accessing `.checked`.

4. **Tracking logic relies on tab activation/update/removal events only**.
   - If user stays on one procrastination tab for long periods without tab switches/reloads, tracked minutes may not update until context changes.
   - This can undercount time and delay roasts.

## Architecture and product critique

1. **Service worker lifecycle edge cases**
   - The extension initializes storage primarily on `onInstalled`, with `loadSettings()` at file load.
   - Consider robust startup handling (`runtime.onStartup`) and defensive init before every read/write path, because MV3 service workers can be suspended/restarted.

2. **Settings model drift risk**
   - Settings fields exist in multiple places (background defaults, options defaults, UI controls).
   - Missing fields in one place can silently regress behavior. A single canonical schema + migration function would reduce drift.

3. **No explicit error handling/reporting for storage and messaging failures**
   - Calls to `chrome.storage.*` and messages mostly assume success.
   - Lightweight telemetry (even local debug logs with feature flags) would make reliability problems easier to diagnose.

4. **Potential race conditions in frequent storage writes**
   - Repeated `chrome.storage.local.get` -> mutate -> `set` cycles can lose updates in bursty event scenarios.
   - Batched writes or in-memory state with periodic flush would be safer.

5. **String severity/content concerns for broader audience**
   - Some roast text is harsh enough to create moderation or workplace-policy issues.
   - Add a “tone pack” system (safe/default/spicy) and guardrails.

## Suggested improvements (practical roadmap)

### Immediate (stability)
- Remove duplicate `isProcrastinationSite` and keep one implementation that uses settings + consent.
- Add `"notifications"` permission in `manifest.json`.
- Fix options UI/JS mismatch:
  - Add missing controls in HTML **or** gate event binding with null checks.
  - Ensure `data-consent` checkbox exists if the feature is supported.
- Add a minimal automated smoke check script to catch undefined identifiers and missing DOM hooks.

### Near-term (correctness)
- Add periodic heartbeat tracking (e.g., alarms) so long single-tab sessions are counted.
- Add initialization guard that creates missing storage keys whenever worker starts.
- Validate settings before save (e.g., `escalation >= threshold`, numeric ranges).

### Medium-term (maintainability)
- Centralize configuration/constants in one shared module (sites, defaults, keys).
- Replace risky `innerHTML` rendering paths with safe DOM creation where feasible.
- Add unit tests for:
  - site matching,
  - threshold/severity transitions,
  - leaderboard aggregation,
  - achievement unlock rules.

### Product polish
- Add per-site thresholds and quiet hours.
- Add weekly digest with trendline.
- Add recovery nudges (e.g., one-click “start focus timer”) instead of roast-only UX.
