
//(elementId: string, fileName: string) => ()
//elementId is button tag id in popup.html file

function getCourseId() {
	return document.getElementById('courseField').value;
}

document.addEventListener('DOMContentLoaded', function() {
  
  var checkBoxButton = document.getElementById('checkBox');
  checkBoxButton.addEventListener('click', function() {
    
    chrome.tabs.executeScript(null, {file: "checkBoxCode.js"});
  }, false);

  var delTimeStampButton = document.getElementById('deleteTimes');
  delTimeStampButton.addEventListener('click', function() {
    
    chrome.tabs.executeScript(null, {file: "deleteTimeStamps.js"});
  }, false);



  var quizToGraded = document.getElementById('courseIdButton');
  quizToGraded.addEventListener('click', function() {

  	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		chrome.tabs.sendMessage(tabs[0].id, document.getElementById('courseField').value, function(response) {
    		console.log(response);
  			});
		});

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
