$(document).ready(function () {
    let cart = [];

    // Load customers from localStorage into the dropdown
    function loadCustomersToDropdown() {
        const customers = JSON.parse(localStorage.getItem('customers')) || [];
        const $dropdown = $("#customerDropDown");
        $dropdown.empty();
        $dropdown.append('<option value="">Select Customer</option>');
        customers.forEach(c => {
            $dropdown.append(`<option value="${c.id}">${c.name} (${c.id})</option>`);
        });
    }

    // Load products from localStorage into the menu
    function popOrderItems() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const $orderProductElement = $("#order-items");
        $orderProductElement.empty();
        products.forEach((product) => {
            const $productCard = $(`
                <div class="product-card" data-pro_id="${product.id}">
                    <h4 class="product-name">${product.name}</h4>
                    <div class="product-info">
                        <h2 class="product-price">₱${product.price}</h2>
                        <span class="product-count" data-quantity="${product.quantity}">${product.quantity} Products</span>
                    </div>
                </div>
            `);
            $productCard.on("click", function () {
                addProductToCart(product, $productCard.find(".product-count"));
            });
            $orderProductElement.append($productCard);
        });
    }

    // Add product to cart
    function addProductToCart(product, $productCountElement) {
        const productCount = parseInt($productCountElement.data("quantity"), 10);
        if (productCount <= 0) {
            alert(`Item ${product.name} is out of stock.`);
            return;
        }
        const existingProduct = cart.find((cartProduct) => cartProduct.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        $productCountElement.data("quantity", productCount - 1);
        $productCountElement.text(`${productCount - 1} Products`);
        updateCartDisplay();
    }

    // Remove product from cart
    function removeProductFromCart(id) {
        const productIndex = cart.findIndex((cartProduct) => cartProduct.id === id);
        if (productIndex === -1) return;
        const product = cart[productIndex];
        const $productCountElement = $(`.product-card[data-pro_id='${id}'] .product-count`);
        const currentQty = parseInt($productCountElement.data("quantity"), 10);
        $productCountElement.data("quantity", currentQty + product.quantity);
        $productCountElement.text(`${currentQty + product.quantity} Products`);
        cart.splice(productIndex, 1);
        updateCartDisplay();
    }

    // Update cart display
    function updateCartDisplay() {
        const $cartProductContainer = $("#cart-items");
        $cartProductContainer.empty();
        let subTotal = 0;
        cart.forEach((cartProduct) => {
            const productTotalPrice = cartProduct.price * cartProduct.quantity;
            subTotal += productTotalPrice;
            const $cartProductDiv = $(`
                <div class="cart-product">
                    <p class="cart-product-name">${cartProduct.name} x ${cartProduct.quantity}</p>
                    <p>₱${productTotalPrice.toFixed(2)}</p>
                    <button class="remove-button-cart">❌</button>
                </div>
            `);
            $cartProductDiv.find(".remove-button-cart").on("click", function () {
                removeProductFromCart(cartProduct.id);
            });
            $cartProductContainer.append($cartProductDiv);
        });
        const discount = parseFloat($("#discount").val()) || 0;
        const cash = parseFloat($("#cash").val()) || 0;
        const total = subTotal - discount;
        const balance = cash - total;
        $("#sub-total").text(`₱${subTotal.toFixed(2)}`);
        $("#total").text(`₱${total.toFixed(2)}`);
        $("#balance").text(`₱${balance.toFixed(2)}`);
    }

    // Add event listeners for cart updates
    $("#cash, #discount").on("input", updateCartDisplay);

    // Purchase button (demo: just resets cart)
    $("#purchase").on("click", function () {
        if ($("#customerDropDown").val() === "") {
            alert("Please select a customer.");
            return;
        }
        if (cart.length === 0) {
            alert("No products in the cart.");
            return;
        }
        alert("Order placed successfully!");
        resetOrder();
    });

    // Reset order
    function resetOrder() {
        cart = [];
        $("#cash").val("");
        $("#discount").val("");
        updateCartDisplay();
        popOrderItems(); // Reset product counts
    }

    // Set date
    let date = new Date();
    let options = { day: "numeric", month: "long", year: "numeric" };
    let formatDate = date.toLocaleDateString("en-US", options);
    $("#current-date").text(formatDate);

    // Initial load
    loadCustomersToDropdown();
    popOrderItems();
    updateCartDisplay();

    // Update dropdown live after customer add/update/delete
    $(document).on('customersUpdated', loadCustomersToDropdown);

    // If you want to reload customers every time Orders tab is clicked:
    $("#OrdersForm-button").on("click", loadCustomersToDropdown);
});


