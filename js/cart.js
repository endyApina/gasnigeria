const cartArray = JSON.parse(localStorage.getItem(localCartData))

const deliveryFee = convertPriceStringtoInt(appDeliveryFee)

if (Array.isArray(cartArray)) {
    if (cartArray.length === 0) {
        alert("cart is empty")
        location.href = "shop.html"
    }
    var totalCartOrder = 0;
    cartArray.forEach(cart => {
        console.log(cart)
        var {product_data, quantity} = cart
        var {price, product_id, image, product} = product_data
        const intPrice = parseInt(price)


        var thisOrder = quantity * convertPriceStringtoInt(price)
        totalCartOrder = totalCartOrder + thisOrder

        var gasSRC = image
        if (gasSRC == "") {
            gasSRC = "gasimg/small.png"
        }

        var row = `
        <tr>
            <td class="cart-product-remove" style="width:5%"><a href="javascript:;" class="removeOrder" data-product-id=${product_id}>x</a></td>
            <td class="cart-product-image" style="width:18%">
                <a href="javascript:;"><img src="${gasSRC}" alt="#"></a>
            </td>
            <td class="cart-product-info" style="width:20%">
                <h4><a href="javascript:;">${product}</a></h4>
            </td>
            <td class="cart-product-price" style="width:17%">&#8358;${intPrice}</td>
            <td class="cart-product-quantity"style="width:20%">
                <div>
                    <input type="text" value="${quantity}" name="qtybutton" class="cart-plus-minus-box">
                </div>
            </td>
            <td class="cart-product-subtotal">&#8358;${intPrice * parseInt(quantity)}</td>
        </tr>
        `;

        $('#cart_table').append(row)
    });

    // const finalOrderTotal =  

    var cartCheckoutTable = `
        <h4>Cart Totals</h4>
        <table class="table">
            <tbody>
                <tr>
                    <td>Cart Subtotal</td>
                    <td>&#8358;${totalCartOrder}</td>
                </tr>
                <tr>
                    <td><strong>Order Total</strong></td>
                    <td><strong>&#8358;${totalCartOrder}</strong></td>
                </tr>
            </tbody>
        </table>
        <div class="btn-wrapper text-right">
            <a href="checkout.html" class="theme-btn-1 btn btn-effect-1">Proceed to checkout</a>
        </div>
    `;

    $('#cart_checkout_table').append(cartCheckoutTable)
} else {
    alert("cart is empty")
    location.href = "shop.html"
}

$(document).on('click', 'a.removeOrder', function(e) {
    e.preventDefault()
    const productID = $(this).data("product-id")
    console.log(productID)

    if (Array.isArray(cartArray)) {
        for (let index = 0; index < cartArray.length; index++) {
            const element = cartArray[index];
            var {product_data, quantity} = element;
            if (productID == product_data.product_id) {
                cartArray.splice(index, 1)
                localStorage.setItem(localCartData, JSON.stringify(cartArray))
                location.reload()
                break
            }
        }
    }
})