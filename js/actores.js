document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:8000';
    const tablaActoresBody = document.getElementById('tabla-actores');
    const modalEditar = document.getElementById('modal-editar-actor');
    
    document.querySelector('#modal-editar-actor .modal-cerrar').onclick = () => modalEditar.style.display = 'none';
    window.onclick = (e) => { if (e.target == modalEditar) modalEditar.style.display = 'none'; }

    function iniciarCarrusel() {
        const contenedor = document.getElementById('carrusel-actores');
        if(!contenedor) return;
        contenedor.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const slide = document.createElement('div');
            slide.className = `slide ${i === 1 ? 'active' : ''}`;
            slide.innerHTML = `<img src="img/slides_actores/${i}.jpg" style="width:100%; height:100%; object-fit:cover;" alt="Actor" onerror="this.parentElement.style.display='none'">`;
            contenedor.appendChild(slide);
        }
        let slideIndex = 0;
        const slides = document.querySelectorAll('#carrusel-actores .slide');
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

    async function cargarActores() {
        try {
            const response = await fetch(`${API_URL}/actores`);
            const actores = await response.json();
            tablaActoresBody.innerHTML = ''; 
            if (actores.length === 0) return;

            actores.forEach(a => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${a.id_actor}</td>
                    <td>${a.nombre}</td>
                    <td>${a.apellido}</td>
                    <td>
                        <button class="btn-editar" onclick='abrirModalEditarActor(${JSON.stringify(a)})'>✏️</button>
                        <button class="btn-eliminar" onclick="eliminarActor(${a.id_actor})">🗑️</button>
                    </td>
                `;
                tablaActoresBody.appendChild(fila);
            });
        } catch (error) { console.error(error); }
    }

    const formCrear = document.getElementById('form-crear-actor');
    if(formCrear){
        formCrear.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const data = { nombre: document.getElementById('actor-nombre').value, apellido: document.getElementById('actor-apellido').value, nacionalidad: document.getElementById('actor-nacionalidad').value };
            try { await fetch(`${API_URL}/actores`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); formCrear.reset(); cargarActores(); } catch (error) {}
        });
    }

    window.eliminarActor = async (id) => { if (!confirm("¿Borrar?")) return; try { await fetch(`${API_URL}/actores/${id}`, { method: 'DELETE' }); cargarActores(); } catch (error) {} };

    window.abrirModalEditarActor = (a) => {
        document.getElementById('editar-actor-id').value = a.id_actor;
        document.getElementById('editar-actor-nombre').value = a.nombre;
        document.getElementById('editar-actor-apellido').value = a.apellido;
        document.getElementById('editar-actor-nacionalidad').value = a.nacionalidad;
        modalEditar.style.display = 'block'; 
    };

    document.getElementById('form-editar-actor').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editar-actor-id').value;
        const data = { nombre: document.getElementById('editar-actor-nombre').value, apellido: document.getElementById('editar-actor-apellido').value, nacionalidad: document.getElementById('editar-actor-nacionalidad').value };
        try { await fetch(`${API_URL}/actores/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); modalEditar.style.display = 'none'; cargarActores(); } catch (error) {}
    });

    cargarActores();
});