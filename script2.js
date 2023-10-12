import data from "./data.json" assert { type: "json" };

let cardSet;
let cardSet1;
let cardSet2;
let temp1 = "";
let temp2 = "";



function getASetOfCard(mode) {
  if (mode === "easy") {
    cardSet = data.slice(0, 3);
  } else if (mode === "medium") {
    cardSet = data.slice(0, 7);
  } else if (mode === "hard") {
    cardSet = data.slice(0, 14);
  }

  return cardSet;
}

let pointCount = 0;
let pointElement = document.getElementById("score");

function updatePoint() {
  pointCount++;
  pointElement.textContent = pointCount;
}

function gameOver() {
  if (pointCount === cardSet.length) {
    document.getElementById("result").innerText = "Game Over";
  }
}

function reset(){
  document.getElementById("outside-box").innerHTML = "";
  document.getElementById("result").innerHTML = ""
  document.getElementById("score").innerHTML = ""
  pointCount = 0
   
}

// SET TIMER 

let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// Shuffle ARRAY
function shuffle(arrayData) {
  for (let i = 0; i < arrayData.length; i++) {
    let randomIndex = Math.floor(Math.random() * arrayData.length); //Math.floor(Math.random()* max); random er formula.
    let temp = arrayData[randomIndex];
    arrayData[randomIndex] = arrayData[i];
    arrayData[i] = temp;
  }
}

function displayCardSet(cardSet) {
  shuffle(cardSet);
  document.getElementById("outside-box").innerHTML = "";
  for (let i = 0; i < cardSet.length; i++) {
    displayCard(cardSet[i]);
  }
}

let easyMode = document.getElementById("easyMode");
easyMode.addEventListener("click", (event) => {
  console.log("Easy Mode");
  reset()
  let cardSet1 = getASetOfCard("easy"); //data.slice(0, 3);
  let cardSet2 = getASetOfCard("easy"); //data.slice(0, 3);
  let cardSet = cardSet1.concat(cardSet2)
  displayCardSet(cardSet)
  
});

let mediumMode = document.getElementById("MediumMode");
mediumMode.addEventListener("click", (event) => {
  console.log("Medium Mode");
  reset();
  let cardSet1 = getASetOfCard("medium"); //data.slice(0, 7);
  let cardSet2 = getASetOfCard("medium"); //data.slice(0, 7);
   let cardSet = cardSet1.concat(cardSet2);
  displayCardSet(cardSet);
 
});

let hardMode = document.getElementById("HardMode");
hardMode.addEventListener("click", (event) => {
  console.log("Hard Mode");
   reset();
  let cardSet1 = getASetOfCard("hard"); //data.slice(0, 14);
  let cardSet2 = getASetOfCard("hard"); //data.slice(0, 14);
   let cardSet = cardSet1.concat(cardSet2);
   displayCardSet(cardSet);
});



function displayCard(card) {
  let box = document.getElementById("outside-box");

  let container = document.createElement("article");
  container.setAttribute("class", "container");
  box.appendChild(container);

  let mainDiv = document.createElement("div");
  mainDiv.setAttribute("class", "cards");
  container.appendChild(mainDiv);
  mainDiv.innerHTML = `
    <div class="front"><img src="./game.jpg" alt="">
    </div>

    <div class="back">
        <h3>${card.tag}</h3>
        <span>
        type: ${card.type} 
        <br>
        attributes:${card.attributes[(0, 1)]}
        description: ${card.description}
        </span>
    </div>
    `;

  mainDiv.addEventListener("click", function handleClick(event) {
    mainDiv.classList.toggle("flipped");

    if (temp1 === "") {
      temp1 = mainDiv;
    } else if (temp2 === "") {
      temp2 = mainDiv;
    }
    // checking
    if (temp1 !== "" && temp2 !== "") {
      if (temp1.innerHTML === temp2.innerHTML) {
        document.getElementById("result").innerText = "Match";
        updatePoint();
        gameOver();

        setTimeout(function () {
          temp1.classList.toggle("hidden");
          temp2.classList.toggle("hidden");
          temp1 = "";
          temp2 = "";
        }, 1500);
      } else {
        document.getElementById("result").innerText = "Not Match";
        setTimeout(function () {
          temp1.classList.toggle("flipped");
          temp2.classList.toggle("flipped");
          temp1 = "";
          temp2 = "";
        }, 1500);
      }
    }
  });
}
