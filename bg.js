console.log("Hello");

// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]youtube.com[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?youtube\.com/;

// A function to use as callback
function doStuffWithDom(domContent) {
    console.log('I received the following content:\n' + domContent);
    if (domContent[0] != undefined) {
        var channelID = domContent[0].substring(
            domContent[0].lastIndexOf(":\"") + 2,
            domContent[0].lastIndexOf("\"")
        );
        //console.log(channelID);
        window.open("https://www.youtube.com/feeds/videos.xml?channel_id=" + channelID, '_blank');
    }
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
    if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
        chrome.tabs.sendMessage(tab.id, {
            text: 'getRss'
        }, doStuffWithDom);
    }
});