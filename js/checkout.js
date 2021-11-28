const getPriceInt = (price) => {
    var newPrice = price.replace(/,/g, '');
    var intPrice = parseInt(newPrice)

    return intPrice
}

const orderArray = JSON.parse(localStorage.getItem(localCartData))
var totalCartOrder = 0;
var grandTotal = 0;

appDeliveryFee = 0
// var selectDelivery = document.getElementById("delivery_type")
$('select#delivery_type').on('change', function() {
    // alert( this.value );
    var deliveryType = this.value
    switch (deliveryType) {
        case "express":
            appDeliveryFee = expressDelivery
            break;
        case "regular": 
            appDeliveryFee = regularDelivery
            break; 
        case "nextday": 
            appDeliveryFee = nextDayDelivery
            break; 
        default:
            break;
    }
    console.log(appDeliveryFee)
    $('#delivery_fee_text').html("&#8358;" + appDeliveryFee)
    var oldTotalInt = parseInt($('#grand_total').text())
    var newTotal = appDeliveryFee + oldTotalInt
    $("#grand_total").text(newTotal)
    $('#shipping_type').text("(" + deliveryType + ")")
});

const getUserOrder = () => {
    // const gasPrice = userGasType[order.gas_type].price
    // const intFee = getPriceInt(gasPrice)

    const deliveryFee = appDeliveryFee

    // const orderQuantity = order.quantity 
    // if (!orderQuantity) {
    //     console.log(order)
    //     // location.href = "index.html#cylinder_section"
    // }
    // const orderQuantityPrice = intFee * parseInt(orderQuantity)
    // const grandTotal = orderQuantityPrice + deliveryFee 
    
    if (Array.isArray(orderArray)) {
        orderArray.forEach(elem => {
            var {product_data, quantity} = elem
            var {weight, price, product_id, gas_image, product} = product_data
           
            var thisOrder = quantity * convertPriceStringtoInt(price)
            totalCartOrder = totalCartOrder + thisOrder
        });
    }

    grandTotal = totalCartOrder + deliveryFee 

    if (orderArray) {
        var row = `
        <tr>
            <td>Cart Subtotal</td>
            <td>&#8358;${totalCartOrder}</td>
        </tr>
        <tr>
            <td>Shipping <span style="font-weight: bold;" id="shipping_type"></span></td>
            <td id="delivery_fee_text">&#8358;${appDeliveryFee}</td>
        </tr>
        <tr>
            <td><strong>Order Total</strong></td>
            <td><strong>&#8358;<span id="grand_total">${grandTotal}</span></strong></td>
        </tr>
        `
        $('#order_content_body').append(row);
    }
}

getUserOrder()

const savedUserData = JSON.parse(localStorage.getItem('user_data'))
if (!savedUserData) {
    location.href = "login.html"
}

if (savedUserData) {
    const userData = savedUserData.user_data
    const {full_name, email, phone_number, street, city, state} = userData
    // const fullName = userData.full_name
    // const email = userData.email 
    // const phone = userData.phone_number

    $('#fullName').val(full_name)
    $('#emailAddress').val(email)
    $('#phone_number').val(phone_number)
    $('#streetInput').val(street)
    $('#cityInput').val(city)
    $('#stateInput').val(state)
}


function payWithPaystack(data) {
    if (grandTotal == 0) {
        alert("product order failed. contact support")
        return 
    }
    let handler = PaystackPop.setup({
      key: 'pk_test_d7c57db1a48201feb340f98fd934b1033d621989', // Replace with your public key
      email: "apinaendy@gmail.com",
      amount: grandTotal+"00",
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        // alert('Window closed.');
        handleCancelledPaystack()
      },
      callback: function(response){
        // let message = 'Payment complete! Reference: ' + response.reference;
        // alert(message);
        handleSubmit(data)
      }
    });
    handler.openIframe();
}

