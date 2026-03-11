// =============================================
// SISTEMA LEAF - V11.0 (ESTABILIDAD TOTAL)
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    setupPageEvents();
});

const validUsers = {
    'admin': { password: '1234', role: 'admin' },
    'empleado': { password: '1234', role: 'employee' }
};

// Base de datos de 10 empleados (Restaurada)
let employees = [
    { id: 1, name: 'Carolina Castro', position: 'Jefe de RRHH', status: 'Activo', salary: 5200000, document: '1000222555', phone: '3502224444', address: 'Calle 24 #4-103', birth: '1990-05-12', emergencyName: 'Pedro Perez', emergencyPhone: '3101112222', role: 'admin' },
    { id: 2, name: 'Walter White', position: 'Analista de Compras', status: 'Activo', salary: 3200000, document: '2000333444', phone: '3001112222', address: 'Albuquerque St 308', birth: '1975-09-07', emergencyName: 'Skyler White', emergencyPhone: '3009998888', role: 'user' },
    { id: 3, name: 'Victor Von Doom', position: 'Jefe dpto tecnología', status: 'Activo', salary: 6500000, document: '3000444555', phone: '3109998888', address: 'Latveria Av 1', birth: '1980-01-01', emergencyName: 'Kristoff Vernard', emergencyPhone: '3100001111', role: 'user' },
    { id: 4, name: 'Jesse Pinkman', position: 'Supervisor de ops', status: 'Inactivo', salary: 3000000, document: '4000555666', phone: '3207776666', address: 'Cedar St 44', birth: '1988-10-10', emergencyName: 'Jane Margolis', emergencyPhone: '3200002222', role: 'user' },
    { id: 5, name: 'Juan Jose Garcia', position: 'Account Manager', status: 'Activo', salary: 3800000, document: '5000666777', phone: '3154443333', address: 'Calle 100 #15-20', birth: '1992-03-15', emergencyName: 'Maria Garcia', emergencyPhone: '3150003333', role: 'user' },
    { id: 6, name: 'Elena Gomez', position: 'Analista de Datos', status: 'Activo', salary: 2500000, document: '6000777888', phone: '3114445555', address: 'Carrera 7 #45-12', birth: '1995-07-20', emergencyName: 'Carlos Gomez', emergencyPhone: '3110004444', role: 'user' },
    { id: 7, name: 'Roberto Smith', position: 'Soporte TI', status: 'Activo', salary: 2500000, document: '7000888999', phone: '3192223333', address: 'Av El Dorado #22', birth: '1985-11-30', emergencyName: 'Linda Smith', emergencyPhone: '3190005555', role: 'user' },
    { id: 8, name: 'Maria Rodriguez', position: 'Supervisor', status: 'Activo', salary: 3100000, document: '8000999000', phone: '3146667777', address: 'Calle 80 #10-50', birth: '1991-02-14', emergencyName: 'Jose Rodriguez', emergencyPhone: '3140006666', role: 'user' },
    { id: 9, name: 'Carlos Mendez', position: 'Jefe de Area', status: 'Activo', salary: 4800000, document: '9000111222', phone: '3138884444', address: 'Transversal 24 #5-10', birth: '1987-06-05', emergencyName: 'Ana Mendez', emergencyPhone: '3130007777', role: 'user' },
    { id: 10, name: 'Lucia Fernandez', position: 'Analista de Datos', status: 'Activo', salary: 2500000, document: '1010222333', phone: '3129990000', address: 'Calle 127 #19-30', birth: '1993-09-25', emergencyName: 'Luis Fernandez', emergencyPhone: '3120008888', role: 'user' }
];

let userDocs = [
    { id: 1, name: 'Documento de Identidad.pdf', date: '10/01/2026' },
    { id: 2, name: 'Curriculum Vitae.pdf', date: '12/01/2026' }
];

