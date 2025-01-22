import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");
  if (cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join("");
  }
  renderTotalCart(cartItems);
}
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
<p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No color"}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function renderTotalCart(cartItems) {
  const total =
    cartItems?.reduce(
      (totalCart, currentItem) =>
        totalCart + currentItem.FinalPrice * (currentItem.Quantity || 1),
      0,
    ) ?? 0;

  console.log(total);

  const cartTotalHTML = document.querySelector(".cart-total");
  if (total === 0) {
    cartTotalHTML.innerHTML = "";
    cartTotalHTML.parentNode.classList.add("hide");
  } else {
    cartTotalHTML.innerHTML = `Total: $${total.toFixed(2)}`;
    cartTotalHTML.parentNode.classList.remove("hide");
  }
}
renderCartContents();
