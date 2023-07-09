function checkPageContent() {
  const pageContent = document.body.textContent;

  chrome.storage.local.get(["similarWords"], function (result) {
    const similarWords = result.similarWords;
    console.log("Similar words retrieved:", similarWords);

    if (similarWords && similarWords.length > 0) {
      if (similarWords.some((keyword) => pageContent.includes(keyword))) {
        console.log("Keyword found on the page.");
      } else {
        alert("Are you getting off topic here?");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", checkPageContent);

window.addEventListener("load", checkPageContent);

window.addEventListener("DOMContentLoaded", checkPageContent);
