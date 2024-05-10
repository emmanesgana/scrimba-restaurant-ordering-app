// import function from data.js using default export
import menuArray from "/src/js/data.js"

// creatae a function do render menu html
function renderMenuHtml(menuList){

    return menuList.map(menu => {
        const {
            name,
            ingredients,
            price,
            emoji,
            id
        } = menu
    
        console.log(name)

    })
}

renderMenuHtml(menuArray)