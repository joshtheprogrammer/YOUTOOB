let TIME = 0;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ TIME });
});