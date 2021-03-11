const aboutUs = document.querySelector("#about-us")
const recipes = document.querySelector("#recipes")
const saveRecipe = document.querySelector("#saved-recipes")

$aboutUs.addEventListener("click", function(e)){
    console.log("click");
    
}


// possible way to get checkbox values
// $("#protein-card").find("div:nth-child(2)")



// collecting PROTEIN checkbox values
function getProteinsPreference(name) {
    var $proteinsCheckBoxes = document.querySelectorAll(`input[name = "${name}"]:checked`)
    
    let proteinsPreference = [];
    $proteinsCheckBoxes.forEach((checkbox) => {
        proteinsPreference.push(checkbox.value);
    });
    return proteinsPreference;
};

// collecting VEGETABLE checkbox values
function getVegetablesPreference(name) {
    var $vegetableCheckBoxes = document.querySelectorAll(`input[name = "${name}"]:checked`)
    
    let vegetablePreference = [];
    $vegetableCheckBoxes.forEach((checkbox) => {
        vegetablePreference.push(checkbox.value);
    });
    return vegetablePreference;
};

// collecting GRAINS checkbox values
function getGrainsPreference(name) {
    var $grainsCheckBoxes = document.querySelectorAll(`input[name = "${name}"]:checked`)
    
    let grainsPreference = [];
    $grainsCheckBoxes.forEach((checkbox) => {
        grainsPreference.push(checkbox.value);
    });
    return grainsPreference;
};


// *************************************************
// THIS WILL NEED TO BE APPLIED TO OUR SEARCH BUTTON
var $btn = document.querySelector(".is-large")
$btn.addEventListener("click", (event) => {
    console.log(getProteinsPreference("proteinsCheck"))
    console.log(getVegetablesPreference("vegetablesCheck"))
    console.log(getGrainsPreference("grainsCheck"))
});
// *************************************************
