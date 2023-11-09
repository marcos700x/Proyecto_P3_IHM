const nav = document.querySelector('nav')
const hero = document.querySelector('.hero')
const enlacesNav = document.querySelectorAll(".enlacesNav")

function isInViewport(elem) {
    var distance = elem.getBoundingClientRect();
    return (
        distance.top < (window.innerHeight || document.documentElement.clientHeight) && distance.bottom > 0
    );
}


document.addEventListener('scroll', () => {
    if(!isInViewport(hero)){
        nav.classList.add("bg-light")
        enlacesNav.forEach((item) => {
            item.classList.remove('text-light')
            item.classList.add('text-dark')
        })
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
  if(scroll === 0){
    nav.classList.remove("bg-light")
    enlacesNav.forEach((item) => {
        item.classList.add('text-light')
        item.classList.remove('text-dark')
    })
  }else{
    nav.classList.add("bg-light")

  }
  LastScroll = scroll

}