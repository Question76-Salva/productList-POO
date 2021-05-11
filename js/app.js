//* ==============
//* === clases ===
//* ==============

class Product {
    constructor(name, price, year) {          // clase Product -> para definir los productos internamente en la app  
        this.name = name;                     // name, price, year serán asignados por lo que le pasemos al constructor al crear objetos 
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {                                                    // clase UI -> para la interfaz, interactua con el HTML
        const productList = document.getElementById('product-list');         // contiene métodos: agregar, listar, eliminar en interfaz
        
        // === diseñar template para agregar -> product ===
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4 shadow">
                <div class="card-body">
                    <b>Nombre Producto: </b>${product.name}
                    <b>Precio Producto: </b>${product.price}
                    <b>Año Producto: </b>${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Borrar</a>                
                </div>
            </div>
        `;

        // === insertar producto en el template ===
        productList.appendChild(element);        
    }
    
    resetForm() {
        document.getElementById('product-form').reset();                     // limpiar formulario una vez enviemos datos
    }
    
    deleteProduct(element) {
        if(element.name === 'delete') {                                     // has dado click en Borrar <a>
            element.parentElement.parentElement.parentElement.remove();    // desde el <a> sube hasta el <div> "card", borra tarjeta
            this.showMessage('Producto eliminado correctamente', 'danger');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');                          // crear <div>
        div.className = `alert alert-${cssClass} mt-2 shadow`;              // clase para success o danger
        div.appendChild(document.createTextNode(message));                  // mensaje

        const container = document.querySelector('.container');             // dentro del .container y que esté antes del #App
        const app = document.querySelector('#App');
        container.insertBefore(div, app);                                   // el div estará antes del #App

        setTimeout(() => {
            document.querySelector('.alert').remove();                      // quita el texto, quita clase .alert
        }, 2000);
    }
}                                       

//* ===============
//* === eventos ===
//* ===============

// === capturar datos formulario ===

document.getElementById('product-form').addEventListener('submit', (e) => {
    
    e.preventDefault();
    
    const name = document.getElementById('name').value;    
    const price = document.getElementById('price').value;    
    const year = document.getElementById('year').value;         // probar -> console.log(name, price, year);     

    // === crear producto ===

    const product = new Product(name, price, year);             // instanciar objeto con los datos del formulario  

    //* === crear objeto interfaz ===

    const ui = new UI();                                        // este objeto obtiene los métodos addProduct, deleteProduct, showMessage

    // === validar ===

    if(name === '' || price === '' || year === '') {
        return ui.showMessage('Por favor completa los campos', 'warning');  // return -> detiene la función
    };

    ui.addProduct(product);                                     // instancio clase UI, llamo addProduct y lo doy product para pintarlo
    ui.resetForm();                                             // limpiar formulario una vez agregado producto al interfaz  
    
    ui.showMessage('Producto agregado correctamente', 'success');

});


// === capturar botón eliminar === 

document.getElementById('product-list').addEventListener('click', (e) => {
    //console.log('eliminando');
    //console.log(e.target);                                                          // comprobar lo que está capturando al hacer click

    // === crear instancia interfaz ===

    const ui = new UI();
    ui.deleteProduct(e.target);                                                     // comprobar si hace click en el botón <a>

});