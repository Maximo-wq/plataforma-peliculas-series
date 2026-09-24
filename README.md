<img width="1546" height="854" alt="image" src="https://github.com/user-attachments/assets/a60b570a-5fe7-476c-9573-a78a324969bb" /># Plataforma de Películas y Series

## Descripción del proyecto

La Plataforma de Películas y Series es un sistema destinado a almacenar y consultar información sobre películas y series de televisión.

El sistema permitirá a los usuarios consultar información sobre los contenidos disponibles, como títulos, descripciones, géneros, fechas de estreno, temporadas y capítulos. Además, los usuarios podrán realizar reseñas y puntuaciones sobre las películas y series.

La base de datos tendrá como objetivo almacenar y organizar toda esta información de manera eficiente, permitiendo que la aplicación pueda realizar diferentes consultas sobre los contenidos y los usuarios.

## Colecciones

El sistema estará compuesto por las siguientes colecciones:

- `usuarios`: almacenará la información de los usuarios registrados.
- `peliculas`: almacenará la información de las películas disponibles.
- `series`: almacenará la información general de las series.
- `capitulos`: almacenará los capítulos pertenecientes a cada serie.
- `resenas`: almacenará las reseñas y puntuaciones realizadas por los usuarios.

## Esquema de las colecciones

### 1. Usuarios

La colección `usuarios` almacenará la información básica de las cuentas registradas en la plataforma.

```json
{
  "_id": "U001",
  "nombre": "Juan",
  "email": "juan@email.com",
  "password": "********",
  "fechaRegistro": "2026-08-18"
}

### 2. Películas

La colección `peliculas` almacenará la información de las películas disponibles.

```json
{
  "_id": "P001",
  "titulo": "Spider-Man",
  "descripcion": "Una película de superhéroes.",
  "fechaEstreno": "2002-05-03",
  "generos": ["Acción", "Aventura"],
  "duracion": 121
}
### 3. Series

La colección `series` almacenará la información general de las series disponibles.

```json
{
  "_id": "S001",
  "titulo": "Serie ejemplo",
  "descripcion": "Descripción de la serie.",
  "fechaEstreno": "2026-01-10",
  "generos": ["Drama", "Misterio"]
}

### 4. Capítulos

La colección `capitulos` almacenará los capítulos correspondientes a cada serie.

```json
{
  "_id": "C001",
  "serie_id": "S001",
  "temporada": 1,
  "numero": 1,
  "titulo": "Capítulo 1",
  "duracion": 45,
  "fechaEstreno": "2026-01-10"
}

### 5. Reseñas

La colección `resenas` almacenará las reseñas y puntuaciones realizadas por los usuarios.

