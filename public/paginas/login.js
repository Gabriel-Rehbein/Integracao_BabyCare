// Ajuste se seu back-end não for localhost:3000
const API_BASE = 'http://localhost:3000';

const $ = s => document.querySelector(s);
const guest   = $('#guest');
const authed  = $('#authed');
const loading = $('#loading');
const btnGoogle = $('#btnGoogle');
const btnLogout = $('#btnLogout');
const displayNameEl = $('#displayName');
const emailEl = $('#email');
const avatarEl = $('#avatar');

function show(el){ el?.classList.remove('hidden'); }
function hide(el){ el?.classList.add('hidden'); }

async function checkSession(){
  try{
    const res = await fetch(`${API_BASE}/auth/login/success`, { credentials: 'include' });
    const data = await res.json();

    if (res.ok && data.success){
      // Usuário logado
      displayNameEl.textContent = data.user.displayName || 'Usuário';
      const email = (data.user.emails?.[0]?.value) || (data.user.email) || '';
      emailEl.textContent = email;

      const photo = (data.user.photos?.[0]?.value) || '';
      if (photo) avatarEl.src = photo; else avatarEl.style.display = 'none';

      hide(guest);
      show(authed);
    } else {
      // Não logado
      hide(authed);
      show(guest);
    }
  }catch(e){
    console.error(e);
    hide(authed);
    show(guest);
  }finally{
    hide(loading);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkSession();

  btnGoogle?.addEventListener('click', () => {
    // Inicia fluxo OAuth
    window.location.href = `${API_BASE}/auth/google`;
  });

  btnLogout?.addEventListener('click', async () => {
    try{
      // Faz logout no back-end e volta pra mesma página
      window.location.href = `${API_BASE}/auth/logout`;
    }catch(e){
      console.error(e);
    }
  });
});