// ICONOS SVG (Para no depender de internet)
const iconDownload = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
const iconTrash = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;
const iconEdit = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f39c12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path></svg>`;

function setupPageEvents() {
    const path = window.location.pathname;

    // --- 1. LÓGICA DE LOGIN ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            const u = document.getElementById('username').value;
            const p = document.getElementById('password').value;
            if (validUsers[u] && validUsers[u].password === p) {
                // Si el login es exitoso, mostramos la hojita antes de entrar
                if (typeof triggerLoader === "function") triggerLoader();

                setTimeout(() => {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userRole', validUsers[u].role);
                    window.location.href = (validUsers[u].role === 'admin') ? 'admin.html' : 'dashboard.html';
                }, 1000);
            } else { alert('Error de acceso'); }
        };
    }

    // --- 2. LÓGICA DE RECUPERACIÓN DE CONTRASEÑA (Olvidó su contraseña) ---
    const forgotLink = document.getElementById('forgotPassword');
    const backLink = document.getElementById('backToLogin');
    const loginCard = document.querySelector('.login-card');
    const recoveryCard = document.getElementById('recoveryCard');
    const recoveryForm = document.getElementById('recoveryForm');

    if (forgotLink) {
        forgotLink.onclick = (e) => {
            e.preventDefault();
            loginCard.style.display = 'none';
            recoveryCard.style.display = 'block';
        };
    }

    if (backLink) {
        backLink.onclick = (e) => {
            e.preventDefault();
            recoveryCard.style.display = 'none';
            loginCard.style.display = 'block';
        };
    }

    if (recoveryForm) {
        recoveryForm.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('recoveryEmail').value;

            // Mostramos la hojita de carga
            if (typeof triggerLoader === "function") triggerLoader();

            setTimeout(() => {
                alert(`Tu correo de restablecimiento de contraseña ha sido enviado a: ${email}`);
                recoveryCard.style.display = 'none';
                loginCard.style.display = 'block';
                recoveryForm.reset();
            }, 2000);
        };
    }

    // --- 3. BOTÓN CERRAR SESIÓN ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.clear();
            window.location.href = 'index.html';
        };
    }

    // --- 4. ENRUTAMIENTO ---
    if (path.includes('admin.html')) setupAdminPage();
    if (path.includes('dashboard.html')) setupDashboardPage();
}

// --- ADMIN ---
function setupAdminPage() {
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems[0].onclick = () => showAdminSection('dashboard');
    navItems[1].onclick = () => showAdminSection('nomina');
    showAdminSection('dashboard');
}
//*boton calendario
function showAdminSection(section) {
    const container = document.querySelector('main.container');
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(i => i.classList.remove('active'));

    if (section === 'dashboard') {
        navItems[0].classList.add('active');
        container.innerHTML = `<div class="stats-container"><div class="stat-card"><h3>${employees.length}</h3><p>Empleados</p></div><div class="stat-card"><h3>$${employees.reduce((a,b)=>a+b.salary,0).toLocaleString()}</h3><p>Nómina</p></div></div><div class="card"><h3>Panel Central</h3><p>Sin alertas.</p></div>`;
    } else {
        navItems[1].classList.add('active');
        container.innerHTML = `
            <div class="card" style="margin-bottom: 20px; padding: 15px;">
                <h4><i class="fas fa-file-export"></i> Exportar Reporte de Nómina</h4>
                <div style="display: flex; gap: 10px; align-items: center; margin-top: 10px;">
                    <input type="month" id="fechaReporte" style="padding: 8px; border-radius: 8px; border: 1px solid #ddd;">
                    <button onclick="generarReporteXLS()" class="btn btn-primary" style="background-color: #2196F3;">
                        <i class="fas fa-file-excel"></i> Generar .XLS
                    </button>
                </div>
            </div>

            <div style="display:flex; justify-content:flex-end; margin-bottom:15px;"><button class="btn btn-primary" onclick="abrirModalEmpleado()">+ Agregar Empleado</button></div>
            <div class="card">
                <table class="employees-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cargo</th>
                            <th>Salario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>${employees.map(e => `
                        <tr>
                            <td><a href="#" onclick="verPerfil(${e.id}); return false;" style="color:#2e7d32; font-weight:bold;">${e.name}</a></td>
                            <td>${e.position}</td>

                            <td>
                                <span onclick="verDetalle('${e.name}', ${e.salary})" style="color:#2e7d32; text-decoration:underline; cursor:pointer; font-weight:bold;">
                                    $${e.salary.toLocaleString()}
                                </span>
                            </td>

                            <td><button class="btn-icon" onclick="abrirModalEmpleado(${e.id})">${iconEdit}</button></td>
                        </tr>`).join('')}</tbody>
                </table>
            </div>`;
    }
}

// --- FORMULARIO MODAL ---
window.abrirModalEmpleado = (id = null) => {
    const emp = id ? employees.find(e => e.id === id) : { name:'', document:'', address:'', birth:'', phone:'', emergencyName:'', emergencyPhone:'', position:'', salary: 2500000, role: 'user' };
    const modal = document.createElement('div');
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; overflow-y:auto;";
    modal.innerHTML = `
        <div class="card" style="width:100%; max-width:550px; padding:20px; border-radius:12px;">
            <h3 style="margin-bottom:15px; color:#1a4d32;">${id ? 'Modificar' : 'Registrar'}</h3>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; text-align:left;">
                <div style="grid-column: span 2;"><label style="font-size:0.75rem;">Nombres</label><input type="text" id="mName" value="${emp.name}" style="width:100%; padding:8px;"></div>
                <div><label style="font-size:0.75rem;">CC</label><input type="text" id="mDoc" value="${emp.document}" style="width:100%; padding:8px;"></div>
                <div><label style="font-size:0.75rem;">Nacimiento</label><input type="date" id="mBirth" value="${emp.birth}" style="width:100%; padding:8px;"></div>
                <div style="grid-column: span 2;"><label style="font-size:0.75rem;">Dirección</label><input type="text" id="mAddr" value="${emp.address}" style="width:100%; padding:8px;"></div>
                <div><label style="font-size:0.75rem;">Teléfono</label><input type="text" id="mPh" value="${emp.phone}" style="width:100%; padding:8px;"></div>
                <div><label style="font-size:0.75rem;">Cargo</label><input type="text" id="mPos" value="${emp.position}" style="width:100%; padding:8px;"></div>
                <div><label style="font-size:0.75rem;">Salario</label><input type="number" id="mSal" value="${emp.salary}" style="width:100%; padding:8px;"></div>
                <div><label style="font-size:0.75rem;">Rol</label><select id="mRole" style="width:100%; padding:8px;"><option value="user" ${emp.role==='user'?'selected':''}>Usuario</option><option value="admin" ${emp.role==='admin'?'selected':''}>Admin</option></select></div>
                <div style="grid-column: span 2; background:#f0f0f0; padding:10px; border-radius:8px;">
                    <p style="font-size:0.7rem; font-weight:bold;">CONTACTO EMERGENCIA</p>
                    <input type="text" id="mEmName" placeholder="Nombre" value="${emp.emergencyName}" style="width:100%; padding:8px; margin-bottom:5px;">
                    <input type="text" id="mEmPh" placeholder="Tel" value="${emp.emergencyPhone}" style="width:100%; padding:8px;">
                </div>
            </div>
            <div style="display:flex; gap:10px; margin-top:15px;"><button onclick="guardarEmpleado(${id})" class="btn btn-primary" style="flex:1;">Guardar</button><button onclick="this.parentElement.parentElement.parentElement.remove()" class="btn btn-secondary" style="flex:1;">Cerrar</button></div>
        </div>`;
    document.body.appendChild(modal);
};

window.guardarEmpleado = (id) => {
    const data = { id: id || Date.now(), name: document.getElementById('mName').value, document: document.getElementById('mDoc').value, birth: document.getElementById('mBirth').value, address: document.getElementById('mAddr').value, phone: document.getElementById('mPh').value, position: document.getElementById('mPos').value, salary: parseInt(document.getElementById('mSal').value), role: document.getElementById('mRole').value, emergencyName: document.getElementById('mEmName').value, emergencyPhone: document.getElementById('mEmPh').value, status: 'Activo' };
    if(id) employees[employees.findIndex(e=>e.id===id)] = data; else employees.push(data);
    document.body.lastChild.remove(); showAdminSection('nomina');
};

// --- DASHBOARD EMPLEADO ---
// --- DASHBOARD EMPLEADO (Ajustes Finales) ---
function setupDashboardPage() {
    const empId = localStorage.getItem('empleadoConsultadoId') || 1;
    const emp = employees.find(e => e.id == empId);

    // 1. Inyección de datos en cuadro verde
    document.getElementById('employeeName').textContent = emp.name;
    const profileBox = document.querySelector('.profile-details');
    if (profileBox) {
        profileBox.innerHTML = `
            <div class="detail-item"><strong>CC:</strong> ${emp.document}</div>
            <div class="detail-item"><strong>Tel:</strong> ${emp.phone}</div>
            <div class="detail-item"><strong>Nac:</strong> ${emp.birth}</div>
            <div class="detail-item"><strong>Dir:</strong> ${emp.address}</div>
            <div class="detail-item" style="grid-column:span 2; font-size:0.75rem; border-top:1px solid rgba(255,255,255,0.3); margin-top:5px; padding-top:5px;">
                🆘 Emergencia: ${emp.emergencyName} - ${emp.emergencyPhone}
            </div>
        `;
    }

    renderDocs();

    // Ocultar nav inferior
    const nav = document.querySelector('.bottom-nav');
    if (nav) nav.style.display = 'none';

    // --- NUEVO: BOTÓN VOLVER (Solo si el usuario es Admin) ---
    if (localStorage.getItem('userRole') === 'admin') {
        const headerLeft = document.querySelector('.header-left');
        if (headerLeft && !document.getElementById('btnVolverAdmin')) {
            const btnVolver = document.createElement('button');
            btnVolver.id = 'btnVolverAdmin';
            btnVolver.innerHTML = '← Volver al Panel';
            btnVolver.style.cssText = "background:#1a4d32; color:white; border:none; padding:8px 15px; border-radius:20px; font-size:0.7rem; cursor:pointer; margin-right:15px; font-weight:bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);";
            btnVolver.onclick = () => window.location.href = 'admin.html';
            headerLeft.prepend(btnVolver);
        }
    }

    // Botón de Carga
    const headerAccion = document.querySelector('.card-header');
    if (headerAccion && !document.getElementById('btnUpload')) {
        const btn = document.createElement('button');
        btn.id = 'btnUpload'; btn.innerHTML = '+ Cargar Documento';
        btn.className = 'btn btn-primary'; btn.style.fontSize = '0.7rem';
        btn.onclick = abrirFormSubir; headerAccion.appendChild(btn);
    }
}

// --- FUNCIÓN DE CARGA CON ANIMACIÓN DE HOJITA ---
window.finalizarCarga = () => {
    let n = document.getElementById('tipoDoc').value;
    if(n==='Otro') n = document.getElementById('mOtro').value || 'Doc';

    // Cerramos el modal de carga
    document.body.lastChild.remove();

    // Lanzamos la animación de la hojita (la que ya tenías en tu sistema)
    if (typeof triggerLoader === "function") {
        triggerLoader();
    }

    // Simulamos el tiempo de "procesamiento"
    setTimeout(() => {
        userDocs.unshift({
            id: Date.now(),
            name: n + '.pdf',
            date: new Date().toLocaleDateString()
        });
        renderDocs();
        showAlert("¡Archivo subido satisfactoriamente!");
    }, 1500); // 1.5 segundos de animación
};
function renderDocs() {
    const container = document.querySelector('.documents-list');
    if(!container) return;
    let html = `<p style="font-weight:bold; color:#2e7d32; font-size:0.8rem;">OBLIGATORIOS</p>`;
    ['Contrato Laboral.pdf', 'Certificado Laboral.pdf', 'Desprendible de Pago.pdf'].forEach(n => {
        html += `<div class="doc-item" style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee; background:#f4f9f4;"><span>${n}</span><span onclick="showAlert('Archivo descargado')">${iconDownload}</span></div>`;
    });
    html += `<p style="font-weight:bold; color:#2e7d32; font-size:0.8rem; margin-top:15px;">MIS ARCHIVOS</p>`;
    userDocs.forEach(d => {
        html += `<div class="doc-item" style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;"><div><strong>${d.name}</strong><br><small>${d.date}</small></div><div style="display:flex; gap:15px; align-items:center;"><span onclick="showAlert('Archivo descargado')">${iconDownload}</span><span onclick="eliminarDoc(${d.id})">${iconTrash}</span></div></div>`;
    });
    container.innerHTML = html;
}

