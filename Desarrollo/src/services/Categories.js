// Categoria
import { handleGetProductLocalStorage } from "../persistences/localStorage";
import { handleRenderList } from "../views/store";
import { categoriaActiva, setCategoriaActiva } from "../../main";

const handleFilterProductsByCategory = (categoryIn) => {
    const products = handleGetProductLocalStorage();
    let result = products;

    switch (categoryIn) {
        case "todo":
            break;
        case "hombre":
        case "mujer":
        case "ninio":
            result = products.filter((el) => el.categoria === categoryIn);
            break;
        case "mayorprecio":
            result = [...products].sort((a, b) => b.precio - a.precio);
            break;
        case "menorprecio":
            result = [...products].sort((a, b) => a.precio - b.precio);
            break;
        default:
            break;
    }

    console.log("Productos filtrados y/o ordenados:", result);
    handleRenderList(result);
};

// Render de la vista de categorías

export const renderCategories = () => {
    const ulList = document.getElementById("listfilter");
    ulList.innerHTML = `
        <li id="todo">Todos</li>
        <li id="hombre">Hombre</li>
        <li id="mujer">Mujer</li>
        <li id="ninio">Niño</li>
        <li id="mayorprecio">Mayor Precio</li>
        <li id="menorprecio">Menor Precio</li>
    `;

    const liElements = ulList.querySelectorAll("li");
    liElements.forEach((el) => {
        el.addEventListener("click", () => handleClick(el));
    });

    const handleClick = (elemento) => {
        const selectedCategory = elemento.id.toLowerCase();
        setCategoriaActiva(selectedCategory); // Actualiza la categoría activa
        handleFilterProductsByCategory(selectedCategory);

        liElements.forEach((el) => {
            el.classList.toggle("liActive", elemento === el);
        });
    };
};