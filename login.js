const PASSWORD = "28062007";

function checkPassword() {

const input = document.getElementById("password").value;

const card = document.querySelector(".login-card");

if (input === PASSWORD) {

document.body.style.opacity = "0";

setTimeout(() => {

window.location.href = "birthday.html";

},1000);

} else {

document.getElementById("error").innerHTML =
"❌ Wrong Password";

card.classList.add("shake");

setTimeout(()=>{

card.classList.remove("shake");

},400);

}

}

document
.getElementById("password")
.addEventListener("keypress",function(e){

if(e.key==="Enter"){

checkPassword();

}

});