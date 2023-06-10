const start_session_button = document.getElementById('start_session_button')
const create_button = document.getElementById('create_button')
const change_directory = document.getElementById('change_directory')

start_session_button.addEventListener('click', async (e) => {
  console.log('hi')
  location.href = '../session/index.html'
})

create_button.addEventListener('click', async (e) => {
  if (!await electron.existsSync('../../flashcards')) {
    await electron.mkdirSync('../../flashcards')
  }

  let path = await electron.config.path
  console.log(path)
  if (!path) {
    path = await electron.path
    await electron.writeFileSync('../../config.json', JSON.stringify(await electron.config.path));
  }

  let first_input = document.getElementById('first_input')
  let second_input = document.getElementById('second_input')

  if (first_input.value !== '' && second_input.value !== '') {
    let data = electron.readFileSync('data.json')
    let myObject = JSON.parse(data)

    let objectify = (first_value, second_value) => { first_value: second_value }

    myObject.push(objectify(first_input.value, second_input.value))
    let newData = JSON.stringify(myObject);

    fs.writeFile('cards.json', newData, (err) => {
      if (!err) {
        // first_input.value = ''
        // second_input.value = ''
        alert('Card has been created!')
      }
    })
  }
})

change_directory.addEventListener('click', async (e) => {
  // location.href = '../session/index.html'
})