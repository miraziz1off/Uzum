import "../src/liked.css"
import "../src/style.css" 
import { createProductCard } from "../components/productsIndex.js";
import { reload } from "./utils.js";

const logoImage = document.getElementById('logo1');

logoImage.onclick = ()=>{
  window.location.href = './index.html'
  
}
document.addEventListener("DOMContentLoaded", async () => {
  const quantityInput = document.getElementById("quantity");
  const increaseBtn = document.getElementById("increase");
  const decreaseBtn = document.getElementById("decrease");

  const currentProductId = parseInt(localStorage.getItem("id"));
  const response = await fetch("./db.json");
  const data = await response.json();
  const product = data.products.find((p) => p.id === currentProductId);


  const maxStock = product.stock;

  increaseBtn.addEventListener("click", () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue < maxStock) {
      quantityInput.value = currentValue + 1;
    }else{};
  });
  decreaseBtn.addEventListener("click", () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });
});


const currentProductId = parseInt(localStorage.getItem('id'));


async function Products() {
  const response = await fetch('./db.json');
  const data = await response.json();
  const products1 = data.products;

  const currentProduct = products1.find(product => product.id === currentProductId);
  
  const titleProd = document.querySelector('.titleProd');
  titleProd.innerHTML = `${currentProduct.title}`;

  const imagesAll = document.querySelectorAll('.img1');
  imagesAll.forEach(img => {
    img.src = currentProduct.thumbnail;});

    const priceElement = document.querySelector('.newPrice');
    priceElement.innerHTML = `${currentProduct.price} сум`;

    if (currentProduct.discountPercentage) {
      const oldPriceElement = document.querySelector('.OldPrice');
      const oldPrice = currentProduct.price / (1 - currentProduct.discountPercentage / 100); 
      oldPriceElement.innerHTML = `${Math.round(oldPrice)} сум`; 

    }
     const descriptionElement = document.querySelector('.desc');
     const desc2 = document.querySelector('.desc2');
     desc2.innerHTML = `${currentProduct.description}`;
    descriptionElement.innerHTML = `${currentProduct.description}`;
    generateSimilarProducts(products1, currentProduct.category);
}

function generateSimilarProducts(products, category) {
  const similarProducts = products
    .filter((product) => product.category === category && product.id !== currentProductId)
    .slice(0, 5); 

  const productsContainer = document.querySelector(".forProducts"); 
  reload(similarProducts, productsContainer, createProductCard);
}
Products()