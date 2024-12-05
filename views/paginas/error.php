<main class="pagina_404">
    <h2 class="pagina_404__heading"><?php echo $titulo; ?></h2>

    <div class="pagina_404__contenedor">
        <div class="pagina_404__grid">
            <div class="pagina_404__imagen">
                <picture>
                    <source srcset="/build/img/error-404.avif" type="image/avif">
                    <source srcset="/build/img/error-404.webp" type="image/webp">
                    <img loading="lazy" width="200" height="300" src="/build/img/error-404.png" alt="error">
                </picture>
            </div>

            <div class="pagina_404__info">
                <p class="pagina_404__texto">No se encontro la URL solicitada en este servidor</p>
                <a href="/" class="pagina_404__enlace">Ir al Inicio</a>
            </div>
        </div>
        
    </div>
</main>