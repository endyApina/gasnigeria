const current_location = window.location.href
document.getElementById("new_password_div").style.display = "none"

const splitted = current_location.split("?email=")
var splitedEmail = splitted[1]
var splitEmail, defaultEmail, defaultOTP;
if (splitedEmail) {
    splitEmail = splitedEmail.split("?otp=")
    defaultEmail = splitEmail[0]
    defaultOTP = splitEmail[1]
}

if (defaultEmail != "" && defaultOTP != "" && defaultEmail != undefined && defaultOTP != undefined) {
    // console.log("visible")
    document.getElementById("new_password_div").style.display = "block"
    document.getElementById("email_div").style.display = "none"
}

$(document).on('click', 'button#new_password_btn', function(e) {
    e.preventDefault()

    $(this).html(configLoader)
    $(this).prop("disabled", true)

    var password = $('#login_password').val()
    var rPassword = $('#repeat_password').val()

    if (password != rPassword) {
        alert("the two passwords do not match")
        $("#repeat_password").focus()
        $('#rpassword_error').text("passwords do not much")
        return 
    }

    if (defaultEmail == "" || defaultEmail == undefined) {
        alert("empty email address")
        return 
    }

    const data = {
        "email": defaultEmail,
        "password": password
    }

    $.ajax({
    type: "POST",
    data: JSON.stringify(data),
    url: CHANGE_PASSWORD,
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Accept', 'application/json')
    },
    success: function(data) {
        const {code, body, message} = data
        console.log(data)

        if (code == 200) {
            alert("password changed successfully. login to continue")
            location.href = "login.html"
        } else {
            alert(message)
            location.reload()
        }
    },
    error: function(xhr, status) {
        alert("error sending reset password email")
        setTimeout(() => {    
            $('#new_password_btn').prop("disabled", false)
            $('#new_password_btn').html("SUBMIT NEW PASSWORD")
        }, 2000);
    },
    processData: false
    }); 
})


$('#reset_btn').click(function(e) {
    e.preventDefault()

    $(this).html(configLoader)
    $(this).prop("disabled", true)

    const email = $('#reset_email').val().toLowerCase()

    if (email == "" ) {
        alert("Enter email address please") 
        $(this).prop("disabled", false)
        $(this).html("SUBMIT EMAIL")
        return 
    }

    // const data = {
    //     "email": email,
    // }

    $.ajax({
    type: "GET",
    url: RESET_PASSWORD + email,
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Accept', 'application/json')
    },
    success: function(data) {
        const {code, body, message} = data
        console.log(data)

        if (code == 200) {
            alert("check email for further instructions")
            location.href = "login.html"
        } else {
            alert(message)
            location.reload()
        }
    },
    error: function(xhr, status) {
        alert("error changing password. contact support")
        setTimeout(() => {    
            $('#reset_btn').prop("disabled", false)
            $('#reset_btn').html("SIGN IN")
        }, 2000);
    },
    processData: false
    }); 

})

const resetEmailInput = document.getElementById("reset_email")
resetEmailInput.addEventListener("input", () => {
    var validity = ValidateEmail(resetEmailInput.value)
    setTimeout(() => {
        if (!validity) {
            $('#reset_email_error_text').text("You have entered an invalid email address!")
          } else {
            $('#reset_email_error_text').text("")
          }
    }, 1000);
})

const strengthBadge = document.getElementById('password_check_error')
const loginPassword = document.getElementById("login_password")
let timeout;
loginPassword.addEventListener("input", () => {
    //The badge is hidden by default, so we show it

  strengthBadge.style.display= 'block'
  clearTimeout(timeout);

  //We then call the StrengChecker function as a callback then pass the typed password to it

  timeout = setTimeout(() => StrengthChecker(loginPassword.value), 500);
  // console.log(password.value)

  //Incase a user clears the text, the badge is hidden again

  if(loginPassword.value.length !== 0){
      strengthBadge.style.display != 'block'

  } else{
      strengthBadge.style.display = 'none'
  }
})