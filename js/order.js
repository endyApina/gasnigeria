const chooseProductOrder = (type) => {
    console.log("selected")
    console.log(type)
}

///CALL API TO GET ALL ORDERS/////
const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "",
    }
};
fetch(GET_PRODUCT_LIST, options).then(
    res => res.json()).then(
        data => {
        var {code, body, message} = data
        handleGasList(body)
    });
///END OF CALL API TO GET ALL ORDERS/////

$('#trigger_cart_modal').click(function() {
    var selectedOrder = $('#gas_select_type').val()
    if (selectedOrder == "") {
        alert("Choose gas order from dropdown")
        return 
    } else {
        console.log(selectedOrder)
        // localStorage.setItem(localSelectedProduct, selectedOrder)
        findProduct(selectedOrder)
        $('#modal_add_gass_tocart_btn').trigger("click")
    }
    return 
})

const handleGasList = list => {
    if (Array.isArray(list)) {
        localStorage.setItem(localProducts, JSON.stringify(list))
        var optionSelect = `
            <select class="nice-select" id="gas_select_type">
                <option value="">Select Gas Weight</option>
        `
        list.forEach(elem => {
            if (elem.category == "gas") {
                // console.log(elem);
                var optionT = `
                <option value="${elem.product_id}">${elem.product} </option>
                `;
                optionSelect = optionSelect + optionT
            }
       });
       var bottomSelect = `
            </select>
       `

       optionSelect = optionSelect + bottomSelect
       $('#test_div').html(optionSelect)

       document.getElementById("test_div").style.display = "block"


       ///HANDLE ASSESORY SECTION
       list.forEach((gas, index) => {
            if (gas.category == "assesory") {
                var lpg = `
                <div class="col-md-4">
                    <div class="ltn__product-item ltn__product-item-3 text-center">
                        <div class="product-img">
                            <a href="javascript:;" class="viewproduct" data-product-id=${gas.product_id} data-toggle="modal" data-target="#quick_view_modal">
                                <img src="${gas.image}" alt="gas lpg image">
                            </a>
                            <div class="product-hover-action">
                                <ul>
                                    <li>
                                        <a href="javacript:;" class="viewproduct" data-product-id=${gas.product_id}  title="Quick View" data-toggle="modal" data-target="#quick_view_modal">
                                            <i class="far fa-eye"></i>
                                        </a>
                                    </li>
                                    <!-- <li>
                                        <a href="#" title="Add to Cart" class="addToCart" data-product-id=${gas.product_id} data-toggle="modal" data-target="#add_to_cart_modal">
                                            <i class="fas fa-shopping-cart"></i>
                                        </a>
                                    </li> -->
                                </ul>
                            </div>
                        </div>
                        <div class="product-info">
                            <h2 class="product-title"><a class="viewproduct" data-product-id=${gas.product_id} data-toggle="modal" data-target="#quick_view_modal" href="javascript:;">${gas.product} </a></h2>
                        </div>
                    </div>
                </div>
                `;
        
                $('#lpg_section').append(lpg)
            }
        })

       ///END OF ASSESORY SECTION

    }
}


var findProduct = (productID) => {
    var gasObject = JSON.parse(localStorage.getItem(localProducts))
    // var selectedGas;
    if (Array.isArray(gasObject)) {
        gasObject.forEach(element => {
            const {product, price, image, product_id} = element
            if (productID == product_id) {
                if (image == "") {
                    var newImage = "gasimg/small.png"
                    $('#product_image_src').attr("src", newImage);
                } else {
                    $('#product_image_src').attr("src", image);
                }
                $('#product_name').text(product)
                $('#product_price').text(price)
                // var a = $('#mydiv').data('myval'); //getter

                $('#modal_addtocart_btn').data('product-id',product_id); //setter
            }
        });
    }
}

