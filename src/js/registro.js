import Swal from "sweetalert2";
(function(){
    let eventos = [];
    const resumen = document.querySelector('#registro-resumen');

    if(resumen) {
        const eventosBoton = document.querySelectorAll('.evento__agregar'); 
        
        const formRegistro = document.querySelector('#registro');
        formRegistro.addEventListener('submit', submitFormulario);

        mostrarEventos();

        // Cuando es un querySelectorAll para añadir un addEventListener se necesita un foreach porque son varios
        eventosBoton.forEach(boton => boton.addEventListener('click', seleccionarEvento));

        function seleccionarEvento(e) {
            // console.log(e.target);
            // console.log(e.target.dataset.id);
            // console.log(e.target.parentElement.querySelector('.evento__nombre').textContent.trim());

            if(eventos.length < 6) {
                // Deshabilitar el evento al hacer clic en un evento y no repetir el mismo
                e.target.disabled = true;

                eventos = [...eventos, {
                    id: e.target.dataset.id,
                    titulo: e.target.parentElement.querySelector('.evento__nombre').textContent.trim()
                }];

                mostrarEventos();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Solo puedes seleccionar 6 eventos",
                    icon: "error"
                });
            }
            
        }

        function mostrarEventos() {
            // Limpiar el HTML
            limpiarEventos();

            if(eventos.length > 0) {
                eventos.forEach(evento => {
                    const eventoDOM = document.createElement('DIV');
                    eventoDOM.classList.add('registro__evento');

                    const titulos = document.createElement('H3');
                    titulos.classList.add('registro__nombre');
                    titulos.textContent = evento.titulo;

                    const botonEliminar = document.createElement('BUTTON');
                    botonEliminar.classList.add('registro__eliminar');
                    botonEliminar.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`;
                    botonEliminar.onclick = function() {
                        eliminarEvento(evento.id);
                    }

                    // Renderizar en el HTML
                    eventoDOM.appendChild(titulos);
                    eventoDOM.appendChild(botonEliminar);
                    resumen.appendChild(eventoDOM);
                });
            } else {
                const noRegistro = document.createElement('P');
                noRegistro.textContent ='No hay eventos aun, favor de seleccionar eventos';
                noRegistro.classList.add('registro__texto');
                resumen.appendChild(noRegistro);
            }
        }

        function eliminarEvento(id) {
            eventos = eventos.filter(evento => evento.id !== id);
            const botonAgregar = document.querySelector(`[data-id="${id}"]`);
            botonAgregar.disabled = false;
            mostrarEventos();
        }

        // para no repetir el arreglo de los seleccionados
        function limpiarEventos() {
            while(resumen.firstChild) {
                resumen.removeChild(resumen.firstChild);
            }
        }

        async function submitFormulario(e) {
            e.preventDefault();
            
            // Obtener el regalo
            const regaloId = document.querySelector('#regalo').value;
            
            // Para acceder de un objeto de arreglos
            const eventosId = eventos.map(evento => evento.id);

            // Para evitar un vacio
            if(eventosId.length === 0 || regaloId === '') {
                Swal.fire({
                    title: "Error",
                    text: "Elige al menos 1 Evento y 1 Regalo",
                    icon: "error"
                });
                return;
            }

            // Objeto de formdata
            const datos = new FormData();
            datos.append('eventos', eventosId);
            datos.append('regalo_id', regaloId);

            try {
                const url = '/finalizar-registro/conferencias';
                const respuesta = await fetch(url, {
                    method: 'POST',
                    body: datos
                });

                const resultado = await respuesta.json();

                if(resultado.resultado) {
                    Swal.fire(
                        'Registro Exitoso',
                        'Tus conferencias se han almacenado y tu registro fue exitoso, te esperamos en DevWebCamp',
                        'success'
                    ).then(() => location.href = `/boleto?id=${resultado.token}`);
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un error",
                        icon: "error"
                    }).then(() => location.reload());
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

})();