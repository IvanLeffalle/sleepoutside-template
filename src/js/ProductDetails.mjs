export default class ProductDetails {
  constructor(productID, dataSource) {
    this.productID = productID;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productID);
      console.log("Initialized Product:", this.product);
      this.renderProductDetails();
    } catch (error) {
      console.error("Error initializing product details:", error);
    }
  }

  renderProductDetails() {
    if (!this.product) {
      console.error("No product data available to render.");
      return;
    }
    console.log("Render product details:", this.product);
  }
}
