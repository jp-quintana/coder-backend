const Usuario = require('./Usuario.js');

const usuario = new Usuario('Juan', 'Quintana');

usuario.addMascotas('Gaia');
usuario.addMascotas('Cartucho');
usuario.addMascotas('Falco');

usuario.addBook('Harry Potter', 'Rowling');
usuario.addBook('Harry Potter 2', 'Rowling');
usuario.addBook('Harry Potter 3', 'Rowling');

console.log(usuario);
console.log(usuario.countMascotas());
console.log(usuario.getBookNames());
