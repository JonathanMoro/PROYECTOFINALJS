const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";

    const modalHeader = document.createElement("div");

    const modalClose = document.createElement("div");
    modalClose.innerText = "❌";
    modalClose.className = "modal-close";
    modalHeader.append(modalClose);

    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    });

    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Carrito";
    modalTitle.className = "modal-title"
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);

    if (cart.length > 0) {
        cart.forEach((product) => {
            const modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.innerHTML = `
        <div class="product">
                <img class="product-img" src= "${product.img}" />
                <div class="product-info">
                    <h4>${product.productName}</h4>
                </div>
            <div class="quantity">
                <span class="quantity-btn-decrese">-</span>
                <span class="quantity-input">${product.quanty}</span>
                <span class="quantity-btn-increse">+</span>
            </div>
                <div class="price">${product.price * product.quanty} $</div>
                <div class="delete-product">❌</div>
        </div>
        `;
            modalContainer.append(modalBody);

            const decrese = modalBody.querySelector(".quantity-btn-decrese")
            decrese.addEventListener("click", () => {
                if (product.quanty !== 1) {
                    product.quanty--;
                    displayCart();
                }
                displayCartCounter();
            });

            const increse = modalBody.querySelector(".quantity-btn-increse");
            increse.addEventListener("click", () => {
                product.quanty++;
                displayCart();
                displayCartCounter();
            });

            const deleteProduct = modalBody.querySelector(".delete-product");

            deleteProduct.addEventListener("click", () => {
                Swal.fire({
                    title: "Estás seguro que quieres eliminar este producto?",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "cancelar",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Producto eliminado",
                            icon: "success"
                        });
                        deleteCartProduct(product.id);
                    }
                });

            });
        });

        const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0);

        const modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";
        modalFooter.innerHTML = `
    <div class="total-price">Total: ${total} $</div>
    `;
        const botonCompra = document.createElement("button");
        botonCompra.className = "buttonBuy";
        modalFooter.innerHTML =`
            <button class="buttonCons">Comprar</button>
        `;

        modalContainer.append(modalFooter);

        buttonCons = document.querySelector(".buttonCons");
        buttonCons.addEventListener("click", () => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Compra Realizada!",
                showConfirmButton: false,
                timer: 5000
              });
              
        })
    } else {
        const modalText = document.createElement("h2");
        modalText.className = "modal-body";
        modalText.innerText = "Tu carrito está vacío";
        modalContainer.append(modalText);
    }
};



cartBtn.addEventListener("click", displayCart);


const deleteCartProduct = (id) => {
    const foundID = cart.findIndex((element) => element.id === id);
    cart.splice(foundID, 1);
    displayCart();
    savelocal();
    displayCartCounter();
};

const displayCartCounter = () => {
    const cartLength = cart.reduce((acc, el) => acc + el.quanty, 0);
    if (cartLength > 0) {
        cartCounter.style.display = "block";
        const carritoLength = cartLength;
        localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
        cartCounter.innerText = JSON.parse(localStorage.getItem("carritoLength"));
    } else {
        cartCounter.style.display = "none";
    }
};

displayCartCounter();
