// ================================ show menu ================================== //
const showMenu = (toggleId, navId)=>{
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if(nav && toggle){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle("show");
        })
    }
}

showMenu('nav-toggle', 'nav-menu');

// ================================= Active class remove and add ====== //

const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    navLink.forEach( n => n.classList.remove('active'));
    this.classList.add('active');

    // remove menu class after link click
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show')
}

navLink.forEach(n => n.addEventListener('click', linkAction));



