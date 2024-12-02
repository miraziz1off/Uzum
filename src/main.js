import './style.css';
import './media.css';
import { reload } from '../scripts/utils.js';
import { createProductCard } from '../components/productsIndex.js';
import axios from 'axios';

const swiper = new Swiper('.swiper', {
    spaceBetween: 0,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
});

function fetchedProducts() {
  return fetch('../public/db.json')
    .then((res) => res.json())
    .then((data) => data.products);
}

const createCatalog = (products, container) => {
  const categories = [...new Set(products.map(product => product.category))];

  categories.forEach((category) => {
    const section = document.createElement('section');
    section.className = `category-${category.toLowerCase()}`;

    const categoryTitle = document.createElement('p');
    categoryTitle.classList.add('title-category');
    categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);

    const divForProducts = document.createElement('div');
    divForProducts.classList.add(`divfor-${category.toLowerCase()}`);

    const filteredProducts = products.filter(product => product.category === category);
    reload(filteredProducts, divForProducts, createProductCard);

    section.appendChild(categoryTitle);
    section.appendChild(divForProducts);
    container.appendChild(section);
  });
};

const main = document.querySelector('main');

const init = () => {
  fetchedProducts()
    .then((products) => {
      createCatalog(products, main);
      setupSearch(products)
    })
};

init();


const searchInput = document.querySelector('.search-nav input[type="search"]');
const modalForSearch = document.querySelector('.modal-for-search');
const swiper1 = document.querySelector('.swiper');
searchInput.addEventListener('focus', () => {
  modalForSearch.classList.remove('hidden');
  main.style.filter = 'blur(5px)';
  swiper1.style.filter = 'blur(5px)';

});

document.addEventListener('click', (e) => {
  if (!modalForSearch.contains(e.target) && e.target !== searchInput) {
    modalForSearch.classList.add('hidden');
  main.style.filter = 'blur(0px)';
  swiper1.style.filter = 'blur(0px)';
  }
});



function setupSearch(products) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const results = products.filter(product => product.title.toLowerCase().includes(query));
    displaySearchResults(results);
  });
}

function displaySearchResults(results) {
  modalForSearch.innerHTML = '<p class="text-[#ACACAC] text-[12px]">Поиск</p>';
  if (results.length === 0) {
    modalForSearch.innerHTML += '<p>Нет результатов</p>';
  } else {
    results.forEach(product => {
      const resultItem = document.createElement('p');
      resultItem.textContent = product.title;
      resultItem.classList.add('search-result-item');
      resultItem.addEventListener('click', () => {
        localStorage.setItem('id', product.id);
        window.location.href = './liked.html';
      });
      modalForSearch.appendChild(resultItem);
    });
  }
}



//каталог

const catalogButton = document.querySelector('.katalog-button');
const modalForCatalog = document.querySelector('.modal-for-catalog');

const createCatalogModal = (products, container) => {
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  Object.entries(categoryCounts).forEach(([category, count]) => {
    const categoryItem = document.createElement('div');
    categoryItem.classList.add('category-item', 'flex', 'gap-3', 'mb-2');

    const categoryName = document.createElement('span');
    categoryName.textContent = category;

    const categoryCount = document.createElement('span');
    categoryCount.textContent = `${count} товаров`;
    categoryCount.classList.add('category-count');

    categoryItem.appendChild(categoryName);
    categoryItem.appendChild(categoryCount);
    container.appendChild(categoryItem);
  });
};

fetchedProducts()
  .then((products) => {
    createCatalogModal(products, modalForCatalog);
  })  

catalogButton.addEventListener('click', () => {
  modalForCatalog.classList.toggle('hidden'); 
});

document.addEventListener('click', (e) => {
  if (!modalForCatalog.contains(e.target) && e.target !== catalogButton) {
    modalForCatalog.classList.add('hidden');
  }
});




//modal for number


const modalOverlay = document.getElementById('modal-overlay'); 
const modal = document.querySelector('.modal-for-number'); 
const closeModal = document.getElementById('close-modal'); 
const openModalBtn = document.querySelector('.text-for-account'); 
const phoneInput = document.getElementById('phoneInput');
const loginBtn = document.getElementById('loginBtn');

function openModal() {
  modalOverlay.classList.add('active'); 
  modal.classList.add('active');
}

function closeModalWindow() {
  modalOverlay.classList.remove('active'); 
  modal.classList.remove('active'); 
}

closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  closeModalWindow();
});

openModalBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  openModal();
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) { 
    closeModalWindow();
  }
});




