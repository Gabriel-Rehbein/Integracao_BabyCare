(function(){
  const API_BASE = window.location.origin;
  const LOGIN_PAGE = '/paginas/login.html';

  async function ensureAuthenticated(){
    try{
      const res = await fetch(`${API_BASE}/auth/login/success`, { credentials: 'include' });
      if(!res.ok){
        throw new Error('Sessão inválida');
      }
      const data = await res.json();
      if(!data.success || !data.user){
        throw new Error('Usuário não autenticado');
      }

      const name = data.user.displayName || data.user.nome || data.user.name;
      const email = data.user.email;
      const avatar = data.user.avatar_url || data.user.avatarUrl;

      const nameEl = document.querySelector('[data-auth="name"]');
      const emailEl = document.querySelector('[data-auth="email"]');
      const avatarEl = document.querySelector('[data-auth="avatar"]');
      const chipEl = document.querySelector('[data-auth="chip"]');

      if(nameEl && name){
        nameEl.textContent = name;
      }
      if(emailEl && email){
        emailEl.textContent = email;
      }
      if(avatarEl){
        if(avatar){
          avatarEl.src = avatar;
          avatarEl.removeAttribute('hidden');
        }else{
          avatarEl.setAttribute('hidden', '');
        }
      }
      if(chipEl){
        chipEl.removeAttribute('hidden');
      }
    }catch(err){
      if(!window.location.pathname.endsWith('login.html')){
        window.location.replace(LOGIN_PAGE);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', ensureAuthenticated);
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action="logout"]');
    if(!target) return;
    event.preventDefault();
    window.location.href = `${API_BASE}/auth/logout`;
  });
})();
