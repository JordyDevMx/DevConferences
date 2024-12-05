<main class="auth">
    <h2 class="auth__heading"><?php echo $titulo; ?></h2>

    <?php require_once __DIR__ . '/../templates/alertas.php'; ?>

    <form action="/login" method="POST" class="formulario">
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

        <div class="formulario__campo">
            <label for="password" class="formulario__label">Contraseña</label>
            <input 
            type="password" 
            class="formulario__input"
            placeholder="Password"
            id="password"
            name="password"
            >
        </div>

        <input type="submit" class="formulario__submit" value="Iniciar Sesión">
    </form>

    <div class="acciones">
        <a href="/registro" class="acciones__enlace">¿Aún no tienes una cuenta? Obtener una cuenta</a>
        <a href="/olvide" class="acciones__enlace">Recuperar Contraseña</a>
    </div>
</main>