 // Función para mostrar u ocultar el menú de categorías
 function toggleMenu() {
    var menu = document.getElementById("menuCategorias");
    menu.classList.toggle("show");
}

// Cerrar el menú si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (!event.target.matches('.btn-cat')) {
        var dropdowns = document.getElementsByClassName("botones-prod");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Obtener elementos del DOM
const enlaces = document.querySelectorAll('.btn-prod'); // Selecciona todos los enlaces de categorías
const input = document.getElementById('productoInput');
const botonAgregar = document.querySelector('.btn-add');
const contenedorListas = document.getElementById('listasDeProductos');
const botonListo = document.getElementById('btnListo');
const botonAgregarMas = document.getElementById('btnAgregarMas');
const empty = document.querySelector(".empty");


// Variable para guardar el rubro actual
let rubroActual = '';
let listasCreadas = {};

// Función para manejar el clic en un rubro (categoría)
enlaces.forEach(enlace => {
  enlace.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que el enlace navegue
    rubroActual = enlace.dataset.rubro; // Obtener el rubro seleccionado
  });
});

// Función para agregar productos al rubro actual
botonAgregar.addEventListener('click', function(event) {
  event.preventDefault(); // Evita que el formulario sea enviado y la página se recargue
  const textoInput = input.value; // Obtener el valor del input

  if (rubroActual === '') {
    alert('Por favor, selecciona una categoría primero.');
    return;
  }

  if (textoInput.trim() !== '') {
    // Si no hay una lista creada para este rubro, la creamos
    if (!listasCreadas[rubroActual]) {
      const titulo = document.createElement('h3');
      titulo.textContent = rubroActual;
      const nuevaLista = document.createElement('ul');
      nuevaLista.setAttribute('id', `lista-${rubroActual}`);
      contenedorListas.appendChild(titulo);
      contenedorListas.appendChild(nuevaLista);
      listasCreadas[rubroActual] = nuevaLista; // Guardamos la lista creada
      empty.style.display = "none";
    }
    
    // Agregar el nuevo producto a la lista del rubro seleccionado
    const nuevoItem = document.createElement('li');
    nuevoItem.textContent = textoInput;

    // Crear botón de eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '-';
    deleteBtn.className ='btn-delete';
    deleteBtn.addEventListener('click', function() {
      nuevoItem.remove(); // Eliminar el elemento de la lista
    });

    nuevoItem.appendChild(deleteBtn); // Agregar el botón al elemento de la lista
    listasCreadas[rubroActual].appendChild(nuevoItem); // Agregar el nuevo item a la lista

    // Mostrar el botón "¡Listo!" si hay elementos en la lista
    botonListo.style.display = 'block';
    
    input.value = ''; // Limpiar el input después de agregar
  } else {
    alert('Por favor, ingresa un producto.');
  }
});

// Función al presionar "¡Listo!"
botonListo.addEventListener('click', function() {
  // Ocultar categorías y buscador
  document.querySelector('.search').style.display = 'none';
  document.querySelector('.categorias').style.display = 'none';
  botonListo.style.display = 'none'; // Ocultar el botón "¡Listo!"
  
  // Mostrar botón "Agregar más alimentos"
  botonAgregarMas.style.display = 'block';
});

// Función al presionar "Agregar más alimentos"
botonAgregarMas.addEventListener('click', function() {
  // Volver a mostrar categorías y buscador
  document.querySelector('.search').style.display = 'block';
  document.querySelector('.categorias').style.display = 'block';
  
  // Ocultar el botón "Agregar más alimentos"
  botonAgregarMas.style.display = 'none';
  
  // Mostrar el botón "¡Listo!" de nuevo
  if (contenedorListas.children.length > 0) {
    botonListo.style.display = 'block';
  }
});
