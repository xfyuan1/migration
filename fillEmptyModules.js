
function fillEmptyModules() {
var count = 0;
var sections = $('.coursera-admin-section-title-input');
for (var idx in sections) {
  if (sections[idx].value === "") {
    count += 1;
    sections[idx].value = "MODULE: " + count;
  }
}
}

fillEmptyModules();