import config from '../../config.json' assert { type: 'json' }
// import config from '../../config.json' assert { type: 'json' }
const fs = require('fs');

const start_session_button = document.getElementById('start_session_button')
const create_button = document.getElementById('create_button')
const change_directory = document.getElementById('change_directory')

start_session_button.addEventListener('click', async (e) => {
  location.href = '../session/index.html'
})

create_button.addEventListener('click', async (e) => {
  if (!electron.existsSync('../../flashcards')) {
    electron.mkdirSync('../../flashcards')
  }
  if (config.path === '') {
    config.path = await stuff.path()
  }

  let first_input = document.getElementById('first_input')
  let second_input = document.getElementById('second_input')

  if (first_input.value !== '' && second_input.value !== '') {
    let data = fs.readFileSync('data.json')
    let myObject = JSON.parse(data)

    function objectify(first_value, second_value) {
      return {
        first_value: second_value
      }
    }

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