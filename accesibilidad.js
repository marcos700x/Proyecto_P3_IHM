const botonAccesibilidad = document.querySelector(".botonAccesibilidad")
const menuAccesibilidad = document.querySelector(".contenedorAccesibilidad")
const botonTipografia = document.querySelector(".tipografiaBoton")
const botonAumentar = document.querySelector(".aumentarLetraBoton")
const botonDisminuir = document.querySelector(".disminuirLetraBoton")
const botonGuiaLectura = document.querySelector(".guiaLecturaBoton")

function cambiarTipografia(){
    document.body.classList.toggle("fuenteDislexia")
    document.querySelectorAll(".customFont").forEach((item) => item.classList.toggle("fuenteDislexia"))
}
let minimumFontSize = [];

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        document.querySelectorAll("h1,h2,h3,h4,h5,p,span,a,button").forEach((item) => {
            let currentSize = parseFloat(window.getComputedStyle(item, null).getPropertyValue('font-size'));
            minimumFontSize.push(currentSize);
        });
    }, 2000);

});

function aumentarTamaño() {
    document.querySelectorAll("h1,h2,h3,h4,h5,p,span,a,button").forEach((item) => {
        let currentSize = parseFloat(window.getComputedStyle(item, null).getPropertyValue('font-size'));
        item.classList.remove('fs-1', 'fs-2', 'fs-3', 'fs-4', 'fs-5', 'display-1', 'display-5');
        item.style.fontSize = (currentSize + 2) + "px";
    });
}

function reducirTamaño() {
    document.querySelectorAll("h1,h2,h3,h4,h5,p,span,a,button").forEach((item, index) => {
        let currentSize = parseFloat(window.getComputedStyle(item, null).getPropertyValue('font-size'));
        if (currentSize == minimumFontSize[index]) return;
        item.style.fontSize = (currentSize -  2) + "px";
    });
}

    botonAccesibilidad.addEventListener("mouseenter", () =>menuAccesibilidad.style.transform = "translateX(0)" )
    menuAccesibilidad.addEventListener("mouseleave", () =>menuAccesibilidad.style.transform = "translateX(calc(-100% + 76px))" )
botonTipografia.addEventListener("click", () => cambiarTipografia())
botonAumentar.addEventListener("click", () => aumentarTamaño())
botonDisminuir.addEventListener("click", () => reducirTamaño())
botonGuiaLectura.addEventListener("click", () => {
    console.log('dcfjb')
    document.querySelector(".mask").style.opacity = document.querySelector(".mask").style.opacity == 0 ? 1: 0;
})