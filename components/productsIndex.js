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
        // console.log(2121);
        
        cartImage.src = ''
    }

    productCard.ondblclick = ()=>{
        console.log('12121');
        
        localStorage.setItem('id', product.id)
        window.location.href = '../liked.html'
    }
  
    return productCard;
}
