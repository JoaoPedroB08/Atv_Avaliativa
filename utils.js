function validarTarefa(titulo) {
    if (!titulo || titulo.length < 3) {
        return false;
    }
    return true;
}

module.exports = { validarTarefa };