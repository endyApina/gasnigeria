const getUserOrders = () => {
    if (!JSON.parse(localStorage.getItem('user_data'))) {
        location.href = "login.html"
    }
    const savedUserData = JSON.parse(localStorage.getItem('user_data'))
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
            counter++

            var action = ``

            var status = order.order.order_status
            if (status == "pending") {
                action = cancelOrder
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