let cardsArr = Array.from(document.querySelectorAll(".card"))
let user = document.querySelector(".user-box .username")
let interfaceDiv = document.querySelector(".interface div")
let triesNumber = document.querySelector('.tries span')
interfaceDiv.onclick = function (e) {
    let username = prompt("Enter Your Name Please !")
    user.textContent = `Hello : ${username || "Unknown"}`
    e.target.parentElement.remove();
}
transitionDuration = 1000;
arr = Array.from(Array(cardsArr.length).keys())
shuffle(arr)
// add order array to cards
cardsArr.forEach((card, index) => {
    card.style.order = arr[index];
    card.addEventListener("click", function (c) {
        flipCards(card)
        console.log(c.target.parentElement)
    })
})

// shuffling function
function shuffle(arr) {
    let current = arr.length;
    let random = "";
    while(current > 0) {
        random = Math.floor(Math.random() * current)

        current--
        [arr[current], arr[random]] = [arr[random], arr[current]]
    }
}
shuffle(arr)
// flip card function 
function flipCards(card) {
    card.classList.add("clicked")
    let allClicked = cardsArr.filter((e) => e.classList.contains("clicked"))
    if (allClicked.length === 2) {
        document.querySelector(".cards").classList.add("no-click")
        setTimeout(() => {
            document.querySelector(".cards").classList.remove("no-click")
        }, transitionDuration);
        matchedCards(allClicked[0], allClicked[1])
    }
}

// stopClick()
function matchedCards(cardOne, cardTwo) {
    if (cardOne.dataset.lang === cardTwo.dataset.lang) {
        cardOne.classList.remove("clicked")
        cardTwo.classList.remove("clicked")
        cardOne.classList.add("matched")
        cardTwo.classList.add("matched")
        document.getElementById("suc").play()
    } else if (cardOne.dataset.lang !== cardTwo.dataset.lang) {
        document.querySelector("#err").play()
        setTimeout(() => {
            triesNumber.textContent = parseInt(triesNumber.textContent) + 1
            cardOne.classList.remove("clicked")
            cardTwo.classList.remove("clicked")
            if (parseInt(triesNumber.textContent) === 5) {
                let endDiv = document.createElement("div")
                endDiv.className = "end-div";
                let text = document.createElement("p")
                text.textContent = "شوفلك كلبة"
                endDiv.appendChild(text)
                document.body.appendChild(endDiv)
            }
        }, transitionDuration);
    }
}

