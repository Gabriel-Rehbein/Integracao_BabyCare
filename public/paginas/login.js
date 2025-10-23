const API_BASE = window.location.origin;
const HOME_PAGE = '/paginas/index.html';

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

    if (res.ok && data.success && data.user){
      // Se já houver sessão ativa, encaminha direto para a home
      if (window.location.pathname.endsWith('login.html')){
        window.location.replace(HOME_PAGE);
        return;
      }
      // Usuário logado
      const nome = data.user.displayName || data.user.nome || data.user.name || 'Usuário';
      displayNameEl.textContent = nome;

      const email = data.user.email || data.user.emails?.[0]?.value || '';
      emailEl.textContent = email;

      const photo = data.user.avatar_url || data.user.avatarUrl || data.user.photos?.[0]?.value || '';
      if (photo){
        avatarEl.src = photo;
        avatarEl.style.display = '';
      } else {
        avatarEl.removeAttribute('src');
        avatarEl.style.display = 'none';
      }

      hide(guest);
      show(authed);
    } else {
      // Não logado
      displayNameEl.textContent = 'Usuário';
      emailEl.textContent = '';
      avatarEl.removeAttribute('src');
      avatarEl.style.display = 'none';

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
