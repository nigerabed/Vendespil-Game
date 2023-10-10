import data from "./data.json" assert { type: "json" };

// let newdata1 = data.slice(0, 10);
// let newdata2 = data.slice(0, 10);

let newdata1 = [];
let newdata2 = [];

// Logic for easy Mode
let elementEasyMode = document.querySelector("#easyMode");
elementEasyMode.addEventListener("click", (event) => {
  document.getElementById("outside-box").innerHTML = "";

  newdata1 = data.slice(0, 3);
  newdata2 = data.slice(0, 3);
  shuffle(newdata1);
  shuffle(newdata2);

  for (let i = 0; i < newdata1.length; i++) {
    bigBox(newdata1[i]);
    bigBox(newdata2[i]);
  }
});

// Logic for Medium mode
let elementMediumMode = document.querySelector("#MediumMode");
elementMediumMode.addEventListener("click", () => {
  document.getElementById("outside-box").innerHTML = "";

  newdata1 = data.slice(0, 7);
  newdata2 = data.slice(0, 7);
  shuffle(newdata1);
  shuffle(newdata2);

  for (let i = 0; i < newdata1.length; i++) {
    bigBox(newdata1[i]);
    bigBox(newdata2[i]);
  }
});

// Logic for Hard mode

let elementHardMode = document.querySelector("#HardMode");
elementHardMode.addEventListener("click", () => {
  document.getElementById("outside-box").innerHTML = "";

  newdata1 = data.slice(0, 14);
  newdata2 = data.slice(0, 14);
  shuffle(newdata1);
  shuffle(newdata2);

  for (let i = 0; i < newdata1.length; i++) {
    bigBox(newdata1[i]);
    bigBox(newdata2[i]);
  }
});

shuffle(newdata1);
shuffle(newdata2);

let temp1 = "";
let temp2 = "";

function bigBox(card) {
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
        }, 2000);
      } else {
        document.getElementById("result").innerText = "Not Match";
        setTimeout(function () {
          temp1.classList.toggle("flipped");
          temp2.classList.toggle("flipped");
          temp1 = "";
          temp2 = "";
        }, 2000);
      }
    }
  });
}

for (let i = 0; i < newdata1.length; i++) {
  bigBox(newdata1[i]);
  bigBox(newdata2[i]);
}

function shuffle(arrayData) {
  for (let i = 0; i < arrayData.length; i++) {
    let randomIndex = Math.floor(Math.random() * arrayData.length); //Math.floor(Math.random()* max); random er formula.
    let temp = arrayData[randomIndex];
    arrayData[randomIndex] = arrayData[i];
    arrayData[i] = temp;
  }
}
