const API_KEY = "563492ad6f91700001000001866e88ac02c24d0bbae476ecb2ecb9a7"
const gallery = document.querySelector('.galleryExplore');
const galleryButton = document.querySelector(".galleryButton")
const galleryInput = document.querySelector(".galleryInput")
const galleryTitle = document.querySelector(".galleryTitle")
const galleryInputColor = document.querySelector(".galleryInputColor")
const galleryInputSize = document.querySelector(".galleryInputSize")
const galleryColorIndicator = document.querySelector(".colorIndicatorGallery")

const galleryButtonColor = document.querySelectorAll(".galleryButtonColor")

galleryButtonColor.forEach((button) => {
    button.addEventListener("click", () => {
        galleryInputColor.value = button.getAttribute("value")
        galleryColorIndicator.style.backgroundColor = button.getAttribute("value")
        fetchImages(galleryInput.value)
    })
})



galleryButton.addEventListener("click", () => fetchImages(galleryInput.value))
galleryInputSize.addEventListener("change", () => fetchImages(galleryInput.value))
document.addEventListener("DOMContentLoaded", fetchImages(galleryInput.value))

galleryInput.addEventListener("keydown", (e)=>{
 if(e.key == "Enter" || e.keyCode == 13){
    fetchImages(galleryInput.value)
 }   
})
async function fetchImages(query) {
    
    if(gallery.childElementCount > 0){
        gallery.innerHTML = ''
    }

    if(galleryInput.value === ""){
        document.querySelector(".containerFilters").style.display = "none"
    }else{
        document.querySelector(".containerFilters").style.display = "block"

    }

    try {
        const response = await fetch((query ? `https://api.pexels.com/v1/search?query=${query}&size=small&per_page=40&orientation=${galleryInputSize.value ? galleryInputSize.value : "default"}&color=${galleryInputColor.value ? galleryInputColor.value : "default"}` : `https://api.pexels.com/v1/curated?&per_page=40&size=large` ), {
            headers: {
                'Authorization': API_KEY
            }
        });

        if (response.ok) {
            const data = await response.json();
            const photos = data.photos;
            galleryTitle.innerText = (query ? `Fotos relacionadas con ${query}` : "Fotos recomendadas")

            for (let i = 0; i < photos.length; i++) {
                const item = document.createElement('div')
                item.classList.add("masonry-item")
                const img = document.createElement('img');
                const overlay = document.createElement('div')
                overlay.classList.add("overlay")
                const authorOverlay = document.createElement('span')
                authorOverlay.innerText = photos[i].photographer
                authorOverlay.classList.add("text-start")
                overlay.appendChild(authorOverlay)
                item.appendChild(img)
                item.appendChild(overlay)
                img.src = photos[i].src.medium;
                img.alt = photos[i].alt;
                img.loading = "lazy";
                gallery.appendChild(item);   
            }

        } else {
            console.error('Error al obtener imágenes de Pexels API.');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
    const grid = document.querySelector('.masonry-grid');
const masonry =  new Masonry(grid, {
    itemSelector: '.masonry-item',
})

imagesLoaded( grid ).on( 'progress', function() {
    masonry.layout();
  });
  
}
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
  