```json
{
  "_id": "R001",
  "usuario_id": "U001",
  "contenido_id": "P001",
  "puntuacion": 5,
  "comentario": "Muy buena película.",
  "fecha": "2026-08-18"
}

## Modelo Embedded Documents y References

Para el diseño de la base de datos se utilizará una combinación de documentos embebidos y referencias, dependiendo de la forma en que se accederá a la información.

### Embedded Documents

Los géneros de las películas y series se almacenarán dentro de sus respectivos documentos mediante un arreglo.

Por ejemplo:

```json
"generos": ["Acción", "Aventura"]
```


Se decidió utilizar esta estrategia porque los géneros forman parte de la información propia de cada película o serie y normalmente serán consultados junto con el contenido. Además, es una información pequeña que no necesita mantenerse como una colección independiente.

### References

Los capítulos utilizarán una referencia hacia la serie mediante el campo `serie_id`.

```json
{
  "serie_id": "S001"
}
```

Esto permitirá relacionar cada capítulo con su serie correspondiente. Se utiliza una referencia porque una serie puede tener una gran cantidad de capítulos y no sería conveniente almacenar todos los capítulos dentro del mismo documento de la serie.

Las reseñas también utilizarán referencias mediante los campos `usuario_id` y `contenido_id`.

```json
{
  "usuario_id": "U001",
  "contenido_id": "P001"
}
```

## Consultas previstas

La aplicación deberá permitir realizar las siguientes consultas:

- Buscar películas por título.
- Buscar series por título.
- Buscar películas y series por género.
- Obtener los capítulos de una serie.
- Consultar las reseñas de una película o serie.
- Consultar las reseñas realizadas por un usuario.

## Consultas realizadas

Las consultas fueron probadas utilizando MongoDB Compass sobre la base de datos `peliculas_series`.

### Buscar una película por título

```json
{ "titulo": "Spider-Man" }
```

La consulta permitió obtener la película correspondiente a partir de su título.

### Buscar una serie por título

```json
{ "titulo": "Stranger Things" }
```

La consulta permitió obtener la serie correspondiente a partir de su título.

### Buscar películas y series por género

```json
{ "generos": "Acción" }
```

La consulta permitió obtener los contenidos que contienen el género `Acción`.

### Obtener los capítulos de una serie

```json
{ "serie_id": "S001" }
```

La consulta permitió obtener los capítulos asociados a la serie identificada como `S001`.

### Consultar las reseñas de una película

```json
{ "contenido_id": "P001" }
```

La consulta permitió obtener las reseñas asociadas a la película identificada como `P001`.

### Consultar las reseñas realizadas por un usuario

```json
{ "usuario_id": "U001" }
```

La consulta permitió obtener las reseñas realizadas por el usuario identificado como `U001`.

## Fundamentación de la lógica no relacional

Se eligió MongoDB y el modelo orientado a documentos porque la información de películas, series, capítulos y reseñas puede almacenarse de forma flexible.

Los datos pequeños y que se consultan junto con el contenido, como los géneros, se almacenan de forma anidada para facilitar las consultas.

En cambio, los capítulos y las reseñas utilizan referencias, ya que pueden existir muchos documentos relacionados y no sería conveniente duplicar información. Esto permite mantener los documentos organizados y reducir la redundancia de datos.

El modelo propuesto busca facilitar las consultas principales de la aplicación y mantener una estructura flexible que pueda ampliarse en el futuro.



# Fase 2 - Implementación, Sembrado de Datos y Consultas CRUD

## 1. Implementación de la base de datos

La base de datos utilizada para el proyecto se denomina `peliculas_series`.

La base de datos está compuesta por las siguientes colecciones:

- `usuarios`
- `peliculas`
- `series`
- `capitulos`
- `resenas`

Cada colección fue implementada en MongoDB y contiene datos de prueba realistas.

## 2. Sembrado de datos

Se realizó el sembrado de datos para las cinco colecciones principales.

Cada colección contiene al menos 10 documentos.

Además, se incorporaron variaciones en la estructura de algunos documentos para demostrar la flexibilidad del esquema de MongoDB.

Los archivos JSON utilizados para el sembrado se encuentran en la carpeta `/scripts` del repositorio:

- `usuarios.json`
- `peliculas.json`
- `series.json`
- `capitulos.json`
- `resenas.json`


## 3. Pruebas de Consultas MQL

### Consulta 1 - Filtrado básico por coincidencia exacta

Esta consulta permite buscar una película específica mediante su título.

```javascript
db.peliculas.find({
  titulo: "Spider-Man"
})

**Problema de negocio que resuelve:**  
Permite localizar rápidamente una película específica dentro de la plataforma utilizando su título.

<img width="1600" height="898" alt="image" src="https://github.com/user-attachments/assets/7a6a6067-b0a1-4ff5-b3b5-5498c3e327f2" />



### Consulta 2 - Filtrado mediante operador de comparación

Esta consulta permite encontrar películas cuya duración sea mayor a 150 minutos.

