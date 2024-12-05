(function(){
    const grafica = document.querySelector('#regalos-grafica');

    if(grafica) {

        obtenerDatos();
        async function obtenerDatos() {
            const url = '/api/regalos';
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            
            const ctx = document.getElementById('regalos-grafica');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: resultado.map(regalo => regalo.nombre),
                    datasets: [{
                        label: '',
                        data: resultado.map(regalo => regalo.total),
                        backgroundColor: [
                            '#02db02',
                            '#007df4',
                            '#FD6E6A',
                            '#FFC600',
                            '#3b4049',
                            '#64748B',
                            '#db2777',
                            '#2fc7d8',
                            '#cbe00e'
                        ]
                    }]
                },
                options: {
                    scales: {
                        y: {
                        beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }
})();