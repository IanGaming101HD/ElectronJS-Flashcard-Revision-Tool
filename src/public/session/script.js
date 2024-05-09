const toggleButton = document.getElementById('toggle-answer-button')
const mainMenuButton = document.getElementById('main-menu-button')
const nextButton = document.getElementById('next-button')
const question = document.getElementById('question')
const answer = document.getElementById('answer')

let answerHidden = true;
let value = 0;

let cards = JSON.parse(await electron.readFileSync((await electron.config).path + '\\cards.json', { encoding: 'utf8' }))

if (!cards || cards.length === 0) {
  cards = []
  
  question.innerText = ''
  answer.innerText = 'There are no cards in this folder!\nTo add more cards select \"Main Menu\".'
  toggleButton.remove()
}

function session(index) {
  answerHidden = true
  if (index < cards.length) {
    question.innerText = cards[index].question
    answer.innerText = ''
    toggleButton.innerText = 'Show Answer'
  } else {
    question.innerText = ''
    answer.innerText = 'There are no more cards left!\nTo add more cards select \"Main Menu\"\nand to restart the flash cards select \"Retry\".'
    toggleButton.remove()
    nextButton.innerText = 'Retry'
    nextButton.removeEventListener('click', async (event) => {})
    nextButton.addEventListener('click', async (event) => {
      window.location.reload()
    })
  }
}

toggleButton.addEventListener('click', async (event) => {
  let answer = document.getElementById('answer')

  if (answerHidden) {
    answer.innerText = cards[value].answer
    toggleButton.innerText = 'Hide Answer'
    answerHidden = false
  } else {
    answer.innerText = ''
    toggleButton.innerText = 'Show Answer'
    answerHidden = true
  }
})

mainMenuButton.addEventListener('click', async (event) => {
  location.href = '../main_menu/index.html'
})

nextButton.addEventListener('click', async (event) => {
  value += 1
  session(value)
})
session(0)