var findGasProduct = (productID) => {
    var gasObjectArray = JSON.parse(localStorage.getItem(localProducts))
    var gasObject;
    if (Array.isArray(gasObjectArray)) {
        gasObjectArray.forEach(gas => {
            if (gas.product_id == productID) {
                gasObject = gas
            }
        });
    }


    return {
        gasData: gasObject, 
        error: false
    }
}


$(document).on('click', 'a.viewproduct', function(e) {
    e.preventDefault() 
    var productID = $(this).data("product-id")
    localStorage.setItem(localSelectedProduct, productID)
    findProduct(productID)
})

$(document).on('click', 'a#modal_addtocart_btn', function(e) {
    e.preventDefault() 
    var productID = localStorage.getItem(localSelectedProduct)
    if (productID == "") {
        alert("select a valid product type")
        return
    }
    const {gasData, error} = findGasProduct(productID)
    var orderQuant = $('#order_quantity').val()

    const productOrder = {
        product_data: gasData, 
        quantity: parseInt(orderQuant)
    }

    var cartArrayData = JSON.parse(localStorage.getItem(localCartData))
    // console.log(cartArrayData)
    if (Array.isArray(cartArrayData) && cartArrayData.length != 0) {
        var match = false
        for (let index = 0; index < cartArrayData.length; index++) {
            const data = cartArrayData[index];
            
            var {product_data, quantity} = data
            console.log("comparing " + productID + " and " + product_data.product_id)
            if (productID === product_data.product_id ) {
                // console.log(true)
                match = true
                cartArrayData.splice(index, 1, productOrder)
                localStorage.setItem(localCartData, JSON.stringify(cartArrayData))
                break
            } 
        }
        if (!match) {
            cartArrayData.push(productOrder)
            localStorage.setItem(localCartData, JSON.stringify(cartArrayData))
        }
    } else {
        var cartArray = [];
        cartArray.push(productOrder)
        localStorage.setItem(localCartData, JSON.stringify(cartArray))
    }

    const {product, price, image, product_id} = gasData
    $('#cart_image').attr("src", image)
    $('#cart_product_name').text(product)

    setTimeout(() => {
        console.log(JSON.parse(localStorage.getItem(localCartData)))
    }, 2000);
})

$(document).on('click', 'a#modal_add_gas_tocart_btn', function(e) {
    e.preventDefault() 
    var productID = localStorage.getItem(localSelectedProduct)
    if (productID == "") {
        alert("select a valid product type")
        return
    }
    const {gasData, error} = findGasProduct(productID)
    var orderQuant = $('#order_quantity').val()

    const productOrder = {
        product_data: gasData, 
        quantity: parseInt(orderQuant)
    }

    var cartArrayData = JSON.parse(localStorage.getItem(localCartData))
    if (Array.isArray(cartArrayData) && cartArrayData.length != 0) {
        for (let index = 0; index < cartArrayData.length; index++) {
            const data = cartArrayData[index];
            
            var {product_data, quantity} = data
            if (productID === product_data.product_id ) {
                cartArrayData.splice(index, 1, productOrder)
                localStorage.setItem(localCartData, JSON.stringify(cartArrayData))
                break
            } else {
                cartArrayData.push(productOrder)
                localStorage.setItem(localCartData, JSON.stringify(cartArrayData))
                break
            }
        }
    } else {
        var cartArray = [];
        cartArray.push(productOrder)
        localStorage.setItem(localCartData, JSON.stringify(cartArray))
    }

    const {product, price, gas_image, product_id} = gasData
    $('#cart_image').attr("src", gas_image)
    $('#cart_product_name').text(product)
})

$(document).on('change', 'select#gas_select_type', function() {
    var productID = this.value
    // console.log(productID)
    window.localStorage.setItem(localSelectedProduct, productID)
    var gasObject = JSON.parse(localStorage.getItem(localProducts))
    if (Array.isArray(gasObject)) {
        gasObject.forEach(element => {
            const {product, price, image, product_id} = element
            if (productID == product_id) {
                $('#product_select_price').html('&#8358;' + price)

            }
        });
    }
});