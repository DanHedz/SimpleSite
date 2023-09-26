const boughtProducts = new Map();

function buyProduct(product) {
  if (boughtProducts.has(product)) {
    boughtProducts.set(product, boughtProducts.get(product) + 1);
  } else {
    boughtProducts.set(product, 1);
  }

  console.log(`Куплено продукт: ${product}`);
}

function generateBoughtProductText(product) {
  const cardElement = document.querySelector(`.card[data-product="${product}"]`);
  if (cardElement) {
    const cardTitle = cardElement.querySelector('.card-title').textContent;
    const cardPrice = cardElement.querySelector('.card-price span').textContent;
    const quantity = boughtProducts.get(product) || 0;
    return `${cardTitle} (Ціна: ${cardPrice})`;
  } else {
    return `Товар зі селектором data-product="${product}" не знайдено.`;
  }
}

function openModal() {
  const modalProducts = document.getElementById('modalProducts');
  modalProducts.innerHTML = '';
  
  let totalCost = 0;
  let totalCostElement;

  boughtProducts.forEach((quantity, product) => {
    const productText = generateBoughtProductText(product);
    const productElement = document.createElement('div');
    productElement.textContent = productText;

    const cardElement = document.querySelector(`.card[data-product="${product}"]`);
    if (cardElement) {
      const cardPrice = parseFloat(cardElement.querySelector('.card-price span').textContent);

      const quantityControls = document.createElement('div');
      quantityControls.className = 'quantity-controls';

      const decreaseButton = document.createElement('button');
      decreaseButton.className = 'quantity-decrease';
      decreaseButton.textContent = '  -  ';
      
      const quantityDisplay = document.createElement('span');
      quantityDisplay.className = 'quantity';
      quantityDisplay.textContent = `  ${quantity}  `;
      
      const increaseButton = document.createElement('button');
      increaseButton.className = ' quantity-increase ';
      increaseButton.textContent = '  +  ';
      
      quantityControls.appendChild(decreaseButton);
      quantityControls.appendChild(quantityDisplay);
      quantityControls.appendChild(increaseButton);

      decreaseButton.addEventListener('click', () => {
        if (boughtProducts.has(product) && quantity > 0) {
          const newQuantity = boughtProducts.get(product) - 1;
          boughtProducts.set(product, newQuantity);
          quantityDisplay.textContent = newQuantity;
          totalCost -= cardPrice;
          if (totalCostElement) {
            totalCostElement.textContent = `Загальна вартість: ${totalCost.toFixed(2)} $`;
          }
          if (newQuantity === 0) {
            productElement.remove();
            quantityControls.remove();
          }
        }
      });

      increaseButton.addEventListener('click', () => {
        if (boughtProducts.has(product)) {
          const newQuantity = boughtProducts.get(product) + 1;
          boughtProducts.set(product, newQuantity);
          quantityDisplay.textContent = newQuantity;
          totalCost += cardPrice;
          if (totalCostElement) {
            totalCostElement.textContent = `Загальна вартість: ${totalCost.toFixed(2)}`;
          }
        }
      });

      modalProducts.appendChild(productElement);
      modalProducts.appendChild(quantityControls);

      totalCost += cardPrice * quantity;
    }
  });

  if (totalCost > 0) {
    totalCostElement = document.createElement('div');
    totalCostElement.textContent = `Загальна вартість: ${totalCost.toFixed(2)}`;
    modalProducts.appendChild(totalCostElement);
  } else {
    const emptyText = document.createElement('div');
    emptyText.textContent = 'Ви ще не купили жодного продукту';
    modalProducts.appendChild(emptyText);
  }

  const modalContainer = document.getElementById('modalContainer');
  modalContainer.style.display = 'block';
}
// Додати обробник натискання клавіші "Escape"
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Додати обробник кліку поза модальним вікном
window.addEventListener('click', (event) => {
  const modalContainer = document.getElementById('modalContainer');
  if (event.target === modalContainer) {
    closeModal();
  }
});


function closeModal() {
  const modalContainer = document.getElementById('modalContainer');
  modalContainer.style.display = 'none';
}

const closeModalBtn = document.getElementById('closeModalBtn');
closeModalBtn.addEventListener('click', closeModal);

const openModalBtn = document.getElementById('openModalBtn');
openModalBtn.addEventListener('click', () => {
  openModal();
});

const buyButtons = document.querySelectorAll('.card-btn');
buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productElement = button.closest('.card');
    const product = productElement ? productElement.dataset.product : null;
    if (product) {
      buyProduct(product);
    }
  });
});

