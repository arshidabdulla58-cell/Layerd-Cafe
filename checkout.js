/* =========================================================
   LAYERED CAFE
   CHECKOUT JAVASCRIPT
   PART 1
   ========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const GST_RATE = 0.05;


/* =========================================================
   GET CART FROM LOCAL STORAGE
========================================================= */

function getCart() {

    try {

        const savedCart = localStorage.getItem("cart");

        if (!savedCart) {
            return [];
        }

        const parsedCart = JSON.parse(savedCart);

        return Array.isArray(parsedCart) ? parsedCart : [];

    } catch (error) {

        console.error("Unable to load cart:", error);

        return [];

    }

}


/* =========================================================
   CART DATA
========================================================= */

let cart = getCart();


/* =========================================================
   ELEMENTS
========================================================= */

const checkoutItems =
    document.getElementById("checkout-items");

const checkoutSubtotal =
    document.getElementById("checkout-subtotal");

const checkoutGst =
    document.getElementById("checkout-gst");

const checkoutGrandTotal =
    document.getElementById("checkout-grand-total");

const cartCount =
    document.getElementById("cart-count");


/* =========================================================
   UPDATE CART BADGE
========================================================= */

function updateCartBadge() {

    if (!cartCount) return;

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += Number(item.quantity) || 0;

    });

    cartCount.textContent = totalItems;

}


/* =========================================================
   CALCULATE SUBTOTAL
========================================================= */

function calculateSubtotal() {

    return cart.reduce((total, item) => {

        const price = Number(item.price) || 0;

        const quantity = Number(item.quantity) || 0;

        return total + (price * quantity);

    }, 0);

}


/* =========================================================
   DISPLAY CHECKOUT ITEMS
========================================================= */

