
export function soloAdmin(req, res, next) {
    if (req.user && req.user.rol === "admin") {
        return next(); 
    }
    res.status(403).send("Acceso denegado: se requiere rol de administrador"); 
}

export function soloUser(req, res, next) {
    if (req.user && req.user.rol === "user") {
        return next(); 
    }
    res.status(403).send("Acceso denegado: se requiere rol de usuario"); 
}