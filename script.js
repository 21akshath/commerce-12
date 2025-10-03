const products = [
  { name: "Wrist Watch", price: 1999, category:"Fashion", image:"https://images.unsplash.com/photo-1518546311437-9d0a2d7b23b4?auto=format&fit=crop&w=300&q=80", reviews:[] },
  { name: "Sports Shoes", price: 2499, category:"Fashion", image:"https://images.unsplash.com/photo-1600185363637-cd186b0d4a2f?auto=format&fit=crop&w=300&q=80", reviews:[] },
  { name: "Bluetooth Speaker", price: 1299, category:"Electronics", image:"https://images.unsplash.com/photo-1585386959984-a415522d70a6?auto=format&fit=crop&w=300&q=80", reviews:[] },
  { name: "Backpack", price: 899, category:"Accessories", image:"https://images.unsplash.com/photo-1596464716121-79c90fc29c42?auto=format&fit=crop&w=300&q=80", reviews:[] },
  { name: "Headphones", price: 1599, category:"Electronics", image:"https://images.unsplash.com/photo-1598300054993-2c91c8b9e5bc?auto=format&fit=crop&w=300&q=80", reviews:[] },
  { name: "Sunglasses", price: 749, category:"Accessories", image:"https://images.unsplash.com/photo-1585155779798-5b1324b2b2f3?auto=format&fit=crop&w=300&q=80", reviews:[] },
  { name: "Perfume", price: 1099, category:"Fashion", image:"https://images.unsplash.com/photo-1570714963686-88c2e6d8fc0e?auto=format&fit=crop&w=300&q=80", reviews:[] },
  { name: "Keyboard", price: 1299, category:"Electronics", image:"https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=300&q=80", reviews:[] },
  { name: "Table Lamp", price: 699, category:"Accessories", image:"https://images.unsplash.com/photo-1586075453567-0ff8893a21ec?auto=format&fit=crop&w=300&q=80", reviews:[] },
  { name: "Jacket", price: 2199, category:"Fashion", image:"https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=300&q=80", reviews:[] }
];

let cart = [];
let currentModalIndex = null;

const featuredList = document.getElementById("featured-list");
const productList = document.getElementById("product-list");
const reviewsList = document.getElementById("reviews-list");
const reviewProductSelect = document.getElementById("review-product");
const reviewRating = document.getElementById("review-rating");
const reviewText = document.getElementById("review-text");
const cartCounter = document.getElementById("cart");
const cartModal = document.getElementById("cart-modal");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-desc");

// Initialize Product Dropdown for Review
function initReviewDropdown() {
  reviewProductSelect.innerHTML = '<option value="">Select Product</option>';
  products.forEach((p, idx)=>{
    const option = document.createElement("option");
    option.value = idx;
    option.textContent = p.name;
    reviewProductSelect.appendChild(option);
  });
}

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
  list.forEach((product,index)=>{
    const card = createProductCard(product,index);
    productList.appendChild(card);
  });
}

// Create Product Card
function createProductCard(product,index) {
  const card = document.createElement("div");
  card.classList.add("product-card");
 card.innerHTML=`
  <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Image+Not+Found'">
  <h3>${product.name}</h3>
  <p>₹${product.price}</p>
  <button onclick="openModal(${index})">View Details</button>
  <button onclick="addToCart(${index})">Add to Cart</button>
`;
  return card;
}

// Submit Review (from bottom)
function submitReview(){
  const idx = reviewProductSelect.value;
  const rating = reviewRating.value;
  const text = reviewText.value.trim();
  if(idx === "" || text === "") { alert("Select product and write review!"); return; }
  products[idx].reviews.push({rating,text});
  reviewText.value = "";
  displayReviews();
}
// Display reviews at bottom
function displayReviews(){
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
function checkout(){ if(cart.length===0) alert("Cart is empty!"); else{ alert(`Order submitted!\nTotal: ₹${cart.reduce((a,b)=>a+b.price,0)}`); cart=[]; cartCounter.textContent=`Cart (0)`; renderCart(); } }

// Category filter
function filterCategory(){
  const selected=document.getElementById("category-select").value;
  if(selected==="All") displayProducts(products);
  else if(selected!=="") displayProducts(products.filter(p=>p.category===selected));
}

// Initialize
initReviewDropdown();
displayFeatured();
displayProducts(products);
displayReviews();


