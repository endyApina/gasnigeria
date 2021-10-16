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
            console.log(data)
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
        orderArray.forEach(order => {
            counter++
            var orderRow = `
            <tr>
                <td>${counter}</td>
                <td>${order.order.product}</td>
                <td>${order.order.order_status}</td>
                <td>&#8358;${order.order.order_amount}</td>
            </tr>
            `

            $("#orderTable").append(orderRow)
        });
    }
}

$("#logout_btn").click(function() {
    localStorage.removeItem("user_data")
    location.href="login.html"
})

$('#logout_username').click(function() {
    localStorage.removeItem("user_data")
    location.href="login.html"
})