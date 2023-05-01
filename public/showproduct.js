const updateButton = document.getElementById('update')
updateButton.addEventListener('click', e => {
  e.preventDefault()
  const url = '/products/update/' + e.target.name
  console.log(url)
  window.location.href = url
})

const deleteButton = document.getElementById('delete')
deleteButton.addEventListener('click', e => {
  e.preventDefault()
  const url = '/products/' + e.target.name
  console.log(url)
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(() => { window.location.href = '/products' })
    .catch(error => { console.log(error) })
})

const addCart = document.getElementById('cart')
const quantityInput = document.querySelector('.quantity')
addCart.addEventListener('click', e => {
  e.preventDefault()
  const url = '/carts/addproduct/' + e.target.name + '/' + quantityInput.value
  console.log(url)
  fetch(url, { method: 'get' })
    .then(response => {
      if (response.redirected) window.location.href = response.url
    })
    .catch(error => console.log(error))
})
