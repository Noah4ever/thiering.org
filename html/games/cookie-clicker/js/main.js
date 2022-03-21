// ====== LOCALSTORAGE ======
// Get click count
let clickCount = parseInt(localStorage.getItem("clickCount")) || 0;
// Get amount the count gets increment by
let clickIncrement = parseInt(localStorage.getItem("clickIncrement")) || 1;

let priceClickIncrement = calculatePrice(10, clickIncrement-1); // Calculate init price

// Main button to get clicks
let clickerBtn = document.getElementById("clicker-button"); 
// Button to increment clickIncrement
let clickIncrementBtn = document.getElementById("click-increment-button");
// Span to show click count
let showCount = document.getElementById("show-count");
// Span to show per click
let showPerClick = document.getElementById("show-per-click");
// Span to show price per increment
let showPriceClickIncrement = document.getElementById("price-click-increment");
// Span to show info
let showInfo = document.getElementById("show-info");

showCount.innerText = clickCount; // Show init click count
showPerClick.innerText = clickIncrement; // Show init per click
showPriceClickIncrement.innerText = priceClickIncrement; // Show init price

clickerBtn.addEventListener("click", (e) => {
    clickCount += clickIncrement; // Increment clickCount by clickIncrement 
    showCount.innerText = clickCount; // Show new click count
    localStorage.setItem("clickCount", clickCount.toString()); // Store new click count in localstorage
});

clickIncrementBtn.addEventListener("click", (e) =>{
    if(clickCount >= priceClickIncrement){ // If player has enough clicks
        clickIncrement++; // Increment click per click
        clickCount -= priceClickIncrement; // Decrease costs 
        showCount.innerText = clickCount; // Show new click count
        showPerClick.innerText = clickIncrement; // Show new click per click
        priceClickIncrement = calculatePrice(10, clickIncrement-1); // Calculate new price
        showPriceClickIncrement.innerText = priceClickIncrement; // Show new price
        localStorage.setItem("clickIncrement", clickIncrement.toString()); // Save click increment in localstorage
        showInfo.innerText = "Successfully bought click increment!"; // Show info text
    }else{
        showInfo.innerText = "Not enough clicks! (" + priceClickIncrement + ">" + clickCount + ")"; // Show info text
    }

});

function calculatePrice(standardPrice, amount){
    for(let i = 0; i < amount; i++){
        standardPrice *= 1.68;
    }
    return Math.floor(standardPrice);
}
