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
    });
};

const displayFavourites = () => {
  const currentUser = getCurrentUser();



  fetchUsers()
    .then((users) => {
      const user = users.find(user => user.phone === currentUser.phone);

      
      const favouriteProducts = user.favourites; 

      
      const validFavouriteProducts = favouriteProducts.filter(product => product !== undefined || null);
      reload(validFavouriteProducts, mainContainer, (product) => {
        if (product) { 
          const productCard = createProductCard(product);
          mainContainer.appendChild(productCard);
        }
      });
      const main = document.querySelector('main');

      if(validFavouriteProducts.length === 0 || null || undefined){
        const nofound = document.querySelector('.nofound');
        nofound.style.display = 'flex';
        main.style.display = 'none';
      }else{
        main.style.display = 'block';
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

document.addEventListener('DOMContentLoaded', displayFavourites); 


