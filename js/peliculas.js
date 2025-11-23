document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:8000';
    const tablaPeliculasBody = document.getElementById('tabla-peliculas');
    
    const modalEditar = document.getElementById('modal-editar-pelicula');
    const modalAsignarActor = document.getElementById('modal-asignar-actor');
    const modalAsignarPremio = document.getElementById('modal-asignar-premio');
    const modalDetalle = document.getElementById('modal-ver-detalle');
    
    const cerrarModales = () => {
        if(modalEditar) modalEditar.style.display = 'none';
        if(modalAsignarActor) modalAsignarActor.style.display = 'none';
        if(modalAsignarPremio) modalAsignarPremio.style.display = 'none';
        if(modalDetalle) modalDetalle.style.display = 'none';
    };
    document.querySelectorAll('.modal-cerrar').forEach(btn => btn.onclick = cerrarModales);
    window.onclick = (e) => { if ([modalEditar, modalAsignarActor, modalAsignarPremio, modalDetalle].includes(e.target)) cerrarModales(); };

   
    function iniciarCarrusel() {
        const contenedor = document.getElementById('carrusel-peliculas');
        if (!contenedor) return;
        contenedor.innerHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            const slide = document.createElement('div');
            slide.className = `slide ${i === 1 ? 'active' : ''}`;
          
            slide.innerHTML = `<img src="img/slides_peliculas/${i}.jpg" style="width:100%; height:100%; object-fit:cover;" alt="Cine" onerror="this.parentElement.style.display='none'">`;
            contenedor.appendChild(slide);
        }

        let slideIndex = 0;
        const slides = document.querySelectorAll('#carrusel-peliculas .slide');
        if (slides.length > 0) {
            setInterval(() => {
                const visibleSlides = Array.from(slides).filter(s => s.style.display !== 'none');
                if(visibleSlides.length > 1) {
                    slides.forEach(s => s.classList.remove('active'));
                    slideIndex = (slideIndex + 1) % visibleSlides.length;
                    visibleSlides[slideIndex].classList.add('active');
                }
            }, 3000);
        }
    }
    iniciarCarrusel();

    async function cargarPeliculas() {
        try {
            const response = await fetch(`${API_URL}/peliculas`);
            const peliculas = await response.json();
            tablaPeliculasBody.innerHTML = ''; 
            if (peliculas.length === 0) {
                tablaPeliculasBody.innerHTML = '<tr><td colspan="5" style="text-align:center">Sin datos.</td></tr>';
                return;
            }
            peliculas.forEach(p => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${p.id_pelicula}</td>
                    <td>${p.titulo}</td>
                    <td>${p.genero}</td>
                    <td>${p.anio_estreno}</td>
                    <td>
                        <button class="btn-detalle" onclick="verDetalle(${p.id_pelicula})" title="Ver Detalle">👁️</button>
                        <button class="btn-editar" onclick='abrirModalEditarPelicula(${JSON.stringify(p)})'>✏️</button>
                        <button class="btn-eliminar" onclick="eliminarPelicula(${p.id_pelicula})">🗑️</button>
                        <button class="btn-asignar" onclick="abrirAsignarActor(${p.id_pelicula})">👤</button>
                        <button class="btn-asignar" onclick="abrirAsignarPremio(${p.id_pelicula})">🏆</button>
                    </td>
                `;
                tablaPeliculasBody.appendChild(fila);
            });
        } catch (e) { console.error(e); }
    }

    
    window.verDetalle = async (id) => {
        try {
            const res = await fetch(`${API_URL}/peliculas/${id}/detalle`);
            const data = await res.json();
            
            document.getElementById('detalle-titulo').innerText = `Película: ${data.info.titulo}`;
            
           
            const img = document.getElementById('detalle-img');
            img.style.display = 'block';
            img.src = `img/peliculas/${id}.jpg`;
            img.onerror = function(){ this.style.display='none'; }; 
            
            const la = document.getElementById('detalle-lista-actores');
            la.innerHTML = data.actores.length ? '' : '<li>Sin actores</li>';
            data.actores.forEach(a => la.innerHTML += `<li>${a.nombre} ${a.apellido} (${a.rol})</li>`);

            const lp = document.getElementById('detalle-lista-premios');
            lp.innerHTML = data.premios.length ? '' : '<li>Sin premios</li>';
            data.premios.forEach(pr => lp.innerHTML += `<li>${pr.nombre} (${pr.anio_ganado})</li>`);

            modalDetalle.style.display = 'block';
        } catch(e) { console.error(e); }
    };

    const formCrear = document.getElementById('form-crear-pelicula');
    if(formCrear){
        formCrear.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = { titulo: document.getElementById('titulo').value, genero: document.getElementById('genero').value, anio_estreno: document.getElementById('anio_estreno').value };
            try { await fetch(`${API_URL}/peliculas`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) }); formCrear.reset(); cargarPeliculas(); } catch(e) {}
        });
    }

    window.eliminarPelicula = async (id) => { if(!confirm("¿Borrar?")) return; try { await fetch(`${API_URL}/peliculas/${id}`, { method: 'DELETE' }); cargarPeliculas(); } catch(e) {} };

    window.abrirModalEditarPelicula = (p) => {
        document.getElementById('editar-id').value = p.id_pelicula;
        document.getElementById('editar-titulo').value = p.titulo;
        document.getElementById('editar-genero').value = p.genero;
        document.getElementById('editar-anio_estreno').value = p.anio_estreno;
        modalEditar.style.display = 'block';
    }

    document.getElementById('form-editar-pelicula').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editar-id').value;
        const data = { titulo: document.getElementById('editar-titulo').value, genero: document.getElementById('editar-genero').value, anio_estreno: document.getElementById('editar-anio_estreno').value };
        try { await fetch(`${API_URL}/peliculas/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) }); modalEditar.style.display = 'none'; cargarPeliculas(); } catch(e) {}
    });

    window.abrirAsignarPremio = async (id) => {
        document.getElementById('asignar-premio-pelicula-id').value = id;
        const lista = document.getElementById('lista-premios-actuales');
        const sel = document.getElementById('select-premio');
        const inputAnio = document.getElementById('asignar-anio');
        modalAsignarPremio.style.display = 'block';
        try {
            const resDet = await fetch(`${API_URL}/peliculas/${id}/detalle`);
            const det = await resDet.json();
            inputAnio.dataset.estreno = det.info.anio_estreno;
            inputAnio.value = det.info.anio_estreno;
            lista.innerHTML = det.premios.length ? '' : '<li>Sin premios</li>';
            det.premios.forEach(pr => lista.innerHTML += `<li>${pr.nombre}</li>`);
            const resPr = await fetch(`${API_URL}/premios`);
            const todos = await resPr.json();
            sel.innerHTML = '';
            todos.forEach(pr => { const op = document.createElement('option'); op.value = pr.id_premio; op.text = pr.nombre; sel.appendChild(op); });
        } catch(e) {}
    };

    document.getElementById('form-asignar-premio').addEventListener('submit', async (e) => {
        e.preventDefault();
        const idPel = document.getElementById('asignar-premio-pelicula-id').value;
        const idPrem = document.getElementById('select-premio').value;
        const anio = document.getElementById('asignar-anio').value;
        const estreno = document.getElementById('asignar-anio').dataset.estreno;
        if (anio < estreno && anio != (parseInt(estreno)+1)) { alert("Año inválido"); return; }
        try { await fetch(`${API_URL}/peliculas/${idPel}/premios`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({id_premio:idPrem, anio_ganado:anio}) }); window.abrirAsignarPremio(idPel); } catch(e) {}
    });

    window.abrirAsignarActor = async (id) => {
        document.getElementById('asignar-actor-pelicula-id').value = id;
        const sel = document.getElementById('select-actor');
        modalAsignarActor.style.display = 'block';
        try {
            const res = await fetch(`${API_URL}/actores`);
            const actores = await res.json();
            sel.innerHTML = '';
            actores.forEach(a => { const op = document.createElement('option'); op.value = a.id_actor; op.text = `${a.nombre} ${a.apellido}`; sel.appendChild(op); });
        } catch(e) {}
    };

    document.getElementById('form-asignar-actor').addEventListener('submit', async (e) => {
        e.preventDefault();
        const idPel = document.getElementById('asignar-actor-pelicula-id').value;
        const idAct = document.getElementById('select-actor').value;
        const rol = document.getElementById('asignar-rol').value;
        try { await fetch(`${API_URL}/peliculas/${idPel}/actores`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({id_actor:idAct, rol:rol}) }); if(res.ok) { modalAsignarActor.style.display = 'none'; alert("Asignado"); } } catch(e) {}
    });

    cargarPeliculas();
});