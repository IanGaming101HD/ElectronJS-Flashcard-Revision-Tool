document.getElementById('first_input').innerText = 'hi'

import cards from '../../flashcards/cards.json' assert { type: 'json' }

const show_hide_answer_button = document.getElementById('show_hide_answer')
const main_menu_button = document.getElementById('main_menu')
const next_button = document.getElementById('next')

let value = 0;
let value2 = 0;

if (cards.length === 0) {
  first_input.innerText = ''
  second_input.innerText = 'There are no cards in this folder!\nTo add more cards select \"Main Menu\"\nand to restart the flash cards select \"Retry\".'
  second_input.style['marginBottom'] = '0px'
  main_menu_button.style['marginTop'] = '0px'
  next_button.style['marginTop'] = '0px'
  show_hide_answer_button.remove()
  next_button.innerText = 'Retry'
  next_button.removeEventListener('click', async (e) => {})
  next_button.addEventListener('click', async (e) => {
    window.location.reload()
  })
}

function session(x) {
  if (x < cards.length) {
    let first_input = document.getElementById('first_input')
    let second_input = document.getElementById('second_input')

    first_input.innerText = cards[x].first_value
    second_input.innerText = ''
    show_hide_answer_button.innerText = 'Show Answer'
  } else {
    first_input.innerText = ''
    second_input.innerText = 'There are no more cards left!\nTo add more cards select \"Main Menu\"\nand to restart the flash cards select \"Retry\".'
    second_input.style['marginBottom'] = '0px'
    main_menu_button.style['marginTop'] = '-10px'
    next_button.style['marginTop'] = '-10px'
    show_hide_answer_button.remove()
    next_button.innerText = 'Retry'
    next_button.removeEventListener('click', async (e) => {})
    next_button.addEventListener('click', async (e) => {
      window.location.reload()
    })
  }
}

show_hide_answer_button.addEventListener('click', async (e) => {
  let second_input = document.getElementById('second_input')
  if (value === 0) {
    second_input.innerText = cards[value2].second_value
    show_hide_answer_button.innerText = 'Hide Answer'
    value = 1
  } else {
    second_input.innerText = ''
    show_hide_answer_button.innerText = 'Show Answer'
    value = 0
  }
})

main_menu_button.addEventListener('click', async (e) => {
  location.href = '../main_menu/index.html'
})

next_button.addEventListener('click', async (e) => {
  value2 += 1
  session(value2)
})
session(0)
