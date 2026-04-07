
const hello=document.getElementsByTagName("h1");
const button=document.getElementsByTagName("button");
button[0].addEventListener("click",function(){
hello[0].innerText="Button was clicked!"
});

const ul=document.getElementById("ul1");
button[1].addEventListener("click",function(){
const li=document.createElement("li");
li.innerText="zainab";
ul.appendChild(li); 
});

/*to do list */
const ul2=document.createElement("ul");
document.body.appendChild(ul2)
const input=document.getElementById("input1");
const addButton=document.getElementById("addButton");
addButton.addEventListener("click",function(){

const value=input.value;
const div=document.createElement("div");
const li2=document.createElement("li");
li2.innerText=value;
const del=document.createElement("button");
del.innerText="delete";
del.id = "deleteButton";
div.appendChild(li2);
div.appendChild(del);
ul2.appendChild(div);

input.value = "";
ul2.addEventListener("click", function(e) {
    if (e.target.id === "deleteButton") {
        ul2.removeChild(e.target.parentElement);
    }
});
});