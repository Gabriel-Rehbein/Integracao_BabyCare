const express = require('express');
const passport = require('passport');
require('dotenv').config();

const router = express.Router();

// ==========================================================
// LOGIN COM GOOGLE
// ==========================================================

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
    res.redirect(`${process.env.CLIENT_URL}/paginas/index.html`);
  }
);

// ==========================================================
// STATUS DE LOGIN
// ==========================================================
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'Autenticado com sucesso!',
      user: req.user
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
  res.status(401).json({
    success: false,
    message: 'Falha na autenticação.'
  });
});

// ==========================================================
// LOGOUT
// ==========================================================
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = router;
