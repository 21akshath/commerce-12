const products = [
  { name: "Wrist Watch", price: 1999, category:"Fashion", image: "https://source.unsplash.com/300x200/?watch", reviews: [] },
  { name: "Sports Shoes", price: 2499, category:"Fashion", image: "https://source.unsplash.com/300x200/?shoes", reviews: [] },
  { name: "Bluetooth Speaker", price: 1299, category:"Electronics", image: "https://source.unsplash.com/300x200/?speaker", reviews: [] },
  { name: "Backpack", price: 899, category:"Accessories", image: "https://source.unsplash.com/300x200/?backpack", reviews: [] },
  { name: "Headphones", price: 1599, category:"Electronics", image: "https://source.unsplash.com/300x200/?headphones", reviews: [] },
  { name: "Sunglasses", price: 749, category:"Accessories", image: "https://source.unsplash.com/300x200/?sunglasses", reviews: [] },
  { name: "Perfume", price: 1099, category:"Fashion", image: "https://source.unsplash.com/300x200/?perfume", reviews: [] },
  { name: "Keyboard", price: 1299, category:"Electronics", image: "https://source.unsplash.com/300x200/?keyboard", reviews: [] },
  { name: "Table Lamp", price: 699, category:"Accessories", image: "https://source.unsplash.com/300x200/?lamp", reviews: [] },
  { name: "Jacket", price: 2199, category:"Fashion", image: "https://source.unsplash.com/300x200/?jacket", reviews: [] }
];

let cart = [];
let currentModalIndex = null;

const productList = document.getElementById("product-list");
const cartCounter = document.getElementById("cart");
const cartModal = document.getElementById("cart-modal");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-desc");
const modalAddBtn = document.getElementById("modal-add-btn");
const reviewsList = document.getElementById("reviews-list");

// Display products
function displayProducts(list) {
  productList.innerHTML = "";
  list.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="openModal(${index})">View Details</button>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}
displayProducts(products);

// Modal functions
function openModal(index) {
  currentModalIndex = index;
  const product = products[index];
  modalImg.src = product.image;
  modalName.textContent = product.name;
  modalPrice.textContent = `₹${product.price}`;
  modalDesc.textContent = `Category: ${product.category}`;
  modal.style.display = "flex";
}
function closeModal() { modal.style.display = "none"; }

// Add to cart
function addToCart(index) {
  cart.push(products[index]);
  cartCounter.textContent = `Cart (${cart.length})`;
  displayReviews();
}

// Display reviews at bottom
function displayReviews() {
  reviewsList.innerHTML = "";
  products.forEach(product => {
    product.reviews.forEach(r => {
      const div = document.createElement("div");
      div.classList.add("review-card");
      div.innerHTML = `<strong>${product.name}</strong> - Rating: ${r.rating}/5<p>${r.text}</p>`;
      reviewsList.appendChild(div);
    });
  });
}

// Category filter
function filterCategory() {
  const selected = document.getElementById("category-select").value;
  if(selected === "All") displayProducts(products);
  else displayProducts(products.filter(p => p.category === selected));
}

// Cart modal
function openCart() { cartModal.style.display = "flex"; renderCart(); }
function closeCart() { cartModal.style.display = "none"; }
function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<span>${item.name} - ₹${item.price}</span>
                     <button onclick="removeFromCart(${idx})">Remove</button>`;
    cartItemsDiv.appendChild(div);
  });
  cartTotal.textContent = `Total: ₹${total}`;
}
function removeFromCart(index) {
  cart.splice(index,1);
  cartCounter.textContent = `Cart (${cart.length})`;
  renderCart();
}

// Checkout
function checkout() {
  if(cart.length===0) alert("Your cart is empty!");
  else {
    alert(`Order submitted successfully!\nTotal: ₹${cart.reduce((a,b)=>a+b.price,0)}`);
    cart=[]; cartCounter.textContent=`Cart (0)`; renderCart(); displayReviews();
  }
}
