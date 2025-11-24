document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:8000';

    const btnGenero = document.getElementById('btn-buscar-genero');
    if(btnGenero) {
        btnGenero.addEventListener('click', async () => {
            const genero = document.getElementById('busqueda-genero').value;
            if(!genero) return; 

            const tabla = document.getElementById('resultados-genero');
            try {
                const res = await fetch(`${API_URL}/peliculas/buscar/por_genero?genero=${genero}`);
                const data = await res.json();
                
                tabla.innerHTML = '';
                if(data.length === 0) {
                    tabla.innerHTML = '<tr><td colspan="3">Sin resultados</td></tr>';
                    return;
                }
                
                data.forEach(p => {
                    tabla.innerHTML += `<tr><td>${p.titulo}</td><td>${p.genero}</td><td>${p.anio_estreno}</td></tr>`;
                });
            } catch(e) { console.error(e); }
        });
    }

   
    const btnActor = document.getElementById('btn-buscar-actor');
    if(btnActor) {
        btnActor.addEventListener('click', async () => {
            const nombre = document.getElementById('busqueda-actor-nombre').value;
            if(!nombre) return;

            const tabla = document.getElementById('resultados-actor');
            try {
                const res = await fetch(`${API_URL}/peliculas/buscar/por_actor?nombre=${nombre}`);
                const data = await res.json();
                
                tabla.innerHTML = '';
                if(data.length === 0) {
                    tabla.innerHTML = '<tr><td colspan="3">Sin resultados</td></tr>';
                    return;
                }

                data.forEach(p => {
                    tabla.innerHTML += `<tr><td>${p.titulo}</td><td>${p.genero}</td><td>${p.anio_estreno}</td></tr>`;
                });
            } catch(e) { console.error(e); }
        });
    }

 
    const btnPremios = document.getElementById('btn-reporte-premios');
    if(btnPremios) {
        btnPremios.addEventListener('click', async () => {
            const tabla = document.getElementById('resultados-premios');
            try {
                const res = await fetch(`${API_URL}/reportes/peliculas_mas_premiadas`);
                const data = await res.json();
                
                tabla.innerHTML = '';
                if(data.length === 0) {
                    tabla.innerHTML = '<tr><td colspan="3">Sin datos</td></tr>';
                    return;
                }

                data.forEach(p => {
                    tabla.innerHTML += `<tr><td>${p.id_pelicula}</td><td>${p.titulo}</td><td>${p.total}</td></tr>`;
                });
            } catch(e) { console.error(e); }
        });
    }
});
