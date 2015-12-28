
document.addEventListener('DOMContentLoaded', function() {

  runFileOnClick('checkBox', 'checkBoxCode.js')

  runFileOnClick('deleteTimes', 'deleteTimeStamps.js')

  runFileOnClick('addModules', 'createModules.js')

  runFileOnClick('fillEmptyModules', 'fillEmptyModules.js')

  var quizToGraded = document.getElementById('courseIdButton');
  quizToGraded.addEventListener('click', function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, getValue('courseField'), function(response) {
        console.log(response);
        });
    });

    chrome.tabs.executeScript(null, {file: "quizToGraded.js"});

  }, false);

  console.log('before')

  var quizValidation = document.getElementById('slugIdButton');
  quizValidation.addEventListener('click', function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, getValue('slugField'), function(response) {
        console.log(response);
        });
    });

    chrome.tabs.executeScript(null, {file: "quizValidation.js"});

  }, false);


}, false);




//(id: String)
function getValue(id) {
	return document.getElementById(id).value;
}

//(elementId: string, fileName: string) => ()
//elementId is button tag id in popup.html file
function runFileOnClick (elementId, fileName) {

  var button = document.getElementById(elementId);
    button.addEventListener('click', function() {

    chrome.tabs.executeScript(null, {file: fileName});
  }, false)
}




// function loadScript (url) {
//   return new Promise(function (resolve, reject) {
//     if (window[url[1]]) {return resolve()}
//     let script = document.createElement('script')
//     script.src = url[0]
//     script.addEventListener('load', resolve)
//     script.addEventListener('error', reject)
//     document.body.appendChild(script)
//   })
// }

// chrome.runtime.onMessage.addListener(
//   function (slugNumber) {
//     let deps = [
//       ['//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.js', '$']
//     ]
//     Promise.all(deps.map(loadScript)).then(function() {
//       runValidateQuiz(slugNumber)
//   })
// })




