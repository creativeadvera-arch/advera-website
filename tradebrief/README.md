# TradeBrief WA maintenance

This static page uses source-checked public notices. Keep official URLs, AWST deadlines, source-check times and document-access limits truthful. Do not update `checkedAt` unless the source was actually reviewed.

`app.js` and `style.css` are the editable sources. After changing either, run `python3 tradebrief/build-assets.py` from the repository root. Commit the updated `index.html`, sources and newly generated asset files together. Keep older asset files so already-open pages remain functional. The page uses content-fingerprinted filenames because a live deployment previously served fresh HTML with cached older CSS and JavaScript to a returning browser.

Data-only changes to `opportunities.json` do not need an asset rebuild. The app requests that file without a browser cache and labels records older than 48 hours. A static PDF remains a dated snapshot and must not be described as continuously current.

Verify source data, filter behaviour, notice-to-enquiry population, user-detail preservation, duplicate handling, the example PDF download and the production page after a change. The example is demonstration work, not a paid client engagement.
