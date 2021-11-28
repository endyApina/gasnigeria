var savedUserData = JSON.parse(localStorage.getItem(localUserData))
if (savedUserData) {
    const {user_data} = savedUserData
    $('#account_full_name').val(user_data.full_name)
    $('#account_email').val(user_data.email)
    $('#account_street').val(user_data.street)
    $('#account_city').val(user_data.city)
    $('#account_state').val(user_data.state)
}

const getUserOrders = () => {
    if (!JSON.parse(localStorage.getItem('user_data'))) {
        location.href = "login.html"
    }
    $('#account_username').text(savedUserData.user_data.full_name)
    const token = savedUserData.token_string 
    // console.log(token)

    $.ajax({
        type: "GET",
        // data: JSON.stringify(data),
        url: GAS_ORDER_HISTORY_API,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.setRequestHeader('Accept', 'application/json')
            xhr.setRequestHeader('Authorization', token)
        },
        success: function(data) {
            const body = data.body 
            const code = data.code 
            if (code == 200) {
                handleSuccess(body)
            }
        },
        error: function(xhr, status) {
            console.log(xhr)
            console.log(status)
        },
        processData: false
    });
}

getUserOrders()

const handleSuccess = (orderArray) => {
    if (Array.isArray(orderArray)) {
        var counter = 0;
        window.localStorage.setItem(localUserOrders, JSON.stringify(orderArray))
        orderArray.forEach(order => {
            const productID = order.order.product_id
            var cancelOrder = `<a href="javascript:;" id="cancel-order" title="Quick View" data-toggle="modal" data-target="#quick_view_modal" data-product-id="${productID}">Cancel Order</a>`
            var viewOrder = `<a href="javascript:;">View</a>`
            var cancelledOrder = `<a href="javascript:;">Order Cancelled</a>`
            var confirmOrder = `<a href="javascript:;" id="complete_order" data-product-id="${productID}">Complete Order</a>`
            counter++

            var action = ``
            var status = order.order.order_status

            switch (status) {
                case pending_status:
                    action = cancelOrder
                    break;
                case accepted_status: 
                    action = confirmOrder
                    break;
                case confirmed_status:
                    action = viewOrder
                    break;
                case cancelled_status: 
                    action = cancelledOrder
                    break;
                default:
                    break;
            }

            var orderRow = `
            <tr>
                <td>${counter}</td>
                <td>${order.order.product}</td>
                <td>${order.order.order_status}</td>
                <td>&#8358;${order.order.order_amount}</td>
                <td>${action}</td>
            </tr>
            `

            $("#orderTable").append(orderRow)
        });
    }
}

$(document).on('click', 'a#cancel-order', function() {
    var productID = $(this).data("product-id")
    var thisUserOrders = JSON.parse(window.localStorage.getItem(localUserOrders))
    if (Array.isArray(thisUserOrders)) {
        thisUserOrders.forEach(userOrder => {
            var thisProductID = userOrder.order.product_id
            if (thisProductID == productID) {
                const {order} = userOrder
                const {product, order_amount} = order
                localStorage.setItem(localSeclectedOrder, JSON.stringify(order))
                $('#modal_product_name').text(product)
                $('#modal_order_price').html('&#8358;'+order_amount)
            }
        });
    }
})

$("#logout_btn").click(function() {
    localStorage.removeItem("user_data")
    location.href="login.html"
})

$('#logout_username').click(function() {
    localStorage.removeItem("user_data")
    location.href="login.html"
})

$("#cancel_gas_order").click(function() {
    $(this).html(configLoader)
    $(this).prop("disabled", true)

    var gasOrder = JSON.parse(localStorage.getItem(localSeclectedOrder))

    var data = {
        "order_uid": gasOrder.product_order_id, 
        "user_id": gasOrder.uuid, 
        "remarks": $('textarea#cancel_remarks').val()
    }
    $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        url: CANCEL_PRODUCT_ORDER,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.setRequestHeader('Accept', 'application/json')
        },
        success: function(data) {
            console.log(data);
            const {code, body, message} = data 

            if (code == 200) {
                alert("order cancelled")
                setTimeout(() => {
                    $(this).prop("disabled", false)
                    $(this).html("CANCEL ORDER")
                    location.reload()
                }, 2000);
            } else {
                $(this).prop("disabled", false)
                $(this).html("CANCEL ORDER")
            }

        },
        error: function(xhr, status) {
            alert("order cancel error. contact support")
            setTimeout(() => {    
                $(this).prop("disabled", false)
                $(this).html("CANCEL ORDER")
            }, 2000);
        },
        processData: false
    }); 
    

    setTimeout(() => {
        $(this).prop("disabled", false)
        $(this).html("CANCEL ORDER")
    }, 3000);
})

var {user_data, gas_station, token_string, user_role} = savedUserData
console.log(user_data)

$('#save_profile').click(function(e) {
    $(this).html(configLoader)
    $(this).prop("disabled", true)

    e.preventDefault()

    var fullName = $('#account_full_name').val()
    var email = $('#account_email').val()
    var street = $('#account_street').val()
    var city = $('#account_city').val()
    var state = $('#account_state').val()

    if (fullName == "" || email == "" || street == "" || city == "" || state == "") {
        alert("Fill all details")
        $(this).prop("disabled", false)
        $(this).html("SIGN IN")
        return 
    }

    var data = {
        "full_name": fullName, 
        "email": email, 
        "street": street, 
        "city": city, 
        "state": state
    }

    $.ajax({
        type: "PUT",
        data: JSON.stringify(data),
        url: UPDATE_PROFILE + user_data.uuid,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.setRequestHeader('Accept', 'application/json')
        },
        success: function(data) {
            const {code, body, message} = data
            console.log(body)
            if (code == 200) {
                setTimeout(() => {    
                    $('#save_profile').prop("disabled", false)
                    $('#save_profile').html("SIGN IN")
                }, 2000);
                // const {user_data,}
                var data = {
                    user_data: body, 
                    gas_station, 
                    token_string, 
                    user_role
                }
                localStorage.setItem(localUserData, JSON.stringify(data))
                location.reload()
            }
        },
        error: function(xhr, status) {
            alert("error updating user profile. contact support")
            setTimeout(() => {    
                $('#sign_in_btn').prop("disabled", false)
                $('#sign_in_btn').html("SIGN IN")
            }, 2000);
        },
        processData: false
    }); 
})