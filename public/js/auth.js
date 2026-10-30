function toggleAuth(showRegistro) {
  document.getElementById('form-login').style.display = showRegistro ? 'none' : 'block';
  document.getElementById('form-registro').style.display = showRegistro ? 'block' : 'none';
}
async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const res = await fetch('/api/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    if (data.id_rol === 1) window.location.href = '/dashboard-alumno.html';
    else if (data.id_rol === 2) window.location.href = '/dashboard-tutor.html';
    else if (data.id_rol === 3) window.location.href = '/dashboard-direccion.html';
  } else { alert(data.mensaje); }
}
async function registro() {
  const body = {
    id_rol: document.getElementById('reg-rol').value,
    matricula: document.getElementById('reg-matricula').value,
    nombre: document.getElementById('reg-nombre').value,
    apellidos: document.getElementById('reg-apellidos').value,
    email: document.getElementById('reg-email').value,
    password: document.getElementById('reg-password').value,
    grado_grupo: document.getElementById('reg-grado').value,
    nombre_tutor_padre: document.getElementById('reg-padre').value
  };
  const res = await fetch('/api/auth/registro', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
  });
  if (res.ok) { alert('Registrado exitosamente'); toggleAuth(false); }
}
