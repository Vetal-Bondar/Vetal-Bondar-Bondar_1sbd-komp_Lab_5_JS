const cartItems = [
    { id: 1, name: 'Idly (2 Pieces)', description: 'The South Indian Breakfast', quantity: 3, price: 30, available: 5, image: './img/idly.jpg'  },
    { id: 2, name: 'Crispy Masala Dosa', description: 'The Classic Masterpiece', quantity: 2, price: 40, available: 8, image: './img/Masala-Dosa.jpg'},
    { id: 3, name: 'Oat Meal', description: 'The healthiest grains on earth', quantity: 6, price: 85, available: 7,image: './img/meal.jpg' },
];

let totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); 

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const itemTotal = item.quantity * item.price;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <div style="display: flex; align-items: center;">
            <img src="${item.image}" alt="${item.name}" style="width:80px; height:80px; margin-right: 10px;">
            <div>
                <p style="margin: 0;">${item.name}</p>
                <p style="margin: 0;">${item.description}</p>
                <button onclick="removeItem(${item.id})" style="margin-top: 10px;">Remove</button>
            </div>
        </div>
    </td>
    
    
            <td>
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
            </td>
            <td>₹${item.price}.00</td>
            <td>₹${itemTotal}.00</td>
        `;
        cartItemsContainer.appendChild(row);
    });

    document.getElementById('total-price').innerText = `₹${total}.00`;
    updateSummary(total);
}

function updateSummary(total) {
    const tax = total * 0.1; 
    const deliveryCharge = 60; 

    const grandTotal = total + tax + deliveryCharge;

    document.querySelector('.summary p:nth-child(2) span').innerText = `₹${total}.00`;
    document.querySelector('.summary p:nth-child(3) span').innerText = `₹${tax.toFixed(2)}`;
    document.querySelector('.summary p:nth-child(4) span').innerText = `₹${deliveryCharge}.00`;
    document.querySelector('.summary p:nth-child(5) span').innerText = `₹${grandTotal.toFixed(2)}`;
}

function increaseQuantity(itemId) {
    const item = cartItems.find(i => i.id === itemId);
    if (item.quantity < item.available) {
        item.quantity++;
        totalItems++;
        renderCart();
    }
}

function decreaseQuantity(itemId) {
    const item = cartItems.find(i => i.id === itemId);
    if (item.quantity > 1) {
        item.quantity--;
        totalItems--;
        renderCart();
    } else {
        removeItem(itemId);
    }
}

function removeItem(itemId) {
    const itemIndex = cartItems.findIndex(i => i.id === itemId);
    totalItems -= cartItems[itemIndex].quantity;
    cartItems.splice(itemIndex, 1);
    renderCart();
}

document.addEventListener('DOMContentLoaded', renderCart);

const additionalProducts = [
    { id: 4, name: 'Pasta', description: 'Italian classic pasta', price: 80, available: 4, image: './img/pasta.jpg' },
    { id: 5, name: 'Salad', description: 'Fresh vegetable salad', price: 70, available: 10, image: './img/salad.jpeg' },
    { id: 6, name: 'Sandwich', description: 'Delicious ham sandwich', price: 50, available: 5, image: './img/sandwich.jpg' },
];

function renderAdditionalProducts() {
    const additionalProductsContainer = document.getElementById('additional-products-list');
    additionalProductsContainer.innerHTML = '';

    additionalProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <p>${product.name}</p>
                <p>${product.description}</p>
                <p>Available: ${product.available}</p>
                <p>Price: ₹${product.price}.00</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        additionalProductsContainer.appendChild(productItem);
    });
}

function addToCart(productId) {
    const product = additionalProducts.find(p => p.id === productId);
    if (product) {
        cartItems.push({ ...product, quantity: 1 });
        additionalProducts.splice(additionalProducts.indexOf(product), 1);
        renderCart();
        renderAdditionalProducts();
    }
}

function removeItem(itemId) {
    const itemIndex = cartItems.findIndex(i => i.id === itemId);
    const removedItem = cartItems.splice(itemIndex, 1)[0];
    additionalProducts.push({ ...removedItem, quantity: undefined });
    renderCart();
    renderAdditionalProducts();
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    renderAdditionalProducts();
});
