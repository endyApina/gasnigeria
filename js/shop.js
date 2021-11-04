location.href = "order.html"
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

const handleGasList = list => {
    if (Array.isArray(list)) {
        var optionSelect = `
            <select class="nice-select" id="gas_select_type">
        `
        list.forEach(elem => {
            console.log(elem)
            if (elem.category == "gas") {
                var optionT = `
                <option value="${elem.product}">${elem.product} </option>
                `;
        

                optionSelect = optionSelect + optionT
            }
       });
       var bottomSelect = `
            </select>
       `

       optionSelect = optionSelect + bottomSelect
       $('#test_div').html(optionSelect)

    }
}

if (Array.isArray(lpGas)) {
    lpGas.forEach((gas, index) => {
        var lpg = `
        <div class="col-lg-12">
            <div class="ltn__product-item ltn__product-item-3 text-center">
                <div class="product-img">
                    <a href="javascript:;" class="viewproduct" data-product-id=${gas.product_id} data-toggle="modal" data-target="#quick_view_modal">
                        <img src="${gas.gas_image}" alt="gas lpg image">
                    </a>
                    <div class="product-hover-action">
                        <ul>
                            <li>
                                <a href="javacript:;" class="viewproduct" data-product-id=${gas.product_id} id="${index}lpg"  title="Quick View" data-toggle="modal" data-target="#quick_view_modal">
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
                    <h2 class="product-title"><a class="viewproduct" data-product-id=${gas.product_id} data-toggle="modal" data-target="#quick_view_modal" href="javascript:;">${gas.weight} Gas Refil </a></h2>
                </div>
            </div>
        </div>
        `;

        $('#lpg_section').append(lpg)
    })
}

if (Array.isArray(gasCylinder)) {
    gasCylinder.forEach((cylinder, index) => {
        var cyl = `
        <div class="col-lg-12">
            <div class="ltn__product-item ltn__product-item-3 text-center">
                <div class="product-img">
                    <a href="javascript:;" class="viewproduct" data-product-id=${cylinder.product_id} data-toggle="modal" data-target="#quick_view_modal">
                        <img src="${cylinder.gas_image}" alt="gas cylinder image">
                    </a>
                    <div class="product-hover-action">
                        <ul>
                            <li>
                                <a href="#" class="viewproduct" title="Quick View" data-toggle="modal" data-product-id=${cylinder.product_id} id="${index}cyl" data-target="#quick_view_modal">
                                    <i class="far fa-eye"></i>
                                </a>
                            </li>
                            <!-- <li>
                                <a href="#" title="Add to Cart" class="addToCart" data-product-id=${cylinder.product_id} data-toggle="modal" data-target="#add_to_cart_modal">
                                    <i class="fas fa-shopping-cart"></i>
                                </a>
                            </li> -->
                        </ul>
                    </div>
                </div>
                <div class="product-info">
                    <h2 class="product-title"><a href="javscript:;" class="viewproduct" data-product-id=${cylinder.product_id} data-toggle="modal" data-target="#quick_view_modal">${cylinder.weight} Gas Cylinder </a></h2>
                </div>
            </div>
        </div>
        `;

        $('#gas_cylinder_section').append(cyl)
    })
}

if (Array.isArray(gasAccessory)) {
    gasAccessory.forEach((access, index) => {
        var assess = `
        <div class="col-lg-12">
            <div class="ltn__product-item ltn__product-item-3 text-center">
                <div class="product-img">
                    <a href="javascript:;" class="viewproduct" data-product-id=${access.product_id} data-toggle="modal" data-target="#quick_view_modal">
                        <img src="${access.gas_image}" alt="gas accessory image">
                    </a>
                    <div class="product-hover-action">
                        <ul>
                            <li>
                                <a href="#" class="viewproduct" data-product-id=${access.product_id} id="${index}assess" title="Quick View" data-toggle="modal" data-target="#quick_view_modal">
                                    <i class="far fa-eye"></i>
                                </a>
                            </li>
                            <!-- <li>
                                <a href="#" title="Add to Cart" class="addToCart" data-product-id=${access.product_id} data-toggle="modal" data-target="#add_to_cart_modal">
                                    <i class="fas fa-shopping-cart"></i>
                                </a>
                            </li> -->
                        </ul>
                    </div>
                </div>
                <div class="product-info">
                    <h2 class="product-title"><a href="javascript:;" class="viewproduct" data-product-id=${access.product_id} data-toggle="modal" data-target="#quick_view_modal">${access.product} </a></h2>
                </div>
            </div>
        </div>
        `;

        $('#gas_accessory_section').append(assess)
    })
}

var findProduct = (productID) => {
    var gasObject;
    if (Array.isArray(lpGas)) {
        lpGas.forEach(gas => {
            if (gas.product_id == productID) {
                gasObject = gas
            }
        });
    }

    if (Array.isArray(gasCylinder)) {
        gasCylinder.forEach(gas => {
            if (gas.product_id == productID) {
                gasObject = gas
            }
        });
    }

    if (Array.isArray(gasAccessory)) {
        gasAccessory.forEach(gas => {
            if (gas.product_id == productID) {
                gasObject = gas
            }
        });
    }

    if (!gasObject) {
        return {
            gasData: gasObject, 
            error: true
        }
    }


    return {
        gasData: gasObject, 
        error: false
    }
}


$(document).on('click', 'a.viewproduct', function(e) {
    e.preventDefault() 
    var productID = $(this).data("product-id")
    const {gasData, error} = findProduct(productID)
    localStorage.setItem(localViewedProduct, JSON.stringify(gasData))
    const {product, price, gas_image, product_id} = gasData

    $('#product_name').text(product)
    $('#product_price').text(price)
    $('#product_image_src').attr("src", gas_image);
    // var a = $('#mydiv').data('myval'); //getter

    $('#modal_addtocart_btn').data('product-id',product_id); //setter
})

$(document).on('click', 'a#modal_addtocart_btn', function(e) {
    e.preventDefault() 
    var productID = $(this).data("product-id")
    const {gasData, error} = findProduct(productID)
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

    setTimeout(() => {
        console.log(JSON.parse(localStorage.getItem(localCartData)))
    }, 2000);
})