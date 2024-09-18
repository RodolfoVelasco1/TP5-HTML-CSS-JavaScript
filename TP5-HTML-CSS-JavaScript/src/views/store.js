//======STORE======

import { setProductoActivo } from "../../main"
import { handleGetProductLocalStorage } from "../persistence/localstorage"
import { openModal } from "./modal"



//Funcion que se encarga de traer los elementos y llamar al render
//La llamamos en el main.js
export const handleGetProductsToStore = () => {

    const products = handleGetProductLocalStorage()
    handleRenderList(products)

}


//Funcion se encarga de filtrar y renderizar la sección con todos sus respectivos elementos
export const handleRenderList = (productsIn) => {
    //Filtrado de arrays por categoria
    const burgers = productsIn.filter((el) => el.categories == "Hamburguesas")

    const papas = productsIn.filter((el) => el.categories == "Papas")

    const gaseosas = productsIn.filter((el) => el.categories == "Gaseosas")

    //Función que renderiza los elementos de la sección
    const renderProductGroup = (products, title) => {
        if(products.length > 0){
            const productsHTML = products.map((products, index) => {
                return `
                <div class='containerTargetItem' id="product-${products.categories}-${index}">
                    <div>
                        <img src='${products.imagen}'></img>

                        <div>
                            <h2>${products.nombre}</h2>
                        </div>

                        <div class='targetProps'>
                            <p><b>Precio:</b> $ ${products.precio}</p>
                        </div>

                    </div>
                </div>`
            });

            //Retorna la sección con todos los elementos dentro
            return `
            <section class='sectionStore'>
                <div class='containerTitleSection'>
                    <h3>${title}</h3>
                </div>

                <div class='containerProductStore'>
                    ${productsHTML.join("")}
                </div>
            </section>
            `
        }else{
            return ""
        }
    };

    //Renderizar cada uno de los productos dentro de su categoría
    const appContainer = document.getElementById("storeContainer")
    appContainer.innerHTML = `
    ${renderProductGroup(burgers, "Hamburguesas")}
    ${renderProductGroup(papas, "Papas")}
    ${renderProductGroup(gaseosas, "Gaseosas")}
    `

    //Se añaden los elementos de manera dinámica
    const addEvents = (productsIn) => {
        if(productsIn){
            productsIn.forEach((element,index) => {
                const productContainer = document.getElementById(`product-${element.categories}-${index}`)
                productContainer.addEventListener("click", ()=> {
                    setProductoActivo(element)
                    openModal()
                })
            }); 
        }   
    }

    addEvents(burgers)
    addEvents(papas)
    addEvents(gaseosas)

}