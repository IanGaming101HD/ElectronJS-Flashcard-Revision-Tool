const toggleButton = document.getElementById('toggle-answer')
const mainMenuButton = document.getElementById('main-menu')
const nextButton = document.getElementById('next')

let show = false;
let value = 0;

let cards = JSON.parse(await electron.readFileSync((await electron.config).path + '\\cards.json', { encoding: 'utf8' }))

if (!cards || cards.length === 0) {
  let firstInput = document.getElementById('first-input')
  let secondInput = document.getElementById('second-input')
  cards = []
  
  firstInput.innerText = ''
  secondInput.innerText = 'There are no cards in this folder!\nTo add more cards select \"Main Menu\"\nand to restart the flash cards select \"Retry\".'
  secondInput.style['marginBottom'] = '0px'
  mainMenuButton.style['marginTop'] = '0px'
  nextButton.style['marginTop'] = '0px'
  toggleButton.remove()
  nextButton.innerText = 'Retry'
  nextButton.removeEventListener('click', async (e) => {})
  nextButton.addEventListener('click', async (e) => {
    window.location.reload()
  })
}

function session(x) {
  if (x < cards.length) {
    let firstInput = document.getElementById('firstInput')
    let secondInput = document.getElementById('secondInput')

    firstInput.innerText = cards[x].firstValue
    secondInput.innerText = ''
    toggleButton.innerText = 'Show Answer'
  } else {
    firstInput.innerText = ''
    secondInput.innerText = 'There are no more cards left!\nTo add more cards select \"Main Menu\"\nand to restart the flash cards select \"Retry\".'
    secondInput.style['marginBottom'] = '0px'
    mainMenuButton.style['marginTop'] = '-10px'
    nextButton.style['marginTop'] = '-10px'
    toggleButton.remove()
    nextButton.innerText = 'Retry'
    nextButton.removeEventListener('click', async (e) => {})
    nextButton.addEventListener('click', async (e) => {
      window.location.reload()
    })
  }
}

toggleButton.addEventListener('click', async (e) => {
  let secondInput = document.getElementById('secondInput')

  show = !show
  if (show) {
    secondInput.innerText = cards[value].secondValue
    toggleButton.innerText = 'Hide Answer'
  } else {
    secondInput.innerText = ''
    toggleButton.innerText = 'Show Answer'
  }
  show = !show
})

mainMenuButton.addEventListener('click', async (e) => {
  location.href = '../main-menu/index.html'
})

nextButton.addEventListener('click', async (e) => {
  value += 1
  session(value)
})
session(0)