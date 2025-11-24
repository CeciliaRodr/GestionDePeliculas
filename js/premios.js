document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:8000';
    const tablaPremiosBody = document.getElementById('tabla-premios');
    const modalEditar = document.getElementById('modal-editar-premio');
    
    document.querySelector('#modal-editar-premio .modal-cerrar').onclick = () => modalEditar.style.display = 'none';
    window.onclick = (e) => { if (e.target == modalEditar) modalEditar.style.display = 'none'; }

    function iniciarCarrusel() {
        const contenedor = document.getElementById('carrusel-premios');
        if(!contenedor) return;
        contenedor.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const slide = document.createElement('div');
            slide.className = `slide ${i === 1 ? 'active' : ''}`;
            
            slide.innerHTML = `<img src="img/slides_premios/${i}.jpg" style="width:100%; height:100%; object-fit:cover;" alt="Premio" onerror="this.parentElement.style.display='none'">`;
            contenedor.appendChild(slide);
        }
        let slideIndex = 0;
        const slides = document.querySelectorAll('#carrusel-premios .slide');
        if(slides.length > 0) {
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

   
    async function cargarPremios() {
        try {
            const response = await fetch(`${API_URL}/premios`);
            const premios = await response.json();
            tablaPremiosBody.innerHTML = ''; 
            if (premios.length === 0) return;

            premios.forEach(p => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${p.id_premio}</td>
                    <td>${p.nombre}</td>
                    <td>${p.organizacion || '-'}</td>
                    <td>
                        <button class="btn-editar" onclick='abrirModalEditarPremio(${JSON.stringify(p)})'>✏️</button>
                        <button class="btn-eliminar" onclick="eliminarPremio(${p.id_premio})">🗑️</button>
                    </td>
                `;
                tablaPremiosBody.appendChild(fila);
            });
        } catch (error) { console.error(error); }
    }
    
    const formCrear = document.getElementById('form-crear-premio');
    if (formCrear) {
        formCrear.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = { nombre: document.getElementById('premio-nombre').value, organizacion: document.getElementById('premio-organizacion').value };
            try { await fetch(`${API_URL}/premios`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); formCrear.reset(); cargarPremios(); } catch (error) {}
        });
    }

    window.eliminarPremio = async (id) => { if (!confirm("¿Borrar?")) return; try { await fetch(`${API_URL}/premios/${id}`, { method: 'DELETE' }); cargarPremios(); } catch (error) {} };

    window.abrirModalEditarPremio = (p) => {
        document.getElementById('editar-premio-id').value = p.id_premio;
        document.getElementById('editar-premio-nombre').value = p.nombre;
        document.getElementById('editar-premio-organizacion').value = p.organizacion;
        modalEditar.style.display = 'block';
    };

    document.getElementById('form-editar-premio').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editar-premio-id').value;
        const data = { nombre: document.getElementById('editar-premio-nombre').value, organizacion: document.getElementById('editar-premio-organizacion').value };
        try { await fetch(`${API_URL}/premios/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); modalEditar.style.display = 'none'; cargarPremios(); } catch (error) {}
    });

    cargarPremios();
});