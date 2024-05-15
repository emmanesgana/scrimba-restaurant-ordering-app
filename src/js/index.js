// import function from data.js using default export
import menuArray from "/src/js/data.js"

// get element id of html setions and modal
const menuSectionEl = document.getElementById('menu-section')
const cartSectionEl = document.getElementById('cart-section')
const modalEl = document.getElementById('modal')
const modalFormEl = document.getElementById('modal-form')
const modalName = document.getElementById('modal-name')
const modalCardNumber = document.getElementById('modal-card-number')
const modalCardCvv = document.getElementById('modal-card-cvv')

let cartArray = []
let totalPrice = 0

// create an eventListener to check the id of the item to be added to checkout
document.addEventListener('click', (e) => {
    if (e.target.dataset.add){
        addItem(e.target.dataset.add);
        // cartSectionEl.scrollIntoView()
    } 
    else if (e.target.dataset.remove) {
        removeItem(e.target.dataset.remove);
    }
    else if (e.target.id === 'complete-order-btn') {
        modalEl.style.display = 'block'
    }
    else if (e.target.id === 'modal-close-btn') {
        modalEl.style.display = 'none'
    }
    // else if (e.target.id === 'modal-pay-btn') {
    //     e.preventDefault()
    //     renderThankYouHtml()
    // }
})

modalFormEl.addEventListener('submit', function(e){
    e.preventDefault()
    renderThankYouHtml()

})

// create a function to display the menu items
function renderMenuHtml(menu){
    
    //hide modal and cart section on load
    cartSectionEl.style.display = 'none'
    modalEl.style.display = 'none'
    modalName.value = ''
    modalCardNumber.value = ''
    modalCardCvv.value = ''

    // use .map to display each object array
    return menu.map(menuItem => {
        // use object destructuring
        const {
            name,
            ingredients,
            price,
            image,
            id
        } = menuItem
        
        // display array object as html
        menuSectionEl.innerHTML += `
            <div class="menu-item">
                <img class="menu-item-image" src="${image}">
                <div class="menu-item-info">
                    <div class="item-name">${name}</div>
                    <div class="item-ingredients">${ingredients.join(', ')}</div>
                    <div class="item-price">$ ${price}</div>
                </div>
                <button data-add="${id}" id="add-btn" class="add-btn">+</button>
            </div>
        `
    }).join('')
}

// create a function for add button
function addItem(id) {

    //remove item from cart using the id via filter method
    const targetObj = menuArray.filter((item) => {
      return item.id == id;
    })[0];
    
    //add item to cart
    if (!cartArray.includes(targetObj)) {
        cartArray.push(targetObj);
    }
    
    //create a loop to add quantity when pressing add button from menu section
    cartArray.forEach((item) => {
      if (item.id === targetObj.id) {
        item.quantity++;
      }
    });
    
    //update quantity to totalPrice
    totalPrice += targetObj.price;
    
    cartSectionEl.style.display = 'block'
  
    renderCartHtml();
  }

// create a function to remove item from cart
function removeItem(id) {

    //remove item from cart using the id via filter method
    const targetObj = cartArray.filter((item) => {
        return item.id == id
    })[0]
    
    //create a loop to check items inside the cartArray
    cartArray.forEach((item, idRemove) => {

        //remove if quantity is not 0
        if (item.id === targetObj.id) {
            item.quantity--;
        }

        //remove entire item row if quantity is 0
        if (item.quantity === 0) {
            cartArray.splice(idRemove, 1)
        }
    })
  
    //remove cart section is array is empty
    if (cartArray.length === 0) {
        cartSectionEl.style.display = 'none'
    }
    
    totalPrice -= targetObj.price
  
    renderCartHtml();
}

// create a function to display the checkout section at the bottom
function renderCart() {

    let getCheckoutHtml = ``

    cartArray.forEach((item) => {

        getCheckoutHtml += `
            <div class="cart-list" id="cart-list">  
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p id="cart-item-qty" class="cart-item-qty">x ${item.quantity}</p>
                    <button id="remove-item-btn" class="remove-item-btn" data-remove="${item.id}">remove</button>
                    <h4 class="item-price">$ ${item.price * item.quantity}</h4>
                </div>
            </div>
        `
    })
  
    let cartSectionHtml = ``

    cartArray.forEach(() => {

        cartSectionHtml = `
            <div id="order-section" class="order-section">
                <div>
                    <h3 class="cart-title">Your order</h3>
                </div>
                <div id="order-list" class="order-list">${getCheckoutHtml}</div>
                <div class="total-price">
                    <div class="order-total">
                        <p>Total Price: </p>
                        <p id="total-price">$ ${totalPrice}</p>
                    </div>
                    <button id="complete-order-btn" class="complete-order-btn">Complete order</button>
                </div>
            </div>
        `
    })
  
    return cartSectionHtml;
}

//create a function to render order complete section
function renderThankYouHtml() {
    // create a const for createElement
    const orderCompleteEl = document.createElement('div')
    
    // get element of current order
    const orderSectionEl = document.getElementById('order-section')

    //hide modal and order section
    modalEl.style.display = 'none'
    orderSectionEl.style.display = 'none'

    //avoiding innerHtml rendering for input button
    orderCompleteEl.classList.add('order-complete')
    orderCompleteEl.textContent = `Thanks, ${modalName.value}! Your order is on its way!`
    cartSectionEl.appendChild(orderCompleteEl)
    cartArray = []
    totalPrice = 0
       
}

function renderCartHtml(){
    cartSectionEl.innerHTML = renderCart()
}

renderMenuHtml(menuArray)