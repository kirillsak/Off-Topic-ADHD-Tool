document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("saveButton");
  const topicInput = document.getElementById("topicInput");

  saveButton.addEventListener("click", function () {
    const topic = topicInput.value;
    chrome.storage.local.set({ currentTask: topic }, function () {
      alert("Topic saved: " + topic);

      chrome.storage.local.get(["currentTask"], function (result) {
        const savedTopic = result.currentTask;

        console.log("Saved topic: " + savedTopic);

        fetch("http://localhost:8080/similar-words", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ word: savedTopic }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            return response.json();
          })
          .then((data) => {
            const words = data.map((item) => item.word);

            // Save similar words
            chrome.storage.local.set({ similarWords: words }, function () {
              console.log("Similar words saved: " + words.join(", "));

              const pageContent = document.body.textContent;

              chrome.storage.local.get(["similarWords"], function (result) {
                const keywords = result.similarWords;
                if (keywords && keywords.length > 0) {
                  if (
                    keywords.some((keyword) => pageContent.includes(keyword))
                  ) {
                    console.log("Keyword found on the page.");
                  } else {
                    alert("Are you getting off topic here?");
                  }
                }
              });
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    });
  });
});
