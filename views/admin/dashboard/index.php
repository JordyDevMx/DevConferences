<h2 class="dashboard__heading"><?php echo $titulo; ?></h2>

<main class="bloques">
    <div class="bloques__grid">
        <div class="bloque">
            <h3 class="bloque__heading">Últimos Registros</h3>

            <?php foreach($registros as $registro) { ?>
                <div class="bloque__contenido">
                    <p class="bloque__texto">
                        Cliente: <span class="bloque__texto--ponente">
                            <?php echo $registro->usuario->nombre . $registro->usuario->apellido; ?></span>
                    </p>
                </div>
            <?php } ?>
        </div>

        <div class="bloque">
            <h3 class="bloque__heading">Ingresos</h3>

            <p class="bloque__texto--cantidad">$ <?php echo $ingresos; ?> MNX</p>
        </div>

        <div class="bloque">
            <h3 class="bloque__heading">Eventos Con Menos Lugares Disponibles</h3>

            <?php foreach($menos_disponibles as $evento) { ?>
                <div class="bloque__contenido">
                    <p class="bloque__texto">
                        Evento: <span class="bloque__texto--ponente"><?php echo $evento->nombre;?></span>
                    </p>
                    <p class="bloque__texto">
                        Disponibles: <span class="bloque__texto--lugares"><?php echo $evento->disponibles;?></span>
                    </p>
                </div>
            <?php } ?>
        </div>

        <div class="bloque">
            <h3 class="bloque__heading">Eventos Con Más Lugares Disponibles</h3>

            <?php foreach($mas_disponibles as $evento) { ?>
                <div class="bloque__contenido">
                    <p class="bloque__texto">
                        Evento: <span class="bloque__texto--ponente"><?php echo $evento->nombre;?></span>
                    </p>
                    <p class="bloque__texto">
                        Disponibles: <span class="bloque__texto--lugares"><?php echo $evento->disponibles;?></span>
                    </p>
                </div>
            <?php } ?>
        </div>
    </div>
</main>