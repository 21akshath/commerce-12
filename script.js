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

const productList = document.getElementById("product-list");
const cartCounter = document.getElementById("cart");
const cartModal = document.getElementById("cart-modal");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function displayProducts(list) {
  productList.innerHTML = "";
  list.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <div>
        <label>Rating:</label>
        <select id="rating-${index}">
          <option value="5">★★★★★</option>
          <option value="4">★★★★☆</option>
          <option value="3">★★★☆☆</option>
          <option value="2">★★☆☆☆</option>
          <option value="1">★☆☆☆☆</option>
        </select>
      </div>
      <div>
        <textarea id="review-${index}" rows="2" placeholder="Write a review..."></textarea>
      </div>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

displayProducts(products);

// Add to cart with review
function addToCart(index) {
  const rating = document.getElementById(`rating-${index}`).value;
  const reviewText = document.getElementById(`review-${index}`).value;
  products[index].reviews.push({rating, text: reviewText});
  cart.push(products[index]);
  cartCounter.textContent = `Cart (${cart.length})`;
}

// Category filter
function filterCategory() {
  const selected = document.getElementById("category-select").value;
  if(selected === "All") {
    displayProducts(products);
  } else {
    displayProducts(products.filter(p => p.category === selected));
  }
}

// Cart modal functions
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
