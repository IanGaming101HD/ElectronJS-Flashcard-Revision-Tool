const toggleButton = document.getElementById('toggle-answer-button')
const mainMenuButton = document.getElementById('main-menu-button')
const nextButton = document.getElementById('next-button')
const questionField = document.getElementById('question-field')
const answerField = document.getElementById('answer-field')

// let show = false;
// let value = 0;

// let cards = JSON.parse(await electron.readFileSync((await electron.config).path + '\\cards.json', { encoding: 'utf8' }))

// if (!cards || cards.length === 0) {
//   cards = []
  
//   questionField.innerText = ''
//   answerField.innerText = 'There are no cards in this folder!\nTo add more cards select \"Main Menu\".'
//   answerField.style['marginBottom'] = '0px'
//   mainMenuButton.style['marginTop'] = '0px'
//   nextButton.style['marginTop'] = '0px'
//   toggleButton.remove()
//   toggleButton
// }

// function session(x) {
//   if (x < cards.length) {

//     questionField.innerText = cards[x].firstValue
//     answerField.innerText = ''
//     toggleButton.innerText = 'Show Answer'
//   } else {
//     questionField.innerText = ''
//     answerField.innerText = 'There are no more cards left!\nTo add more cards select \"Main Menu\"\nand to restart the flash cards select \"Retry\".'
//     answerField.style['marginBottom'] = '0px'
//     mainMenuButton.style['marginTop'] = '-10px'
//     nextButton.style['marginTop'] = '-10px'
//     toggleButton.remove()
//     nextButton.innerText = 'Retry'
//     nextButton.removeEventListener('click', async (event) => {})
//     nextButton.addEventListener('click', async (event) => {
//       window.location.reload()
//     })
//   }
// }

// toggleButton.addEventListener('click', async (event) => {
//   let answerField = document.getElementById('second-field')

//   show = !show
//   if (show) {
//     answerField.innerText = cards[value].secondValue
//     toggleButton.innerText = 'Hide Answer'
//   } else {
//     answerField.innerText = ''
//     toggleButton.innerText = 'Show Answer'
//   }
//   show = !show
// })

mainMenuButton.addEventListener('click', async (event) => {
  location.href = '../main_menu/index.html'
})

nextButton.addEventListener('click', async (event) => {
  value += 1
  session(value)
})
session(0)