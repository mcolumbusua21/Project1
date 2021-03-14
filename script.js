const aboutUs = document.querySelector("#about-us")
const recipes = document.querySelector("#recipes")
const saveRecipe = document.querySelector("#saved-recipes")


// aboutUs.addEventListener("click", function(e){
//     console.log("click");
    
// })


// ----------------FOOD PREFERENCE LOGIC------------------
let userFoodPreference = [];

// collecting PROTEIN checkbox values
function getProteinsPreference(name) {
    var $proteinsCheckBoxes = document.querySelectorAll(`input[name = "${name}"]:checked`)
    
    $proteinsCheckBoxes.forEach((checkbox) => {
        userFoodPreference.push(checkbox.value);
    });
    return userFoodPreference
};


// collecting VEGETABLE checkbox values
function getVegetablesPreference(name) {
    var $vegetableCheckBoxes = document.querySelectorAll(`input[name = "${name}"]:checked`)
    
    $vegetableCheckBoxes.forEach((checkbox) => {
        userFoodPreference.push(checkbox.value);
    });
    return userFoodPreferencegit
};


// collecting GRAINS checkbox values
function getGrainsPreference(name) {
    var $grainsCheckBoxes = document.querySelectorAll(`input[name = "${name}"]:checked`)
    
    $grainsCheckBoxes.forEach((checkbox) => {
        userFoodPreference.push(checkbox.value);
    });
    return userFoodPreference
};


// *************************************************
// THIS WILL NEED TO BE APPLIED TO OUR SEARCH BUTTON
var $btn = document.querySelector(".search-button")

$btn.addEventListener("click", (event) => {
    
    userFoodPreference = [];
    getProteinsPreference("proteinsCheck")
    getVegetablesPreference("vegetablesCheck")
    getGrainsPreference("grainsCheck")
    console.log(userFoodPreference)

    fetchFoodData();
     if (userFoodPreference.length >= 4){
        
        
    return
    };
    // fetch data from foodDB API
    fetchFoodData();
    

    // change userFoodPreference into string
    var userString = userFoodPreference.toString();
    // replace commas with hyphen
    userString = (userString.replaceAll(",", "-"))

    var foodNetworkUrl = `https://www.foodnetwork.com/search/${userString}-`
    console.log(foodNetworkUrl)
});
// *************************************************


// -----------------FOOD RECIPE API----------------------



function fetchFoodData(){
    var apiKey = 9973533;
    var foodUrl = `https://www.themealdb.com/api/json/v2/${apiKey}/filter.php?i=${userFoodPreference.join()}`;
    

    fetch(foodUrl)
        .then((data) => data.json())
        .then(function (recipes) {
            console.log(recipes);
        })
}

function messageContainer (){
    console.log(messageContainer)
    var btnClick = 
}

function saveRecipe(){
    console.log(saveRecipe);
    
}

userLiquorPreference = []
var userString = userLiquorPreference.toString();
userString = (userString.replaceAll(",", "-"))
var liquorUrl = `https://www.liquor.com/spirits-and-liqueurs/${userString}-`
    console.log(liquorUrl)