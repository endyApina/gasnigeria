document.getElementById("footer_div").innerHTML = footerDiv;
document.getElementById("sub_nav").innerHTML = subNav

const chooseGasType = (type) => {
    var gasType = userGasType[type]
    localStorage.setItem("selcted_cylinder", type)

    // var image = document.getElementById("modalImgSrc"); 
    // image.src = gasType.imageSRC

    // var price = document.getElementById("modal_price")
    // price.textContent = gasType.price

    var modalView = `
    <div class="row">
        <div class="col-lg-6 col-12">
            <div class="modal-product-img">
                <img src="${gasType.imageSRC}" id="modalImgSrc" height="400" alt="#">
            </div>
        </div>
        <div class="col-lg-6 col-12">
            <div class="modal-product-info">
                <h3>${gasType.name}</h3>
                <div class="product-price">
                    <span>&#8358;${gasType.price}</span>
                </div>
                <div class="ltn__product-details-menu-2">
                    <ul>
                        <li>
                            <div class="cart-plus-minus">
                                <input type="text" value="1" id="order_quantity" name="qtybutton" class="cart-plus-minus-box">
                            </div>
                        </li>
                        <li>
                            <a href="#" onclick="buyNow(${type});" class="theme-btn-1 btn btn-effect-1" title="Add to Cart" data-toggle="modal" data-target="#add_to_cart_modal">
                                <i class="fas fa-shopping-cart"></i>
                                <span>ORDER NOW</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <hr>
                <div class="ltn__social-media">
                    <ul>
                        <li>Share:</li>
                        <li><a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="#" title="Twitter"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="#" title="Linkedin"><i class="fab fa-linkedin"></i></a></li>
                        <li><a href="#" title="Instagram"><i class="fab fa-instagram"></i></a></li>
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>

    `;

    $('#modal_view').html(modalView)
}

if (Array.isArray(userGasType)) {
    userGasType.forEach((gastype, index) => {
        var gasRow = `
        <div class="col-lg-12">
            <div class="ltn__product-item ltn__product-item-3 text-center" >
                <div class="product-img">
                    <a href="javascript:;"><img src="${gastype.imageSRC}" height="400" alt="#"></a>
                    <div class="product-hover-action">
                        <ul>
                            <li>
                                <a href="#" onclick="chooseGasType(${index});" data-gas-index=${index} id="${index}GasSection" title="Quick View" data-toggle="modal" data-target="#quick_view_modal">
                                    <i class="far fa-eye"></i>
                                </a>
                            </li>
                            <!-- <li>
                                <a href="#" title="Add to Cart" onclick="buyNow(${index});" data-toggle="modal" data-target="#add_to_cart_modal">
                                    <i class="fas fa-shopping-cart"></i>
                                </a>
                            </li> -->
                        </ul>
                    </div>
                </div>
                <div class="product-info">
                    <h2 class="product-title"><a onclick="showModal(${index});" href="javascript:;">${gastype.weight} ${gastype.name}</a></h2>
                    <div class="product-price">
                        <span>&#8358;${gastype.price}</span>
                    </div>
                </div>
            </div>
        </div>
        
        `

        // $('#product_section').append(gasRow)
    });
}

const buyNow = () => {
    var type = localStorage.getItem("selcted_cylinder")
    const userObject = JSON.parse(localStorage.getItem(localUserData))
    if (userObject == null) {
        var quantity = document.getElementById("order_quantity").value;
        if (!quantity) {
            quantity = 1
        }
        var orderData = {
            "gas_type": type, 
            "quantity": quantity
        }
        localStorage.setItem("selected_gas", JSON.stringify(orderData))
        location.href="login.html"
        return 
    } else {
        var quantity = document.getElementById("order_quantity").value;
        if (!quantity) {
            quantity = 1
        }
        var orderData = {
            "gas_type": type, 
            "quantity": quantity
        }
        console.log(orderData)
        localStorage.setItem("selected_gas", JSON.stringify(orderData))
        location.href = "checkout.html"
        return 
    }
}

const showModal = (type) => {
    localStorage.setItem("selcted_cylinder", type)
    switch (type) {
        case 0:
            document.getElementById(type+"GasSection").click()
            chooseGasType(type)
            break;
        case 1: 
            document.getElementById(type+"GasSection").click()
            chooseGasType(type)
            break
        case 2: 
            document.getElementById(type+"GasSection").click()
            chooseGasType(type);
        default:
            break;
    }
}