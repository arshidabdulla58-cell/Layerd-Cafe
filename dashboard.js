/*=========================================================
                LAYERED CAFE DASHBOARD
=========================================================*/

/*===============================
        LOCAL STORAGE
================================*/

let products = JSON.parse(localStorage.getItem("products")) || [];

let editIndex = -1;


/*===============================
        HTML ELEMENTS
================================*/

const form = document.getElementById("product-form");

const productName = document.getElementById("product-name");

const productPrice = document.getElementById("product-price");

const productCategory = document.getElementById("product-category");

const productImage = document.getElementById("product-image");

const preview = document.getElementById("preview");

const productTable = document.getElementById("product-table");

const searchInput = document.getElementById("search-product");

const totalProducts = document.getElementById("total-products");

const totalCategories = document.getElementById("total-categories");

const totalValue = document.getElementById("total-value");


/*===============================
        SAVE PRODUCTS
================================*/

function saveProducts() {

    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );

}


/*===============================
        IMAGE PREVIEW
================================*/

productImage.addEventListener("input", function () {

    if (this.value.trim() !== "") {

        preview.src = this.value;

    } else {

        preview.src = "https://placehold.co/300x220?text=Food+Preview";

    }

});


/*===============================
        TOAST MESSAGE
================================*/

function showToast(message) {

    const toast = document.getElementById("toast");

    const toastMessage = document.getElementById("toast-message");

    toastMessage.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/*===============================
        RESET FORM
================================*/

function resetForm() {

    form.reset();

    preview.src = "https://placehold.co/300x220?text=Food+Preview";

    editIndex = -1;

    document.getElementById("submit-btn").innerHTML =

    `<i class="fa-solid fa-plus"></i> Add Product`;

}
/*=========================================================
                ADD & UPDATE PRODUCT
=========================================================*/

form.addEventListener("submit", function (e) {

    e.preventDefault();

    // Validation

    if (
        productName.value.trim() === "" ||
        productPrice.value.trim() === "" ||
        productCategory.value === "" ||
        productImage.value.trim() === ""
    ) {

        showToast("Please fill all fields!");

        return;

    }

    // Product Object

    const product = {

        id: editIndex === -1
            ? Date.now()
            : products[editIndex].id,

        name: productName.value.trim(),

        price: Number(productPrice.value),

        category: productCategory.value,

        image: productImage.value.trim()

    };


    /*=========================
            UPDATE
    =========================*/

    if (editIndex !== -1) {

        products[editIndex] = product;

        showToast("Product Updated Successfully!");

    }

    /*=========================
            ADD
    =========================*/

    else {

        products.push(product);

        showToast("Product Added Successfully!");

    }


    saveProducts();

    displayProducts();

    updateStatistics();

    resetForm();

});


/*=========================================================
                DISPLAY PRODUCTS
=========================================================*/

function displayProducts(list = products) {

    productTable.innerHTML = "";

    if (list.length === 0) {

        productTable.innerHTML = `

        <tr>

            <td colspan="6">

                No Products Available

            </td>

        </tr>

        `;

        return;

    }


    list.forEach((product) => {

        const index = products.findIndex(

            item => item.id === product.id

        );

        productTable.innerHTML += `

        <tr>

            <td>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    width="70"
                    height="70"
                    style="object-fit:cover;border-radius:10px;">

            </td>

            <td>

                ${product.name}

            </td>

            <td>

                ${product.category}

            </td>

            <td>

                ₹${product.price}

            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editProduct(${index})">

                    <i class="fa-solid fa-pen"></i>

                    Edit

                </button>

            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteProduct(${index})">

                    <i class="fa-solid fa-trash"></i>

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}


/*=========================================================
                DASHBOARD STATISTICS
=========================================================*/

function updateStatistics() {

    totalProducts.innerText = products.length;

    let categories = new Set();

    let total = 0;

    products.forEach(product => {

        categories.add(product.category);

        total += product.price;

    });

    totalCategories.innerText = categories.size;

    totalValue.innerText = "₹" + total;

}
/*=========================================================
                EDIT PRODUCT
=========================================================*/

function editProduct(index) {

    const product = products[index];

    productName.value = product.name;

    productPrice.value = product.price;

    productCategory.value = product.category;

    productImage.value = product.image;

    preview.src = product.image;

    editIndex = index;

    document.getElementById("submit-btn").innerHTML =

    `<i class="fa-solid fa-pen"></i> Update Product`;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/*=========================================================
                DELETE PRODUCT
=========================================================*/

function deleteProduct(index) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this product?"

    );

    if (!confirmDelete) return;

    products.splice(index, 1);

    saveProducts();

    displayProducts();

    updateStatistics();

    showToast("Product Deleted Successfully!");

}


/*=========================================================
                SEARCH PRODUCT
=========================================================*/

searchInput.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase().trim();

    const filteredProducts = products.filter(product =>

        product.name.toLowerCase().includes(keyword) ||

        product.category.toLowerCase().includes(keyword)

    );

    displayProducts(filteredProducts);

});


/*=========================================================
                INITIALIZE DASHBOARD
=========================================================*/

displayProducts();

updateStatistics();

resetForm();