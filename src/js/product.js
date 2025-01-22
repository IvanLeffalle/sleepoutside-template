import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParams } from "./utils.mjs";
const dataSource = new ProductData("tents");
import ProductDetails from "./ProductDetails.mjs";

function addProductToCart(product) {
  // add product to cart
  let cart = getLocalStorage("so-cart");
  if (!cart) cart = [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

const productID = getParams("product");
console.log("Product ID from URL:", productID);

async function renderProduct() {
  try {
    const product = await dataSource.findProductById(productID);
    console.log("Product Data:", product);
    document.getElementById("brand").textContent = product.Brand.Name;
    document.getElementById("name").textContent = product.NameWithoutBrand;
    document.getElementById("productImage").src = product.Image;
    document.getElementById("price").textContent = `$${product.FinalPrice}`;
    document.getElementById("color").textContent = product.Colors.ColorName;
    document.getElementById("description").innerHTML =
      product.DescriptionHtmlSimple;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}

renderProduct();

const product = new ProductDetails(productID, dataSource);
product.init();
