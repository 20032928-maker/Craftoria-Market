let currentUserType = "";

// Login state
let isLoggedIn = false;
let currentUser = "";

// -- Product Data --
const products = [
  {
    name: 'Handmade Vase',
    price: 40,
    desc: 'A beautiful ceramic vase made by artisan.',
    img: 'items/handmade vase.jpg'
  },
  {
    name: 'Wool Knit Scarf',
    price: 25,
    desc: 'Warm and cozy wool scarf.',
    img: 'items/wool knit scarf.jpg'
  },
  {
    name: 'Wooden Photo Frame',
    price: 35,
    desc: 'Handcrafted wooden frame for your memories.',
    img: 'items/wooden photo frame.jpg'
  },
  {
    name: 'Abstract Canvas Art',
    price: 120,
    desc: 'Original abstract painting on canvas.',
    img: 'items/abstract canvas.jpg'
  },
  {
    name: 'Beaded Bracelet',
    price: 15,
    desc: 'Colorful handmade beaded jewelry.',
    img: 'items/beaded bracelet.jpg'
  },
  {
    name: 'Woven Basket',
    price: 30,
    desc: 'Eco-friendly woven basket by local artisans.',
    img: 'items/woven basket.jpg'
  },
  {
    name: 'Embroidered Cushion',
    price: 28,
    desc: 'Decorative cushion with unique embroidery.',
    img: 'items/embroidered cushion.jpg'
  },
  {
    name: 'Hand-painted Mug',
    price: 20,
    desc: 'Ceramic mug with hand-painted designs.',
    img: 'items/hand painted mug.jpg'
  }
];

function renderProducts(productList) {
  const productsGrid = document.getElementById('productsGrid');
  productsGrid.innerHTML = ''; 

  productList.forEach(product => {
    productsGrid.innerHTML += `
      <div class="product-card">
        <img src="${product.img}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <p>${product.desc}</p>
        <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
      </div>
    `;
  });
}


// -- Cart State --
let cart = [];

function updateCart() {
  document.getElementById("cartCount").textContent = cart.length;
  const list = document.getElementById("cartItemsList");
  list.innerHTML = "";
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (cart.length === 0) {
    list.innerHTML = "<li>Your cart is empty.</li>";
    checkoutBtn.style.display = "none";
  } else {
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.name + " - $" + item.price;
      list.appendChild(li);
    });
    checkoutBtn.style.display = "inline-block";
  }
}


function addToCart(name, price) {
  cart.push({name, price});
  updateCart();
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const userType = document.getElementById("userType").value;
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!userType) {
    document.getElementById("loginResult").textContent = "Please select User Type.";
    return;
  }
  if (username.length === 0) {
    document.getElementById("loginResult").textContent = "Please enter a username.";
    return;
  }
  if (password.length === 0) {
    document.getElementById("loginResult").textContent = "Please enter a password.";
    return;
  }

  // Successful login for any input
  isLoggedIn = true;
  currentUser = username;
  currentUserType = userType;

  document.getElementById("loginResult").textContent = "Welcome, " + username + " (" + userType + ")";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("logoutBtn").style.display = "inline-block";

  document.getElementById("loginSection").style.display = "none";
  document.getElementById("productSection").style.display = "";
  document.getElementById("artistSection").style.display = "none";
  renderProducts(products);
});

// Navigation Logic (Updated)
document.getElementById("shopLink").onclick = function() {
  if (isLoggedIn) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("artistSection").style.display = "none";
    document.getElementById("productSection").style.display = "";
    renderProducts(products);
  } else {
    alert("Please login first!");
    document.getElementById("productSection").style.display = "none";
    document.getElementById("artistSection").style.display = "none";
    document.getElementById("loginSection").style.display = "";
  }
};

document.getElementById("homeLink").onclick = function() {
  document.getElementById("productSection").style.display = "none";
  document.getElementById("artistSection").style.display = "none";
  document.getElementById("loginSection").style.display = "";
  
  if (isLoggedIn) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline-block";
  } else {
    document.getElementById("loginForm").style.display = "flex";
    document.getElementById("logoutBtn").style.display = "none";
  }
};

document.getElementById("loginLink").onclick = function() {
  document.getElementById("productSection").style.display = "none";
  document.getElementById("artistSection").style.display = "none";
  document.getElementById("loginSection").style.display = "";
  
  if (isLoggedIn) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline-block";
  } else {
    document.getElementById("loginForm").style.display = "flex";
    document.getElementById("logoutBtn").style.display = "none";
  }
};

document.getElementById("artistLink").onclick = function() {
  if (isLoggedIn) {
    document.getElementById("productSection").style.display = "none";
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("artistSection").style.display = "";
  } else {
    alert("Please login first!");
    document.getElementById("productSection").style.display = "none";
    document.getElementById("artistSection").style.display = "none";
    document.getElementById("loginSection").style.display = "";
  }
};


// --- Basic Search ---
function searchProducts() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();

  // Filter products by name or description containing the search text
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchValue) ||
    product.desc.toLowerCase().includes(searchValue)
  );

  // Show filtered products on the page
  renderProducts(filteredProducts);
}

// --- Cart Dropdown Logic ---
const cartBtn = document.getElementById("cartBtn");
const cartDropdown = document.getElementById("cartDropdown");
cartBtn.onclick = function(e) {
  e.stopPropagation();
  cartDropdown.classList.toggle("show");
};
window.onclick = function(e) {
  if (!cartDropdown.contains(e.target) && !cartBtn.contains(e.target)) {
    cartDropdown.classList.remove("show");
  }
};

updateCart();
const paymentModal = document.getElementById("paymentModal");
const closePayment = document.getElementById("closePayment");
const paymentForm = document.getElementById("paymentForm");
const paymentMsg = document.getElementById("paymentMsg");

function showPaymentModal() {
  paymentModal.style.display = "block";
  paymentMsg.textContent = "";
}

closePayment.onclick = function() {
  paymentModal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == paymentModal) {
    paymentModal.style.display = "none";
  }
};

paymentForm.onsubmit = function(e) {
  e.preventDefault();
  paymentMsg.textContent = "Payment successful! Thank you for your purchase.";
  setTimeout(() => { paymentModal.style.display = "none"; }, 1800);
};
document.getElementById("checkoutBtn").addEventListener("click", showPaymentModal);
document.getElementById("logoutBtn").onclick = function() {
  isLoggedIn = false;
  currentUser = "";
  currentUserType = "";

  cart = [];
  updateCart();

  document.getElementById("loginForm").style.display = "flex";
  document.getElementById("logoutBtn").style.display = "none";
  document.getElementById("loginResult").textContent = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("userType").value = "";

  document.getElementById("productSection").style.display = "none";
  document.getElementById("artistSection").style.display = "none";
  document.getElementById("loginSection").style.display = "";

  alert("You have been logged out successfully!");
};

