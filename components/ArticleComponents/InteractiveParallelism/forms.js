

const globals = {
  fromText: "If human is on laptop sit on the keyboard.",
  toText: "My slave human didn't give me any food so i pooped on the floor."
}

function setGlobals({toText, fromText}) {
  globals.toText = toText
  globals.fromText = fromText
}

const forms = Array.from(document.querySelectorAll('.sam_i_p_input-form'))

forms.forEach(form => {

  const initialInput = form.target.querySelector(".sam_i_p_input-form__initial-value")
  const finalInput = form.target.querySelector(".sam_i_p_input-form__final-value")

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    // debugger
    globals.fromText = initialInput.value
    globals.toText = finalInput.value
    initialInput.value = ""
    finalInput.value = ""
  })
})
