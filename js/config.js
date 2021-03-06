const admin_role_code = "5555"
const admin_role = "admin"

const appName = "GAS TO GO"
$('#app_name').text(appName)

const expressDelivery = 1000
const regularDelivery = 500
const nextDayDelivery = 300


//ORDER STATUS 
const pending_status="pending"
const accepted_status="accepted"
const confirmed_status="confirmed"
const cancelled_status="cancelled"
const rejected_status="rejected"

const super_admin_role_code="6666"
const super_admin_role="superadmin"

const regular_user_role_code="2222"
const regular_user_role="customer"

const BASE_URL = "https://www.gasnigeriaapi.com:8002/"
// const BASE_URL = "http://localhost:8002/"

const REG_API = BASE_URL + "auth/registration"
const LOGIN_API = BASE_URL + "auth/login"
const RESET_PASSWORD = BASE_URL + "auth/forgotpassword/"
const CHANGE_PASSWORD = BASE_URL + "auth/changepassword"
const OTP_RESEND = BASE_URL + "otp/remail/"
const OTP_VERIFICATION = BASE_URL + "otp/verification/"
const OTP_VERIFICATION_LINK = BASE_URL + "otp/verification/link"
const GET_ALL_ORDERS_API = BASE_URL + 'admin/orders/'
const ACCEPT_GAS_ORDER = BASE_URL + 'admin/orders/accept'
const REJECT_GAS_ORDER = BASE_URL + 'admin/orders/reject'
const GET_CUSTOMER_PROFILE = BASE_URL + 'admin/customer/'
const ORDER_GAS_API = BASE_URL + 'user/ordergas/'
const PLACE_ORDER_GAS_API = BASE_URL + 'user/productorder/order'
const CANCEL_PRODUCT_ORDER = BASE_URL + 'user/productorder/cancel'
const BULK_GAS_ORDER = BASE_URL + 'user/ordergas/bulk'
const GAS_ORDER_HISTORY_API = BASE_URL + 'gasorders/'
const GET_PRODUCT_LIST = BASE_URL + 'superuser/products/'
const UPDATE_PROFILE = BASE_URL + 'auth/profile/'
const GET_GAS_BASE_WEIGHT = BASE_URL + 'superuser/settings/'
const GET_BASE_PRICE = BASE_URL + 'superuser/settings/'

//localstorage values
const local_gas_settings = "local_gas_setting"


const apiHeaders = (xhr, token) => {
	return {
		"Authorization": token, 
		"app_source": admin_role
	}
}

const apiOptions = (token) => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
      'App_source': admin_role
    }
  }
}

const storeLogin = async (data) => {
  try {
    const jsonData = JSON.stringify(data)
    await localStorage.setItem(localUserData, jsonData)
  } catch (error) {
    //handle error
  }
}

const getUserData = async () => {
  try {
    const jsonValue = await localStorage.getItem(localUserData)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // console.log(err)
  }
}

document.getElementById("footer_div").innerHTML = footerDiv;
document.getElementById("header_area").innerHTML = headerNav;
document.getElementById("mobile_header_nav").innerHTML = mobileNav;

const configLoader = `

<style>
.progress-bars {
    position: relative;
    width: 50px;
    height: 50px;
    align-items: center;
    margin-left: 11rem;

    @media only screen 
    and (device-width : 375px) 
    and (device-height : 812px)  { 
      margin-left: 11rem;
      width: 25px;
    }

}

.circles {
    height: 100%;
    right: 0px;
    position: absolute;
    border: solid 5px  #a9a9a9;
    border-top-color:  #a9d161;
    border-radius: 50%;
}

.borders {
    width: 100%;
    transform: rotate(135deg);  
    animation: spin 1.3s steps(2) .2s infinite;
    -webkit-animation: spin 1.3s linear infinite;
}


@-webkit-keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>

<div class="progress-bars" id="progress_bard">
  <div class="circles borders">
  </div>
</div>

`

const convertPriceStringtoInt = (price) => {
  var newPrice = price.replace(/,/g, '');
  var intPrice = parseInt(newPrice)

  return intPrice
}


const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function ValidateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(inputText.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

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
      var firstChar = PasswordParameter.charAt(0)
      if (firstChar != firstChar.toUpperCase()) {
        errorString = errorString + "</br>password must begin with a capital letter"
      }
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


document.addEventListener("visibilitychange", function() {
  if (localStorage.getItem(localUserData) != "") {
    if (document.visibilityState === 'visible') {
      setTimeout(() => {
          localStorage.removeItem(localUserData)
          this.location.href = "login.html"
      }, 360000);
    }
  } 
});

function commafy( num ) {
  var str = num.toString().split('.');
  if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}



const getBasePrice = () => {
  const basePriceData = JSON.parse(localStorage.getItem(local_gas_settings))
  if (basePriceData == null || basePriceData == undefined) {
      const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "",
          }
      };
      fetch(GET_BASE_PRICE, options).then(
          res => res.json()).then(
              data => {
              var {code, body, message} = data
              // handleGasList(body)
              console.log(data)
              var gasRespBody = body[0]
              if (gasRespBody != null && gasRespBody != undefined) {
                  localStorage.setItem(local_gas_settings, JSON.stringify(gasRespBody))
                  return gasRespBody
              }
          });
  } else {
      return basePriceData
  }
}
getBasePrice()