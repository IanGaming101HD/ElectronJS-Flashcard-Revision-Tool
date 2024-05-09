const startSessionButton = document.getElementById('start-session-button')
const createButton = document.getElementById('create-button')
const cardsForm = document.getElementById('cards-form')
const changeDirectory = document.getElementById('change-directory')

startSessionButton.addEventListener('click', async (event) => {
  location.href = '../session/index.html'
})

// cardsForm.addEventListener('click', async (event) => {
//   event.preventDefault()
// })

let displayErrorMessage = (message) => {
  let popupContainer = document.getElementById('popup-container')
  let alertMessage = document.getElementById('alert-message')
  popupContainer.style.visibility = 'visibile'
  alertMessage.innerText = `Error: ${message}`
  setTimeout(() => popupContainer.style.visibility = 'hidden' = true, 3000)
}


cardsForm.addEventListener('submit', (event) => {
  event.preventDefault()
})

createButton.addEventListener('click', async (event) => {
  event.preventDefault()
  
  if (!await electron.existsSync('../../flashcards')) {
    await electron.mkdirSync('../../flashcards')
  }

  let config = await electron.config
  if (!config.path) {
    config.path = await electron.default_path
    await electron.writeFileSync('./src/config.json', JSON.stringify(config));
  }

  let questionInput = document.getElementById('question-input')
  let answerInput = document.getElementById('answer-input')

  if (!questionInput.value || !answerInput.value) {
    displayErrorMessage('Please fill in all fields.')
    return;
  };
  let data;
  try {
    data = JSON.parse(await electron.readFileSync(`${config.path}\\cards.json`, {
      encoding: 'utf8'
    }))
  } catch (error) {}

  if (!data) {
    data = []
    await electron.writeFileSync(`${config.path}\\cards.json`, JSON.stringify(data));
  }

  data.push({
    question: questionInput.value,
    answer: answerInput.value
  })

  await electron.writeFileSync(`${config.path}\\cards.json`, JSON.stringify(data));
  
  // let popupContainer = document.getElementById('popup-container')
  // popupContainer.hidden = false
  // setTimeout(() => popupContainer.hidden = true, 3000)
})

changeDirectory.addEventListener('click', async (event) => {
  event.preventDefault()

  await electron.showOpenDialog({
    properties: ['openDirectory']
  }).then(async (result) => {
    let data = JSON.parse(await electron.readFileSync('./src/config.json', {
      encoding: 'utf8'
    }))
    let folderPath = result.filePaths[0];

    data.path = folderPath

    await electron.writeFileSync('./src/config.json', JSON.stringify(data));
  }).catch((error) => {
    console.log(error)
  });
})