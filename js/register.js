const submitBtn = document.getElementById("create_account_btn")
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

    if (!firstName || !lastName || !email || !phone || !password) {
        document.getElementById("error_text").textContent = "kindly fill all details"
        alert("kindly fill all registration details")
        $('#create_account_btn').html(configLoader)
        $('#create_account_btn').prop("disabled", true)
        return 
    }

    const data = {
        "full_name": firstName + " " + lastName, 
        "email": email,
        "password": password,  
        "phone_number": phone, 
        "user_type": regular_user_role_code,
    }
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "",
        },
        body: JSON.stringify(data)
    };
    fetch(REG_API, options).then(
    res => res.json()).then(
        data => {
            handleSubmitSuccess(data)
            console.log(data)
    });
})

const handleSubmitSuccess = (data) => {
    console.log(data)
    if (data.code != 200) {
      $('#error_text').text(data.message)
      $('#create_account_btn').html('')
      $('#create_account_btn').prop("disabled", false)

      if (data.message == "Email Already exists") {
        alert("Email already exists")
        location.href = "login.html"
      }
    } 
  
    if (data.code == 200 && data.message == "Success") {
      $('#error_text').text("Registration Successful. Kindly check email for further instructions")
      alert("Registration Successful. Kindly check email for further instructions")
      $('#create_account_btn').html(configLoader)
      $('#create_account_btn').prop("disabled", true)
      setTimeout(() => {
        location.href = 'login.html'
      }, 1000);
    }
  }