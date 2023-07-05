let currentTab = null;
let targetUrl = "";
let dir = "fromToTo";
document.onkeydown = function (e) {
    if (e.key === "l" && e.ctrlKey && e.altKey) {
        dir = "fromToTo";
        updateCurrentTabUrlVariable();
    }
    else if (e.key === ";" && e.ctrlKey && e.altKey) {
        dir = "toToFrom";
        updateCurrentTabUrlVariable();
    }
}

function updateCurrentTab() {
    let fromLan = document.getElementById("fromLan").value;
    let toLan = document.getElementById("toLan").value;
    let currentUrl = currentTab?.url;
    if ((currentUrl.indexOf(fromLan) != -1 && dir == "fromToTo") ||
        (currentUrl.indexOf(toLan) != -1 && dir == "toToFrom")) {
        targetUrl = dir == "fromToTo" ? currentUrl.replace(fromLan, toLan) : currentUrl.replace(toLan, fromLan);
        chrome.tabs.update(
            currentTab.id, { url: targetUrl }, () => {
                document.getElementById("input").value = "callback done";
            }
        );
    }
    else {
        document.getElementById("input").value = "Current Tab not include language-specify words in URL.";
    }
}

function updateCurrentTabUrlVariable() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        currentTab = tabs[0];
        document.getElementById("input").value = tabs[0].url;
        updateCurrentTab();
    });
}