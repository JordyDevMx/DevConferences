if(document.querySelector('#mapa')) {
    // se consigue en google maps del resultado de ubicacion
    const lat = 31.690438;
    const lng = -106.427207;
    const zoom = 16;

    const map = L.map('mapa').setView([lat, lng], zoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
        .bindPopup(`
            <h2 class="mapa__heading">DevWebCamp</h2>
            <a class="mapa__texto" href="https://maps.app.goo.gl/pux214S31qRmz1Y77" target="_blank" rel="noopener noreferrer">Cd. Juarez, Chihuahua, México</a>
        `)
        .openPopup();
}