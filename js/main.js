document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.nav-tab');
    const secciones = document.querySelectorAll('.seccion');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            
            const seccionId = tab.getAttribute('data-seccion');
            const seccionAmostrar = document.getElementById(seccionId);

            
            if (!seccionAmostrar) {
                console.error(`Error: No se encontró una sección con id="${seccionId}"`);
                return;
            }

           
            tabs.forEach(t => t.classList.remove('active'));
            secciones.forEach(s => s.classList.remove('active'));
            
            tab.classList.add('active');
            seccionAmostrar.classList.add('active');
        });
    });
});