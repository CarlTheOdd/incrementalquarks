let quarks = 0;
let electrons = 75;
let protons = 0;

let isElectronDisplayed = false;
let isProtonDisplayed = false;

let eUpgradeOneUnl = false;
let eUpgradeTwoUnl = false;
let eUpgradeThreeUnl = false;

let pUpgradeOneUnl = false;
let pUpgradeTwoUnl = false;
let pUpgradeThreeUnl = false;

let quarkIncrease = 1;

let quarkClickIncrease = quarkIncrease;

let quarkIdleIncrease = 0;
let electronIdleIncrease = 0;

let initElectronCost = 20;
let electronCost = 20;
let electronCostIncrease = 1.1;
let initProtonCost = 50;
let protonCost = 50;

function updateResourceGain() {
    if(eUpgradeTwoUnl) {
        quarkIdleIncrease = Math.pow(quarks, 1/2) * quarkIncrease;
    }

    if(pUpgradeOneUnl && electrons <= 1e3) {
        electronIdleIncrease *= Math.pow(electrons, 1/3);
    }

    electrons += electronIdleIncrease;

    quarks += quarkIdleIncrease;
    
    updateDisplay();
}

setInterval(updateResourceGain, 1000);

function updateDisplay() {
    document.getElementById("quark-counter").innerHTML = formatNumber(quarks);
    if(isElectronDisplayed) {
        document.getElementById("electron-counter").innerHTML = formatNumber(electrons);
        document.getElementById("electron-cost").innerHTML = formatNumber(electronCost);
    }
    if(isProtonDisplayed) {
        document.getElementById("proton-counter").innerHTML = formatNumber(protons);
        document.getElementById("proton-cost").innerHTML = formatNumber(protonCost);
    }

    canAfford(quarks, electronCost, "electron-cost");
    canAfford(electrons, protonCost, "proton-cost");

    !eUpgradeOneUnl ? canAfford(electrons, 10, "e-upgrade-one") : document.getElementById("e-upgrade-one").style.color = "lime";
    !eUpgradeTwoUnl ? canAfford(electrons, 25, "e-upgrade-two") : document.getElementById("e-upgrade-two").style.color = "lime";
    !eUpgradeThreeUnl ? canAfford(electrons, 40, "e-upgrade-three") : document.getElementById("e-upgrade-three").style.color = "lime";

    !pUpgradeOneUnl ? canAfford(protons, 5, "p-upgrade-one") : document.getElementById("p-upgrade-one").style.color = "lime";

    if(quarks >= initElectronCost) {
        document.getElementById("electrons").style.display = "grid";
    }
    if(electrons >= initProtonCost) {
        document.getElementById("protons").style.display = "grid";
    }

    if(electrons >= 5) {
        document.getElementById("navbar").style.display = "block";
        document.getElementById("resource-buyers").style.marginTop = "80px";
    }
    if(electrons >= 15) {
        document.getElementById("e-upgrade-two-container").style.display = "block";
    }
    if(electrons >= 30) {
        document.getElementById("e-upgrade-three-container").style.display = "block";
    }
    if(protons >= 15) {
        document.getElementById("p-upgrade-two-container").style.display = "block";
    }
    if(protons >= 50) {
        document.getElementById("p-upgrade-three-container").style.display = "block";
    }
}

function canAfford(currency, cost, id) {
    if(currency >= cost) {
        document.getElementById(id).style.color = "lime";
        return true;
    } else {
        document.getElementById(id).style.color = "red";
        return false;
    }
}

function increment() {
    if(eUpgradeOneUnl) {
        if(quarks != 0) {
            quarkClickIncrease *= Math.pow(quarks, 1/2);
        }
        quarks += quarkClickIncrease * quarkIncrease;
    } else {
        quarks += quarkClickIncrease * quarkIncrease;
    }
    if(eUpgradeThreeUnl && electrons > 1) {
        quarkIncrease *= electrons;
        quarks += quarkClickIncrease * quarkIncrease;
    }
    
    quarkIncrease = 1;
    quarkClickIncrease = 1;

    updateDisplay();
}

function buyElectron() {
    if(quarks >= electronCost) {
        quarks -= electronCost;
        electronCost *= electronCostIncrease;
        electrons++;
        if(!isElectronDisplayed) {
            isElectronDisplayed = true;
            document.getElementById("electron-container").style.display = "block";
        }

        updateDisplay();
    }
}

function buyElectronUpgrade1() {
    if(electrons >= 10 && !eUpgradeOneUnl) {
        electrons -= 10;
        electronCost = 50;
        eUpgradeOneUnl = true;
        document.getElementById("e-upgrade-one").innerHTML = "Purchased!";

        updateDisplay();
    }
}

function buyElectronUpgrade2() {
    if(electrons >= 25 && !eUpgradeTwoUnl) {
        electrons -= 25;
        electronCost = 200;
        eUpgradeTwoUnl = true;
        document.getElementById("e-upgrade-two").innerHTML = "Purchased!";

        updateDisplay();
    }
}

function buyElectronUpgrade3() {
    if(electrons >= 40 && !eUpgradeThreeUnl) {
        electrons -= 40;
        electronCost = 1000;
        eUpgradeThreeUnl = true;
        document.getElementById("e-upgrade-three").innerHTML = "Purchased!";

        updateDisplay();
    }
}

function buyProton() {
    if(electrons >= protonCost) {
        electrons -= protonCost;
        protonCost *= 1.2;
        protons++;
        electronIdleIncrease++;
        if(!isProtonDisplayed) {
            isProtonDisplayed = true;
            electronCost = 10000;
            document.getElementById("proton-upgrades").style.display = "block";
            document.getElementById("proton-container").style.display = "block";
        }

        updateDisplay();
    }
}

function buyProtonUpgrade1() {
    if(protons >= 5 && !pUpgradeOneUnl) {
        protons -= 5;
        electronCost = 1e5;
        pUpgradeOneUnl = true;
        document.getElementById("p-upgrade-one").innerHTML = "Purchased!";

        updateDisplay();
    }
}

function buyProtonUpgrade2() {
    if(protons >= 25 && !pUpgradeTwoUnl) {
        protons -= 25;
        protonCost = 75;
        electronIdleIncrease = Math.pow(electronIdleIncrease, 2);
        pUpgradeTwoUnl = true;
        document.getElementById("p-upgrade-two").innerHTML = "Purchased!";
    }
}

function buyProtonUpgrade3() {
    if(protons >= 50 && !pUpgradeThreeUnl) {
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
            document.getElementById("resource-buyers").style.display = "block";
            document.getElementById("electron-upgrade-container").style.display = "none";
            document.getElementById("proton-upgrade-container").style.display = "none";
            break;
        case UIStates.ELECTRON_UPGRADES:
            document.getElementById("main-clicker").style.display = "none";
            document.getElementById("resource-buyers").style.display = "none";
            document.getElementById("electron-upgrade-container").style.display = "block";
            document.getElementById("proton-upgrade-container").style.display = "none";
            break;
        case UIStates.PROTON_UPGRADES:
            document.getElementById("main-clicker").style.display = "none";
            document.getElementById("resource-buyers").style.display = "none";
            document.getElementById("electron-upgrade-container").style.display = "none";
            document.getElementById("proton-upgrade-container").style.display = "block";
            break;
    }
}

const UIStates = {
    HOME: "home",
    ELECTRON_UPGRADES: "electron-upgrades",
    PROTON_UPGRADES: "proton-upgrades"
};