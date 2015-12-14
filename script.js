var user = {
  totalCash: 100,
}
var gameTime = 10000;
var timeout = false;
var totalTime = 0;

var apple = new Fruit('apple', 2.50);
var orange = new Fruit('orange', 0.50);
var banana = new Fruit('banana', 1.00);
// var grapes = new Fruit('grapes', 7.50);
var pear = new Fruit('pear', 4.00);

var fruitArray = [apple, orange, banana, pear];

setInterval(function() {
  if (!timeout){
    totalTime += 1
    console.log("Seconds elapsed: ", totalTime);
    console.log("Time to go: ", (gameTime /1000) - totalTime);
  }
}, 1000);

setInterval(function() {
  if (!timeout) {
    // apple.changePrice();
    // orange.changePrice();
    // banana.changePrice();
    // grapes.changePrice();
    // pear.changePrice();
  for (var i = 0; i < fruitArray.length; i++) {
    fruitArray[i].changePrice();
  }

  }
}, 2000);

window.setTimeout(function(){
  timeout = true;
  console.log("game over");
  for (var i = 0; i < fruitArray.length; i++) {
    if (user[fruitArray[i].name]) {
      while (user[fruitArray[i].name].inventory > 0) {
        sellFruit(user, fruitArray[i]);
      }
    }
  }
  console.log("Your final cash total: ", user.totalCash.toFixed(2));
  // remove buy /sell buttons
}, gameTime);

$(document).ready(function(){
  // apple.changePrice();
  // orange.changePrice();
  // banana.changePrice();
  // grapes.changePrice();
  // pear.changePrice();
  for (var i = 0; i < fruitArray.length; i++) {
    fruitArray[i].changePrice();
  }
  updateCash(user);

  //listen to buy button)
  $(".buy").on('click', function(){
    if(!timeout) {
      var buttonClass = $(this).parent().attr('class');
      buttonClass = buttonClass.substring(0, buttonClass.length - 6);
      for (var i = 0; i < fruitArray.length; i++) {
        if (buttonClass == fruitArray[i].name) {
          buyFruit(user, fruitArray[i]);
        }
      }
    }
  });
  // listen to sell fruit

});

function sellFruit(user, purchase) {
  if (!user[purchase.name] || user[purchase.name].inventory <= 0) {
      console.log('try again');
      return false;
    } else {
      user.totalCash += purchase.price;
    }

  user[purchase.name].inventory--;

  updateCash(user);
  return true;
}


function buyFruit(user, purchase) {
  if (!user[purchase.name]) {
    user[purchase.name] = {
      numberPurchased: 0,
      avgPrice: 0,
      inventory: 0
    };
    console.log('no fruit');
  } else { console.log('you have the fruit'); }

  if (user.totalCash - purchase.price < 0) {
    console.log('try again');
    return;
  } else {
    user.totalCash -= purchase.price;
  }

  var bought = user[purchase.name].numberPurchased;
  var avg = user[purchase.name].avgPrice;

  user[purchase.name].numberPurchased++;
  user[purchase.name].inventory++;

  user[purchase.name].avgPrice = (bought * avg + purchase.price) / (bought + 1);

  updateCash(user);
}

function Fruit(name, price) {
  this.name = name;
  this.price = parseFloat(price);

  this.changePrice = function() {
    this.price += randomNumber(-50, 50) / 100;
    this.price = Math.round(this.price*100) / 100;
    if (this.price > 9.99 || this.price < 0.50){
      this.changePrice();
    }
    updateDomPrice(this);
  }
}

function updateCash(user) {
  //print totalcash
  $('.user-totalCash').text("$" + user.totalCash.toFixed(2));
  //print inventory
  for (key in user) {
    if (key != 'totalCash') {
      $('.user-' + key).text(user[key].inventory + " avg price: " + user[key].avgPrice.toFixed(2));
    }
  }
}

function updateDomPrice(fruit) {
  //this is a placeholder
  $el = $("."+fruit.name.toString());
  $el.text("$" + fruit.price);
}


function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}
