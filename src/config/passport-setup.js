const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const db = require('./database');

// ==========================================================
// SERIALIZAÇÃO E DESSERIALIZAÇÃO
// ==========================================================
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.query('SELECT id, nome, email, avatar_url FROM usuarios WHERE id = $1', [id]);
    if (rows.length > 0) done(null, rows[0]);
    else done(new Error('Usuário não encontrado'), null);
  } catch (err) {
    done(err, null);
  }
});

// ==========================================================
// ESTRATÉGIA GOOGLE OAUTH2
// ==========================================================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      // 🔹 Use SEMPRE o mesmo valor cadastrado no Google Cloud Console
      callbackURL: process.env.GOOGLE_CALLBACK_URL, 
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const { displayName, emails, photos, id: google_id } = profile;
      const email = emails?.[0]?.value;
      const avatar_url = photos?.[0]?.value || null;

      try {
        // Verifica se já existe
        const { rows } = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (rows.length > 0) {
          // Atualiza info do Google (caso tenha mudado o avatar)
          const { rows: updated } = await db.query(
            `UPDATE usuarios 
             SET nome = $1, avatar_url = $2 
             WHERE email = $3 
             RETURNING *`,
            [displayName, avatar_url, email]
          );
          return done(null, updated[0]);
        } else {
          // Cria novo usuário sem senha (senha_hash NULL permitido)
          const { rows: newUser } = await db.query(
            `INSERT INTO usuarios (nome, email, avatar_url, google_id) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
            [displayName, email, avatar_url, google_id]
          );
          return done(null, newUser[0]);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
