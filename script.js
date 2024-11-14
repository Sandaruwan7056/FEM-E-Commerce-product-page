const slides = document.querySelectorAll(".slide");
const thumbnails = document.querySelectorAll(".thumbnail");

let slideIndex = 0;
document.addEventListener('DOMContentLoaded', () => {
  initialstate();
});


function initialstate() {
  
  slides[slideIndex].classList.add("displaySlide");

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      currentSlide(index);
      thumbnails.forEach((overlay) => {
        overlay.classList.remove("thumbnail-active");
      });
      thumbnail.classList.add("thumbnail-active");
    });
  });
}
function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex = index;
  }
  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  slides[slideIndex].classList.add("displaySlide");
}
function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

function currentSlide(n) {
  showSlide(n);
}

const quantityCount = document.getElementById("quantity");
const decQuantity = document.getElementById("decQuantity");
const incQuantity = document.getElementById("incQuantity");
const itemNo = document.getElementById("itemNo");

let count = 0;
let totalQty = 0;

quantityCount.textContent = count;
itemNo.textContent = count;

incQuantity.addEventListener("click", function () {
  count++;
  quantityCount.textContent = count;
});

decQuantity.addEventListener("click", function () {
  if (count > 0) {
    count--;
    quantityCount.textContent = count;
  }
});

//nav menu toggle

const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const linksArea = document.querySelector(".links-area");
const overlay = document.getElementById("overlay");

function toggleMenu() {
  linksArea.classList.toggle("expanded");
  overlay.classList.toggle("expanded");
}

openBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);

// cart function

const cartIcon = document.getElementById("cart-icon");
const cartContainer = document.querySelector(".cart-container");
const addToCart = document.getElementById("addToCart");
const checkoutBtn = document.getElementById("checkout");
const cartItems = document.querySelector(".cart-items");
const cartEmptyText = document.querySelector(".cart-empty-text");

cartIcon.addEventListener("click", function () {
  cartContainer.classList.toggle("active");
});
//dynamically update cart items when multiply items are added
function updateTotalQuantity() {
  const cartItemList = document.querySelectorAll(".cart-item");
  let totalQty = 0;
  cartItemList.forEach((item) => {
    totalQty += parseInt(item.dataset.quantity);
  });
  itemNo.textContent = totalQty;
}

const addItemTocart = (name, price, img) => {
  const totalPrice = price * count.toFixed(2);

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.dataset.quantity = count;

  cartItem.innerHTML = `
  <img src="${img}" alt="${name}"/> 
  <div class="item-details">
    <p class="cart-item-name">${name}</p>
    <div class="cart-items-price-area">
      <p>
        $${price} x ${count}
       <p class="total-price">$${totalPrice}</p>
      </p>
    </div>
  </div>
  <button class="delete-btn">
    <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/>
      </defs>
      <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/>
    </svg>
  </button>
`;
  cartItems.appendChild(cartItem);
  updateTotalQuantity();

  if (cartItems.classList.contains("empty")) {
    cartItems.classList.remove("empty");
    checkoutBtn.classList.remove("empty");
    cartEmptyText.classList.remove("empty");
  }
};

addToCart.addEventListener("click", function () {
  if (count === 0) return;

  const productTitle = document.querySelector(".product-header").textContent;
  const productPrice = document.querySelector(".current-price");
  const currentPrice = parseFloat(productPrice.textContent.replace("$", ""));
  const Image = document.querySelector(".slide").getAttribute("src");

  addItemTocart(productTitle, currentPrice, Image);
  cartContainer.classList.add("active");

  count = 0;
  quantityCount.textContent = count;
});

// delete btn in cart

cartItems.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("delete-btn") ||
    e.target.closest(".delete-btn")
  ) {
    const deleteCartItem = e.target.closest(".cart-item");
    if (deleteCartItem) {
      removeCartItem(deleteCartItem);
    }
  }
});

function removeCartItem(cartItem) {
  cartItem.remove();
  updateTotalQuantity();

  if (cartItems.children.length < 1) {
    cartItems.classList.add("empty");
    checkoutBtn.classList.add("empty");
    cartEmptyText.classList.add("empty");
  }
}


