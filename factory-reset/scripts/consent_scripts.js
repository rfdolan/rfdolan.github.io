function consent() {
    // Get the checkbox
  var checkBox = document.getElementById("consentCheck");
  // Get the output text
  var build = document.getElementById("buildLink");
  var survey = document.getElementById("surveyLink");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    if(survey !== null){
      survey.style.display = "block";
    }
    build.style.display = "block";
    window.scrollTo(0,document.body.scrollHeight);
  } else {
    build.style.display = "none";
    survey.style.display = "none";
  }
}