function displayCheckoutItems() {

    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";


    /* -----------------------------------------
       EMPTY CART
    ----------------------------------------- */

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="checkout-empty">

                <i class="fa-solid fa-cart-shopping"></i>

                <p>
                    Your cart is empty.
                </p>

                <a href="menu.html">
                    Browse Menu
                </a>

            </div>

        `;

        updateTotals();

        return;

    }


    /* -----------------------------------------
       PRODUCTS
    ----------------------------------------- */

    cart.forEach(item => {

        const price = Number(item.price) || 0;

        const quantity = Number(item.quantity) || 1;

        const itemTotal = price * quantity;


        const itemElement =
            document.createElement("div");

        itemElement.className = "checkout-item";


        itemElement.innerHTML = `

            <img
                src="${item.image || "images/placeholder.jpg"}"
                alt="${item.name || "Product"}"
                onerror="this.src='images/placeholder.jpg'"
            >


            <div class="checkout-item-info">

                <h4>
                    ${item.name || "Product"}
                </h4>

                <p>
                    ₹${price.toFixed(2)} × ${quantity}
                </p>

            </div>


            <div class="checkout-item-price">

                ₹${itemTotal.toFixed(2)}

            </div>

        `;


        checkoutItems.appendChild(itemElement);

    });


    updateTotals();

}


/* =========================================================
   UPDATE TOTALS
========================================================= */

function updateTotals() {

    const subtotal =
        calculateSubtotal();

    const gst =
        subtotal * GST_RATE;

    const grandTotal =
        subtotal + gst;


    if (checkoutSubtotal) {

        checkoutSubtotal.textContent =
            "₹" + subtotal.toFixed(2);

    }


    if (checkoutGst) {

        checkoutGst.textContent =
            "₹" + gst.toFixed(2);

    }


    if (checkoutGrandTotal) {

        checkoutGrandTotal.textContent =
            "₹" + grandTotal.toFixed(2);

    }

}


/* =========================================================
   INITIALIZE CHECKOUT
========================================================= */

displayCheckoutItems();

updateCartBadge();
/* =========================================================
   PAYMENT METHOD ELEMENTS
========================================================= */

const paymentOptions =
    document.querySelectorAll(
        'input[name="paymentMethod"]'
    );

const upiDetails =
    document.getElementById("upi-details");

const cardDetails =
    document.getElementById("card-details");

const codDetails =
    document.getElementById("cod-details");


/* =========================================================
   SHOW PAYMENT DETAILS
========================================================= */

function updatePaymentDetails() {

    const selectedPayment =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    if (!selectedPayment) {
        return;
    }


    const method =
        selectedPayment.value;


    /* Hide everything first */

    if (upiDetails) {
        upiDetails.style.display = "none";
    }

    if (cardDetails) {
        cardDetails.style.display = "none";
    }

    if (codDetails) {
        codDetails.style.display = "none";
    }


    /* Show selected section */

    if (method === "UPI" && upiDetails) {

        upiDetails.style.display = "block";

    }


    if (method === "Card" && cardDetails) {

        cardDetails.style.display = "block";

    }


    if (
        method === "Cash on Delivery"
        && codDetails
    ) {

        codDetails.style.display = "block";

    }

}


/* =========================================================
   PAYMENT EVENT LISTENERS
========================================================= */

paymentOptions.forEach(option => {

    option.addEventListener(
        "change",
        updatePaymentDetails
    );

});


/* =========================================================
   INITIAL PAYMENT STATE
========================================================= */

updatePaymentDetails();


/* =========================================================
   INPUT ELEMENTS
========================================================= */

const checkoutForm =
    document.getElementById("checkout-form");

const customerName =
    document.getElementById("customer-name");

const customerPhone =
    document.getElementById("customer-phone");

const customerEmail =
    document.getElementById("customer-email");

const customerAddress =
    document.getElementById("customer-address");

const customerCity =
    document.getElementById("customer-city");

const customerPincode =
    document.getElementById("customer-pincode");

const upiId =
    document.getElementById("upi-id");

const cardNumber =
    document.getElementById("card-number");

const cardExpiry =
    document.getElementById("card-expiry");

const cardCvv =
    document.getElementById("card-cvv");


/* =========================================================
   PHONE NUMBER
========================================================= */

if (customerPhone) {

    customerPhone.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(/\D/g, "");

        }
    );

}


/* =========================================================
   PIN CODE
========================================================= */

if (customerPincode) {

    customerPincode.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(/\D/g, "");

        }
    );

}


/* =========================================================
   CARD NUMBER FORMATTING
========================================================= */

if (cardNumber) {

    cardNumber.addEventListener(
        "input",
        function () {

            let value =
                this.value.replace(/\D/g, "");

            value =
                value.substring(0, 16);

            value =
                value.replace(
                    /(.{4})/g,
                    "$1 "
                );

            this.value =
                value.trim();

        }
    );

}


/* =========================================================
   CARD EXPIRY FORMATTING
========================================================= */

if (cardExpiry) {

    cardExpiry.addEventListener(
        "input",
        function () {

            let value =
                this.value.replace(/\D/g, "");

            value =
                value.substring(0, 4);

            if (value.length >= 3) {

                value =
                    value.substring(0, 2)
                    + "/"
                    + value.substring(2);

            }

            this.value = value;

        }
    );

}


/* =========================================================
   CVV
========================================================= */

if (cardCvv) {

    cardCvv.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(/\D/g, "");

        }
    );

}


/* =========================================================
   UPI ID CLEANUP
========================================================= */

if (upiId) {

    upiId.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(/\s/g, "");

        }
    );

}


/* =========================================================
   VALIDATE PHONE
========================================================= */

function isValidPhone(phone) {

    return /^[6-9]\d{9}$/.test(phone);

}


/* =========================================================
   VALIDATE PIN
========================================================= */

function isValidPincode(pincode) {

    return /^\d{6}$/.test(pincode);

}


/* =========================================================
   VALIDATE UPI
========================================================= */

function isValidUpi(upi) {

    return /^[\w.-]+@[\w.-]+$/.test(upi);

}


/* =========================================================
   VALIDATE CARD
========================================================= */

function isValidCard(card) {

    const cleanCard =
        card.replace(/\s/g, "");

    return /^\d{16}$/.test(cleanCard);

}


/* =========================================================
   VALIDATE EXPIRY
========================================================= */

function isValidExpiry(expiry) {

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        return false;
    }


    const parts =
        expiry.split("/");

    const month =
        Number(parts[0]);

    const year =
        Number(parts[1]);


    if (month < 1 || month > 12) {
        return false;
    }


    const currentDate =
        new Date();

    const currentYear =
        currentDate.getFullYear() % 100;

    const currentMonth =
        currentDate.getMonth() + 1;


    if (year < currentYear) {
        return false;
    }


    if (
        year === currentYear
        && month < currentMonth
    ) {
        return false;
    }


    return true;

}


/* =========================================================
   VALIDATE CVV
========================================================= */

function isValidCvv(cvv) {

    return /^\d{3}$/.test(cvv);

}
/* =========================================================
   SUCCESS MODAL ELEMENTS
========================================================= */

const successModal =
    document.getElementById("success-modal");

const orderIdElement =
    document.getElementById("order-id");


/* =========================================================
   TOAST ELEMENTS
========================================================= */

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toast-message");


/* =========================================================
   SHOW TOAST
========================================================= */

function showToast(message) {

    if (!toast || !toastMessage) {
        return;
    }

    toastMessage.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================================
   GENERATE ORDER ID
========================================================= */

function generateOrderId() {

    const now =
        new Date();

    const year =
        now.getFullYear();

    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            now.getDate()
        ).padStart(2, "0");

    const random =
        Math.floor(
            1000 + Math.random() * 9000
        );

    return `LC-${year}${month}${day}-${random}`;

}


/* =========================================================
   GET SELECTED PAYMENT METHOD
========================================================= */

function getSelectedPaymentMethod() {

    const selected =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );

    return selected
        ? selected.value
        : "";

}


/* =========================================================
   VALIDATE CUSTOMER INFORMATION
========================================================= */

function validateCustomerInformation() {

    const name =
        customerName.value.trim();

    const phone =
        customerPhone.value.trim();

    const email =
        customerEmail.value.trim();

    const address =
        customerAddress.value.trim();

    const city =
        customerCity.value.trim();

    const pincode =
        customerPincode.value.trim();


    if (name.length < 2) {

        showToast(
            "Please enter your full name."
        );

        customerName.focus();

        return false;

    }


    if (!isValidPhone(phone)) {

        showToast(
            "Please enter a valid 10-digit phone number."
        );

        customerPhone.focus();

        return false;

    }


    if (!customerEmail.checkValidity()) {

        showToast(
            "Please enter a valid email address."
        );

        customerEmail.focus();

        return false;

    }


    if (address.length < 5) {

        showToast(
            "Please enter your delivery address."
        );

        customerAddress.focus();

        return false;

    }


    if (city.length < 2) {

        showToast(
            "Please enter your city."
        );

        customerCity.focus();

        return false;

    }


    if (!isValidPincode(pincode)) {

        showToast(
            "Please enter a valid 6-digit PIN code."
        );

        customerPincode.focus();

        return false;

    }


    return true;

}


/* =========================================================
   VALIDATE PAYMENT
========================================================= */

function validatePayment() {

    const method =
        getSelectedPaymentMethod();


    /* -----------------------------------------
       UPI
    ----------------------------------------- */

    if (method === "UPI") {

        const value =
            upiId.value.trim();


        if (!isValidUpi(value)) {

            showToast(
                "Please enter a valid UPI ID."
            );

            upiId.focus();

            return false;

        }

    }


    /* -----------------------------------------
       CARD
    ----------------------------------------- */

    if (method === "Card") {

        const number =
            cardNumber.value.trim();

        const expiry =
            cardExpiry.value.trim();

        const cvv =
            cardCvv.value.trim();


        if (!isValidCard(number)) {

            showToast(
                "Please enter a valid 16-digit card number."
            );

            cardNumber.focus();

            return false;

        }


        if (!isValidExpiry(expiry)) {

            showToast(
                "Please enter a valid card expiry date."
            );

            cardExpiry.focus();

            return false;

        }


        if (!isValidCvv(cvv)) {

            showToast(
                "Please enter a valid 3-digit CVV."
            );

            cardCvv.focus();

            return false;

        }

    }


    return true;

}


/* =========================================================
   SAVE ORDER
========================================================= */

function saveOrder(orderId) {

    const subtotal =
        calculateSubtotal();

    const gst =
        subtotal * GST_RATE;

    const grandTotal =
        subtotal + gst;


    const paymentMethod =
        getSelectedPaymentMethod();


    const order = {

        orderId: orderId,

        date:
            new Date().toISOString(),

        customer: {

            name:
                customerName.value.trim(),

            phone:
                customerPhone.value.trim(),

            email:
                customerEmail.value.trim(),

            address:
                customerAddress.value.trim(),

            city:
                customerCity.value.trim(),

            pincode:
                customerPincode.value.trim()

        },

        paymentMethod:
            paymentMethod,

        items:
            cart,

        subtotal:
            subtotal,

        gst:
            gst,

        total:
            grandTotal

    };


    /* -----------------------------------------
       GET PREVIOUS ORDERS
    ----------------------------------------- */

    let orders = [];

    try {

        const savedOrders =
            localStorage.getItem("orders");

        if (savedOrders) {

            orders =
                JSON.parse(savedOrders);

        }

        if (!Array.isArray(orders)) {

            orders = [];

        }

    } catch (error) {

        console.error(
            "Unable to load previous orders:",
            error
        );

        orders = [];

    }


    /* -----------------------------------------
       ADD NEW ORDER
    ----------------------------------------- */

    orders.push(order);


    /* -----------------------------------------
       SAVE
    ----------------------------------------- */

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    return order;

}


/* =========================================================
   CLEAR CART
========================================================= */

function clearCart() {

    cart = [];

    localStorage.removeItem("cart");

    updateCartBadge();

}


/* =========================================================
   SHOW SUCCESS MODAL
========================================================= */

function showSuccessModal(orderId) {

    if (!successModal) {
        return;
    }


    if (orderIdElement) {

        orderIdElement.textContent =
            orderId;

    }


    successModal.classList.add("show");


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   PLACE ORDER
========================================================= */

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* -----------------------------------------
               CHECK CART
            ----------------------------------------- */

            if (!cart.length) {

                showToast(
                    "Your cart is empty."
                );

                return;

            }


            /* -----------------------------------------
               CUSTOMER VALIDATION
            ----------------------------------------- */

            if (
                !validateCustomerInformation()
            ) {

                return;

            }


            /* -----------------------------------------
               PAYMENT VALIDATION
            ----------------------------------------- */

            if (!validatePayment()) {

                return;

            }


            /* -----------------------------------------
               GENERATE ORDER ID
            ----------------------------------------- */

            const orderId =
                generateOrderId();


            /* -----------------------------------------
               SAVE ORDER
            ----------------------------------------- */

            saveOrder(orderId);


            /* -----------------------------------------
               CLEAR CART
            ----------------------------------------- */

            clearCart();


            /* -----------------------------------------
               SHOW SUCCESS
            ----------------------------------------- */

            showSuccessModal(orderId);

        }
    );

}


/* =========================================================
   PREVENT SUCCESS MODAL CLOSE BY BACKGROUND CLICK
========================================================= */

if (successModal) {

    successModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === successModal
            ) {

                return;

            }

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

updatePaymentDetails();

updateCartBadge();
displayCheckoutItems();