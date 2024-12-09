
export function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
  
    const likeIcon = document.createElement('div');
    likeIcon.classList.add('like-icon');
    const likeImage = document.createElement('img');
    likeImage.src = '../assets/heart 1.png';
    likeImage.alt = 'Like Icon';
    likeIcon.appendChild(likeImage);
    productCard.appendChild(likeIcon);

    likeIcon.addEventListener('click', function() {
        likeImage.src = '../assets/blueliked.png';
    
        const currentUser = JSON.parse(localStorage.getItem('currentUser')); 
    
        fetch('http://localhost:3001/users')
    .then((res) => res.json())
    .then((users) => {
        const user = users.find(user => user.phone === currentUser.phone); 

        if (user) {
            const productId = product.id;
            const isProductInFavourites = user.favourites.some(fav => fav.id === productId);

            if (!isProductInFavourites) {
                user.favourites.push(product);

                fetch(`http://localhost:3001/users/${user.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(user),
                })
                    .then((res) => res.json())
                    .then((updatedUser) => {
                        console.log('Обновлено успешно:', updatedUser);

                        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                    })
                    .catch((error) => {
                        console.error('Ошибка при обновлении пользователя:', error);
                    });
            } else {
                console.log('Этот товар уже добавлен в "favourites".');
            }
        } else {
            console.log('Пользователь не найден.');
        }
    })
    .catch((error) => {
        console.error('Ошибка при запросе пользователей:', error);
    });

    });
    
  
    const productImage = document.createElement('img');
    productImage.src = product.thumbnail || '../assets/primer.png';
    productImage.alt = 'Product Image';
    productImage.classList.add('products-image')
    productCard.appendChild(productImage);
  
    const productTitle = document.createElement('h3');
    productTitle.textContent = product.title || 'Стиральный порошок Tide, Color Lenor Touch, автомат, 3 кг';
    productCard.appendChild(productTitle);
  
    const oldPrice = document.createElement('p');
    oldPrice.classList.add('old-price');
    oldPrice.textContent = product.discountPercentage || '230 000 сум';
    productCard.appendChild(oldPrice);
  
    const newPrice = document.createElement('p');
    newPrice.classList.add('new-price');
    newPrice.textContent = product.price || '230 000 сум';
    productCard.appendChild(newPrice);
  
    const cartIcon = document.createElement('div');
    cartIcon.classList.add('cart-icon');
    const cartImage = document.createElement('img');
    cartImage.src = './assets/card.png';
    cartImage.alt = '';
    cartIcon.appendChild(cartImage);
    productCard.appendChild(cartIcon);

    cartImage.onclick = ()=>{
        cartImage.src = ''
    }

    productCard.ondblclick = ()=>{
        console.log('12121');
        
        localStorage.setItem('id', product.id)
        window.location.href = '../liked.html'
    }
  
    return productCard;
}
