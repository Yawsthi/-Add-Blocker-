// This function runs only when the extension is installed or updated.
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed/updated. Setting up blocking rules.");

    // The updateDynamicRules function clears all previous rules and adds new ones.
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3, 4, 5], // List of IDs to remove.
        addRules: [
            {
                "id": 1,
                "priority": 1,
                "action": { "type": "block" },
                "condition": {
                    "urlFilter": "*://*.googlevideo.com/videoplayback*",
                    "resourceTypes": ["media"]
                }
            },
            {
                "id": 2,
                "priority": 1,
                "action": { "type": "block" },
                "condition": {
                    "urlFilter": "*://*.youtube.com/*adformat=*",
                    "resourceTypes": ["xmlhttprequest", "media", "main_frame"]
                }
            },
            {
                "id": 3,
                "priority": 1,
                "action": { "type": "block" },
                "condition": {
                    "urlFilter": "*://*.youtube.com/api/stats/ads*",
                    "resourceTypes": ["xmlhttprequest"]
                }
            },
            {
                "id": 4,
                "priority": 1,
                "action": { "type": "block" },
                "condition": {
                    "urlFilter": "*://*.doubleclick.net/*",
                    "resourceTypes": ["script", "xmlhttprequest", "media", "main_frame"]
                }
            },
            {
                "id": 5,
                "priority": 1,
                "action": { "type": "block" },
                "condition": {
                    "urlFilter": "*://*.pagead2.googlesyndication.com/*",
                    "resourceTypes": ["script", "xmlhttprequest", "media", "main_frame"]
                }
            }
        ]
    }, () => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log("Dynamic rules for ad blocking updated successfully.");
        }
    });
});