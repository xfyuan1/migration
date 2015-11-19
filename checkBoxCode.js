//turns querSelectorAll from array like into array
//Make sure no lecture videos are checked
      function toArray (protoList) {
        return Array.prototype.slice.call(protoList, 0)
      }

      //finds videos based on icon element
      function findVideo (element) {
        return element.querySelector("div div span[class=icon-film]") != null
      }

      //finds quizes based on icon element
      function findQuiz (element) {
        return element.querySelector("div div span[class=icon-tasks]") != null
      }

      //selects all not videos or quiz elements
      function notVideoOrQuiz (element) {
        return !(findVideo(element) || findQuiz(element))
      }

      //selects all rows
      var elList = toArray(document.querySelectorAll(".coursera-admin-item.row-fluid"))

      //filters out videos && quizes
      toArray(elList.filter(notVideoOrQuiz)).forEach(function (i) {
        i.querySelector("div div div span[class=icon-check]").click()
      })