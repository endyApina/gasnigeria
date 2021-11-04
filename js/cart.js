console.log(JSON.parse(localStorage.getItem(localCartData)))
const cartArray = JSON.parse(localStorage.getItem(localCartData))

const deliveryFee = convertPriceStringtoInt(appDeliveryFee)

if (Array.isArray(cartArray)) {
    if (cartArray.length === 0) {
        alert("cart is empty")
        location.href = "shop.html"
    }
    var totalCartOrder = 0;
    cartArray.forEach(cart => {
        // console.log(cart)
        var {product_data, quantity} = cart
        var {weight, price, product_id, image, product} = product_data


        var thisOrder = quantity * convertPriceStringtoInt(price)
        totalCartOrder = totalCartOrder + thisOrder

        console.log(image)

        var gasSRC = image
        if (gasSRC == "") {
            gasSRC = "gasimg/small.png"
        }

        var row = `
        <tr>
            <td class="cart-product-remove"><a href="javascript:;" class="removeOrder" data-product-id=${product_id}>x</a></td>
            <td class="cart-product-image">
                <a href="javascript:;"><img src="${gasSRC}" alt="#"></a>
            </td>
            <td class="cart-product-info">
                <h4><a href="javascript:;">${product}</a></h4>
            </td>
            <td class="cart-product-price">&#8358;${price}</td>
            <td class="cart-product-quantity">
                <div>
                    <input type="text" value="${quantity}" name="qtybutton" class="cart-plus-minus-box">
                </div>
            </td>
            <td class="cart-product-subtotal">&#8358;${totalCartOrder}</td>
        </tr>
        `;

        $('#cart_table').append(row)
    });

    const finalOrderTotal = totalCartOrder + deliveryFee

    var cartCheckoutTable = `
        <h4>Cart Totals</h4>
        <table class="table">
            <tbody>
                <tr>
                    <td>Cart Subtotal</td>
                    <td>&#8358;${totalCartOrder}</td>
                </tr>
                <tr>
                    <td>Shipping and Handing</td>
                    <td>&#8358;${deliveryFee}</td>
                </tr>
                <tr>
                    <td><strong>Order Total</strong></td>
                    <td><strong>&#8358;${finalOrderTotal}</strong></td>
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