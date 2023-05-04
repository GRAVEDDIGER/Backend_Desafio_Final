const deleteButton = document.querySelectorAll('.erase')
const articleData = document.querySelector('.cardcontainer')
const updateButton = document.querySelector('.updateButton')
const deleteCartButton = document.querySelector('.deleteButton')
const saleButton = document.querySelector('.orderButton')
const inputs = document.querySelectorAll('input')
saleButton.addEventListener('click', e => {
  const url = `/sales/${articleData.id}`
  fetch(url, { method: 'POST' }).then(response => {
    if (response.ok) window.location.href = '/products'
  }).catch(e => console.log(e))
})
deleteCartButton.addEventListener('click', (e) => {
  const url = `/carts/${articleData.id}`
  fetch(url, { method: 'delete' }).then(response => { window.location.href = '/products' }).catch(e => { console.log(e) })
})
deleteButton.forEach(button => {
  button.addEventListener('click', e => {
    const productId = e.target.name
    const cartId = articleData.id
    const url = `/carts/deleteproduct/${cartId}/${productId}`
    console.log(url)
    fetch(url, { method: 'delete' })
      .then(response => {
        window.location.reload()
        console.log(response)
      })
      .catch(error => { console.log(error) })
  })
})
updateButton.addEventListener('click', e => {
  const data = getData()
  const url = `/carts/updateproducts/${articleData.id}`
  console.log(url)
  fetch(url, { method: 'put', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .then(response => {
      window.location.reload()
      console.log(response)
    }).catch(error => { console.log(error) })
})
function getData () {
  const data = []
  inputs.forEach(field => {
    data.push(field.value)
  })
  return data
}
