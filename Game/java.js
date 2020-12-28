let i = 0;
let unitsCraft = { archer: 0, warrior: 0 };
let unitsCraftResources = { wood: 0, iron: 0, food: 0 };
const unitData = [
  { name: "archer", craftTime: 2, craftCost: { wood: 10, iron: 5, food: 2 }, speed: 15, attack: 10, armour: 6 },
  { name: "warrior", craftTime: 4, craftCost: { wood: 5, iron: 10, food: 5 }, speed: 3, attack: 5, armour: 10 },
];

const calcUnitPower = (unit) => unit.attack * 1.5 + unit.speed * 1.2 + unit.armour * 1.3;

const addElement = (tag, text) => {
  const node = document.createElement(tag);
  node.innerHTML = text;
  return node;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function showData() {
  for (let i = 0; i < unitData.length; i++) {
    let Data = unitData[i];
    const dataPlace = document.querySelector("." + Data.name + "Data");
    dataPlace.appendChild(addElement("h3", capitalizeFirstLetter(Data.name)));
    dataPlace.appendChild(addElement("p", "Power: " + calcUnitPower(Data) + "<br>Train time: " + Data.craftTime + "s"));

    const dataCost = document.querySelector("." + Data.name + "Cost");
    dataCost.innerHTML = "Cost: " + Data.craftCost.wood + " Wood, " + Data.craftCost.iron + " iron, " + Data.craftCost.food + " food.";
  }
}

function summon(unitType) {
  if (i != 0) return;
  i = 1;

  let width = 1;
  let timeNeeded = unitData.find((unit) => unit.name == unitType).craftTime; // get time needed to craft

  const Bar = document.querySelector("." + unitType + "Bar"); // get progress bar

  let today = new Date();
  const craftTime = new Date();
  craftTime.setSeconds(craftTime.getSeconds() + timeNeeded);

  let id = setInterval(frame, 50);

  function frame() {
    if (craftTime.getTime() <= today.getTime()) {
      clearInterval(id);
      i = 0;

      setTimeout(function () {
        Bar.style.width = 0 + "%";
      }, 50);
    } else {
      today = new Date();
      width = Math.round((1 - (craftTime.getTime() - today.getTime()) / (timeNeeded * 1000)) * 100);
      Bar.style.width = width + "%";
    }
  }
}

function manageUnitsNumber(number, type, unit) {
  const unitInputArea = document.querySelector("." + unit + "InputArea");
  const unitPower = document.querySelector("." + unit + "Power");
  const totalCost = document.querySelector(".totalCost");

  switch (type) {
    case "incButton":
      unitsCraft[unit] += number;
      break;
    case "decButton":
      unitsCraft[unit] -= number;
      break;
    case "input":
      unitsCraft[unit] = parseInt(number);
      break;
    default:
      console.log("error: Type " + type + " is not defined");
      break;
  }

  unitPower.innerHTML = Math.round( unitsCraft[unit] * calcUnitPower(unitData.find((troop) => troop.name == unit))) ;
  unitInputArea.value = unitsCraft[unit];
  unitsCraftResources.wood =0;
  unitsCraftResources.food =0;
  unitsCraftResources.iron =0;
  for(let i = 0; i < unitData.length;i++){
    unitsCraftResources.wood += unitsCraft[unitData[i].name] * unitData[i].craftCost.wood;
    unitsCraftResources.iron += unitsCraft[unitData[i].name] * unitData[i].craftCost.iron;
    unitsCraftResources.food += unitsCraft[unitData[i].name] * unitData[i].craftCost.food;
  }

  totalCost.innerHTML = "Wood: " + unitsCraftResources.wood + "<br>Iron: " + unitsCraftResources.iron + "<br>Food: " + unitsCraftResources.food;
}
