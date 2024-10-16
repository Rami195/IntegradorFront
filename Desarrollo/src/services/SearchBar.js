import { handleGetProductLocalStorage } from "../persistences/localStorage";
import { handleRenderList } from "../views/store";

export const handleSearchProductByName = () => {
    const inputHeader = document.getElementById("inputHeader");
    const products = handleGetProductLocalStorage();

    const searchTerm = inputHeader.value.toLowerCase(); 

    const result = products.filter((el) =>
        el.nombre.toLowerCase().includes(searchTerm) 
    );
    
    handleRenderList(result);
};