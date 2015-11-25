
//(elementId: string, fileName: string) => ()
//elementId is button tag id in popup.html file
function runFileOnClick (elementId, fileName) {
  
  var button = document.getElementById('elementId');
    button.addEventListener('click', function() {
 
    chrome.tabs.executeScript(null, {file: fileName});
  }, false)
}


document.addEventListener('DOMContentLoaded', function() {
  
  runFileOnClick('checkBox', 'checkBoxCode.js')
  
  runFileOnClick('deleteTimes', 'deleteTimeStamps.js')

  runFileOnClick('quizToGraded', 'quizToGraded.js')

}, false);





