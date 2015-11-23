//Finds and deletes all time stamps in video sections w/ the following formats:
// (78:90)
// [78:90]
// (78.90)
// [78.90]
// [5.00]
// (5.00)
// (5:00)
// [5:00]


//DOES NOT SUPPORT:
// 78.90
// 3.90
// 3:90
// 78:90


//turns querSelectorAll from array like into array --> Note found inConsole.js
function toArray (protoList) {
	return Array.prototype.slice.call(protoList, 0)
}

//selects all rows --> Note found inConsole.js
var elList = toArray(document.querySelectorAll(".coursera-admin-item.row-fluid"))

//finds videos based on icon element --> Note found inConsole.js
function findVideo (element) {
	return element.querySelector("div div span[class=icon-film]") != null
}

//div div div input[type=text placeholder="lecture title" value="SOME TEXT"] 

toArray(elList.filter(findVideo)).forEach(function (i) {
	var regEx = /[\(\[]([0-9]?[0-9]|[0-9])[:.][0-9][0-9][\)\]]/g
	var element = i.querySelector("div div div input[class=coursera-admin-item-title-input]")
	var Newvalue = element.getAttribute("value").replace(regEx, "")
	element.setAttribute("value", Newvalue)
	console.log(parent.$,parent.jQuery)
	$(element).trigger('blur')
	element.blur()
})

//elList.querySelectorAll("div div div input[class=coursera-admin-item-title-input]")





























