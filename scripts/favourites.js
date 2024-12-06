import '../src/favourites.css'
import "../src/style.css" 


// Assuming your `users.json` is available at the backend
const API_URL = 'http://localhost:3001/users';  // Your API URL

// Get the heart button elements
const heartButtons = document.querySelectorAll('.heart-btn');

// Add event listener to each heart button
heartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const productId = e.target.dataset.productId; // Get the product ID from data attribute
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      // Add product to favorites
      addToFavorites(currentUser, productId);
    } else {
      // Prompt to log in if user is not logged in
      alert("Please log in to add to favorites");
    }
  });
});

// Function to add the product to the user's favorites
async function addToFavorites(user, productId) {
  try {
    // Fetch the current user from the backend
    const response = await fetch(`${API_URL}/${user.phone}`);
    const updatedUser = await response.json();

    // Add product ID to the favourites array
    if (!updatedUser.favourites.includes(productId)) {
      updatedUser.favourites.push(productId);

      // Update the user's favourites on the backend
      await fetch(`${API_URL}/${user.phone}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favourites: updatedUser.favourites })
      });

      alert('Product added to favorites!');

      // Optionally, update the local storage user to reflect changes
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Update the UI to show this product is in favorites
      updateFavoritesDisplay(updatedUser.favourites);
    }
  } catch (error) {
    console.error('Error updating favorites:', error);
  }
}

// Function to update the UI with the user's favorite products
function updateFavoritesDisplay(favourites) {
  const favoritesList = document.querySelector('.favorites-list'); // Example selector
  favoritesList.innerHTML = ''; // Clear the list

  favourites.forEach((productId) => {
    const productCard = document.createElement('div');
    productCard.classList.add('favorite-item');
    productCard.textContent = `Product ${productId}`; // You can fetch the product details here
    favoritesList.appendChild(productCard);
  });
}
