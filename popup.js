document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("saveButton");
  const topicInput = document.getElementById("topicInput");

  saveButton.addEventListener("click", function () {
    const topic = topicInput.value;
    chrome.storage.local.set({ currentTask: topic }, function () {
      alert("Topic saved: " + topic);
    });
  });
});
