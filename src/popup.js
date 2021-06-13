// Initialize
let TIMEVAL = document.getElementById('TIMEVAL');

TIMEVAL.placeholder = Math.floor(Math.random() * 43200);

TIMEVAL.addEventListener("click" , async () => {
  chrome.storage.sync.get("TIME", ({ TIME }) => {
    TIMEVAL.value = TIME;
  });
});

//button is clicked
setTime.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (parseInt(document.getElementById('TIMEVAL').value)) {
    var TIME = document.getElementById('TIMEVAL').value;
  }
  else {
    var TIME = document.getElementById('TIMEVAL').placeholder;
  }

  chrome.storage.sync.set({TIME}, function () { 
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setVideoTime,
    });
  });
});

// script
function setVideoTime() {
  chrome.storage.sync.get("TIME", ({ TIME }) => {
    if (window.location.href.includes("youtube.com/watch")) {
        window.location.href = window.location.href.split("&t=")[0] + `&t=${TIME}`;
    }
  });
}
