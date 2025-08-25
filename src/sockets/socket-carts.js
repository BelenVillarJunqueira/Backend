const socket = io();


document.getElementById('createCart').addEventListener('click', () => {
    socket.emit('createCart');
});


document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const cid = btn.dataset.cid;
        const pid = btn.dataset.pid;
        socket.emit('addProductToCart', { cid, pid });
    });
});


document.querySelectorAll('.remove-from-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const cid = btn.dataset.cid;
        const pid = btn.dataset.pid;
        socket.emit('removeProductFromCart', { cid, pid });
    });
});


socket.on('updateCarts', (carts) => {
    console.log('Carritos actualizados', carts);
    location.reload();
});
