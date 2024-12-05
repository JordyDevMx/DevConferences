(function() {
    const horas = document.querySelector('#horas');

    if(horas) {

        const categoria =document.querySelector('[name="categoria_id"]');
        const dias =document.querySelectorAll('[name="dia"]');
        const inputHiddenDia =document.querySelector('[name="dia_id"]');
        const inputHiddenHora =document.querySelector('[name="hora_id"]');

        categoria.addEventListener('change', terminoBusqueda);
        dias.forEach(dia => dia.addEventListener('change', terminoBusqueda));

        // Para mostrar la info en editar o caso nuevo vacio lineas 15 al 32
        let busqueda = {
            categoria_id: +categoria.value || '', // + = indicar que es un numero 
            dia: +inputHiddenDia.value || ''
        }
        if(!Object.values(busqueda).includes('')) {
            (async () => {  // funcion anonima para funcionar el async
                await buscarEventos();

                const id = inputHiddenHora.value;
                // Resaltar la hora actual seleccionada
                const horaSeleccionada = document.querySelector(`[data-hora-id="${id}"]`);

                horaSeleccionada.classList.remove('horas__hora--deshabilitada');
                horaSeleccionada.classList.add('horas__hora--seleccionada');

                horaSeleccionada.onclick = seleccionarHora;
            })()
        }

        function terminoBusqueda(e) {
            busqueda[e.target.name] = e.target.value;
            // console.log(Object.values(busqueda));

            // Reiniciar los campos ocultos y el selector de horas al cambiar los campos de categoria y dia
            inputHiddenHora.value = '';
            inputHiddenDia.value = '';
            
            const horaPrevia = document.querySelector('.horas__hora--seleccionada');

            if(horaPrevia) {
                horaPrevia.classList.remove('horas__hora--seleccionada');
            }

            // Seleccionar ambos y evitar mandar vacio
            if(Object.values(busqueda).includes('')) {
                return;
            }

            buscarEventos();
        }

        async function buscarEventos() {
            // console.log(busqueda);
            const {dia, categoria_id} = busqueda;
            const url = `/api/eventos-horario?dia_id=${dia}&categoria_id=${categoria_id}`;

            // console.log(url);

            const resultado = await fetch(url);
            const eventos = await resultado.json();

            // console.log(eventos);

            obtenerHorasDisponibles(eventos);
        }

        function obtenerHorasDisponibles(eventos) {
            // Reiniciar las horas
            const listadoHoras = document.querySelectorAll('#horas li');
            listadoHoras.forEach(li => li.classList.add('horas__hora--deshabilitada'));

            // Comprobar eventos ya tomados y quitar la variable de deshabilitado
            const horasTomadas = eventos.map(evento => evento.hora_id);
            // console.log(horasTomadas);

            //  NodeList
            // console.log(listadoHoras);

            // convertir de NodeList a arreglo
            const listadoHoraArray = Array.from(listadoHoras);
            // console.log(listadoHoraArray);

            const resultado = listadoHoraArray.filter(li => !horasTomadas.includes(li.dataset.horaId));
            // console.log(resultado);
            resultado.forEach(li => li.classList.remove('horas__hora--deshabilitada'));

            // :not(.horas__hora--deshabilitada) deshabilita el clic
            const horasDisponibles = document.querySelectorAll('#horas li:not(.horas__hora--deshabilitada)');
            horasDisponibles.forEach(hora => hora.addEventListener('click', seleccionarHora));
        }

        function seleccionarHora(e) {
            // console.log(e.target.dataset); para ver el nombre del data-hora-id
            // console.log(e.target.dataset.horaId);

            // deshabilitar la hora previa si hay un nuevo clic
            const horaPrevia = document.querySelector('.horas__hora--seleccionada');

            if(horaPrevia) {
                horaPrevia.classList.remove('horas__hora--seleccionada');
            }

            //Agregar clase de seleccionado
            e.target.classList.add('horas__hora--seleccionada');

            inputHiddenHora.value = e.target.dataset.horaId;

            // Llenar el campo oculto del dia
            inputHiddenDia.value = document.querySelector('[name="dia"]:checked').value;
        }
    }
})();