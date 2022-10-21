const pizzas = [
    {
      id: 1,
      nombre: "Muzzarella",
      ingredientes: ["salsa", "queso"],
      precio: "300",
    },
    {
      id: 2,
      nombre: "Napolitana",
      ingredientes: ["salsa", "queso", "tomate"],
      precio: "500",
    },
    {
      id: 3,
      nombre: "Cuatro quesos",
      ingredientes: [
        "salsa",
        "queso fontina",
        "queso gorgonzola",
        "queso parmesano",
        "queso mozzarella",
      ],
      precio: "800",
    },
    {
      id: 4,
      nombre: "Jamon y morron",
      ingredientes: ["salsa", "queso", "jamon", "morron"],
      precio: "700",
    },
    {
      id: 5,
      nombre: "Calabresa",
      ingredientes: ["salsa", "queso", "calabresa"],
      precio: "900",
    },
    {
      id: 6,
      nombre: "Fugazzeta",
      ingredientes: ["salsa", "queso", "cebolla"],
      precio: "450",
    },
  ];

const formPizza = document.querySelector(".form-pizza");
const inputPizza = document.querySelector(".input-pizza");
const imgPizza = document.getElementById("img-pizza-container");

let ultimaPizza = JSON.parse(localStorage.getItem("pizza")) || [];

const saveLocalStorage = (item) =>
{
    return localStorage.setItem("pizza", JSON.stringify(item));
}

const checkIdInput = () =>
{
  let isValid = false;
  const valuePizza = inputPizza.value.trim();
  if(isEmpty(valuePizza)){
    showError(inputPizza, "Error, no ha ingresado ningun valor");
  }
  else if(!isBetween(valuePizza)){
    showError(inputPizza, "Error, el valor ingresado no es valido");
  }
  else{
    showSuccess(inputPizza);
    isValid = true;
  }
  return isValid;
}

const isEmpty = (value) => value === "";

const isBetween = (value) => {
  const existePizza = pizzas.some((pizza)=>pizza.id === Number(value))
  return existePizza;
}

const showError = (input, message) =>{
  const form = input.parentElement;
  const error = form.querySelector("small");
  error.classList.remove("exito");
  error.classList.add("fallo");
  error.textContent = message;
}

const showSuccess = (input) =>{
  const form = input.parentElement;
  const error = form.querySelector("small");
  error.classList.remove("fallo");
  error.classList.add("exito");
  error.textContent = "";
}

formPizza.addEventListener("submit",(e) =>
{
  e.preventDefault();
  let valido = checkIdInput()

  const valuePizza = inputPizza.value.trim(); 
  const pizza = pizzas.find((e) => e.id == valuePizza) || [];

  if(valido){
    saveLocalStorage(pizza);
    
    renderizarIngredientes(pizza, formPizza);
    renderizarImagen(pizza);
    renderizarNombre(pizza, formPizza)
    renderPrecio(pizza, formPizza);
  }
  else{
    saveLocalStorage(pizza);

    borrarIngredientes(formPizza);
    borrarImagen();
    borrarNombre(formPizza);
    borrarPrecio(formPizza);
  }
});


const renderizarNombre = (pizza, form) =>{
  const parentForm = form.parentElement;
  const nombre = parentForm.querySelector("h2");
  nombre.textContent = pizza.nombre;
}

const renderizarIngredientes = (pizza, form) =>{
    const parentForm = form.parentElement;
    const ingredientes = parentForm.querySelector("h4");
    ingredientes.textContent = pizza.ingredientes.join(", ");
  }

const renderPrecio = (pizza, form) =>{
  const parentForm = form.parentElement;
  const precio = parentForm.querySelector("h3");
  precio.textContent = "$" + pizza.precio;
}

const renderizarImagen = (input) =>{
    imgPizza.innerHTML = mostrarImagen(input);
}

const mostrarImagen = (pizza) =>
{
    const nombreImagen = pizza.nombre;

    return `
    
    <div class="img-pizza">
        <img class="sabor-pizza" src="img/${nombreImagen}.png" alt="">
    </div>

    `
}

const borrarNombre = (form) => {
  const parentForm = form.parentElement;
  const nombre = parentForm.querySelector("h2");
  nombre.textContent = "";
}

const borrarPrecio = (form) => {
  const parentForm = form.parentElement;
  const precio = parentForm.querySelector("h3");
  precio.textContent = "";
}

const borrarIngredientes = (form) => {
    const parentForm = form.parentElement;
    const ingredientes = parentForm.querySelector("h4");
    ingredientes.textContent = "";
}

const borrarImagen = () => {
    imgPizza.innerHTML = "";
}




document.addEventListener("DOMContentLoaded", () => {
    if(!Array.isArray(ultimaPizza)){
        renderizarNombre(ultimaPizza, formPizza);
        renderizarIngredientes(ultimaPizza, formPizza);
        renderPrecio(ultimaPizza, formPizza);
        renderizarImagen(ultimaPizza);
        
    }
})