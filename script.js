// Initiative statistics

const bottleCount = 1250;
const moneyRaised = 125;

// Display the bottle count

document.getElementById("bottle-count").textContent =
    bottleCount.toLocaleString();

// Display the money raised

document.getElementById("money-raised").textContent =
    "\u20AC" + moneyRaised.toLocaleString();

// Confirm that JavaScript is running

console.log("Bottles for Good website loaded!");