const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importa as configurações do Passport e as rotas de autenticação
require('./src/config/passport-setup');
const authRoutes = require('./src/api/routes/authRoutes');
const criancaRoutes = require('./src/api/routes/criancaRoutes');
const remedioRoutes = require('./src/api/routes/remedioRoutes');
const eventoCalendarioRoutes = require('./src/api/routes/eventoCalendarioRoutes');
const refeicaoRoutes = require('./src/api/routes/refeicaoRoutes');
const sonoRoutes = require('./src/api/routes/sonoRoutes');
const localizacaoRoutes = require('./src/api/routes/localizacaoRoutes');

const app = express();

// =========================================================
// MIDDLEWARE
// =========================================================
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================================================
// FRONT-END SERVIDO PELO EXPRESS
// =========================================================

// Servir a pasta /public (onde fica o front-end)
app.use(express.static(path.join(__dirname, 'public')));

// Quando acessar a raiz "/", redirecionar para o login
app.get('/', (req, res) => {
  res.redirect('/paginas/login.html');
});

// =========================================================
// ROTAS DA API
// =========================================================
app.use('/auth', authRoutes);
app.use('/api/criancas', criancaRoutes);
app.use('/api/remedios', remedioRoutes);
app.use('/api/eventos', eventoCalendarioRoutes);
app.use('/api/refeicoes', refeicaoRoutes);
app.use('/api/sono', sonoRoutes);
app.use('/api/localizacao', localizacaoRoutes);

// =========================================================
// INICIALIZAÇÃO DO SERVIDOR
// =========================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}/paginas/login.html`);
});
