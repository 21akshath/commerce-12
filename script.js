const products = [
  { name: "Wrist Watch", price: 1999, desc: "Stylish wrist watch for all occasions.", image: "https://source.unsplash.com/300x200/?watch", reviews: [] },
  { name: "Sports Shoes", price: 2499, desc: "Comfortable and durable sports shoes.", image: "https://source.unsplash.com/300x200/?shoes", reviews: [] },
  { name: "Bluetooth Speaker", price: 1299, desc: "Portable speaker with deep bass.", image: "https://source.unsplash.com/300x200/?speaker", reviews: [] },
  { name: "Backpack", price: 899, desc: "Durable backpack for travel or school.", image: "https://source.unsplash.com/300x200/?backpack", reviews: [] },
  { name: "Headphones", price: 1599, desc: "Noise-cancelling over-ear headphones.", image: "https://source.unsplash.com/300x200/?headphones", reviews: [] },
  { name: "Sunglasses", price: 749, desc: "Trendy sunglasses to protect your eyes.", image: "https://source.unsplash.com/300x200/?sunglasses", reviews: [] },
  { name: "Perfume", price: 1099, desc: "Refreshing fragrance for all day.", image: "https://source.unsplash.com/300x200/?perfume", reviews: [] },
  { name: "Keyboard", price: 1299, desc: "Mechanical keyboard with RGB lights.", image: "https://source.unsplash.com/300x200/?keyboard", reviews: [] },
  { name: "Table Lamp", price: 699, desc: "Stylish table lamp for your room.", image: "https://source.unsplash.com/300x200/?lamp", reviews: [] },
  { name: "Jacket", price: 2199, desc: "Warm jacket perfect for winters.", image: "https://source.unsplash.com/300x200/?jacket", reviews: [] }
];

let cart = [];
let currentIndex = null;

const productListTop = document.getElementById("product-list-top");
const productListBottom = document.getElementById("product-list-bottom");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-desc");
const reviewRating = document.getElementById("review-rating");
const reviewText = document.getElementById("review-text");
const submitReviewBtn = document.getElementById("submit-review-btn");

const cartCounter = document.getElementById("cart");
const cartModal = document.getElementById("cart-modal");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Split products top 5 / bottom 5
const topProducts = products.slice(0, 5);
const bottomProducts = products.slice(5, 10);

function displayProducts(list, container) {
  list.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="openModal('${index + (container === productListBottom ? 5 : 0)}')">View Details</button>
    `;
    container.appendChild(card);
  });
}

displayProducts(topProducts, productListTop);
displayProducts(bottomProducts, productListBottom);

// Modal functions
function openModal(index) {
  currentIndex = index;
  const product = products[index];
  modalImg.src = product.image;
  modalName.textContent = product.name;
  modalPrice.textContent = `₹${product.price}`;
  modalDesc.textContent = product.desc;
  reviewRating.value = 5;
  reviewText.value = "";
  modal.style.display = "flex";
}

function closeModal() { modal.style.display = "none"; }

// Submit review & add to cart
submitReviewBtn.addEventListener("click", () => {
  const rating = reviewRating.value;
  const text = reviewText.value;
  if (currentIndex !== null) {
    products[currentIndex].reviews.push({ rating, text });
    cart.push(products[currentIndex]);
    cartCounter.textContent = `Cart (${cart.length})`;
    closeModal();
  }
});

// Cart functions
function openCart() { cartModal.style.display = "flex"; renderCart(); }
function closeCart() { cartModal.style.display = "none"; }

function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} - ₹${item.price}</span>
      <button onclick="removeFromCart(${idx})">Remove</button>
    `;
    cartItemsDiv.appendChild(div);
  });
  cartTotal.textContent = `Total: ₹${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  cartCounter.textContent = `Cart (${cart.length})`;
  renderCart();
}
