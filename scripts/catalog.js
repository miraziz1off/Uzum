import '../src/style.css';
import '../src/catalog.css';
import { createProductCard } from '../components/productsIndex.js';
import { reload } from '../scripts/utils.js';

const selectedCategory = localStorage.getItem('selectedCategory');
const main = document.querySelector('main');

// Элементы фильтрации
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const filterButton = document.getElementById('filterButton');

const fetchedProducts = () => {
  return fetch('../public/db.json')
    .then((res) => res.json())
    .then((data) => data.products);
};

const products1 = document.querySelector('.products');

// Отображение продуктов по категории и диапазону цен
const displayCategoryProducts = (category, minPrice = 0, maxPrice = Infinity) => {
  fetchedProducts()
    .then((products) => {
      const filteredProducts = products.filter(product => 
        product.category === category &&
        parseFloat(product.price) >= minPrice &&
        parseFloat(product.price) <= maxPrice
      );
      if (filteredProducts.length > 0) {
        reload(filteredProducts, products1, createProductCard);
      } else {
        products1.innerHTML = `<p>Продукты для категории "${category}" в заданном ценовом диапазоне не найдены.</p>`;
      }
    });
};

// Обработчик кнопки фильтрации
filterButton.addEventListener('click', () => {
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  if (selectedCategory) {
    displayCategoryProducts(selectedCategory, minPrice, maxPrice);
  } else {
    main.innerHTML = '<p>Категория не выбрана.</p>';
  }
});

// Изначальное отображение продуктов
if (selectedCategory) {
  displayCategoryProducts(selectedCategory);
  localStorage.removeItem('selectedCategory'); // Очистка после использования
} else {
  main.innerHTML = '<p>Категория не выбрана.</p>';
}
