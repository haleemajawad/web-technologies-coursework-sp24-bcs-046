console.log("js connected!")
const icon=document.getElementById("icon");
const menu=document.getElementById("menu");
const navbar=document.getElementById("navbar");
icon.addEventListener("click",function(){
    if(menu.style.display=="none"){
        menu.style.display="block"
      
    }
    else{
        menu.style.display="none";
       
    }

});