// --- SUBIR (DRAG & DROP) ---
window.abrirFormSubir = () => {
    const modal = document.createElement('div');
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:1000; display:flex; align-items:center; justify-content:center;";
    modal.innerHTML = `
        <div class="card" style="width:340px; padding:20px; text-align:center;">
            <h3>Cargar Documento</h3>
            <select id="tipoDoc" style="width:100%; padding:10px; margin:10px 0;" onchange="document.getElementById('mOtro').style.display=(this.value==='Otro'?'block':'none')">
                <option value="Documento Identidad">Documento Identidad</option>
                <option value="Certificado EPS">Certificado EPS</option>
                <option value="Seguridad Social">Seguridad Social</option>
                <option value="Hoja de Vida">Hoja de Vida</option>
                <option value="Otro">Otro...</option>
            </select>
            <input type="text" id="mOtro" placeholder="¿Qué documento es?" style="width:100%; padding:8px; margin-bottom:10px; display:none;">
            <div id="dropZone" style="border:2px dashed #ccc; padding:30px; border-radius:10px; background:#f9f9f9; cursor:pointer;">
                <p id="dt">Haz clic para seleccionar archivo</p>
            </div>
            <div style="display:flex; gap:10px; margin-top:15px;">
                <button id="bc" onclick="finalizarCarga()" class="btn btn-primary" style="flex:1; display:none;">Cargar</button>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" class="btn btn-secondary" style="flex:1;">Cancelar</button>
            </div>
        </div>`;
    document.body.appendChild(modal);
    document.getElementById('dropZone').onclick = () => {
        document.getElementById('dt').innerHTML = "📄 <b>documento_listo.pdf</b>";
        document.getElementById('bc').style.display = "block";
    };
};

