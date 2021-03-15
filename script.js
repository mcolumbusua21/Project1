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
var closeModal = document.querySelector("#modal-close-btn")
var modalContainer = document.querySelector(".modal")

closeModal.addEventListener("click", function(){
    modalContainer.classList.remove("is-active")
})


//save recipes to local storage
// function saveRecipe(){
//     console.log(saveRecipe);
    
// }
/// Cocktail link
userLiquorPreference = []
var userString = userLiquorPreference.toString();
userString = (userString.replaceAll(""))
var liquorUrl = `https://www.liquor.com/${userString}-`
    console.log(liquorUrl)

// saveBtn.addEventListener("click", function(event){
//     saveRecipe.
// })

localStorage.setItem("saved-recipes", JSON.stringify(saveRecipe));