const socket = io();


document.getElementById("addProduct").addEventListener("click", () => {
const title = prompt("Nombre del producto:");
const price = parseFloat(prompt("Precio:"));
if (title && !isNaN(price)) {
    socket.emit("addProduct", { title, price });
}
});


document.querySelectorAll(".deleteProduct").forEach(btn => {
btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-id");
    socket.emit("deleteProduct", id);
});
});
