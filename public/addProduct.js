const form1 = document.querySelector('.userData')
console.log('texto', form1)
if (form1 !== null) {
  form1.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log(e)
    const body = JSON.stringify(getData(e))
    console.log(body)
    fetch('/products/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    }).then(() => {
      clearInputs(e)
      console.log('Data Created')
    }).catch(error => console.log(error))
  })
}

function getData (event) {
  let data = {}
  const inputBox = event.target.querySelectorAll('input')
  console.log(inputBox)
  inputBox.forEach(field => {
    data = { ...data, [field.name]: field.value }
  })
  return data
}
function clearInputs (event) {
  const inputs = event.target.querySelectorAll('input')
  inputs.forEach(field => {
    field.value = ''
  })
}