window.finalizarCarga = () => {
    let n = document.getElementById('tipoDoc').value;
    if(n==='Otro') n = document.getElementById('mOtro').value || 'Doc';
    userDocs.unshift({ id: Date.now(), name: n + '.pdf', date: new Date().toLocaleDateString() });
    document.body.lastChild.remove(); renderDocs(); showAlert("¡Archivo subido satisfactoriamente!");
};

window.eliminarDoc = (id) => { if(confirm('¿Eliminar?')) { userDocs = userDocs.filter(d=>d.id!==id); renderDocs(); showAlert("Eliminado", "error"); }};
function showAlert(m, t='success') {
    const a = document.createElement('div');
    a.style.cssText = `position:fixed; top:20px; left:50%; transform:translateX(-50%); padding:10px 20px; border-radius:20px; color:white; font-weight:bold; z-index:2000; background:${t==='success'?'#2ecc71':'#e74c3c'}`;
    a.textContent = m; document.body.appendChild(a); setTimeout(()=>a.remove(), 2000);
}
window.verPerfil = (id) => { localStorage.setItem('empleadoConsultadoId', id); window.location.href = 'dashboard.html'; };
// ==========================================
// ==========================================
// FUNCIONES DEMO: DESGLOSE Y REPORTE
// ==========================================

