
    const icon = document.getElementById("icon");
    const menu = document.getElementById("menu");
    const sapphirelogo = document.getElementById("sapphire-logo");
    const womenul = document.getElementById("womenul");
    const crossmenu = document.getElementById("crossmenu");

    icon.addEventListener("click", function () {
        menu.classList.toggle("open");
        sapphirelogo.classList.toggle("disappear");
        womenul.classList.toggle("disappear");
    });
    crossmenu.addEventListener("click", function () {
        menu.classList.remove("open");
        sapphirelogo.classList.remove("disappear");
        womenul.classList.remove("disappear");
    });


  