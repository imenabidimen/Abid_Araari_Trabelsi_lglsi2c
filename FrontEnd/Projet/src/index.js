var x=getelementbyid("j")
x.addeventlistner(click, im);
 function im(){
 function hey () {
  // =============================
  // Private methods and propeties
  // =============================
  let cart = [];
  
  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(let i in cart) {
      let item = cart[i];
      let itemCopy = {};
      for(let p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
};

var shoppingCart =hey();
// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for(var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>" 
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = " 
      + "<td>" + cartArray[i].total + "</td>" 
      +  "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();
 }


 


  function signo() {
    var fname = document.getElementById('nom').value;
    var email = document.getElementById("email").value;
    var password = document.getElementById('pwd1').value;
   
  
  if (FirstName(fname)) {}
  
  if (PhoneNumber(pnumber)) {}
  
  if (Email(email)) {}
  if (Password(password)) {}
  return false;
}

/*first name input validation*/
function FirstName(fname) {
  var message = document.getElementsByClassName("error-message");
  var letters = /^[A-Za-z]+$/;
  if ( fname =="" || fname.match(letters)) {
    var text="";
    message[0].innerHTML = text;
    return true;
  }
  
  else {
    text="First name should contain only letters";
    message[0].innerHTML = text;
    return false;
  }
}

/*last name input validation*/


/*email address input validation*/
function Email(email) {
  var message = document.getElementsByClassName("error-message");
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
  var atpos = email.indexOf("@");
  var dotpos = email.lastIndexOf(".");
          
  if ( email =="" || email.match(mailformat) || atpos > 1 && ( dotpos - atpos > 2 )) {
   var text="";
    message[2].innerHTML = text;
    return true;
  }
         
  else {
   var text="Wrong email format";
    message[2].innerHTML = text;
    return false;
  }
}

/*phone number validation*/
function  PhoneNumber(pnumber) {
  var message = document.getElementsByClassName("error-message");
  var numbers = /^[0-9]+$/;
  if ( pnumber =="" || pnumber.match(numbers)) {
    var text="";
    message[3].innerHTML = text;
    return true;
  }
  
  else {
    text="Phone number should contain only numbers";
    message[3].innerHTML = text;
    return false;
  }
}


/*country input validation*/



/*validate password*/
function Password(password) {
  var message = document.getElementsByClassName("error-message");
  var illegalChars = /[\W_]/; // allow only letters and numbers
  if (illegalChars.test(password)) { 
    var text="Password contains illegal characters";
    message[5].innerHTML = text;
    return false;
  }
  else if ( (password.search(/[0-9]+/)==-1) ) {
    text="Password should contain at least one number";
    message[5].innerHTML = text;
    return false;
  }
  else {
    text="";
    message[5].innerHTML = text;
    return true;
  }
}

// external js: flickity.pkgd.js



