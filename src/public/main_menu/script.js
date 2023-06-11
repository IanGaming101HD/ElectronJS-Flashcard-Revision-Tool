const start_session_button = document.getElementById('start_session_button')
const create_button = document.getElementById('create_button')
const change_directory = document.getElementById('change_directory')

start_session_button.addEventListener('click', async (event) => {
  location.href = '../session/index.html'
})

create_button.addEventListener('click', async (event) => {
  event.preventDefault()

  let popupContainer = document.getElementById('popup_container')
  
  if (!await electron.existsSync('../../flashcards')) {
    await electron.mkdirSync('../../flashcards')
  }

  let config = await electron.config
  if (!config.path) {
    config.path = await electron.default_path
    await electron.writeFileSync('./src/config.json', JSON.stringify(config));
  }

  let firstInput = document.getElementById('first_input').value
  let secondInput = document.getElementById('second_input').value

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
    first_value: firstInput,
    second_value: secondInput
  })

  await electron.writeFileSync(config.path + '\\cards.json', JSON.stringify(data));
  
  popupContainer.hidden = false
  setTimeout(() => popupContainer.hidden = true, 3000)
})

change_directory.addEventListener('click', async (event) => {
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