let TIME = 0;
let PH = 0;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ TIME });
});