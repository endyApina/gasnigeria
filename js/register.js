const submitBtn = document.getElementById("create_account_btn")
const emailInput = document.getElementById("emailInput")

let timeout;

let password = document.getElementById('passwordInput')
let strengthBadge = document.getElementById('password_check_error')

let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function StrengthChecker(PasswordParameter){
  // We then change the badge's color and text based on the password strength
  if(strongPassword.test(PasswordParameter)) {
      strengthBadge.style.backgroundColor = "green"
      strengthBadge.textContent = 'strong password'
  } else if(mediumPassword.test(PasswordParameter)){
      strengthBadge.style.backgroundColor = 'blue'
      strengthBadge.textContent = 'medium strength for your password'
  } else{
      strengthBadge.style.backgroundColor = 'red'
      var errorString = "your password is too weak"
      if (PasswordParameter.length < 8) {
        errorString = errorString + "</br>password must be more that 6 characters"
      }
      var matchesNumber = PasswordParameter.match(/\d+/g);
      if (matchesNumber == null) {
          errorString = errorString + "</br>password must contain at least 1 number"
      }
      var specialCharcter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (!specialCharcter.test(PasswordParameter)) {
        errorString = errorString + "</br>password must contain at least 1 special character"
      }
      strengthBadge.innerHTML = errorString
  }
}

function ValidateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(inputText.match(mailformat)) {
    // alert("Valid email address!");
    // document.form1.text1.focus();
    return true;
  } else {
    // alert("You have entered an invalid email address!");
    // document.form1.text1.focus();
    return false;
  }
}

// $('#password_error_text').text("")
submitBtn.addEventListener("click", function(e) {
    e.preventDefault()
    // console.log("clicked")
    $('#create_account_btn').html(configLoader)
    $('#create_account_btn').prop("disabled", true)

    const firstName = document.getElementById("firstNameInput").value;
    const lastName = document.getElementById("lastNameInput").value; 
    const email = document.getElementById("emailInput").value; 
    const phone = document.getElementById("phoneNumber").value; 
    const password = document.getElementById("passwordInput").value; 
    const rPassword = document.getElementById("rPasswordInput").value;
    const constCheckBox = document.getElementById("consentCheckbox").value; 
    const privacyBox = document.getElementById("privacy_policy_checkbox").value;

    var validity = ValidateEmail(emailInput.value)
    if (!validity) {
      $('#emailInput').focus();
      $('#email_error_text').text("You have entered an invalid email address!")
      $('#create_account_btn').html("CREATE ACCOUNT")
      $('#create_account_btn').prop("disabled", false)
      return 
    } 

    if(!strongPassword.test(password)) {
      $('#create_account_btn').html("CREATE ACCOUNT")
      $('#create_account_btn').prop("disabled", false)
      return 
    } 

    if (!$('#consentCheckbox').is(':checked') || !$('#privacy_policy_checkbox').is(':checked')) {
      alert("kindly check consent box and privacy policy before proceeding")
      $('#consent_policy_checkbox').text("kindly check consent box and privacy policy before proceeding")
      $('#create_account_btn').html("CREATE ACCOUNT")
      $('#create_account_btn').prop("disabled", false)
      return 
    }

    if (password !== rPassword) {
      $('#password_error_text').text(" *passwords do not match")
      $('#create_account_btn').html("CREATE ACCOUNT")
      $('#create_account_btn').prop("disabled", false)
      return 
    }

    if (!firstName || !lastName || !email || !phone || !password) {
        document.getElementById("error_text").textContent = "kindly fill all details"
        alert("kindly fill all registration details")
        $('#create_account_btn').html("CREATE ACCOUNT")
        $('#create_account_btn').prop("disabled", false)
        return 
    }

    const data = {
        "full_name": firstName + " " + lastName, 
        "email": email,
        "password": password,  
        "phone_number": phone, 
        "user_type": regular_user_role_code,
    }

    console.log("completed")
    
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': "",
    //     },
    //     body: JSON.stringify(data)
    // };
    // fetch(REG_API, options).then(
    // res => res.json()).then(
    //     data => {
    //         handleSubmitSuccess(data)
    // });
})

const handleSubmitSuccess = (data) => {
    console.log(data)
    if (data.code != 200) {
      $('#error_text').text(data.message)
      $('#create_account_btn').html("CREATE ACCOUNT")
      $('#create_account_btn').prop("disabled", false)

      if (data.message == "Email Already exists") {
        alert("Email already exists")
        $('#create_account_btn').html("CREATE ACCOUNT")
        $('#create_account_btn').prop("disabled", false)
        location.href = "login.html"
      }
    } 
  
    if (data.code == 200 && data.message == "Success") {
      $('#error_text').text("Registration Successful. Kindly check email for further instructions")
      alert("Registration Successful. Kindly check email for further instructions")
      $('#create_account_btn').html("CREATE ACCOUNT")
      $('#create_account_btn').prop("disabled", false)
      setTimeout(() => {
        location.href = 'login.html'
      }, 1000);
    }
}

$('#consentCheckbox').on('change', function() {
  if ($(this).is(':checked')) {
    $(this).attr('value', 'true')
  } else {
    console.log(false)
    $(this).attr('value', 'false')
  }
})

$('#privacy_policy_checkbox').on('change', function() {
  if ($(this).is(':checked')) {
    $(this).attr('value', 'true')
  } else {
    $(this).attr('value', 'false')
  }
})

password.addEventListener("input", () => {

  //The badge is hidden by default, so we show it

  strengthBadge.style.display= 'block'
  clearTimeout(timeout);

  //We then call the StrengChecker function as a callback then pass the typed password to it

  timeout = setTimeout(() => StrengthChecker(password.value), 500);
  // console.log(password.value)

  //Incase a user clears the text, the badge is hidden again

  if(password.value.length !== 0){
      strengthBadge.style.display != 'block'

  } else{
      strengthBadge.style.display = 'none'
  }
});

emailInput.addEventListener("input", () => {
  var validity = ValidateEmail(emailInput.value)
  setTimeout(() => {
    if (!validity) {
      $('#email_error_text').text("You have entered an invalid email address!")
    } else {
      $('#email_error_text').text("")
    }
  }, 3000);
})