```javascript
db.peliculas.find({
  duracion: { $gt: 150 }
})

Problema de negocio que resuelve:
Permite identificar películas de larga duración para facilitar la búsqueda de contenidos según el tiempo disponible del usuario.

<img width="1600" height="900" alt="image" src="https://github.com/user-attachments/assets/15077dd4-a64a-438a-89d0-a2ddaead29d4" />



### Consulta 3 - Consulta de un objeto anidado

Esta consulta permite buscar capítulos que tengan una calificación superior a 8.5 dentro del objeto `detalles`.

```javascript
db.capitulos.find({
  "detalles.calificacion": { $gt: 8.5 }
})

Problema de negocio que resuelve:
Permite encontrar capítulos con una calificación alta utilizando información almacenada dentro de un objeto anidado.

<img width="1600" height="890" alt="image" src="https://github.com/user-attachments/assets/c4cb1054-61bf-4a18-98d1-52b7e10e7c24" />



### Consulta 4 - Proyección de campos

Esta consulta permite mostrar únicamente información relevante de las películas, excluyendo el identificador `_id`.

```javascript
db.peliculas.find(
  {},
  {
    _id: 0,
    titulo: 1,
    generos: 1,
    duracion: 1
  }
)

Problema de negocio que resuelve:
Permite consultar de forma más clara y eficiente la información principal de las películas, mostrando únicamente los campos necesarios.

<img width="1600" height="903" alt="image" src="https://github.com/user-attachments/assets/39241dc4-cfb4-405c-bcaf-1d5d6b53dc2c" />



### Consulta 5 - Filtrado de elementos dentro de un arreglo

Esta consulta permite buscar películas que pertenezcan simultáneamente a los géneros "Acción" y "Aventura".

```javascript
db.peliculas.find({
  generos: {
    $all: ["Acción", "Aventura"]
  }
})

Problema de negocio que resuelve:
Permite encontrar películas que pertenezcan a varios géneros específicos al mismo tiempo, facilitando la búsqueda de contenido según las preferencias del usuario.

<img width="1600" height="902" alt="image" src="https://github.com/user-attachments/assets/79abcea8-5277-458c-ac3d-1a3592e5de4a" />



## 4. Actualizaciones y eliminación (Update & Delete)

### Operación 1 - Actualización con $set

Esta operación modifica un campo existente y agrega una nueva propiedad al documento de un usuario.

```javascript
db.usuarios.updateOne(
  { _id: "U008" },
  {
    $set: {
      idioma: "Inglés",
      activo: true
    }
  }
)

Problema de negocio que resuelve:
Permite actualizar información de un usuario y agregar nuevas propiedades sin necesidad de modificar toda la estructura del documento.

<img width="381" height="505" alt="image" src="https://github.com/user-attachments/assets/f489453a-fb17-4b30-a34c-6b162453ab11" />



### Operación 2 - Incremento de un contador con $inc

Esta operación incrementa en 1 la cantidad de útiles registrados en una reseña.

```javascript
db.resenas.updateOne(
  { _id: "R001" },
  {
    $inc: {
      utiles: 1
    }
  }
)

Problema de negocio que resuelve:
Permite incrementar de forma atómica un contador asociado a una reseña, por ejemplo, para registrar cuántos usuarios consideran útil esa reseña.

<img width="335" height="504" alt="image" src="https://github.com/user-attachments/assets/94be392a-bf58-4678-88d3-b072982c9aea" />



### Operación 3 - Eliminación segura

Esta operación elimina una reseña específica utilizando su identificador único como criterio de filtrado.

```javascript
db.resenas.deleteOne({
  _id: "R010"
})

Problema de negocio que resuelve:
Permite eliminar de forma segura una reseña específica utilizando un criterio de identificación único, evitando eliminar accidentalmente otros documentos.

<img width="289" height="327" alt="image" src="https://github.com/user-attachments/assets/2d4e61df-beff-4763-aef2-01b46f37c063" />


