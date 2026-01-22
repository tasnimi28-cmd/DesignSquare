console.log("Script loaded.");
//Cart System
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function saveCart() {localStorage.setItem("cart", JSON.stringify(cart));

}

//Add to Cart
function addToCart(name, price, btn) {
   let qtyInput = btn.parentElement.querySelector("input[type='number']");
    let quantityToAdd = parseInt(qtyInput.value);
    let item = cart.find(product => product.name === name);
    if (item) {
        item.quantity += quantityToAdd;
    } else {
        cart.push({ name: name, price: price, quantity: quantityToAdd });
    }
    saveCart();
    alert(`${quantityToAdd } ${name}(s) added to cart.`);
}
//Display Cart
function displayCart() {
    const cartTable = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    
    if (!cartTable) return;
    cartTable.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed()}</td>
        <td>$${(item.price * item.quantity).toFixed()}</td>
        <td><button onclick="removeFromCart('${item.name}')">Remove all</button></td>
        <td><button onclick="removeOneFromCart('${item.name}')">Remove one</button></td>
        `;
        cartTable.appendChild(row);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = `Total: $${total.toFixed()}`;
    
    }
     
window.onload = displayCart;

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    displayCart();
}

function removeOneFromCart(name) {
    let item = cart.find(product => product.name === name); 
    if (!item) return;
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(product => product.name !== name);
    }   
    saveCart();
    displayCart();
}

        
//End of Cart System
// Payment system 

document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let cardNumber = document.getElementById("cardNumber").value.trim();
    let expiryDate = document.getElementById("expiryDate").value.trim();
    let cvv = document.getElementById("cvv").value.trim();

    // Validate card number (simple check for 16 digits)
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        alert("Please enter a valid 16-digit card number.");
        return;
    }
    // Validate expiry date (MM/YY format)
    let expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryPattern.test(expiryDate)) {
        alert("Please enter a valid expiry date in MM/YY format.");
        return;     
    }
    // Validate CVV (3 digits)
    if (cvv.length !== 3 || isNaN(cvv)) {
        alert("Please enter a valid 3-digit CVV.");
        return;
    }

    alert("Processing payment...");
   
    //Fake successful payment
    document.getElementById("paymentForm").style.display = "none";
    // clear cart
    setTimeout(function() {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "thanks.html";
    }, 1500);
});



// End of Payment system

