
const logoImage = document.getElementById('logo1');

logoImage.onclick = ()=>{
  window.location.href = './index.html'
  
}

function fetchedProducts() {
    return fetch('./db.json')
      .then((res) => res.json())
      .then((data) => data.products);
  }


const searchInput = document.querySelector('.search-nav input[type="search"]');
const modalForSearch = document.querySelector('.modal-for-search');
// const swiper1 = document.querySelector('.swiper');

searchInput.addEventListener('focus', () => {
  modalForSearch.classList.remove('hidden');
  // main.style.filter = 'blur(5px)';
  // swiper1.style.filter = 'blur(5px)';
});

document.addEventListener('click', (e) => {
  if (!modalForSearch.contains(e.target) && e.target !== searchInput) {
    modalForSearch.classList.add('hidden');
    // main.style.filter = 'blur(0px)';
    // swiper1.style.filter = 'blur(0px)';
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
  });

catalogButton.addEventListener('click', () => {
  modalForCatalog.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!modalForCatalog.contains(e.target) && e.target !== catalogButton) {
    modalForCatalog.classList.add('hidden');
  }
});


const modalOverlay = document.getElementById('modal-overlay');
const modal = document.querySelector('.modal-for-number');
const closeModal = document.getElementById('close-modal');
const openModalBtn = document.querySelector('.text-for-account');
const phoneInput = document.getElementById('phoneInput');

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
fetchedProducts()
  .then((products) => {
    setupSearch(products); 
    createCatalogModal(products, modalForCatalog); 
  })
  .catch((error) => console.error(error));
