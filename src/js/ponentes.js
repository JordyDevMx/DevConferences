(function() {
    const ponentesInput = document.querySelector('#ponentes');

    if(ponentesInput) {
        let ponentes = [];
        let ponentesFiltrados = []

        const listadoPonentes = document.querySelector('#listado-ponentes');
        const ponenteHidden = document.querySelector('[name="ponente_id"]');

        obtenerPonentes();

        // Mostrar la info para la edicion linea 14 al 
        if(ponenteHidden.value) {
            (async () => {
                const ponente = await obtenerPonente(ponenteHidden.value);
                const {nombre, apellido} = ponente;
                // console.log(ponente);

                // Insertar en HTML
                const ponenteDOM = document.createElement('LI');
                ponenteDOM.classList.add('listado-ponentes__ponente', 'listado-ponentes__ponente--seleccionado');
                ponenteDOM.textContent = `${nombre} ${apellido}`;

                listadoPonentes.appendChild(ponenteDOM);

            })();
        }

        ponentesInput.addEventListener('input', buscarPonentes);

        async function obtenerPonentes() {
            const url = `/api/ponentes`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            formatearPonentes(resultado);
        }
        // Obtener la info del ponente
        async function obtenerPonente(id) {
            const url = `/api/ponente?id=${id}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            return resultado;
        }

        function formatearPonentes(arrayPonentes = []) {
            ponentes = arrayPonentes.map(ponente => {
                return {
                    nombre: `${ponente.nombre.trim()} ${ponente.apellido.trim()}`,
                    id: ponente.id
                }
            });
            // console.log(ponentes);
        }

        function buscarPonentes(e) {
            const busqueda = e.target.value;

            if(busqueda.length > 3) {
                // Para la busqueda de ponentes mayusculas o minusculas
                const expresion = new RegExp(busqueda, "i");
                ponentesFiltrados = ponentes.filter(ponente => {
                    if(ponente.nombre.toLowerCase().search(expresion) != -1) {
                        return ponente;
                    }
                });
            } else {
                // Eliminar el registro de busqueda
                ponentesFiltrados = [];
            }

            mostrarPonentes();
        }

        function mostrarPonentes() {
            // Para borrar el listado no utilizado
            while(listadoPonentes.firstChild) {
                listadoPonentes.removeChild(listadoPonentes.firstChild);
            }

            if(ponentesFiltrados.length > 0) {
                // Mostrar en pantalla
                ponentesFiltrados.forEach(ponente => {
                    const ponenteHTML = document.createElement('LI');
                    ponenteHTML.classList.add('listado-ponentes__ponente');
                    ponenteHTML.textContent = ponente.nombre;
                    ponenteHTML.dataset.ponenteId = ponente.id;
                    ponenteHTML.onclick = seleccionarPonente;
    
                    // Añadir al DOM
                    listadoPonentes.appendChild(ponenteHTML);
                });
            } else {
                const noResultados = document.createElement('P');
                noResultados.classList.add('listado-ponentes__no-resultado');
                noResultados.textContent = 'No hay resultado';
                listadoPonentes.appendChild(noResultados);
            }
        }

        function seleccionarPonente(e) {
            const ponente = e.target;

            // remover la clase previa
            const ponentePrevio = document.querySelector('.listado-ponentes__ponente--seleccionado');

            if(ponentePrevio) {
                ponentePrevio.classList.remove('listado-ponentes__ponente--seleccionado');
            }

            // Seleccion
            ponente.classList.add('listado-ponentes__ponente--seleccionado');

            ponenteHidden.value = ponente.dataset.ponenteId;
        }
    }
})();