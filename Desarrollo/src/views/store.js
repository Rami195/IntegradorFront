
import { openModal } from "./popUp";
import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistences/localStorage";

export const handleGetProductsToStore = () => {
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
}

export const handleRenderList = (productosIn) => {
    const hombre = productosIn.filter((el) => el.categoria == "hombre");
    const mujer = productosIn.filter((el) => el.categoria == "mujer");
    const ninio = productosIn.filter((el) => el.categoria == "ninio");

    const renderProductGroup = (productos, title) => {
        console.log(productos);
        if (productos.length > 0) {
            const productosHTML = productos.map((producto, index) => {
                return `
                    <div class="containerTargetItem" id="product-${producto.categoria}-${index}">
                        <img src=${producto.imagen} />
                        <div class="contenidoTarget">
                            <p class="cat">${producto.categoria}</p>
                            <p>${producto.nombre}</p>
                            <p><b>$ ${producto.precio}</b></p>
                            
                        </div>
                    </div>
                `;
            });
            return `
                <section class="sectionStore"> 
                    <div class="containerTitle">
                        <h3"><b>${title}<b></h3>
                    </div>
                    <div class="containerProductStore">
                        ${productosHTML.join("")}
                    </div>
                </section>
            `;
        } else {
            return "";
        }
    }

    // Renderizar productos
    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
        ${renderProductGroup(hombre, "Hombre")}
        ${renderProductGroup(mujer, "Mujer")}
        ${renderProductGroup(ninio, "Niño")}
    `;

    const addEvents = (productosIn) => {
        productosIn.forEach((element, index) => {
            const productContainer = document.getElementById(`product-${element.categoria}-${index}`);
            if (productContainer) {
                productContainer.addEventListener('click', () => {
                   setProductoActivo(element);
                   openModal();
                });
            }
        });
    };

    addEvents(hombre);
    addEvents(mujer);
    addEvents(ninio);
}