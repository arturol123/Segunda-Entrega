const contenedorProductos = document.getElementById("contenedor-productos")
const precio = document.getElementsByClassName ("Precio")
const PrecioReducido = document.getElementsByClassName("PrecioDescuento")
const Filtro = document.getElementById ("SelectMarca")
const BtnLogin = document.getElementById("BtnLogin")
const NombreUsuario = document.getElementById("NombreUsuario")
let User
let UsuarioVip

// Comprobar si el usuario fue encontrado en base de datos local, de ser asi tiene beneficios, de no ser encontrado los precios son precio publico


if (User =JSON.parse(sessionStorage.getItem("UsuarioVip"))){
    UsuarioVip = true;
    BtnLogin.textContent = "Logout"
    NombreUsuario.innerText = "Bienvenido " + User + " Disfruta los Beneficios !!!!!"
}
   else{
    UsuarioVip = false;  
    }
    

// boton de Login depende el tipo de usuario, si el usuario aun no esta logeado, el boton lo llevara a pagina de Login
// pero si el usuario ya esta logeado, entonces el boton se convierte el LogOut y quitara privilegios
BtnLogin.addEventListener("click",() => {
    if (UsuarioVip == true){
        UsuarioVip = false;
        document.getElementById("BtnLogin").textContent = "Login"
        window.location.href = "/Index.html"
        sessionStorage.clear();
    }
    else{
    window.location.href = "/html/Login.html"
    }
})


// ComboBox de busqueda : filtrar busqueda
Filtro.addEventListener("change", () =>{
    // Condicion if ternaria
    Filtro.value == "Todo" ? ShowProduct(StockAlmacen) : ShowProduct(StockAlmacen.filter(item => item.Marca == Filtro.value))
})


// Crea todas las card en base a la informacion de la hoja Stock.js
ShowProduct(StockAlmacen)

function ShowProduct(array){

    contenedorProductos.innerHTML = ""

    if (UsuarioVip == true){
 
    array.forEach(el => {
        let div =document.createElement("div")
        div.className = "producto"

        div.innerHTML =`<div class ="card">
                            <div class ="card-image">
                              <img src="${el.LinkImg}">  
                            </div>

                            <div class="card-content">
                                <p class="card-title">${el.Marca}</p>
                                <hr>
                                <p class="PrecioNormal"> $ ${el.Precio}</p>
                                <p Class="PrecioEspecial"> $ ${el.Precio - (el.Precio * 0.16)} Precio con Descuento</p>
                                <button id="btnComprar">Comprar</button>
                            </div>
                        </div>`

    contenedorProductos.appendChild(div)

        })
    }
    else{
        array.forEach(el => {
            let div =document.createElement("div")
            div.className = "producto"
    
            div.innerHTML =`<div class ="card">
                                <div class ="card-image">
                                  <img src="${el.LinkImg}">  
                                </div>
    
                                <div class="card-content">
                                    <p class="card-title">${el.Marca}</p>
                                    <p class="PrecioNormal"> $ ${el.Precio}</p>
                                    <button id="btnComprar">Comprar</button>
                                </div>
                            </div>`
    
        contenedorProductos.appendChild(div)
     })
    }
}



