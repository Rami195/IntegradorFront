import { handleGetProductLocalStorage, setInLocalStorage } from "../persistences/localStorage";
import { closeModal } from "../views/popUp";
import { productoActivo } from "../../main";
import { handleGetProductsToStore, handleRenderList } from "../views/store";
import Swal from "sweetalert2";


// Guardar o modificar elementos
document.addEventListener('DOMContentLoaded', () => {
    const acceptButton = document.getElementById('acceptButton');
    acceptButton.addEventListener('click', () => {
        if (validarFormulario()) {
            handleSaveOrModify();
        }
    });
});

function validarFormulario() {
    let nombre = document.getElementById('name').value;
    let img = document.getElementById('img').value;
    let precio = document.getElementById('precio').value;
    let categoria = document.getElementById('categoria').value;

    let nameError = document.getElementById('nameError');
    let imgError = document.getElementById('imgError');
    let precioError = document.getElementById('precioError');
    let categoriaError = document.getElementById('categoriaError');
    let validar = true;

    // Validar nombre
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

    // Validar imagen
    if (img.trim() === '') {
        imgError.textContent = "La imagen es obligatoria";
        imgError.style.visibility = 'visible';
        validar = false;
    } else {
        imgError.style.visibility = 'hidden';
    }

    // Validar precio
    if (precio.trim() === '') {
        precioError.textContent = "El precio es obligatorio";
        precioError.style.visibility = 'visible';
        validar = false;
    } else if (isNaN(precio) || parseFloat(precio) <= 0) {
        precioError.textContent = "El precio debe ser un número positivo";
        precioError.style.visibility = 'visible';
        validar = false;
    } else {
        precioError.style.visibility = 'hidden';
    }

    // Validar categoría
    if (categoria === '') {
        categoriaError.textContent = "Seleccione una categoría";
        categoriaError.style.visibility = 'visible';
        validar = false;
    } else {
        categoriaError.style.visibility = 'hidden';
    }

    return validar;
}

//funciones de guardar
const handleSaveOrModify = () => {
    const nombre = document.getElementById("name").value,
        imagen = document.getElementById("img").value,
        precio = document.getElementById("precio").value,
        categoria = document.getElementById("categoria").value;
    let object = null
    if (productoActivo) {
        object = {
            ...productoActivo,
            nombre: nombre,
            imagen: imagen,
            precio: precio,
            categoria: categoria,
        }
    } else {
        object = {
            id: new Date().toISOString(),
            nombre: nombre,
            imagen: imagen,
            precio: precio,
            categoria: categoria
        }
    };
    Swal.fire({
        title: "Correcto!",
        text: "Producto guardado correctamente!",
        icon: "success",
        confirmButtonColor: "#fa6f3b",
        iconColor: "#fa6f3b",
        background: "#1E1E1E",
        color: "white"
      });
    setInLocalStorage(object);

    // Volver a renderizar la lista de productos después de agregar uno nuevo
    handleGetProductsToStore();

    closeModal();
}

//eliminar

export const handleDeleteProduct = () => {
    Swal.fire({
        title: "Estas seguro de querer eliminar este elemento?",
        text: "No podras revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fa6f3b",
        cancelButtonColor: "#fa6f3b",
        confirmButtonText: "Si, Borra esto!",
        background: "#1E1E1E",
        color: "white",
        iconColor: "#fa6f3b"
    
    }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage();
            const result = products.filter((el) => el.id !== productoActivo.id);
            localStorage.setItem("products", JSON.stringify(result));

            const newProducts = handleGetProductLocalStorage();
            handleRenderList(newProducts);
            Swal.fire({
                title: "Borrado!",
                text: "Tu elemento ha sido borrado.",
                icon: "Exito!",
                confirmButtonColor: "#fa6f3b",
                background: "#1E1E1E",
                color: "white",
                iconColor: "#fa6f3b",
            });
            closeModal();

        }
    });

};

