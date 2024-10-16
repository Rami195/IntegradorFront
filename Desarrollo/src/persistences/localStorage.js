export const handleGetProductLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem("products"));
    if (products) {
        return products;
    } else {
        return [];
    }
}

export const setInLocalStorage = (productIn) => {
    if (productIn) {
        let productsInLocal = handleGetProductLocalStorage();
        console.log(productIn);
        
        const existingIndex = productsInLocal.findIndex((product) => product.id === productIn.id);
        
        if (existingIndex !== -1) {
            // Si el producto ya existe, lo reemplaza
            productsInLocal[existingIndex] = productIn;
        } else {
            // Si no existe, lo agrega
            productsInLocal.push(productIn);
        }
        
        localStorage.setItem("products", JSON.stringify(productsInLocal));
    }
}
