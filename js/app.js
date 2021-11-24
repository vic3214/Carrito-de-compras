const carrito = document.querySelector("#carrito");

const contenedorCarrito = document.querySelector("#lista-carrito tbody");

const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

const listaCursos = document.querySelector("#lista-cursos");

let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
  // Agregar curso al hacer click sobre 'Agregar al carrito'
  listaCursos.addEventListener("click", agregarCurso);

  //* Eliminar cursos del carrito

  carrito.addEventListener("click", eliminarCurso);

  //* Muestra los cursos del local storage

  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHTML();
  });

  //* Vaciar el carrito

  vaciarCarritoBtn.addEventListener("click", vaciaCarrito);
}

//* Funciones

function agregarCurso(event) {
  event.preventDefault();
  if (event.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = event.target.parentElement.parentElement;
    leeDatosCurso(cursoSeleccionado);
  }
}

//* Eliminar curso

function eliminarCurso(event) {
  if (event.target.classList.contains("borrar-curso")) {
    const cursoId = event.target.getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML();
  }
}

//* Vaciar carrito

function vaciaCarrito(event) {
  articulosCarrito = [];
  limpiaHTML();
}

function leeDatosCurso(cursoSeleccionado) {
  //* Creamos un objeto con el contenido del curso seleccionado
  const infoCurso = {
    imagen: cursoSeleccionado.querySelector("img").src,
    titulo: cursoSeleccionado.querySelector("h4").textContent,
    precio: cursoSeleccionado.querySelector(".precio span").textContent,
    id: cursoSeleccionado.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //* Revisar si el elemento existe en el carrito

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //* Actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //* Agregamos el elemento
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}

//* Mostrar carrito en el HTML

function carritoHTML() {
  //* Limpiar el HTML

  limpiaHTML();

  //* Generar el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
            <img src="${imagen}" width=100>
            </td>

            <td>
            ${titulo}           
            </td>

            <td>
            ${precio}           
            </td>

            <td>
            ${cantidad}           
            </td>

            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>          
            </td>
        `;

    //* Agregar el HTML en el template
    contenedorCarrito.appendChild(row);
  });

  sincronizaLocalStorage();
}

//* Sincroniza el local storage

function sincronizaLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

//* Eliminar los cursos del tbody

function limpiaHTML() {
  //* Forma lenta
  /*   contenedorCarrito.innerHTML = ""; */
  //* Forma rápida
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
