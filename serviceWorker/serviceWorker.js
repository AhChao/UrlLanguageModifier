let currentTab = null;
let targetUrl = "";
let dir = "fromToTo";
let shiftPressed = false;

chrome.commands.onCommand.addListener(function (command) {
    console.log('onCommand event received for message: ', command);
    if (command == "transToLan") {
        dir = "fromToTo";
        shiftPressed = false;
        updateCurrentTabUrlVariable();
    }
    if (command == "transFromLan") {
        dir = "toToFrom";
        shiftPressed = false;
        updateCurrentTabUrlVariable();
    }
    if (command == "transToLanNew") {
        dir = "fromToTo";
        shiftPressed = true;
        updateCurrentTabUrlVariable();
    }
});

function updateCurrentTab() {
    let fromLan = "en-us";
    let toLan = "zh-tw";
    let currentUrl = currentTab?.url;
    if ((currentUrl.indexOf(fromLan) != -1 && dir == "fromToTo") ||
        (currentUrl.indexOf(toLan) != -1 && dir == "toToFrom")) {
        targetUrl = dir == "fromToTo" ? currentUrl.replace(fromLan, toLan) : currentUrl.replace(toLan, fromLan);
        if (shiftPressed) {
            chrome.tabs.create({ url: targetUrl });
        }
        else {
            chrome.tabs.update(currentTab.id, { url: targetUrl }, null);
        }
    }
}

function updateCurrentTabUrlVariable() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        currentTab = tabs[0];
        console.log(currentTab);
        updateCurrentTab();
    });
}