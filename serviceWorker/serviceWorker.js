let currentTab = null;
let targetUrl = "";
let dir = "fromToTo";
let shiftPressed = false;
let fromLan = "";
let toLan = "";

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
        updateFromLanguageSetting();
    });
}

function updateFromLanguageSetting() {
    chrome.storage.local.get("ULMfromLan").then((result) => {
        if (result === null) {
            fromLan = "en-us";
        }
        else {
            fromLan = result["ULMfromLan"];
        }
        updateToLanguageSetting();
    });
}
function updateToLanguageSetting() {
    chrome.storage.local.get("ULMtoLan").then((result) => {
        if (result === null) {
            toLan = "zh-tw";
        }
        else {
            toLan = result["ULMtoLan"];
        }
        console.log(fromLan, toLan);
        updateCurrentTab();
    });
}