let submitButton = document.querySelector("#app form button")
let zipCodeField = document.querySelector("#app form input")
let content = document.querySelector("#app main")

submitButton.addEventListener('click', run)

function run(event) {
   event.preventDefault()

   let zipcode = zipCodeField.value

   zipcode = zipcode.replace(' ', '')
   zipcode = zipcode.replace('.', '')
   zipcode = zipcode.trim()

   axios
      .get('https://viacep.com.br/ws/' + zipcode + '/json/')
      .then(function (response) {
         if (response.data.erro) {
            throw new Error('CEP inválido')
         }

         content.innerHTML = ''
         createLine(response.data.logradouro)
         createLine(response.data.localidade + '/' + response.data.uf)
         createLine(response.data.bairro)
      })
      .catch(function (error) {
         content.innerHTML = ''
         createLine('Ops, algo deu errado!')
      })
}

function createLine(result) {
   let line = document.createElement('p')
   let text = document.createTextNode(result)
   line.appendChild(text)
   content.appendChild(line)
}