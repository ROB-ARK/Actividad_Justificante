const token = localStorage.getItem('token');
async function cargarHistorial() {
  const res = await fetch('/api/justificantes/mis-justificantes', { headers: { 'Authorization': `Bearer ${token}` } });
  const data = await res.json();
  const cont = document.getElementById('historial-lista');
  cont.innerHTML = '';
  data.forEach(j => {
    let btnImprimir = j.Estado.nombre === 'VALIDADO' ? `<button onclick="imprimirJustificante('${j.folio}', '${j.Alumno?.nombre} ${j.Alumno?.apellidos}', '${j.Alumno?.grado_grupo}', '${j.fechas_faltas}', '${j.caso_critico}', '${j.materias_afectadas}', '${j.motivo}', '${j.Alumno?.nombre_tutor_padre || 'Autorizado por Tutor / Padre'}')">Imprimir Justificante</button>` : '';
    cont.innerHTML += `
      <div style="border: 1px solid #e2e8f0; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; background-color: #ffffff;">
        <div style="display: flex; justify-content: space-between;">
          <strong>Folio: ${j.folio || 'En proceso'}</strong>
          <span class="badge badge-${j.Estado.nombre}">${j.Estado.nombre.replace('_', ' ')}</span>
        </div>
        <p><b>Fechas:</b> ${j.fechas_faltas}</p>
        ${btnImprimir}
      </div>
    `;
  });
}
async function enviarSolicitud() {
  const formData = new FormData();
  formData.append('fechas_faltas', document.getElementById('fechas').value);
  formData.append('caso_critico', document.getElementById('caso_critico').value);
  formData.append('materias_afectadas', document.getElementById('materias').value);
  formData.append('motivo', document.getElementById('motivo').value);
  formData.append('evidencia', document.getElementById('evidencia').files[0]);
  const res = await fetch('/api/justificantes/solicitar', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: formData });
  if (res.ok) { alert('Solicitud enviada'); document.getElementById('form-solicitud').reset(); cargarHistorial(); }
}
function imprimirJustificante(folio, alumno, grado, fechas, critico, materias, motivo, padre) {
  for(let i=1; i<=2; i++) {
    document.getElementById('pdf-folio-'+i).innerText = folio;
    document.getElementById('pdf-alumno-'+i).innerText = alumno;
    document.getElementById('pdf-grado-'+i).innerText = grado;
    document.getElementById('pdf-fechas-'+i).innerText = fechas;
    document.getElementById('pdf-critico-'+i).innerText = critico;
    document.getElementById('pdf-materias-'+i).innerText = materias;
    document.getElementById('pdf-motivo-'+i).innerText = motivo;
    document.getElementById('pdf-padre-'+i).innerText = padre || 'Firma Autorizada';
  }
  const area = document.getElementById('seccion-impresion');
  area.style.display = 'block';
  window.print();
  area.style.display = 'none';
}
cargarHistorial();
