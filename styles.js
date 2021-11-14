let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec =>{

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
      navLinks.forEach(links =>{
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
      });
    };

  });

}

document.querySelector('#search-icon').onclick = () =>{
  document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
  document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop:true,
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);
}

window.onload = fadeOut;

// for the store
if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
}else{
  ready()
}

function ready(){
  // we had to put the function for butons inside Headers, so that even if the 
  // page is not fully loaded, it willl still runn

  var removeCartItemButtons = document.getElementsByClassName("btn-danger") 
console.log(removeCartItemButtons)
for (var i = 0; i< removeCartItemButtons.length; i++){
  var button = removeCartItemButtons[i]
  button.addEventListener('click', removeCartItem) 

}   
// to enable the total increase when more items are added.input increase in value
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i< quantityInputs.length; i++){
  var input = quantityInputs[i]
  input.addEventListener('change', quantityChanged)
}
var addToCartButtons = document.getElementsByClassName('shop-item-button')
for (var i = 0; i< addToCartButtons.length; i++){
   var button = addToCartButtons[i]
   button.addEventListener('click', addToCartClicked)

}
document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)


}
function purchaseClicked(){
  alert('Thank you for your puchase')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()){
      cartItems.removeChild(cartItems.firstChild)
  }
  //rthe above is to emptycart after purchase
  updateCartTotal()
}





function removeCartItem(event){
  // cleaning up our ConvolverNode, so we removed the event listener from 
  // abd put it down
  var buttonClicked = event.target
      buttonClicked.parentElement.parentElement.remove()
      updateCartTotal()
  


  }

  // lets create the quantityChanged fxn below

  function quantityChanged(event) {
      var input = event.target
      if(isNaN(input.value)|| input.value <= 0){
          input.value = 1
      }
      updateCartTotal()
  }

//create the addtocartclicked fxn

function addToCartClicked(event){
  var button = event.target
 var shopItem = button.parentElement.parentElement
 var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
 var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
 var imageSrc= shopItem.getElementsByClassName('shop-item-image')[0].src
 
 
 addItemToCart(title, price, imageSrc)
 updateCartTotal()
 //adding aupdatecart total updates the cart total
}

 //adfing dollar sign below will add attributes so different items can be listed in cat row

function  addItemToCart(title, price, imageSrc){
  var cartRow = document.createElement('div')
  //the classlist below is to style the items for the cart properly
  cartRow.classList.add('cart-row')


  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemNames.length; i++){
      if (cartItemNames[i].innerText == title){
          alert("This item is already added to the cart")
          return
          //adding return underneath will take you back to where you said add item to cart as it has been executed
      }
  }
      
  
  var cartRowContents = `
               <div class="cart-item cart-column">
                  <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                  <span class="cart-item-title">${title}</span>
              </div>
              <span class="cart-price cart-column">${price}</span>
              <div class="cart-quantity cart-column">
                  <input class="cart-quantity-input" type="number" value="1">
                  <button class="btn btn-danger" type="button">REMOVE</button>
              </div>`

  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}





function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
 for (var i = 0; i < cartRows.length; i++){
     var cartRow = cartRows[i]
     var priceElement = cartRow.getElementsByClassName('cart-price')[0]
     var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
     var price = parseFloat(priceElement.innerText.replace('$', ''))
     var quantity = quantityElement.value
     total = total + (price * quantity)
  
 }
 total = Math.round(total * 100)/ 100
 document.getElementsByClassName("cart-total-price")[0].innerText =  '$' + total
}


