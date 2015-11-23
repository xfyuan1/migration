document.addEventListener('DOMContentLoaded', function() {
  var checkBoxButton = document.getElementById('checkBox');
  checkBoxButton.addEventListener('click', function() {
    
    chrome.tabs.executeScript(null, {file: "checkBoxCode.js", runAt: "document_end"});
  }, false);

  var delTimeStampButton = document.getElementById('deleteTimes');
  delTimeStampButton.addEventListener('click', function() {
    
    chrome.tabs.executeScript(null, {file: "deleteTimeStamps.js"});
  }, false);

}, false);

