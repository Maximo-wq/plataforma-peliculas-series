// Seleccionamos la base de datos del proyecto.
use("peliculas_series");

// ============================================================
// PASO 3 - CONSULTAS DE LECTURA
// ============================================================

// ------------------------------------------------------------
// Consulta 1: Filtrado básico por coincidencia exacta.
// Busca una película cuyo título coincida exactamente.
// ------------------------------------------------------------
db.peliculas.find({
  titulo: "Spider-Man"
});

// ------------------------------------------------------------
// Consulta 2: Operador de comparación.
// Busca películas con una duración mayor a 150 minutos.
// ------------------------------------------------------------
db.peliculas.find({
  duracion: {
    $gt: 150
  }
});

// ------------------------------------------------------------
// Consulta 3: Dot notation.
// Busca capítulos cuya calificación dentro del objeto
// anidado "detalles" sea mayor a 8.5.
// ------------------------------------------------------------
db.capitulos.find({
  "detalles.calificacion": {
    $gt: 8.5
  }
});

// ------------------------------------------------------------
// Consulta 4: Proyección.
// Muestra únicamente título, géneros y duración.
// Se excluye explícitamente el campo _id.
// ------------------------------------------------------------
db.peliculas.find(
  {},
  {
    _id: 0,
    titulo: 1,
    generos: 1,
    duracion: 1
  }
);

// ------------------------------------------------------------
// Consulta 5: Operador sobre un arreglo.
// Busca películas que tengan los géneros Acción y Aventura.
// ------------------------------------------------------------
db.peliculas.find({
  generos: {
    $all: ["Acción", "Aventura"]
  }
});

// ============================================================
// PASO 4 - UPDATE & DELETE
// ============================================================

// ------------------------------------------------------------
// Operación 1: $set.
// Modifica el idioma del usuario U008 y agrega la propiedad
// "activo".
// ------------------------------------------------------------
db.usuarios.updateOne(
  { _id: "U008" },
  {
    $set: {
      idioma: "Inglés",
      activo: true
    }
  }
);

// ------------------------------------------------------------
// Operación 2: $inc.
// Incrementa en 1 el contador "utiles" de la reseña R001.
// Si el campo no existe, MongoDB lo crea con valor 1.
// ------------------------------------------------------------
db.resenas.updateOne(
  { _id: "R001" },
  {
    $inc: {
      utiles: 1
    }
  }
);

// ------------------------------------------------------------
// Operación 3: deleteOne.
// Elimina únicamente la reseña cuyo _id sea R010.
// El criterio es específico para evitar eliminar otros
// documentos.
// ------------------------------------------------------------
db.resenas.deleteOne({
  _id: "R010"
});
