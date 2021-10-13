const current_location = window.location.href

const splitted = current_location.split('code=')
var verification_code = splitted[1]

const userData = JSON.parse(localStorage.getItem('user_data'))

if (verification_code == undefined || verification_code == "") {
  if (userData) {
    console.log(userData)
  }
}

const showEmail = `
<form action="#" class="ltn__form-box contact-form-box">
    <input type="text" name="email" id="input_email" placeholder="Email*">
    <div class="btn-wrapper mt-0">
        <button class="theme-btn-1 btn btn-block" id="resend_btn" type="submit"> Resend Lnk </button>
    </div>
</form>
`;

const showOTP = `
<form action="#" class="ltn__form-box contact-form-box">
    <input type="text" name="email" id="input_otp" placeholder="OTP">
    <div class="btn-wrapper mt-0">
        <button class="theme-btn-1 btn btn-block" id="submit_otp" type="submit"> SUBMIT OTP </button>
    </div>
</form>
`;

const getVerificationCode = () => {
  if (verification_code == undefined || verification_code == "" ) {
        $('#progress_bard').html(" ")
        $('#form_area').html(showEmail)
  } else {
  }
}

getVerificationCode()

$('#submit-otp-button').click(function(e) {
  e.preventDefault()
  const code = $('#input_otp').val()
  const userData = JSON.parse(localStorage.getItem('user_data'))
  const tokenString = userData.token_string 

  const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': tokenString,
		},
	};
	fetch(OTP_VERIFICATION + code, options).then(
    res => res.json()).then(
      data => {
		  console.log(data)
      if (data.code == 400) {
        console.log("400")
        $('.otp_failure').removeClass('hide')
        $('#otp_failure_text').text(data.message)
      } 

      if (data.code == 200) {
        localStorage.setItem('user_data', JSON.parse(data.body))
        location.href = "./store/"
      }
	});

})

const handleSuccessfulVerification = (responseBody) => {
  $('.spinner').hide()

  localStorage.setItem('user_data', JSON.stringify(responseBody))
  location.href = "./account.html"
}

if (verification_code) {
  const splitEmail = verification_code.split('?email=')
  if (splitEmail == "" || splitEmail == undefined) {
    console.log("undefined")
  }
  verification_code = splitEmail[0]
  let email = splitEmail[1]

  var data = {
    "email": email, 
    "verification_link": verification_code
  }
  // console.log(data)
  const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': "",
		},
    body: JSON.stringify(data),
	};
	fetch(OTP_VERIFICATION_LINK, options).then(
    res => res.json()).then(
      data => {
        if (data.code == 200) {
          handleSuccessfulVerification(data.body)
        } else {
          console.log(data)
          alert("verification error")
          console.log("verification error")
        }
	});
} else {
  if (userData == null || userData == "") {
    location.href = "./"
  } 
}


$('#enter_otp').click(function(e) {
  e.preventDefault() 
  $('.forget-form').hide()
  $('.otp-form').show()
})

const handleOTPValidation = (data) => {
  console.log("handling validation")
  const responseCode = data.code 
  if (responseCode == 200) {
    $('#input_email').addClass('hide')
    $('#success_text').removeClass('hide')
    $('#success_text').text("check mail for instructions!")
    $('#back-button').removeClass('hide')
    $('#submit-button-otp').addClass('hide')

    swal({
      title: "Mail Sent", 
      text: "Verification mail sent", 
      type: "success",
      showCancelButton: false, 
      confirmButtonClass: "btn-success", 
      confirmButtonText: "OK", 
      cancelButtonText: "Cancel",
      closeOnConfirm: true, 
      closeOnCancel: true
    }, function(isConfirm) {
      if (isConfirm) {
        location.href = "./"
      }
    });
  }
}

$('#submit-button-otp').click(function(e) {
  e.preventDefault()
  console.log("submitting")

  const email = $('#email').val().toLowerCase()
  if (email == "") {
    alert("kindly enter email")
  }

  const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': "",
		}
	};
	fetch(OTP_RESEND + email, options).then(
    res => res.json()).then(
      data => {
		  handleOTPValidation(data)
	});
})

$('#back-button').click(function(e) {
  e.preventDefault()
  location.href = "./"
})