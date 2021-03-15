const aboutUs = document.querySelector("#about-us")
const recipes = document.querySelector("#recipes")
const saveRecipe = document.querySelector("#saved-recipes")
const $recipeContainer = document.querySelector("#recipe-append")
const saveBtn = document.querySelector(".save-button")

var $savedDrinkContainer = document.querySelector("#saved-drink-container");

var $savedFoodContainer = document.querySelector("#saved-food-container");

var $clearList = document.querySelector(".clearlist")

function renderSavedItems (){
    var cocktailName = document.querySelector(".drink-name")
    $savedDrinkContainer.innerHTML = "";
    $savedFoodContainer.innerHTML = "";
    // cocktailName.textContent = drink.strDrink;
    if(savedRecipeArr){
    for (const foodUrl of savedRecipeArr) {
        var aTag = document.createElement("a")
        aTag.setAttribute("href", foodUrl);
        aTag.textContent = foodUrl;
        $savedFoodContainer.append(aTag);
    }}
    for (const drinkUrl of savedLiquorArr) {
        var aTag = document.createElement("a")
        aTag.setAttribute("href", drinkUrl);
        // aTag.textContent = cocktailName.textContent;
        aTag.textContent = drinkUrl;
        $savedDrinkContainer.append(aTag);
    }
}

$clearList.addEventListener("click", function() {
    localStorage.clear();
    $savedDrinkContainer.innerHTML = "";
    $savedFoodContainer.innerHTML = "";

    savedLiquorArr = getSavedLiquor()
    savedRecipeArr = getSavedRecipes()

})


// aboutUs.addEventListener("click", function(e){
//     console.log("click");
    
// })

//Code for Nav bar on scroll color change
var myNav = document.getElementById("mainNav");
window.onscroll = function() {
  "use strict";
  if (document.body.scrollTop >= 280 || document.documentElement.scrollTop >= 280) {
    myNav.classList.add("scroll");
  } else {
    myNav.classList.remove("scroll");
  }
};
// ----------------FOOD PREFERENCE LOGIC------------------
let userFoodPreference = [];

// recipes get pushed here, then chosen from random
var recipeArray=[];

// cocktails get pushed here, then chose from random
var cocktailArray = [];


// collecting FOOD checkbox values
function getFoodPreference(name, name2, name3) {
    var $grainsCheckBoxes = document.querySelectorAll(`input[name = "${name}"]:checked`)
    
    $grainsCheckBoxes.forEach((checkbox) => {
        userFoodPreference.push(checkbox.value);
    });
    var $vegetableCheckBoxes = document.querySelectorAll(`input[name = "${name2}"]:checked`)
    
    $vegetableCheckBoxes.forEach((checkbox) => {
        userFoodPreference.push(checkbox.value);
    });
    var $proteinsCheckBoxes = document.querySelectorAll(`input[name = "${name3}"]:checked`)
    
    $proteinsCheckBoxes.forEach((checkbox) => {
        userFoodPreference.push(checkbox.value);
    });

    return userFoodPreference
};


// *************************************************
// THIS WILL NEED TO BE APPLIED TO OUR SEARCH BUTTON
var $btn = document.querySelector(".search-button")

$btn.addEventListener("click", (event) => {
    
    userFoodPreference = [];
    getFoodPreference("grainsCheck", "vegetablesCheck", "proteinsCheck")

     if (userFoodPreference.length > 4){
        
        //INSERT ALERT HERE 
    return
    };
    if (userFoodPreference.length == 0){

        // INSERT ALERT HERE
        return
    }

    // fetch data from foodDB API
    fetchFoodData();

    fetchCocktailData(cocktailMenu.value);
    userLiquorPreference.push(cocktailMenu.value)
  console.log("COCKTAIL VALUE" + cocktailMenu.value)

    // change userFoodPreference into string
    var userString = userFoodPreference.toString();
    // replace commas with hyphen
    userString = (userString.replaceAll(",", "-"))

    foodNetworkUrl = `https://www.foodnetwork.com/search/${userString}-`
    console.log(foodNetworkUrl)
    console.log(userFoodPreference)


    

   var liquorString = cocktailMenu.value
   console.log(liquorString)

    liquorLink = `https://www.liquor.com/search?q=${liquorString}`

});
// *************************************************


var allFoodsArr = [];
var liquorLink;
var foodNetworkUrl;
// -----------------FOOD RECIPE API----------------------



function fetchFoodData(){
    // clears array after search
    recipeArray = [];

    // gets recipes for each ingredient chosen
    for (let i = 0; i < userFoodPreference.length; i++) {
        var apiKey = 9973533;
        var foodUrl = `https://www.themealdb.com/api/json/v2/${apiKey}/filter.php?i=${userFoodPreference[i]}`;
        
        
        fetch(foodUrl)
        .then((data) => data.json())
        .then(function (recipes) {    
            recipeArray.push(recipes.meals)
              
            // random recipe
            //  get random index from recipeArray
            var randomIndex = recipeArray[Math.floor(Math.random() * recipeArray.length)]

            // get random recipe from random Index
            var randomRecipe = randomIndex[Math.floor(Math.random() * randomIndex.length)]

            appendRecipe(randomRecipe)

        })
    }


};

