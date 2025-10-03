const products = [
  { name: "Wrist Watch", price: 1999, category:"Fashion", image:"https://images.unsplash.com/photo-1518546311437-9d0a2d7b23b4?auto=format&fit=crop&w=300&q=80", reviews:[{rating:5,text:"Excellent watch!"}] },
  { name: "Sports Shoes", price: 2499, category:"Fashion", image:"https://images.unsplash.com/photo-1600185363637-cd186b0d4a2f?auto=format&fit=crop&w=300&q=80", reviews:[{rating:4,text:"Very comfortable."}] },
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
const cartCounter = document.getElementById("cart");
const cartModal = document.getElementById("cart-modal");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-desc");

// Display Featured Products (top 5)
function displayFeatured() {
  featuredList.innerHTML = "";
  const topProducts = products.slice(0,5);
  topProducts.forEach((product,index)=> {
    const card = createProductCard(product,index);
    featuredList.appendChild(card);
  });
}

// Display All Products
function displayProducts(list) {
  productList.innerHTML = "";
  list.forEach((product,index)=> {
    const card = createProductCard(product,index);
    productList.appendChild(card);
  });
}

// Create Product Card
function createProductCard(product,index){
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

// Modal functions
function openModal(index){
  currentModalIndex=index;
  const product = products[index];
  modalImg.src = product.image;
  modalName.textContent = product.name;
  modalPrice.textContent = `₹${product.price}`;
  modalDesc.textContent = `Category: ${product.category}`;
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
  else{
    alert(`Order submitted!\nTotal: ₹${cart.reduce((a,b)=>a+b.price,0)}`);
    cart=[];
    cartCounter.textContent=`Cart (0)`;
    renderCart();
  }
}

// Category filter using buttons
function filterCategory(category){
  if(category==="All") displayProducts(products);
  else displayProducts(products.filter(p=>p.category===category));
}

// Display user reviews on the left
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

// Display all products section
function displayAllProducts(){
  displayProducts(products);
}

// Initialize
displayFeatured();
displayProducts(products);
displayReviews();