document.getElementById("place_gas_order").addEventListener("click", function(e) {
    e.preventDefault() 

    $('#place_gas_order').html(configLoader)
    $('#place_gas_order').prop("disabled", true)

    const userData = savedUserData.user_data
    const fullName = userData.full_name
    const email = userData.email 

    if (userData == "" || fullName == "" || email == "") {
        alert("enter user data")
        $('#place_gas_order').prop("disabled", false)
        $('#place_gas_order').html("PLACE ORDER")
        return 
    }

    const street = $('#streetInput').val()
    const city = $('#cityInput').val()
    const state = $('#stateInput').val()

    const address = street + " " + city +  " " + state
    // const orderQuantity = order.quantity
    const deliveryInstructions = $('textarea#delivery_instructions').val()
    const deliveryType = $('#delivery_type').val()
    // const orderSize = userGasType[order.gas_type].weight
    const cash = $('#cash_delivery').attr('aria-expanded')
    const paystack = $('#paystack_delivery').attr('aria-expanded')

    if (street == "" || city == "" || state == "") {
        alert("enter billing address")
        $('#place_gas_order').prop("disabled", false)
        $('#place_gas_order').html("PLACE ORDER")
        return 
    }

    if (deliveryType == "") {
        alert("please select delivery time")
        $('#place_gas_order').prop("disabled", false)
        $('#place_gas_order').html("PLACE ORDER")
        return 
    }

    var paymentMode = "";
    if (cash == "true") {
        paymentMode = "cash on delivery"
    } 

    if (paystack == "true") {
        paymentMode = "Online Payment"
    }

    var structureOrderArray = []

    if (Array.isArray(orderArray)) {
        orderArray.forEach(element => {
            const {product_data, quantity} = element
            const {weight, price, product_id, gas_image, product} = product_data

            var eachOrder = {
                "address": address,
                "delivery_instructions": deliveryInstructions,
                "delivery_type": deliveryType,
                "order_quantity": quantity,
                "order_amount": price.toString(),
                "user_full_name": fullName, 
                "user_email": email, 
                "user_id": userData.id, 
                "uuid": userData.uuid,
                "weight": weight,
                "payment_type": paymentMode, 
                "product": product, 
                "product_id": product_id, 
                "gas_image": gas_image, 
            }

            structureOrderArray.push(eachOrder)
        });
    }

    if (address == "" || deliveryType == "") {
        alert("kindly fill all order details") 
        $('#place_gas_order').prop("disabled", false)
        $('#place_gas_order').html("PLACE ORDER")
        return 
    }

    if (paymentMode == "") {
        alert("kindly select payment type") 
        $('#place_gas_order').prop("disabled", false)
        $('#place_gas_order').html("PLACE ORDER")
        return 
    }

    // console.log(structureOrderArray)
    if (paystack == "true") {
        payWithPaystack(structureOrderArray)
        return 
    }
    handleSubmit(structureOrderArray)
})

const handleSubmit = (data) => {
    // console.log(data)
    $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        url: PLACE_ORDER_GAS_API,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.setRequestHeader('Accept', 'application/json')
        },
        success: function(data) {
            console.log(data)
            const code = data.code 
            const body = data.body 

            if (code == 200) {
                orderSuccess()
                $('#place_gas_order').prop("disabled", false)
                $('#place_gas_order').html("PLACE ORDER")
            } else {
                $('#place_gas_order').prop("disabled", false)
                $('#place_gas_order').html("PLACE ORDER")
                orderFailed()
            }
        },
        error: function(xhr, status) {
            console.log(xhr)
            console.log(status)
            orderFailed()
        },
        processData: false
    });
}

const handleCancelledPaystack = () => {
    $('#place_gas_order').prop("disabled", false)
    $('#place_gas_order').html("PLACE ORDER")
}

const orderSuccess = () => {
    alert("order recieved")
    localStorage.removeItem(localCartData)
    location.href = "account.html"
}

const orderFailed = () => {
    alert("order failed")
    // location.reload()
}