// POSSIBLE WAYS TO GET DATA
var $proteinCard = document.querySelector("#protein-card");

$proteinCard.addEventListener("", function(e){
    preventDefault();
})
// console.log($(".checkbox-beef"))
// console.log($(".checkbox-chicken"))

$("#protein-card").find("div:nth-child(2)")



var $beefCheckbox = document.querySelector("#beefCheck")



function getProteinPreference(name) {
    var $proteinCheckBoxes = document.querySelectorAll(`input[name = "${name}"]:checked`)
    
    let proteinPreference = [];
    $proteinCheckBoxes.forEach((checkbox) => {
        proteinPreference.push(checkbox.value);
    });
    return proteinPreference;
}

var $btn = document.querySelector("#btn")

$btn.addEventListener("click", (event) => {
    alert(getProteinPreference("proteinCheck"))
    
});



// $("#protein-card").find(`[data-food]="${food-name}"`)