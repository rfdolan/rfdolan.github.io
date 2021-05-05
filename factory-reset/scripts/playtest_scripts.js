function consent() {
    // Get the checkbox
  var checkBox = document.getElementById("consentCheck");
  // Get the output text
  var consent = document.getElementById("consentLink");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    consent.style.display = "block";
    window.scrollTo(0,document.body.scrollHeight);
  } else {
    consent.style.display = "none";
  }
}