// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'getRss') {
        res = document.body.innerHTML.match(/(?:"channelId":")(.*?)(?:")/g);
        if (res != undefined && res.length > 0) sendResponse(res);
    }
});