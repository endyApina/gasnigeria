$('#submitRequest').click(function(e) {
	e.preventDefault() 

	var fullName = $('#fullName').val() 
	var email = $('#email').val()
	var phone = $('#phoneNumber').val()
	var message = $('textarea#message').val()

	if (fullName == "" || email == "" || phone == "" || message == "") {
		alert("enter all information")
		return
	}

	var data = {
		full_name: fullName, 
		email: email, 
		phone: phone, 
		message: message
	}

	console.log(data)

	$.ajax({
        type: "POST",
        data: JSON.stringify(data),
        url: BULK_GAS_ORDER,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.setRequestHeader('Accept', 'application/json')
        },
        success: function(data) {
            console.log(data)
            const code = data.code 
            const body = data.body 

            if (code == 200) {
                alert("message recieved")
				location.href="shop.html"
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
})