let quarks = 0;
let electrons = 0;

let isElectronDisplayed = false;

let eUpgradeOneUnl = false;
let eUpgradeTwoUnl = false;

let increase = 1;

let initElectronCost = 20;
let electronCost = 20;

function updateDisplay() {
    document.getElementById("quark-counter").innerHTML = formatNumber(quarks);
    if(isElectronDisplayed) {
        document.getElementById("electron-counter").innerHTML = formatNumber(electrons);
        document.getElementById("electron-cost").innerHTML = formatNumber(electronCost);
    }

    if(quarks >= electronCost) {
        document.getElementById("electron-cost").style.color = "lime";
    } else {
        document.getElementById("electron-cost").style.color = "red";
    }
}

function increment() {
    if(eUpgradeOneUnl && !eUpgradeTwoUnl) {
        if(electrons != 0) {
            increase *= electrons;
        }
        quarks += increase;
    } else if(eUpgradeOneUnl && eUpgradeTwoUnl) {
        if(electrons != 0) {
            increase *= Math.pow(electrons, 2);
        }
        quarks += increase;
    } else {
        quarks += increase
    }
    
    increase = 1;

    updateDisplay();

    if(quarks >= initElectronCost) {
        document.getElementById("electrons").style.display = "grid";
    }

    if(electrons >= 5) {
        document.getElementById("navbar").style.display = "block";
        document.getElementById("resource-buyers").style.marginTop = "80px";
    }
    if(electrons >= 15) {
        document.getElementById("e-upgrade-two-container").style.display = "block";
    }
    if(electrons >= 30) {
        document.getElementById("current-win-container").style.display = "block";
    }
}

function buyElectron() {
    if(quarks >= electronCost) {
        quarks -= electronCost;
        electronCost *= 1.2;
        electrons++;
        if(!isElectronDisplayed) {
            isElectronDisplayed = true;
            document.getElementById("electron-container").style.display = "block";
        }

        updateDisplay();
    }
}

function buyElectronUpgrade1() {
    if(electrons >= 10) {
        electrons -= 10;
        eUpgradeOneUnl = true;
        document.getElementById("e-upgrade-one").innerHTML = "Purchased!";

        updateDisplay();
    }
}

function buyElectronUpgrade2() {
    if(electrons >= 25) {
        electrons -= 25;
        eUpgradeTwoUnl = true;
        document.getElementById("e-upgrade-two").innerHTML = "Purchased!";

        updateDisplay();
    }
}

function win() {
    if(electrons >= 50) {
        window.location = "win.html";
    }
}

function formatNumber(num) {
    if(num >= 1e6) {
        return num.toExponential(2);
    }

    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function setDesiredUIState(state) {
    switch(state) {
        case UIStates.HOME:
            document.getElementById("main-clicker").style.display = "inline-grid";
            document.getElementById("resource-buyers").style.display = "inline-grid";
            document.getElementById("electron-upgrade-container").style.display = "none";
            break;
        case UIStates.ELECTRON_UPGRADES:
            document.getElementById("main-clicker").style.display = "none";
            document.getElementById("resource-buyers").style.display = "none";
            document.getElementById("electron-upgrade-container").style.display = "block";
            break;
    }
}

const UIStates = {
    HOME: "home",
    ELECTRON_UPGRADES: "electron-upgrades"
};
