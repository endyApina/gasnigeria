const admin_role_code = "5555"
const admin_role = "admin"

const appName = "GAS TO GO"
$('#app_name').text(appName)

const localViewedProduct = "viewed_product"
const localCartData = "cart_array"
const localProducts = "product"
const localSelectedProduct = "selected_product"

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
const BULK_GAS_ORDER = BASE_URL + 'user/ordergas/bulk'
const GAS_ORDER_HISTORY_API = BASE_URL + 'gasorders/'
const GET_PRODUCT_LIST = BASE_URL + 'superuser/products/'


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
    await localStorage.setItem('user_data', jsonData)
  } catch (error) {
    //handle error
  }
}

const getUserData = async () => {
  try {
    const jsonValue = await localStorage.getItem('user_data')
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