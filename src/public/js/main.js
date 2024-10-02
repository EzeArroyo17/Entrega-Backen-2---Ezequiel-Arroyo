
const socket = io();

socket.on("product", (data) => {

    renderProducts(data)
})



const renderProducts = (products) => {

    const containerProducts = document.getElementById("productsRealTime");
    containerProducts.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div")
        card.innerHTML = `
                        <ul>
                            <li> ${product.title} </li>
                            <li> ${product.description} </li>
                            <li> ${product.price} </li>
                            <button> Eliminar </button>
                        </ul>
                        `
        containerProducts.appendChild(card);

        card.querySelector("button").addEventListener("click", () => {
            deleteProdcuts(product.id);

        })
    })
}


const deleteProdcuts = (id) => {
    socket.emit("deleteProduct", id)
}


const form = document.getElementById("productsForm")

form.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    const productCard = `
    <div class="product-card">
        <li>${title}</li>
        <li>Descripción: ${description}</li>
        <li>Precio: $${price}</li>
    </div>
`;

    document.getElementById("productsRealTime").innerHTML += productCard;

    document.getElementById("productsForm").reset();
});

