const startSessionButton = document.getElementById('start-session-button')
const createButton = document.getElementById('create-button')
const changeDirectory = document.getElementById('change-directory')

startSessionButton.addEventListener('click', async (event) => {
  location.href = '../session/index.html'
})

createButton.addEventListener('click', async (event) => {
  event.preventDefault()

  let popupContainer = document.getElementById('popup-container')
  
  if (!await electron.existsSync('../../flashcards')) {
    await electron.mkdirSync('../../flashcards')
  }

  let config = await electron.config
  if (!config.path) {
    config.path = await electron.default_path
    await electron.writeFileSync('./src/config.json', JSON.stringify(config));
  }

  let firstInput = document.getElementById('first-input').value
  let secondInput = document.getElementById('second-input').value

  if (!firstInput || !secondInput) return
  let data;
  try {
    data = JSON.parse(await electron.readFileSync(config.path + '\\cards.json', {
      encoding: 'utf8'
    }))
  } catch (error) {}

  if (!data) {
    data = []
    await electron.writeFileSync(config.path + '\\cards.json', JSON.stringify(data));
  }

  data.push({
    'first-value': firstInput,
    'second-value': secondInput
  })

  await electron.writeFileSync(config.path + '\\cards.json', JSON.stringify(data));
  
  popupContainer.hidden = false
  setTimeout(() => popupContainer.hidden = true, 3000)
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