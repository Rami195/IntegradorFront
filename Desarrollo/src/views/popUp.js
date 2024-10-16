import { setProductoActivo } from "../../main";
import { productoActivo } from "../../main";
import { handleDeleteProduct } from "../services/products";

/* popup */
const cancelButton = document.getElementById('cancelButton');
cancelButton.addEventListener('click', () => {
    handleCancelButton();
});

const handleCancelButton = () => {
    closeModal();
}

/* Funciones abrir y cerrar */
export const openModal = () => {
    const modal = document.getElementById('modalPopUp');
    modal.style.display = 'flex';
    const buttonDelete=document.getElementById("deleteButton");
    if(productoActivo){
        buttonDelete.style.display="block";;
    }else{
        buttonDelete.style.display="none";
    }

    if(productoActivo){
        const nombre = document.getElementById("name"),
        imagen = document.getElementById("img"),
        precio = document.getElementById("precio"),
        categoria = document.getElementById("categoria");
        nombre.value=productoActivo.nombre;
        imagen.value=productoActivo.imagen;
        precio.value=productoActivo.precio;
        categoria.value=productoActivo.categoria;
    }
}

export const closeModal = () => {
    const modal = document.getElementById('modalPopUp');
    modal.style.display = 'none';
    setProductoActivo(null);
    resetModal();
}

const resetModal=()=>{
    const error=document.getElementById("error")
    const nombre = document.getElementById("name"),
    imagen = document.getElementById("img"),
    precio = document.getElementById("precio"),
    categoria = document.getElementById("categoria");
    nombre.value="";
    imagen.value="";
    precio.value=0;
    categoria.value="";
    document.getElementById("nameError").textContent = "";
    document.getElementById("imgError").textContent = "";
    document.getElementById("precioError").textContent = "";
    document.getElementById("categoriaError").textContent = "";
}

const deleteButton=document.getElementById("deleteButton");
deleteButton.addEventListener('click',()=>{
    handlebuttonDelete();
})

const handlebuttonDelete=()=>{
    handleDeleteProduct();
}