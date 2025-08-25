const socket = io();


const productList = document.getElementById("productList");
const form = document.getElementById("productForm");


socket.on("productsUpdated", (products) => {
    renderProducts(products);
});


function renderProducts(products) {
    productList.innerHTML = "";
    products.forEach((p) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${p.title}</strong> - ${p.description} 
            | 💲${p.price} | Stock: ${p.stock}
            <button onclick="deleteProduct('${p.id}')">❌ Eliminar</button>
        `;
        productList.appendChild(li);
    });
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newProduct = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        price: parseFloat(document.getElementById("price").value),
        stock: parseInt(document.getElementById("stock").value),
        category: document.getElementById("category").value,
        thumbnails: [document.getElementById("thumbnail").value]
    };

    socket.emit("addProduct", newProduct);
    form.reset();
});

function deleteProduct(id) {
    socket.emit("deleteProduct", id);
}
