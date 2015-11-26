//SET UP 
//Need to get CAUTH
//need to add "X-CSRF2-Cookie":"abcd" in cookie store
//need to add "X-CSRF2-Token":"abcd" in cookie store

// Gets data from extension
// chrome.runtime.onMessage.addListener(
//   function(i) { return i
// });

//my old link: "https://www.coursera.org/api/opencourse.v1/course?courseId="

//owsPspIJEeW5gxKDBxYMJw

function popUp(text) {

	var newWindow = window.open("","Graded Quiz Json","width=500,height=500")
    
    var html = "<html><head></head><body><b>"+ text +"</b></html>"

    newWindow.document.open()
    newWindow.document.write(html)
    newWindow.document.close()

}

chrome.runtime.onMessage.addListener( function(courseId) { 
	manipulateJson(courseId)
})


function manipulateJson (courseId) {

	$.get("https://www.coursera.org/api/authoringCourses.v1/" + courseId, function (i) {
		i.elements[0].course.courseMaterial.elements.forEach(function (elem) {
			elem.elements.forEach(function (element) {
				element.elements.forEach(function (elem) {
					if (elem.content.typeName === 'quiz') {

						//change typeName from quiz to exam
						elem.content.typeName = 'exam'

						//Add "gradingWeight": 0
						elem.content.definition.gradingWeight = 0

						var url = "https://www.coursera.org/api/assess/v1/assessments/" + elem.content.definition.assessmentId

						//GET Request with quiz id (previously done in Postman)
						$.get(url).then(function (getData) {

							console.log('GET Request for ' + elem.content.definition.assessmentId)
							
							//Change typeName from 'formative' to 'summative' (makes it graded)
							getData.assessment.typeName = 'summative'

							var postUrl = "https://www.coursera.org/api/assess/v1/assessments"

							$.ajax({
							    type: 'POST',
							    url: postUrl,
							    data: JSON.stringify(getData.assessment),
							    headers: {
							    	"X-CSRF2-Cookie":"abcd",
							    	"X-CSRF2-Token":"abcd"
							    }

							}).then(function (i) {

								//console.log(getData.assessment)

								console.log('POST Request for ' + elem.content.definition.assessmentId)


							    ////newly generated id is equal to assessmentId
								if(i.id == undefined) {
									
									////Should throw error here
									console.log('no assessmentId found')

								}
								
								elem.content.definition.assessmentId = i.id

								console.log("Returned " + elem.content.definition.assessmentId)

							});
						})
					}
				})
			})
		})

		// **********    HACK!!!!!!!!  ********* USE A PROMISE INSTEAD
		setTimeout( function () { 
    		popUp(JSON.stringify(i.elements[0].course));
		}, 3000);
	
	})
}

//manipulateJson(courseId)