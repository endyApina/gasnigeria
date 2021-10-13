const getPriceInt = (price) => {
    var newPrice = price.replace(/,/g, '');
    var intPrice = parseInt(newPrice)

    return intPrice
}

const orderArray = JSON.parse(localStorage.getItem(localCartData))
// console.log(order)

const getUserOrder = () => {
    // const gasPrice = userGasType[order.gas_type].price
    // const intFee = getPriceInt(gasPrice)

    const deliveryFee = getPriceInt(appDeliveryFee)

    // const orderQuantity = order.quantity 
    // if (!orderQuantity) {
    //     console.log(order)
    //     // location.href = "index.html#cylinder_section"
    // }
    // const orderQuantityPrice = intFee * parseInt(orderQuantity)
    // const grandTotal = orderQuantityPrice + deliveryFee 
    
    var totalCartOrder = 0;
    if (Array.isArray(orderArray)) {
        orderArray.forEach(elem => {
            var {product_data, quantity} = elem
            var {weight, price, product_id, gas_image, product} = product_data
           
            var thisOrder = quantity * convertPriceStringtoInt(price)
            totalCartOrder = totalCartOrder + thisOrder
        });
    }

    const grandTotal = totalCartOrder + deliveryFee 

    if (orderArray) {
        var row = `
        <tr>
            <td>Cart Subtotal</td>
            <td>&#8358;${totalCartOrder}</td>
        </tr>
        <tr>
            <td>Shipping and Handing</td>
            <td>&#8358;${appDeliveryFee}</td>
        </tr>
        <tr>
            <td><strong>Order Total</strong></td>
            <td><strong>&#8358;${grandTotal}</strong></td>
        </tr>
        `
        $('#order_content_body').append(row);
    }
}

getUserOrder()

const savedUserData = JSON.parse(localStorage.getItem('user_data'))
console.log(savedUserData)
if (!savedUserData) {
    location.href = "login.html"
}

if (savedUserData) {
    const userData = savedUserData.user_data
    const fullName = userData.full_name
    const email = userData.email 
    const phone = userData.phone_number

    $('#fullName').val(fullName)
    $('#emailAddress').val(email)
    $('#phone_number').val(phone)
}


function payWithPaystack(data) {
    let handler = PaystackPop.setup({
      key: 'pk_test_d7c57db1a48201feb340f98fd934b1033d621989', // Replace with your public key
      email: "apinaendy@gmail.com",
      amount: data.order_amount+"00",
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.');
      },
      callback: function(response){
        let message = 'Payment complete! Reference: ' + response.reference;
        alert(message);
        handleSubmit(data)
      }
    });
    handler.openIframe();
  }

document.getElementById("place_gas_order").addEventListener("click", function(e) {
    e.preventDefault() 

    $('#place_gas_order').html(configLoader)
    $('#place_gas_order').prop("disabled", true)

    const gasPrice = userGasType[order.gas_type].price
    const intFee = getPriceInt(gasPrice)

    const deliveryFee = getPriceInt(appDeliveryFee)

    const orderQuantityPrice = intFee * parseInt(order.quantity)
    const grandTotal = orderQuantityPrice + deliveryFee 

    const userData = savedUserData.user_data
    const fullName = userData.full_name
    const email = userData.email 
    const address = $('#streetInput').val() + " " + $('#cityInput').val() +  " " + $('#stateInput').val() 
    const orderQuantity = order.quantity
    const deliveryInstructions = $('textarea#delivery_instructions').val()
    const deliveryType = $('#delivery_type').val()
    const orderSize = userGasType[order.gas_type].weight
    const cash = $('#cash_delivery').attr('aria-expanded')
    const paystack = $('#paystack_delivery').attr('aria-expanded')

    var paymentMode = "";
    if (cash == "true") {
        paymentMode = "cash on delivery"
    } 

    if (paystack == "true") {
        paymentMode = "Online Payment"
    }

    if (orderQuantity == "" || address == "" || deliveryType == "") {
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

    // console.log($(this).find('a[aria-expanded]').attr('aria-expanded'));

    var orderData = {
        "address": address,
        "delivery_instructions": deliveryInstructions,
        "delivery_type": deliveryType,
        "order_quantity": orderQuantity,
        "user_full_name": fullName, 
        "user_email": email, 
        "address": address,
        "user_id": userData.id, 
        "order_size": orderSize,
        "order_amount": grandTotal.toString(), 
        "payment_type": paymentMode
    }

    // console.log(orderData)
    if (paystack == "true") {
        payWithPaystack(orderData)
        return 
    }
    handleSubmit(orderData)
})

const handleSubmit = (data) => {
    $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        url: ORDER_GAS_API,
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
                orderFailed()
                $('#place_gas_order').prop("disabled", false)
                $('#place_gas_order').html("PLACE ORDER")
                location.href = "index.html"
            }
        },
        error: function(xhr, status) {
            console.log(xhr)
            console.log(status)
        },
        processData: false
        });
}

const orderSuccess = () => {
    alert("order recieved")
    location.href = "account.html"
}

const orderFailed = () => {
    alert("order failed")
}