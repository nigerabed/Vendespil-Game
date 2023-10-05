import data from "./data.json" assert { type: "json" };

let newdata1 = data.slice(0, 10);
let newdata2 = data.slice(0, 10);

function shuffle(arrayData) {
  for (let i = 0; i < arrayData.length; i++) {
    let randomIndex = Math.floor(Math.random() * arrayData.length); //Math.floor(Math.random()* max); random er formula.
    let temp = arrayData[randomIndex];
    arrayData[randomIndex] = arrayData[i];
    arrayData[i] = temp;
  }
}

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
    <br>
        type: ${card.type} 
        <br>
        attributes:${card.attributes[(0, 1)]}
        description: ${card.description}
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
    if (temp1 != "" && temp2 != "") {
      if (temp1 === temp2) {
        document.getElementById("result").innerText = "Match";
      } else {
        document.getElementById("result").innerText = "Not Match";
      }

      setTimeout(function () {
        mainDiv.classList.toggle("flipped");
        mainDiv.classList.toggle("flipped");
      
      }, 2000);

      temp1 = "";
      temp2 = "";
    }
  });
}

for (let i = 0; i < newdata1.length; i++) {
  bigBox(newdata1[i]);
  bigBox(newdata2[i]);
}
