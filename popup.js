
//(elementId: string, fileName: string) => ()
//elementId is button tag id in popup.html file


document.addEventListener('DOMContentLoaded', function() {
  var checkBoxButton = document.getElementById('checkBox');
  checkBoxButton.addEventListener('click', function() {
    
    chrome.tabs.executeScript(null, {file: "checkBoxCode.js"});
  }, false);

  var delTimeStampButton = document.getElementById('deleteTimes');
  delTimeStampButton.addEventListener('click', function() {
    
    chrome.tabs.executeScript(null, {file: "deleteTimeStamps.js"});
  }, false);

  var quizToGraded = document.getElementById('sessionId');
  quizToGraded.addEventListener('click', function() {
    
    chrome.tabs.executeScript(null, {file: "quizToGraded.js"});
  }, false);

}, false);






// function runFileOnClick (elementId, fileName) {
  
//   var button = document.getElementById('elementId');
//     button.addEventListener('click', function() {
 
//     chrome.tabs.executeScript(null, {file: fileName});
//   }, false)
// }


// document.addEventListener('DOMContentLoaded', function() {
  
//   runFileOnClick('checkBox', 'checkBoxCode.js')
  
//   runFileOnClick('deleteTimes', 'deleteTimeStamps.js')

//   runFileOnClick('quizToGraded', 'quizToGraded.js')

// }, false);
