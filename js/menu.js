// Archivo: js/menu.js

// 1. Declaración de Función Única para la lógica dependiente del menú (Submenús, Hamburguesa, NoScroll, etc.)
function initializeMenuLogic() {
    console.log("Menú: Inicializando toda la lógica después de la inyección del header.");

    /* Constantes y Selectores (ASIGNADOS AQUÍ) */
    // Selectores para la funcionalidad de Hamburguesa y No-Scroll
    const boton = document.getElementById("contenedormenu");
    const email = document.querySelector(".item-right"); 
    const noscroll = document.getElementById('contenedormenu'); // Es el mismo elemento que 'boton'

    // Selectores para la funcionalidad de Submenús (que fallaba antes)
    const menu = document.querySelector(".menu");
    const menuMain = menu ? menu.querySelector(".menu-main") : null;
    const goBack = menu ? menu.querySelector(".go-back") : null;
    const close = document.querySelector(".mobile-menu-trigger"); 
    const logotipo = document.querySelector(".item-left");

    // Revisión de Elementos Clave
    if (!boton || !email || !noscroll || !menu || !menuMain) {
        console.error("Menú: Falta(n) elemento(s) clave en el header. Revisar IDs/Clases.");
        return;
    }

    /* Lógica de Hamburguesa, No-Scroll y Ocultar Íconos (Funciones internas) */
    
    // Función que se llama desde el onclick del HTML (Ahora usa las variables locales 'boton' y 'email')
    function myFunction(x) {
        // 1. Botón de Hamburguesa cambia (X)
        x.classList.toggle("change"); 
        // 2. Contenedor de Hamburguesa cambia (Para rotar las líneas o el fondo)
        boton.classList.toggle("change-contenedormenu");
        // 3. Íconos de Contacto se ocultan
        email.classList.toggle("ocultar"); 
    }

    // Bloquear Scroll
    noscroll.addEventListener('click', ()=>{
        document.body.classList.toggle('noscroll'); 
    });

    // Submenú y Lógica Principal del Menú (Tu código original)
    let subMenu;
    
    // (Mueve AQUÍ dentro de initializeMenuLogic)

    // El resto de tus listeners y funciones (Abrir/Cerrar submenú, toggleMenu, onresize, etc.)
    
    menuMain.addEventListener("click", (e) => {
        if (!menu.classList.contains("active")) { return; }
        if (e.target.closest(".menu-item-has-children")) {
            const hasChildren = e.target.closest(".menu-item-has-children");
            showSubMenu(hasChildren);
        }
    });

    goBack.addEventListener("click", () => {
        hideSubMenu();
    })
    
    close.addEventListener("click", () => {
        // Nota: Si usas myFunction(this) en el HTML, este listener puede duplicar la acción.
        toggleMenu();
        hideSubMenu();
        if (!logotipo.classList.contains("ocultar")) {
          return;
        } else {
          logotipo.classList.toggle("ocultar");
        }
        // Si el menú se cierra por este botón, aseguramos que la X y los íconos vuelvan:
        if (boton.classList.contains("change-contenedormenu")) {
             boton.classList.remove("change-contenedormenu");
             close.classList.remove("change");
             email.classList.remove("ocultar");
        }
    })

    function toggleMenu() { menu.classList.toggle("active"); }

    function showSubMenu(hasChildren) {
        subMenu = hasChildren.querySelector(".sub-menu");
        subMenu.classList.add("active");
        subMenu.style.animation = "slideLeft 0.5s ease forwards";
        const menuTitle = hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
        menu.querySelector(".current-menu-title").innerHTML = menuTitle;
        menu.querySelector(".mobile-menu-head").classList.add("active");
        if (logotipo.classList.contains("ocultar")) { return; } else { logotipo.classList.toggle("ocultar"); }
    }

    function hideSubMenu() {
        subMenu.style.animation = "slideRight 0.5s ease forwards";
        setTimeout(() => { subMenu.classList.remove("active"); }, 300);
        menu.querySelector(".current-menu-title").innerHTML = "";
        menu.querySelector(".mobile-menu-head").classList.remove("active");
        logotipo.classList.toggle("ocultar");
    }

    window.onresize = function () {
        if (this.innerWidth > 991) {
            if (menu.classList.contains("active")) {
                toggleMenu();
            }
        }
    }
    
    // Esta función DEBE ser global para que el HTML 'onclick' la encuentre.
    // La redefinimos aquí solo si no está definida globalmente.
    window.myFunction = myFunction; 

    // Fin de tu código original
}

/* Header scroll (Única lógica que queda fuera, porque el <header> SÍ existe al cargar) */
window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("headerscroll", window.scrollY > 0);
});
// La función initializeMenuLogic() se llama desde includes.js
document.addEventListener('DOMContentLoaded', initializeMenuLogic);