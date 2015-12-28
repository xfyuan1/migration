function createModules() {
  var length = $('.coursera-admin-section-title-input').length;
  if (length > 10) length = 10;
  for (var i=0; i<length; i++){
      $('.coursera-admin-create-section').click().delay(500);
      console.log(i);
  }
}

createModules();