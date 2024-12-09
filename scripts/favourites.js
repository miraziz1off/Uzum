import '../src/favourites.css';
import "../src/style.css"; 
import { reload } from '../scripts/utils.js';
import { createProductCard } from '../components/productsIndex.js';

const mainContainer = document.querySelector('.favourites-container'); 

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};

const fetchUsers = () => {
  return fetch('http://localhost:3001/users') 
    .then((res) => res.json()) 
    .then((users) => {
      return users;
    })
    .catch((error) => {
      console.error('Ошибка при получении пользователей:', error);
    });
};

const displayFavourites = () => {
  const currentUser = getCurrentUser();



  fetchUsers()
    .then((users) => {
      const user = users.find(user => user.phone === currentUser.phone);

      
      const favouriteProducts = user.favourites; 

      
      const validFavouriteProducts = favouriteProducts.filter(product => product !== undefined && product !== null);
      reload(validFavouriteProducts, mainContainer, (product) => {
        if (product) { 
          const productCard = createProductCard(product);
          mainContainer.appendChild(productCard);
        }
      });
    })
    .catch((error) => {
      console.error('Ошибка при получении пользователей:', error);
    });
};

document.addEventListener('DOMContentLoaded', displayFavourites); 