window.verDetalle = function(nombre, sueldo) {
    // 1. Buscamos el modal en el HTML
    const modal = document.getElementById("modalDetalle");
    const detNombre = document.getElementById("detNombre");
    const detCalculos = document.getElementById("detCalculos");

    // 2. PRUEBA DE ERROR: Si el HTML no tiene el modal, te avisará
    if(!modal) {
        alert("🚨 ERROR: El click funciona, pero no encuentro el <div id='modalDetalle'> en tu admin.html");
        return;
    }

    // 3. Cálculos
    const vacaciones = Math.round(sueldo / 24);
    const parafiscales = Math.round(sueldo * 0.09);
    const saludPension = Math.round(sueldo * 0.08); // 4% salud + 4% pensión

    // 4. Inyectamos la información
    detNombre.innerText = "Detalle de " + nombre;
    detCalculos.innerHTML = `
        <div style="background:#f9f9f9; padding:15px; border-radius:10px; border-left: 5px solid #2e7d32; text-align: left;">
            <p><strong>Salario Base:</strong> $${sueldo.toLocaleString()}</p>
            <p><strong>Salud y Pensión (-8%):</strong> -$${saludPension.toLocaleString()}</p>
            <p><strong>Vacaciones:</strong> $${vacaciones.toLocaleString()}</p>
            <p><strong>Parafiscales:</strong> $${parafiscales.toLocaleString()}</p>
            <hr style="margin: 10px 0; border: 0; border-top: 1px solid #ddd;">
            <p><strong>Días Trabajados:</strong> 30 días</p>
        </div>
    `;

    // 5. Mostramos la ventana
    modal.style.display = "block";
};

window.cerrarModal = function() {
    const modal = document.getElementById("modalDetalle");
    if(modal) modal.style.display = "none";
};

window.generarReporteXLS = function() {
    const fecha = document.getElementById("fechaReporte").value;
    if (!fecha) {
        alert("Por favor selecciona un mes en el calendario.");
        return;
    }
    alert("Procesando datos...\n\n¡REPORTE GENERADO!\nArchivo: reporte_nomina_" + fecha + ".xls descargado correctamente.");
};