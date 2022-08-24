class Usuario {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    this.nombre = nombre.toString();
    this.apellido = apellido.toString();
    this.libros = Array.isArray(libros) ? libros : [libros];
    this.mascotas = mascotas;
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascotas(mascota) {
    return this.mascotas.push(mascota.toString());
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, autor) {
    return this.libros.push({ nombre, autor });
  }

  getBookNames() {
    if (this.libros.length > 0) {
      return this.libros.map((libros) => libros.nombre);
    }
    return 'El usuario no tiene libros!';
  }
}

module.exports = Usuario;
