const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // Se o usuário não estiver autenticado, retorna o erro 401 (Não Autorizado)
        return res.status(401).json({ message: 'Usuário não autenticado. Por favor, faça login.' });
    }
    // Se o usuário estiver autenticado, prossegue para a próxima função de middleware ou rota
    next();
};

module.exports = authMiddleware;
