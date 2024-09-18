//=======CATEGORÍA========

import { categoriaActiva } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localstorage";
import { handleRenderList } from "../views/store";

    const handleFilterProductsByCategory = (categoriaIn) => {
        const products = handleGetProductLocalStorage()

        switch (categoriaIn) {
            case categoriaActiva:
                handleRenderList(products)
                break
            case "Todo":
                handleRenderList(products)
                break
            case "Hamburguesas":
            case "Papas":
            case "Gaseosas":
                const result = products.filter((el) => el.categories == categoriaIn)
                handleRenderList(result)
            default:
                break
            case "mayorPrecio":
                const resultPrecioMayor = products.sort((a,b) => b.precio - a.precio)
                handleRenderList(resultPrecioMayor)
                break
            case "menorPrecio":
                const resultPrecioMenor = products.sort((a,b) => a.precio - b.precio)
                handleRenderList(resultPrecioMenor)
                break
        }
    }



//render de la vista categorias

export const renderCategories = () => {
    //Tomamos elementos de la lista (html)
    const ulList = document.getElementById("listFilter")

    //Creamos esos elementos dentro de la lista
    ulList.innerHTML = `
        <li id="Todo">Todos los productos</li>

        <li id="Hamburguesas">Hamburguesas</li>

        <li id="Papas">Papas</li>

        <li id="Gaseosas">Gaseosas</li>

        <li id="mayorPrecio">Mayor Precio</li>

        <li id="menorPrecio">Menor Precio</li>
    `;

    //Añadimos dinámicamente el evento click
    const liElements = ulList.querySelectorAll("li")
    liElements.forEach((liElement) => {
        liElement.addEventListener("click", ()=> {
            handleClick(liElement)
        })
    })

    //Verificamos y manejamos el estilo del elemento activo
    const handleClick = (elemento) => {
        handleFilterProductsByCategory(elemento.id)
        liElements.forEach((el)=>{
            if(el.classList.contains("liActive")){
                el.classList.remove("liActive")
            }else{
                if(elemento===el){
                    el.classList.add("liActive")
                }
            }
        })
    }
}
