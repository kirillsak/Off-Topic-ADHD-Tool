const pageContent = document.body.textContent;

chrome.storage.local.get(["currentTask"], function (result) {
  const keyword = result.currentTask;
  if (pageContent.includes(keyword)) {
    console.log("Keyword found on the page.");
  } else {
    alert("Are you getting off topic here?");
  }
});
