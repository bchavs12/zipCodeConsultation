const submitButton = document.querySelector("#app form button");
const zipCodeField = document.querySelector("#app form input");
const content = document.querySelector("#app main");

submitButton.addEventListener("click", run);

function run(event) {
  event.preventDefault();

  let zipCode = zipCodeField.value;

  // Exception Handling
  zipCode = zipCode.replace(" ", "");
  zipCode = zipCode.replace(".", "");
  zipCode = zipCode.trim();

  // Resquest from API
  axios
    .get(`https://viacep.com.br/ws/${zipCode}/json/`)
    .then((response) => {
      if (response.data.erro) {
        throw new Error("CEP inválido");
      }
      content.innerHTML = "";
      showResponse(response.data.logradouro);
      showResponse(`${response.data.localidade} / ${response.data.uf}`);
      showResponse(response.data.bairro);
    })
    .catch((error) => {
      content.innerHTML = "";
      showResponse("Consulta inválida (maximo de 6 dígito)");
    });
}

// structure DOM
function showResponse(data) {
  let line = document.createElement("p");
  let text = document.createTextNode(data);

  line.appendChild(text);
  content.appendChild(line);
}
