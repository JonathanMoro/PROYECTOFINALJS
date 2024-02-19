const shopContent = document.getElementById("shopContent")
const cart = JSON.parse(localStorage.getItem("carrito")) || [];
const productsFlecha = async (ruta) => {
    try {
        const productsFetch = await fetch(`${ruta}`);
        const products = await productsFetch.json();
        if (localStorage.getItem("products") == null) {
            const productsJSON = JSON.stringify(products);
            localStorage.setItem("products", productsJSON.trim());
        }
    } catch {
        Swal.fire({
            icon: 'error',
            title: 'Atención...',
            text: 'Hubo un error al cargar la lista de productos!',
            showConfirmButton: false,
            timer: 3000
        });
    }
}

const ruta = "js/products.json"
productsFlecha (ruta);
const productos = JSON.parse(localStorage.getItem("products"))

productos.forEach((product) => {
    const content = document.createElement("div");
    content.classname = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.productName}</h3>
    <p class="price">${product.price} $</p>
    `;
    shopContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Agregar al carrito";

    content.append(buyButton);

    buyButton.addEventListener("click", () => {
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

        if (repeat) {
            cart.map((prod) => {
                if (prod.id === product.id) {
                    prod.quanty++;
                    displayCartCounter();
                }
            });
        } else {
            cart.push({
                id: product.id,
                productName: product.productName,
                price: product.price,
                quanty: product.quanty,
                img: product.img,
            });
            displayCartCounter();
            savelocal();
        }
    });
});

const savelocal = () => {
    localStorage.setItem("carrito", JSON.stringify(cart));
};

