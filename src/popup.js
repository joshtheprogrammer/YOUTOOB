// Initialize
let TIMEVAL = document.getElementById('TIMEVAL');

//button is clicked
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

// script
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
