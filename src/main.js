import './style.css';
import './media.css';
import { reload } from '../scripts/utils.js';
import { createProductCard } from '../components/productsIndex.js';
import axios from 'axios';


const logobutton = document.querySelector('#logo1');
logobutton.onclick = ()=>{
  window.location.hred = './index.html'
}

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

    categoryItem.addEventListener('click', () => {
      localStorage.setItem('selectedCategory', category); 
      window.location.href = './catalog.html';
    });

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


document.getElementById("loginBtn").addEventListener("click", () => {
  document.getElementById("modal-overlay").classList.remove("hidden");
  fetch("http://localhost:3001/users")
      .then(response => response.json())
      .then(users => setupPhoneModal(users));
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("modal-overlay").classList.add("hidden");
});

const setupPhoneModal = (users) => {
  const phoneInput = document.getElementById("phoneInput");
  const nameInput = document.getElementById("nameSection");
  const submitButton = document.getElementById("submitButton");
  const logoutButton = document.getElementById("logoutButton");
  const loginBtn = document.getElementById("loginBtn");

  submitButton.onclick = () => {
      const phone = phoneInput.value.trim();
      if (!phone) {
          return;
      }

      const existingUser = users.find(user => user.phone === phone);
      if (existingUser) {
          loginBtn.textContent = existingUser.name;
          document.getElementById("modal-overlay").classList.add("hidden");
      } else {
          nameInput.style.display = "block";
          nameInput.oninput = () => {
              if (nameInput.value.trim()) {
                  submitButton.textContent = "Создать аккаунт";
                  submitButton.onclick = () => {
                      const name = nameInput.value.trim();
                      if (!name) {
                          alert("Введите имя.");
                          return;
                      }

                      const newUser = {
                          phone,
                          name,
                          liked: [],
                          favourites: []
                      };

                      fetch("http://localhost:3001/users", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(newUser)
                      })
                      .then(response => response.json())
                      .then(createdUser => {
                          loginBtn.textContent = createdUser.name;
                          document.getElementById("modal-overlay").classList.add("hidden");
                      });
                  };
              }
          };
      }
  };

  logoutButton.onclick = () => {
      loginBtn.textContent = "Войти";
      phoneInput.value = "";
      nameInput.value = "";
      nameInput.style.display = "none";
      logoutButton.style.display = "none";
      document.getElementById("modal-overlay").classList.add("hidden");
  };
};
const nameInput = document.getElementById("nameSection");
const submitButton = document.getElementById("submitButton");
const logoutButton = document.getElementById("logoutButton");
const loginText = document.querySelector(".text-for-account");

const API_URL = "http://localhost:3001/users";

document.addEventListener("DOMContentLoaded", () => {
const storedUser = JSON.parse(localStorage.getItem("currentUser"));

if (storedUser) {
  handleLoggedInState(storedUser);
}
});

async function authenticateUser(phone) {
try {
  const response = await fetch(API_URL);
  const users = await response.json();

  const user = users.find((user) => user.phone === phone);

  if (user) {
    handleLoggedInState(user);
  } else {
    nameInput.style.display = "block";
    nameInput.focus();
  }
} catch (error) {
  console.error(error);
}
}

async function registerUser(phone, name) {
const newUser = {
  phone,
  name,
  liked: [],
  favourites: [],
};

try {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(newUser),
  });

  if (response.ok) {
    handleLoggedInState(newUser);
  } else {
    console.error("Ошибка при регистрации пользователя");
  }
} catch (error) {
  console.error(error);
}
}

function handleLoggedInState(user) {
localStorage.setItem("currentUser", JSON.stringify(user));
loginText.textContent = user.name;
phoneInput.style.display = "none";
nameInput.style.display = "none";
submitButton.style.display = "none";
logoutButton.style.display = "block";
const sendsmsP = document.querySelector('.sendsms');
const writenumberP = document.querySelector('.writenumber');

writenumberP.textContent = 'Вы успешно вошли в аккаунт';
sendsmsP.textContent = 'Чтобы выйти нажмите на кнопку';
}

logoutButton.addEventListener("click", () => {
localStorage.removeItem("currentUser");
loginText.textContent = "Войти";
phoneInput.style.display = "block";
submitButton.style.display = "block";
logoutButton.style.display = "none";
nameInput.style.display = "none";
phoneInput.value = "";
nameInput.value = "";
});

submitButton.addEventListener("click", () => {
const phone = phoneInput.value.trim();
const name = nameInput.value.trim();

if (!phone) {
  alert("Введите номер телефона!");
  return;
}

const storedUser = JSON.parse(localStorage.getItem("currentUser"));

if (!storedUser) {
  authenticateUser(phone).then(() => {
    if (nameInput.style.display === "block" && name) {
      registerUser(phone, name);
    }
  });
}
});
