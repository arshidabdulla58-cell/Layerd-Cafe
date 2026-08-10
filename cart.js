/*=========================================================
                LAYERED CAFE CART
=========================================================*/

// Load Cart

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements

const cartItems = document.getElementById("cart-items");

const subtotal = document.getElementById("subtotal");

const gst = document.getElementById("gst");

const grandTotal = document.getElementById("grand-total");

const cartCount = document.getElementById("cart-count");

const emptyCart = document.getElementById("empty-cart");


/*=========================================================
                SAVE CART
=========================================================*/

function saveCart(){

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

}


/*=========================================================
                DISPLAY CART
=========================================================*/

function displayCart(){

    cartItems.innerHTML = "";

    if(cart.length===0){

        document.querySelector(".cart-container").style.display="none";

        emptyCart.style.display="block";

        updateSummary();

        updateBadge();

        return;

    }

    document.querySelector(".cart-container").style.display="grid";

    emptyCart.style.display="none";

    cart.forEach(item=>{

        cartItems.innerHTML+=`

<div class="cart-card">

<img src="${item.image}" alt="${item.name}">

<div class="cart-info">

<h3>${item.name}</h3>

<p>${item.category}</p>

<div class="price">

₹${item.price}

</div>

<div class="quantity">

<button onclick="decreaseQuantity(${item.id})">

<i class="fa-solid fa-minus"></i>

</button>

<span>${item.quantity}</span>

<button onclick="increaseQuantity(${item.id})">

<i class="fa-solid fa-plus"></i>

</button>

</div>

</div>

<button

class="remove-btn"

onclick="removeItem(${item.id})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

`;

    });

    updateSummary();

    updateBadge();

}
/*=========================================================
                INCREASE QUANTITY
=========================================================*/

function increaseQuantity(productId) {

    const item = cart.find(product => product.id === productId);

    if (!item) return;

    item.quantity++;

    saveCart();

    displayCart();

    showToast("Quantity Updated");

}


/*=========================================================
                DECREASE QUANTITY
=========================================================*/

function decreaseQuantity(productId) {

    const item = cart.find(product => product.id === productId);

    if (!item) return;

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        removeItem(productId);

        return;

    }

    saveCart();

    displayCart();

    showToast("Quantity Updated");

}


/*=========================================================
                REMOVE ITEM
=========================================================*/

function removeItem(productId) {

    const confirmDelete = confirm(

        "Remove this item from cart?"

    );

    if (!confirmDelete) return;

    cart = cart.filter(item => item.id !== productId);

    saveCart();

    displayCart();

    showToast("Item Removed");

}


/*=========================================================
                CLEAR CART
=========================================================*/

document.getElementById("clear-cart").addEventListener("click", function () {

    if (cart.length === 0) {

        showToast("Cart is already empty");

        return;

    }

    const confirmClear = confirm(

        "Clear your entire cart?"

    );

    if (!confirmClear) return;

    cart = [];

    saveCart();

    displayCart();

    showToast("Cart Cleared");

});


/*=========================================================
                TOAST NOTIFICATION
=========================================================*/

function showToast(message) {

    const toast = document.getElementById("toast");

    const toastMessage = document.getElementById("toast-message");

    if (!toast || !toastMessage) return;

    toastMessage.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}
/*=========================================================
                ORDER SUMMARY
=========================================================*/

function updateSummary() {

    let subTotalValue = 0;

    cart.forEach(item => {

        subTotalValue += item.price * item.quantity;

    });

    const gstValue = subTotalValue * 0.05;

    const totalValue = subTotalValue + gstValue;

    subtotal.innerText = "₹" + subTotalValue.toFixed(2);

    gst.innerText = "₹" + gstValue.toFixed(2);

    grandTotal.innerText = "₹" + totalValue.toFixed(2);

}


/*=========================================================
                CART BADGE
=========================================================*/

function updateBadge() {

    if (!cartCount) return;

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

    });

    cartCount.innerText = totalItems;

}


/*=========================================================
                CHECKOUT
=========================================================*/

document.getElementById("checkout-btn").addEventListener("click", function () {

    if (cart.length === 0) {

        showToast("Your cart is empty!");

        return;

    }

    // Open checkout page
    window.location.href = "checkout.html";

});

/*=========================================================
                INITIALIZE
=========================================================*/

displayCart();