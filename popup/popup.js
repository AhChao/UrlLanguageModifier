function changeLangSetting(lanTarget) {
    let value = document.getElementById(lanTarget).value;
    let key = "ULM" + lanTarget;
    chrome.storage.local.set({ [key]: value }).then(() => {
        console.log(key + " changed to " + value);
    });
    init();
}

function init() {
    chrome.storage.local.get("ULMfromLan").then((result) => {
        console.log("from:", result, result["ULMfromLan"]);
        if (result === null) {
            document.getElementById("fromLan").value = "en-us";
        }
        else {
            document.getElementById("fromLan").value = result["ULMfromLan"];
        }
    });
    chrome.storage.local.get("ULMtoLan").then((result) => {
        console.log("to:", result, result["ULMtoLan"]);
        if (result === null) {
            document.getElementById("toLan").value = "zh-tw";
        }
        else {
            document.getElementById("toLan").value = result["ULMtoLan"];
        }
    });
    document.getElementById('fromLan').onchange = () => { changeLangSetting('fromLan'); }
    document.getElementById('toLan').onchange = () => { changeLangSetting('toLan'); }
}

init();