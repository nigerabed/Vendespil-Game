import data from "./data.json" assert { type: "json" };

function getASetOfCard(mode) {
  let cardSet;

  if (mode === "easy") {
    cardSet = data.slice(0, 3);
  } else if (mode === "medium") {
    cardSet = data.slice(0, 7);
  } else if (mode === "hard") {
    cardSet = data.slice(0, 14);
  }

  return cardSet;
}

function shuffle(arrayData) {
  for (let i = 0; i < arrayData.length; i++) {
    let randomIndex = Math.floor(Math.random() * arrayData.length); //Math.floor(Math.random()* max); random er formula.
    let temp = arrayData[randomIndex];
    arrayData[randomIndex] = arrayData[i];
    arrayData[i] = temp;
  }
}

let easyMode = document.getElementById("easyMode");
easyMode.addEventListener("click", (event) => {
  console.log("Easy Mode");
  let cardSet1 = getASetOfCard("easy"); //data.slice(0, 3);
  let cardSet2 = getASetOfCard("easy"); //data.slice(0, 3); 

  shuffle(cardSet1);
  shuffle(cardSet2); 
  
  document.getElementById("outside-box").innerHTML = "";

  for(let i = 0; i<cardSet1.length; i++){
    displayCard(cardSet1[i]);
    displayCard(cardSet2[i]);
  }
});

let mediumMode = document.getElementById("MediumMode");
mediumMode.addEventListener("click", (event) => {
  console.log("Medium Mode");
  let cardSet1 = getASetOfCard("medium"); //data.slice(0, 7);
  let cardSet2 = getASetOfCard("medium"); //data.slice(0, 7);
  shuffle(cardSet1);
  shuffle(cardSet2); 

  document.getElementById("outside-box").innerHTML = "";

  for(let i = 0; i<cardSet1.length; i++){
    displayCard(cardSet1[i]);
    displayCard(cardSet2[i]);
  }
});

let hardMode = document.getElementById("HardMode");
hardMode.addEventListener("click", (event) => {
  console.log("Hard Mode");
  let cardSet1 = getASetOfCard("hard"); //data.slice(0, 14); 
  let cardSet2 = getASetOfCard("hard"); //data.slice(0, 14); 
  shuffle(cardSet1);
  shuffle(cardSet2); 

  document.getElementById("outside-box").innerHTML = "";
  for(let i = 0; i<cardSet1.length; i++){
    displayCard(cardSet1[i]);
    displayCard(cardSet2[i]);
  }
});





let temp1 = "";
let temp2 = "";

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
