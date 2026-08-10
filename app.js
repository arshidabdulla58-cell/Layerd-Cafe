/*=========================================================
                LAYERED CAFE MENU
=========================================================*/

// Load Products from LocalStorage

let products = JSON.parse(localStorage.getItem("products")) || [];

// Cart

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// HTML Elements

const menuContainer = document.getElementById("menu-container");

const searchInput = document.getElementById("search-input");

const categoryButtons = document.querySelectorAll(".category-btn");

const cartCount = document.getElementById("cart-count");


/*=========================================================
                DISPLAY MENU
=========================================================*/

function displayMenu(list = products){

    menuContainer.innerHTML = "";

    if(list.length === 0){

        menuContainer.innerHTML = `

        <h2 class="empty-menu">

            No Products Available

        </h2>

        `;

        return;

    }

    list.forEach(product=>{

       menuContainer.innerHTML += `

<div class="menu-card">

    <img src="${product.image}" alt="${product.name}">

    <div class="menu-content">

        <h3>${product.name}</h3>

        <p>${product.category}</p>

        <div class="rating">

            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>

        </div>

        <div class="price-cart">

            <span>₹${product.price}</span>

            <button onclick="addToCart(${product.id})">

                <i class="fas fa-cart-plus"></i>

                Add

            </button>

        </div>

    </div>

</div>

`;

    });

}
/*=========================================================
                ADD TO CART
=========================================================*/

function addToCart(productId) {

    // Find Product
    const product = products.find(item => item.id === productId);

    if (!product) return;

    // Check if Product Already Exists
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    // Save Cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update Badge
    updateCartCount();

    // Toast
    showToast(product.name + " added to cart!");

}


/*=========================================================
                CART COUNT
=========================================================*/

function updateCartCount() {

    if (!cartCount) return;

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

    });

    cartCount.innerText = totalItems;

}


/*=========================================================
                SEARCH PRODUCT
=========================================================*/

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase().trim();

        const filteredProducts = products.filter(product =>

            product.name.toLowerCase().includes(keyword) ||

            product.category.toLowerCase().includes(keyword)

        );

        displayMenu(filteredProducts);

    });

}


/*=========================================================
                CATEGORY FILTER
=========================================================*/

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove Active Class
        categoryButtons.forEach(btn => btn.classList.remove("active"));

        // Add Active Class
        this.classList.add("active");

        const category = this.dataset.category;

        if (category === "All") {

            displayMenu(products);

            return;

        }

        const filtered = products.filter(product =>

            product.category === category

        );

        displayMenu(filtered);

    });

});


/*=========================================================
                TOAST
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
                INITIALIZE
=========================================================*/

displayMenu();

updateCartCount();