// -------APPEND RECIPE FUNCTION ----------
function appendRecipe(recipe) {
    // clear containers upon each search
    $recipeContainer.innerHTML = "";
   
    // append the Recipe name
    var recipeName = document.querySelector(".food-name");
    recipeName.textContent = recipe.strMeal;
    //$recipeContainer.append(recipeName); //

    // append the recipe image
    var recipeImage = document.querySelector("#foodimage");
    recipeImage.src = recipe.strMealThumb;
    //$recipeContainer.append(recipeImage);
    
    // append food network URL
    // NEED TO CLEAR FOODNETWORK STRING ON EACH SEARCH
    var recipeUrl = document.querySelector("#foodlink");
    recipeUrl.href = foodNetworkUrl;
    recipeUrl.setAttribute("target", "_blank")
    recipeUrl.innerText = "Click here for recipes!"
    //$recipeContainer.append(recipeUrl)

}
//Welcome modal
var closeModal = document.querySelector("#modal-close-btn1")
var modalContainer = document.querySelector(".modal")
var btnX = document.querySelector("#modal-close-btn1")

closeModal.addEventListener("click", function(){
    modalContainer.classList.remove("is-active")
    btnX.remove();

})


/* COcktail Button */
var cocktailbtn = document.querySelector(".dropdown");
function showDrinks () {
    cocktailbtn.classList.toggle("is-active");
}
// cocktailbtn.addEventListener("click", showDrinks)

/// save recipes to local storage
//save recipes to local storage
// function saveRecipe(){
//     console.log(saveRecipe);
    
// }
/// Cocktail link
var userLiquorPreference = []




// userString = (userString.replaceAll(""))
// var liquorUrl = `https://www.liquor.com/${userString}-`
//     console.log(liquorUrl)

saveBtn.addEventListener("click", function (){
    console.log("saveBtn");

    savedRecipeArr.push(foodNetworkUrl)
    localStorage.setItem("saved-recipe", JSON.stringify(savedRecipeArr));

    savedLiquorArr.push(liquorLink)
    localStorage.setItem("saved-drink", JSON.stringify(savedLiquorArr));
  
    renderSavedItems()
})

var savedLiquorArr = getSavedLiquor()

function getSavedLiquor (){
    var drinkData = JSON.parse(localStorage.getItem("saved-drink") )
    if (drinkData) {
        return drinkData
    }else {
        return []
    }
}

var savedRecipeArr = getSavedRecipes()

function getSavedRecipes (){
    var recipeData = JSON.parse(localStorage.getItem("saved-recipe") )
    if (recipeData) {
        return recipeData
    }else {
        return []
    }
}



console.log(savedLiquorArr)
// --------COCKTAIL API TESTING-------------
var cocktailMenu = document.querySelector("#cocktails")


function fetchCocktailData(drink) {
        // if non alcoholic, fetch this API then return
        var naUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`

        if(drink === "Non_Alcoholic"){
            fetch(naUrl)
            .then((data) => data.json())
            .then(function (mocktails) {
                cocktailArray.push(mocktails.drinks)
                var randIndex = cocktailArray[Math.floor(Math.random() * cocktailArray.length)]

            var randCocktail = randIndex[Math.floor(Math.random() * randIndex.length)]
            console.log(randCocktail)
            appendCocktail(randCocktail)
            cocktailArray = []

            })
        } else{
        var cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drink}`;
        console.log(cocktailUrl)
        
        fetch(cocktailUrl)
        .then((data) => data.json())
        .then(function (cocktails) {    
            
            cocktailArray.push(cocktails.drinks)
            

            var randIndex = cocktailArray[Math.floor(Math.random() * cocktailArray.length)]

            var randCocktail = randIndex[Math.floor(Math.random() * randIndex.length)]
            console.log(randCocktail)
            appendCocktail(randCocktail)
            cocktailArray = []
        })}
}

var $cocktailContainer = document.querySelector("#cocktail-append")

// ---------APPEND COCKTAIL FUNCTION--------
function appendCocktail(drink) {
    // clear containers upon each search
    $cocktailContainer.innerHTML = "";
   
    // append the Cocktail name
    var cocktailName = document.querySelector(".drink-name");
    cocktailName.textContent = drink.strDrink;
    //$cocktailContainer.append(cocktailName);

    // append the Cocktail image
    var cocktailImage = document.querySelector("#drinkimage");
    cocktailImage.src = drink.strDrinkThumb;
    //$cocktailContainer.append(cocktailImage);

    var drinkLink = document.querySelector("#drinklink");
    drinkLink.href = liquorLink;
    drinkLink.setAttribute("target", "_blank")
    drinkLink.innerText = "Click here for recipes!"
    // liquorLink = []

}

renderSavedItems()