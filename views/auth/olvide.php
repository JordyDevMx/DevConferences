<main class="auth">
    <h2 class="auth__heading"><?php echo $titulo; ?></h2>

    <?php require_once __DIR__ . '/../templates/alertas.php'; ?>

    <form action="/olvide" method="POST" class="formulario">
        <div class="formulario__campo">
            <label for="email" class="formulario__label">Correo Eléctronico</label>
            <input 
            type="email" 
            class="formulario__input"
            placeholder="Correo Eléctronico"
            id="email"
            name="email"
            >
        </div>

        <input type="submit" class="formulario__submit" value="Enviar Instrucciones">
    </form>

    <div class="acciones">
        <a href="/login" class="acciones__enlace">¿Ya tienes una cuenta? Iniciar Sesión</a>
        <a href="/registro" class="acciones__enlace">¿Aún no tienes una cuenta? Obtener una cuenta</a>
    </div>
</main>