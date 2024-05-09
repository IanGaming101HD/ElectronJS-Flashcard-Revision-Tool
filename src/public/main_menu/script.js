const startSessionButton = document.getElementById('start-session-button')
const createButton = document.getElementById('create-button')
const cardsForm = document.getElementById('cards-form')
const changeDirectory = document.getElementById('change-directory')
const timeouts = []

function displayErrorMessage(message) {
  const popupContainer = document.getElementById('popup-container')
  const popupMessage = document.getElementById('popup-message')
  popupContainer.style.visibility = 'visible'
  popupContainer.style.backgroundColor = '#ebc8c4'
  popupMessage.style.color = '#9e2a2d'
  popupMessage.innerText = `Error: ${message}`
  if (timeouts.length !== 0) {
    timeouts.map(() => timeouts.pop())
  }
  let timeout = setTimeout(() => popupContainer.style.visibility = 'hidden', 3000)
  timeouts.push(timeout)
}

function displayAlertMessage(message) {
  const popupContainer = document.getElementById('popup-container')
  const popupMessage = document.getElementById('popup-message')
  popupContainer.style.visibility = 'visible'
  popupContainer.style.backgroundColor = '#a4ccff'
  popupMessage.style.color = '#003172'
  popupMessage.innerText = `Alert: ${message}`
  if (timeouts.length !== 0) {
    timeouts.map(() => timeouts.pop())
  }
  let timeout = setTimeout(() => popupContainer.style.visibility = 'hidden', 3000)
  timeouts.push(timeout)
}

startSessionButton.addEventListener('click', async (event) => {
  location.href = '../session/index.html'
})

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
  displayAlertMessage('Card has been created successfully.')
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