$('#sign_in_btn').click(function(e) {
    e.preventDefault()

    $(this).html(configLoader)
    $(this).prop("disabled", true)

    const email = $('#login_email').val().toLowerCase()
    const password = $('#login_password').val()

    if (email == "" || password == "") {
        alert("Enter email and password") 
        $(this).prop("disabled", false)
        $(this).html("SIGN IN")
        return 
    }

    const data = {
        "email": email,
        "password": password, 
    }

    $.ajax({
    type: "POST",
    data: JSON.stringify(data),
    url: LOGIN_API,
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Accept', 'application/json')
    },
    success: function(data) {
        handleLogin(data)
    },
    error: function(xhr, status) {
        alert("login error. contact support")
        setTimeout(() => {    
            $('#sign_in_btn').prop("disabled", false)
            $('#sign_in_btn').html("SIGN IN")
        }, 2000);
    },
    processData: false
    }); 

})

const handleLogin = (data) => {
    console.log(data)
    if (data.code != 200) {
        console.log("error")
        $('#sign_in_btn').prop("disabled", false)
        $('#sign_in_btn').html("SIGN IN")

        if (data.message == 'user does not exist') {
            alert("user does not exist. please create an account")
            $('#error_section').html(`<p style="background-color: #ffdb78;" id="error_text">user does not exist. please create an account</p>`)
        }

        if (data.message == 'unverified user') {
            alert("check email for verification link")
            $('#error_section').html(`<p style="background-color: #ffdb78;" id="error_text">Email Address not verified. Check mailbox for verification link. (Check Spam.)</p>`)
        }

        if (data.message == 'invalid login credentials') {
            alert("invalid login credentials")
            $('#error_section').html(`<p style="background-color: #ffdb78;" id="error_text">Invalid login credentials. Check email and password</p>`)
        }

        setTimeout(() => {
           $('#sign_in_btn').prop("disabled", false)
           $('#sign_in_btn').html("SIGN IN")
        }, 2000);
    }
  
    if (data.code == 200 && data.message == "Success") {
      localStorage.setItem(localUserData, JSON.stringify(data.body))

      const userOrderData = JSON.parse(localStorage.getItem(localCartData))
      console.log(userOrderData); 
  
      if (userOrderData) {
        $('#sign_in_btn').prop("disabled", false)
        $('#sign_in_btn').html("SIGN IN")
        location.href = "cart.html"
      } else {
        $('#sign_in_btn').prop("disabled", false)
        $('#sign_in_btn').html("SIGN IN")
        location.href="index.html"
      }
    }
  }