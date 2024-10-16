import { openModal } from "./src/views/popUp";
import { renderCategories } from "./src/services/Categories";
import { handleGetProductsToStore } from "./src/views/store";
import { handleSearchProductByName } from "./src/services/SearchBar";
import './css/style.css'

/* Aplicacion */
export let categoriaActiva = null;

export const setCategoriaActiva = (categoriaIn) => {
    categoriaActiva = categoriaIn
}

export let productoActivo = null;

export const setProductoActivo = (productoIn) => {
    productoActivo = productoIn
}
handleGetProductsToStore();
renderCategories();

//header

const buttonAdd = document.getElementById('buttonAddElement');
buttonAdd.addEventListener('click', () => {
    openModal();
});
const buttonAdd2 = document.getElementById('buttonAddElement2');
buttonAdd2.addEventListener('click', () => {
    openModal();
});
//boton de busqueda

const buttonSearch=document.getElementById("boton")
buttonSearch.addEventListener('click', () => {
    handleSearchProductByName();

});


/* --------------------------------------------------------
---------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function (e) {
      if (!validarFormulario()) {
        e.preventDefault(); // Evita el envío del formulario si no es válido
      }
    });
  });

  function validarFormulario() {
    let nombre = document.getElementById('name').value;
    let apellido = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;

    let nameError = document.getElementById('nameError');
    let apellidoError = document.getElementById('apellidoError');
    let emailError = document.getElementById('emailError');

    let validar = true;

    if (nombre.trim() === '') {
      nameError.textContent = "El nombre es obligatorio";
      nameError.style.visibility = 'visible';
      validar = false;
    } else if (/\d/.test(nombre)) {
      nameError.textContent = "El nombre no puede contener números";
      nameError.style.visibility = 'visible';
      validar = false;
    } else {
      nameError.style.visibility = 'hidden';
    }

    if (apellido.trim() === '') {
      apellidoError.textContent = "El apellido es obligatorio";
      apellidoError.style.visibility = 'visible';
      validar = false;
    } else if (/\d/.test(apellido)) {
      apellidoError.textContent = "El apellido no puede contener números";
      apellidoError.style.visibility = 'visible';
      validar = false;
    } else {
      apellidoError.style.visibility = 'hidden';
    }

    if (email.trim() === '') {
      emailError.textContent = "El email es obligatorio";
      emailError.style.visibility = 'visible';
      validar = false;
    } else {
      emailError.style.visibility = 'hidden';
    }

    return validar;
  }