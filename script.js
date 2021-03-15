const aboutUs = document.querySelector("#about-us")
const recipes = document.querySelector("#recipes")
const saveRecipe = document.querySelector("#saved-recipes")
const $recipeContainer = document.querySelector("#recipe-append")
const saveBtn = document.querySelector(".save-button")
// aboutUs.addEventListener("click", function(e){
//     console.log("click");
    
// })
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
  console.log("COCKTAIL VALUE" + cocktailMenu.value)

    // change userFoodPreference into string
    var userString = userFoodPreference.toString();
    // replace commas with hyphen
    userString = (userString.replaceAll(",", "-"))
    foodNetworkUrl = [];
    foodNetworkUrl.push(`https://www.foodnetwork.com/search/${userString}-`)
    console.log(foodNetworkUrl)
    console.log(userFoodPreference)
});
// *************************************************
var foodNetworkUrl = [];


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
            console.log(randomRecipe)
            appendRecipe(randomRecipe)

        })
    }


};

// -------APPEND RECIPE FUNCTION ----------
function appendRecipe(recipe) {
    // clear containers upon each search
    $recipeContainer.innerHTML = "";
   
    // append the Recipe name
    var recipeName = document.createElement("div");
    recipeName.textContent = recipe.strMeal;
    $recipeContainer.append(recipeName);

    // append the recipe image
    var recipeImage = document.createElement("img");
    recipeImage.setAttribute("src", recipe.strMealThumb);
    $recipeContainer.append(recipeImage);
    
    // append food network URL
    // NEED TO CLEAR FOODNETWORK STRING ON EACH SEARCH
    var recipeUrl = document.createElement("a");
    recipeUrl.setAttribute("href", foodNetworkUrl)
    recipeUrl.setAttribute("target", "_blank")
    recipeUrl.innerText = "Click here for recipes!"
    $recipeContainer.append(recipeUrl)

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
cocktailbtn.addEventListener("click", showDrinks)

/// save recipes to local storage
//save recipes to local storage
// function saveRecipe(){
//     console.log(saveRecipe);
    
// }
/// Cocktail link
userLiquorPreference = []
var userString = userLiquorPreference.toString();
// <<<<<<< HEAD
userString = (userString.replaceAll(",", "-"))
var liquorUrl = `https://www.liquor.com/spirits-and-liqueurs/${userString}-`
    console.log(liquorUrl)


// =======
userString = (userString.replaceAll(""))
var liquorUrl = `https://www.liquor.com/${userString}-`
    console.log(liquorUrl)

saveBtn.addEventListener("click", function (){
    console.log("saveBtn");
    var randomRecipe = document.querySelector("#random-recipe")
    localStorage.setItem("random-recipe", JSON.stringify(randomRecipe));
})

// saveRecipe = function () {
//     localStorage.setItem("saved-recipes", JSON.stringify(saveRecipe));

// }
// >>>>>>> 608301f444a9a225cfd0fe11244230d56f4375a8
localStorage.setItem("saved-recipes", JSON.stringify(saveRecipe));

// --------COCKTAIL API TESTING-------------
var cocktailMenu = document.querySelector("#cocktails")
console.log(cocktailMenu)

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
            return
            })
        }
        var cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drink}`;
        console.log(cocktailUrl)
        
        fetch(cocktailUrl)
        .then((data) => data.json())
        .then(function (cocktails) {    
            console.log(cocktails)
            console.log(cocktails.drinks)
            cocktailArray.push(cocktails.drinks)
            console.log(cocktailArray)

            var randIndex = cocktailArray[Math.floor(Math.random() * cocktailArray.length)]

            var randCocktail = randIndex[Math.floor(Math.random() * randIndex.length)]
            console.log(randCocktail)
            appendCocktail(randCocktail)
            cocktailArray = []
        })
}

var $cocktailContainer = document.querySelector("#cocktail-append")

// ---------APPEND COCKTAIL FUNCTION--------
function appendCocktail(drink) {
    // clear containers upon each search
    $cocktailContainer.innerHTML = "";
   
    // append the Cocktail name
    var cocktailName = document.createElement("div");
    cocktailName.textContent = drink.strDrink;
    $cocktailContainer.append(cocktailName);

    // append the Cocktail image
    var cocktailImage = document.createElement("img");
    cocktailImage.setAttribute("src", drink.strDrinkThumb);
    $cocktailContainer.append(cocktailImage);


}
