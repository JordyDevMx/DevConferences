<fieldset class="formulario__fieldset">
    <legend class="formulario__legend">Información del Evento</legend>

    <div class="formulario__campo">
        <label for="nombre" class="formulario__label">Nombre del Evento<span class="formulario__label--obligatorio">*</span></label>
        <input 
            type="text"
            class="formulario__input"
            id="nombre"
            name="nombre"
            placeholder="Nombre del Evento"
            value="<?php echo $evento->nombre; ?>"
        >
    </div>

    <div class="formulario__campo">
        <label for="descripcion" class="formulario__label">Descripción<span class="formulario__label--obligatorio">*</span></label>
        <textarea 
            class="formulario__input"
            id="descripcion"
            name="descripcion"
            placeholder="Descripcion del Evento"
            rows="8"
        ><?php echo $evento->descripcion; ?></textarea>
    </div>

    <div class="formulario__campo">
        <label for="categoria" class="formulario__label">Categoría o tipo de Evento<span class="formulario__label--obligatorio">*</span></label>
        <select 
            class="formulario__select" 
            id="categoria" 
            name="categoria_id"
        >
            <option value="">-- Seleccionar --</option>
            <?php foreach($categorias as $categoria) { ?>
                <option <?php echo ($evento->categoria_id === $categoria->id) ? 'selected' : ''; ?> value="<?php echo $categoria->id; ?>"><?php echo $categoria->nombre; ?></option>
            <?php } ?>
        </select>
    </div>

    <!-- Java Script -->
    <div class="formulario__campo">
        <label for="categoria" class="formulario__label">Seleccionar el Día<span class="formulario__label--obligatorio">*</span></label>
        <div class="formulario__radio">
            <?php foreach($dias as $dia) { ?>
                <div class="">
                    <label for="<?php echo strtolower($dia->nombre); ?>"><?php echo $dia->nombre; ?></label>

                    <input 
                        type="radio"
                        id="<?php echo strtolower($dia->nombre); ?>"
                        name="dia"
                        value="<?php echo $dia->id; ?>"
                        <?php echo ($evento->dia_id === $dia->id) ? 'checked' : ''; ?>
                    >
                </div>
            <?php } ?>
        </div>

        <!-- Java Script -->
        <input type="hidden" name="dia_id" value="<?php echo $evento->dia_id; ?>">
    </div>

    <!-- Java Script -->
    <div class="formulario__campo" id="horas">
        <label for="" class="formulario__label">Seleccionar Hora</label>
        <ul id="horas" class="horas">
            <?php foreach($horas as $hora) { ?>
                <li data-hora-id="<?php echo $hora->id; ?>" class="horas__hora horas__hora--deshabilitada"><?php echo $hora->hora; ?></li>
            <?php } ?>
        </ul>

        <!-- Java Script -->
        <input type="hidden" name="hora_id" value="<?php echo $evento->hora_id; ?>">
    </div>
</fieldset>

<fieldset class="formulario__fieldset">
    <!-- Java Script -->
    <legend class="formulario__legend">Información Extra</legend>

    <div class="formulario__campo">
        <label for="ponentes" class="formulario__label">Ponente</label>
        <input 
            type="text" 
            class="formulario__input"
            id="ponentes"
            name="ponentes"
            placeholder="Buscar Ponentes"
        >

        <ul class="listado-ponentes" id="listado-ponentes"></ul>

        <input type="hidden" name="ponente_id" value="<?php echo $evento->ponente_id; ?>">
    </div>

    <div class="formulario__campo">
        <label for="disponibles" class="formulario__label">Lugares Disponibles</label>
        <input 
            type="number"
            min="1" 
            class="formulario__input"
            id="disponibles"
            name="disponibles"
            placeholder="Ej. 10"
            value="<?php echo $evento->disponibles; ?>"
        >
    </div>
</fieldset>