// Initialize
let TIMEVAL = document.getElementById('TIMEVAL');

chrome.storage.sync.get("TIME", ({ TIME }) => {
  TIMEVAL.value = TIME;
});

TIMEVAL.addEventListener('input', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getVideoDuration,
  }, function(r) {
    for (const val of r) {
      TIMEVAL.placeholder = val.result;
    }
  });
});

TIMEVAL.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getVideoDuration,
  }, function(r) {
    for (const val of r) {
      TIMEVAL.placeholder = val.result;
    }
  });
});

//button is clicked
setTime.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (parseInt(document.getElementById('TIMEVAL').value) || document.getElementById('TIMEVAL').value == '0') {
    var TIME = document.getElementById('TIMEVAL').value;
  }
  else {
    var TIME = document.getElementById('TIMEVAL').placeholder;
  }

  TIMEVAL.value = TIME;

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

function getVideoDuration() {
  if (window.location.href.includes("youtube.com/watch")) {
    var r = Math.floor(Math.random() * (parseInt(window.document.getElementsByClassName("ytp-bound-time-right")[0].innerHTML.split(":")[0]*60)+parseInt(window.document.getElementsByClassName("ytp-bound-time-right")[0].innerHTML.split(":")[1])));
  }
  else {
    var r = Math.floor(Math.random() * 100);
  }
  return r;
}