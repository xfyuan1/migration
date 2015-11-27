//SET UP 
//Need to add CAUTH
//need to add "X-CSRF2-Cookie":"abcd" in cookie store
//need to add "X-CSRF2-Token":"abcd" in cookie store

'use strict';

function loadScript (url) {
	return new Promise(function (resolve, reject) {
		let script = document.createElement('script')
		script.src = url
		script.addEventListener('load', resolve)
		script.addEventListener('error', reject)
		document.body.appendChild(script)
	})
}

const deps = [
	'//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.js'
]

//Should log a resonse that says what SLUG name is!
chrome.runtime.onMessage.addListener( function (courseId) {
	Promise.all(deps.map(loadScript)).then(function() {
		changeToGraded(courseId)
	})
})


function changeToGraded (courseId) {

	request({
		type: 'get',
		url: "https://www.coursera.org/api/authoringCourses.v1/" + courseId
	}).then(function (i) {

		return Promise.all(flatMap(i.elements[0].course.courseMaterial.elements, function (elem) {
			
			return flatMap(elem.elements, function (element) {

				return element.elements
					.filter(_ => _.content.typeName === 'quiz')
					.map(function (elem) {
						
						if(!elem.length) {
							throw new Error('No quizzes found')
						} 
						//change typeName from quiz to exam
						elem.content.typeName = 'exam'

						//Add "gradingWeight": 0
						elem.content.definition.gradingWeight = 0

						var url = "https://www.coursera.org/api/assess/v1/assessments/" + elem.content.definition.assessmentId

						//GET Request with quiz id (previously done in Postman)
						return request({ type: 'get', url: url })
							.then(function (getData) {

								console.log('GET Request for ' + elem.content.definition.assessmentId)

								//Change typeName from 'formative' to 'summative' (makes it graded)
								getData.assessment.typeName = 'summative'

								return getData

							})
							.then(function (getData) {

								var postUrl = "https://www.coursera.org/api/assess/v1/assessments"

								return request({
									type: 'POST',
									url: postUrl,
									data: JSON.stringify(getData.assessment),
									headers: {
										"X-CSRF2-Cookie":"abcd",
										"X-CSRF2-Token":"abcd"
									}
								})

							}).then(function (i) {

								//console.log(getData.assessment)

								console.log('POST Request for ' + elem.content.definition.assessmentId)


									//newly generated id is equal to assessmentId
								if(i.id == undefined) {
									
									//Should throw error here
									throw new Error('no assessmentId returned')

								}
								
								elem.content.definition.assessmentId = i.id

								console.log("Returned " + elem.content.definition.assessmentId)

								return elem

							});
						})
				})
			}))
			//Where is this elems parameter????
			.then(function (elems) {
				popUp(JSON.stringify(i.elements[0].course));
			})
		})
		.then(function () {
			console.log('done with everything!')
		})
	}



/// helpers

// (array: Array[Array[Any]]) => Array[Any]
function flatten (arr) {
	return arr.reduce((a,b) => {
		return a.concat(Array.isArray(b) ? flatten(b) : b)
	}, [])
}

// (array: Array[Any], fn: (Any) => Array[Any]) => Array[Any]
function flatMap (array, fn) {
	return flatten(array.map(fn))
}

// wrapper around $.ajax that lets us use native ES6 promises
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// (args: Object) => Promise[Any]
function request (args) {
	return Promise.resolve(
		$.ajax({
			data: args.data,
			url: args.url,
			type: args.type,
			headers: args.headers
		})
	)
}


function popUp(text) {

	var newWindow = window.open("","Graded Quiz Json","width=500,height=500")
    
    var html = "<html><head></head><body><b>" + text + "</b></html>"

    newWindow.document.open()
    newWindow.document.write(html)
    newWindow.document.close()

}

