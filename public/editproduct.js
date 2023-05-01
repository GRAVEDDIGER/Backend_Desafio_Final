const form1 = document.querySelector('form')
form1.addEventListener('submit', e => {
  e.preventDefault()
  fetch(
    '/products/' + e.target.id,
    {
      method: 'put',
      headers:
    {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(getBody(e))
    }).then(response => {
    window.location.href = '/products'
  }).catch(error => console.log(error))
})
function getBody (event) {
  let data = {}
  const inputs = event.target.querySelectorAll('input')
  inputs.forEach(field => {
    data = { ...data, [field.name]: field.value }
  })
  return data
}
