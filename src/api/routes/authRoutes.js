const express = require('express');
const passport = require('passport');
require('dotenv').config();

const router = express.Router();

// ==========================================================
// LOGIN COM GOOGLE
// ==========================================================

function resolveClientUrl(req, pathname = '/') {
  const configured = process.env.CLIENT_URL?.trim();

  const forwardedProto = req.headers['x-forwarded-proto'];
  const proto = forwardedProto ? forwardedProto.split(',')[0] : req.protocol;
  const forwardedHost = req.headers['x-forwarded-host'];
  const host = forwardedHost || req.get('host');
  const fallback = `${proto}://${host}`;

  const baseCandidate = configured && configured.length > 0 ? configured : fallback;

  try {
    const url = new URL(baseCandidate);
    url.pathname = pathname;
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch (_err) {
    const url = new URL(pathname, fallback);
    url.search = '';
    url.hash = '';
    return url.toString();
  }
}

// Inicia o processo de login com Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Callback do Google
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/login/failed',
    session: true
  }),
  (req, res) => {
    // 🔹 Redireciona corretamente para o index dentro de /paginas
    res.redirect(resolveClientUrl(req, '/paginas/index.html'));
  }
);

// ==========================================================
// STATUS DE LOGIN
// ==========================================================
router.get('/login/success', (req, res) => {
  if (req.user) {
    const nome = req.user.nome || req.user.displayName || '';
    const email = req.user.email || req.user.emails?.[0]?.value || '';
    const avatar = req.user.avatar_url || req.user.photos?.[0]?.value || null;

    res.status(200).json({
      success: true,
      message: 'Autenticado com sucesso!',
      user: {
        id: req.user.id,
        nome,
        displayName: nome,
        email,
        avatar_url: avatar,
        avatarUrl: avatar
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Não autenticado.'
    });
  }
});

// ==========================================================
// FALHA NO LOGIN
// ==========================================================
router.get('/login/failed', (req, res) => {
  const redirectUrl = resolveClientUrl(req, '/paginas/login.html?erro=oauth');
  if (req.accepts('json')) {
    return res.status(401).json({
      success: false,
      message: 'Falha na autenticação.'
    });
  }
  res.redirect(redirectUrl);
});

// ==========================================================
// LOGOUT
// ==========================================================
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);

    const finish = () => {
      const redirectUrl = resolveClientUrl(req, '/paginas/login.html');
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect(redirectUrl);
    };

    if (req.session) {
      req.session.destroy(() => finish());
    } else {
      finish();
    }
  });
});

module.exports = router;
