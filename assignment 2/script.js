document.addEventListener("DOMContentLoaded", function () {
    const icon = document.getElementById("icon");
    const menu = document.getElementById("menu");
    const sapphirelogo = document.getElementById("sapphire-logo");
    const womenul = document.getElementById("womenul");

    icon.addEventListener("click", function () {
        menu.classList.toggle("open");
        console.log("Menu toggled");
        sapphirelogo.classList.toggle("disappear");
        womenul.classList.toggle("disappear");
    });
});