<div class="registro">
    <h2 class="registro__heading"><?php echo $titulo; ?></h2>
    <p class="registro__descripcion">Elige tu plan</p>

    <div class="paquetes__grid">
        <div class="paquete">
            <h3 class="paquete__nombre">Pase Gratis</h3>

            <ul class="paquete__lista">
                <li class="paquete__elemento">Acceso Virtual a DevConferences</li>
            </ul>

            <p class="paquete__precio">$0</p>

            <form action="/finalizar-registro/gratis" method="POST">
                <input type="submit" class="paquetes__submit" value="Inscripción Gratis">
            </form>
        </div>

        <div class="paquete">
            <h3 class="paquete__nombre">Pase Presencial</h3>

            <ul class="paquete__lista">
                <li class="paquete__elemento">Acceso Presencial a DevConferences</li>
                <li class="paquete__elemento">Pase por 2 días</li>
                <li class="paquete__elemento">Acceso a talleres y conferencias</li>
                <li class="paquete__elemento">Acceso a las grabaciónes</li>
                <li class="paquete__elemento">Camisa del evento</li>
                <li class="paquete__elemento">Comida y bebida</li>
            </ul>

            <p class="paquete__precio">$50</p>

            <div id="smart-button-container">
                <div style="text-align: center;">
                    <div id="paypal-button-container"></div>
                </div>
            </div>

        </div>

        <div class="paquete">
            <h3 class="paquete__nombre">Pase Virtual</h3>

            <ul class="paquete__lista">
                <li class="paquete__elemento">Acceso Virtual a DevConferences</li>
                <li class="paquete__elemento">Pase por 2 días</li>
                <li class="paquete__elemento">Enlace a talleres y conferencias</li>
                <li class="paquete__elemento">Acceso a las grabaciónes</li>
            </ul>

            <p class="paquete__precio">$50</p>

            <div id="smart-button-container">
                <div style="text-align: center;">
                    <div id="paypal-button-container-virtual"></div>
                </div>
            </div>
            
        </div>
    </div>
</div>

<script src="https://www.paypal.com/sdk/js?client-id=AZDKixn-17kSbWKTj7up_5RTRvy-5aSKMqSx0k3_VDKgSK8pqVuAT_ILQtn5JNhVcIjK1Ak6PXasnQW_&enable-funding=venmo&currency=MXN" data-sdk-integration-source="button-factory"></script>

<script>
    function initPayPalButton() {
        paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'blue',
            layout: 'vertical',
            label: 'pay',
        },

        createOrder: function(data, actions) {
            return actions.order.create({
            purchase_units: [{"description":"1","amount":{"currency_code":"MXN","value":50}}]
            });
        },

        onApprove: function(data, actions) {
            return actions.order.capture().then(function(orderData) {

                const datos = new FormData();
                datos.append('paquete_id', orderData.purchase_units[0].description);
                datos.append('pago_id', orderData.purchase_units[0].payments.captures[0].id);
                datos.append('pago_id', orderData.purchase_units[0].payments.captures[0].id);

                fetch('/finalizar-registro/pagar', {
                    method: 'POST',
                    body: datos
                })
                .then( respuesta => respuesta.json())
                .then(resultado => {
                    // console.log(resultado);

                    if(resultado.resultado) {
                        actions.redirect('http://localhost:3000/finalizar-registro/conferencias');
                    }
                })

                // Para ver los resultados de la compra para colocar resultado como en las lineas de arriba
                // console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            });
        },

        onError: function(err) {
            console.log(err);
        }
        }).render('#paypal-button-container');

        // PASE VIRTUAL
        paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'blue',
            layout: 'vertical',
            label: 'pay',
        },

        createOrder: function(data, actions) {
            return actions.order.create({
            purchase_units: [{"description":"2","amount":{"currency_code":"MXN","value":50}}]
            });
        },

        onApprove: function(data, actions) {
            return actions.order.capture().then(function(orderData) {

                const datos = new FormData();
                datos.append('paquete_id', orderData.purchase_units[0].description);
                datos.append('pago_id', orderData.purchase_units[0].payments.captures[0].id);
                datos.append('pago_id', orderData.purchase_units[0].payments.captures[0].id);

                fetch('/finalizar-registro/pagar', {
                    method: 'POST',
                    body: datos
                })
                .then( respuesta => respuesta.json())
                .then(resultado => {
                    // console.log(resultado);

                    if(resultado.resultado) {
                        actions.redirect('http://localhost:3000/finalizar-registro/conferencias');
                    }
                })
            });
        },

        onError: function(err) {
            console.log(err);
        }
        }).render('#paypal-button-container-virtual');
    }

  initPayPalButton();
</script>