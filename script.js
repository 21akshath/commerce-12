const products = [
  { name: "Wrist Watch", price: 1999, category:"Fashion", image:"https://source.unsplash.com/300x200/?watch", reviews:[] },
  { name: "Sports Shoes", price: 2499, category:"Fashion", image:"https://source.unsplash.com/300x200/?shoes", reviews:[] },
  { name: "Bluetooth Speaker", price: 1299, category:"Electronics", image:"https://source.unsplash.com/300x200/?speaker", reviews:[] },
  { name: "Backpack", price: 899, category:"Accessories", image:"https://source.unsplash.com/300x200/?backpack", reviews:[] },
  { name: "Headphones", price: 1599, category:"Electronics", image:"https://source.unsplash.com/300x200/?headphones", reviews:[] },
  { name: "Sunglasses", price: 749, category:"Accessories", image:"https://source.unsplash.com/300x200/?sunglasses", reviews:[] },
  { name: "Perfume", price: 1099, category:"Fashion", image:"https://source.unsplash.com/300x200/?perfume", reviews:[] },
  { name: "Keyboard", price: 1299, category:"Electronics", image:"https://source.unsplash.com/300x200/?keyboard", reviews:[] },
  { name: "Table Lamp", price: 699, category:"Accessories", image:"https://source.unsplash.com/300x200/?lamp", reviews:[] },
  { name: "Jacket", price: 2199, category:"Fashion", image:"https://source.unsplash.com/300x200/?jacket", reviews:[] }
];

let cart = [];
let currentModalIndex = null;

const featuredList = document.getElementById("featured-list");
const productList = document.getElementById("product-list");
const reviewsList = document.getElementById("reviews-list");
const cartCounter = document.getElementById("cart");
const cartModal = document.getElementById("cart-modal");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-desc");

// Featured Products (top 3)
function displayFeatured() {
  featuredList.innerHTML="";
  const top = products.slice(0,3);
  top.forEach((product,index)=> {
    const card = createProductCard(product,index);
    featuredList.appendChild(card);
  });
}

// All Products
function displayProducts(list) {
  productList.innerHTML="";
  list.forEach((product,index)=> {
    const card = createProductCard(product,index);
    productList.appendChild(card);
  });
}

// Create Product Card with review
function createProductCard(product,index) {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML=`
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>₹${product.price}</p>
    <div class="review-section">
      <label>Rating:</label>
      <select id="rating-${index}">
        <option value="5">★★★★★</option>
        <option value="4">★★★★☆</option>
        <option value="3">★★★☆☆</option>
        <option value="2">★★☆☆☆</option>
        <option value="1">★☆☆☆☆</option>
      </select>
      <textarea id="review-${index}" rows="2" placeholder="Write a review..."></textarea>
      <button onclick="submitReview(${index})">Submit Review</button>
    </div>
    <button onclick="openModal(${index})">View Details</button>
  `;
  return card;
}

// Submit review
function submitReview(index) {
  const rating = document.getElementById(`rating-${index}`).value;
  const text = document.getElementById(`review-${index}`).value;
  if(text.trim()==="") { alert("Write something!"); return; }
  products[index].reviews.push({rating,text});
  document.getElementById(`review-${index}`).value="";
  displayReviews();
}

// Display reviews at bottom
function displayReviews() {
  reviewsList.innerHTML="";
  products.forEach(product=>{
    product.reviews.forEach(r=>{
      const div = document.createElement("div");
      div.classList.add("review-card");
      div.innerHTML=`<strong>${product.name}</strong> - Rating: ${r.rating}/5<p>${r.text}</p>`;
      reviewsList.appendChild(div);
    });
  });
}

// Modal functions
function openModal(index) {
  currentModalIndex=index;
  const product = products[index];
  modalImg.src=product.image;
  modalName.textContent=product.name;
  modalPrice.textContent=`₹${product.price}`;
  modalDesc.textContent=`Category: ${product.category}`;
  modal.style.display="flex";
}
function closeModal(){ modal.style.display="none"; }

// Cart functions
function addToCart(index){
  cart.push(products[index]);
  cartCounter.textContent=`Cart (${cart.length})`;
  renderCart();
}
function openCart(){ cartModal.style.display="flex"; renderCart(); }
function closeCart(){ cartModal.style.display="none"; }
function renderCart(){
  cartItemsDiv.innerHTML="";
  let total=0;
  cart.forEach((item,idx)=>{
    total+=item.price;
    const div=document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML=`<span>${item.name} - ₹${item.price}</span>
                   <button onclick="removeFromCart(${idx})">Remove</button>`;
    cartItemsDiv.appendChild(div);
  });
  cartTotal.textContent=`Total: ₹${total}`;
}
function removeFromCart(index){ cart.splice(index,1); cartCounter.textContent=`Cart (${cart.length})`; renderCart(); }
function checkout(){
  if(cart.length===0) alert("Cart is empty!");
  else{ alert(`Order submitted!\nTotal: ₹${cart.reduce((a,b)=>a+b.price,0)}`); cart=[]; cartCounter.textContent=`Cart (0)`; renderCart(); }
}

// Category filter
function filterCategory(){
  const selected=document.getElementById("category-select").value;
  if(selected==="All") displayProducts(products);
  else displayProducts(products.filter(p=>p.category===selected));
}

// Initialize
displayFeatured();
displayProducts(products);
displayReviews();
