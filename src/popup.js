// Initialize butotn with users's prefered color
let TIMEVAL = document.getElementById('TIMEVAL');

chrome.storage.sync.get("TIME", ({ TIME }) => {
  TIMEVAL.value = TIME;
});

// When the button is clicked, inject setPageBackgroundColor into current page
setTime.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  let TIME = document.getElementById('TIMEVAL').value;
  chrome.storage.sync.set({TIME}, function () { 
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setVideoTime,
    });
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setVideoTime() {
  try {
    chrome.storage.sync.get("TIME", ({ TIME }) => {
      if (window.location.href.includes("youtube.com/watch")) {
        window.location.href = window.location.href.split("&t=")[0] + `&t=${TIME}`;
      }
    });
  }
  catch {
    if (window.location.href.includes("youtube.com/watch")) {
      alert("0");
      window.location.href = window.location.href.split("&t=")[0] + `&t=0`;
    }
  }
}
