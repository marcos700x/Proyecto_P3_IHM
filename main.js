const API_KEY = "563492ad6f91700001000001866e88ac02c24d0bbae476ecb2ecb9a7"
const gallery = document.querySelector('.gallery');
const galleryButton = document.querySelector(".galleryButton")
const galleryInput = document.querySelector(".galleryInput")

galleryButton.addEventListener("click", () => fetchImages(galleryInput.value));

galleryInput.addEventListener("keydown", (e)=>{
 if(e.key == "Enter" || e.keyCode == 13){
    fetchImages(galleryInput.value)
 }   
})


document.addEventListener("DOMContentLoaded", fetchImages("shadows"))

async function fetchImages(query) {
    if(gallery.childElementCount = 8){
        gallery.innerHTML = ''
    }
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&size=small&&orientation=square&per_page=8`, {
            headers: {
                'Authorization': API_KEY
            }
        });

        if (response.ok) {
            const data = await response.json();
            const photos = data.photos;

            for (let i = 0; i < photos.length; i++) {
                const item = document.createElement('div')
                const img = document.createElement('img');
                const overlay = document.createElement('div')
                overlay.classList.add("overlay")
                const authorOverlay = document.createElement('span')
                authorOverlay.innerText = photos[i].photographer
                authorOverlay.classList.add("fs-5")
                overlay.appendChild(authorOverlay)
                item.appendChild(img)
                item.appendChild(overlay)
                img.src = photos[i].src.medium;
                img.alt = photos[i].alt;

                gallery.appendChild(item);                
            }

        } else {
            console.error('Error al obtener imágenes de Pexels API.');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}

function isInViewport(elem) {
    var distance = elem.getBoundingClientRect();
    return (
        distance.top < (window.innerHeight || document.documentElement.clientHeight) && distance.bottom > 0
    );
}

const nav = document.querySelector('nav')
const hero = document.querySelector('.hero')

document.addEventListener('scroll', () => {
    if(isInViewport(hero)){
       nav.classList.remove("navVisible")
    }else{
       nav.classList.add("navVisible")

    }
})
var LastScroll = document.documentElement.scrollTop || document.body.scrollTop;

window.onscroll = function (){
  var scroll = document.documentElement.scrollTop || document.body.scrollTop;
  if(LastScroll < scroll){
    document.querySelector("nav").style.transform = "translateY(-100%)"
  }else{
    document.querySelector("nav").style.transform = "translateY(0)"
  }
  LastScroll = scroll

}
