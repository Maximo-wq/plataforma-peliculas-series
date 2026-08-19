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

## Fundamentación de la lógica no relacional

Se eligió MongoDB y el modelo orientado a documentos porque la información de películas, series, capítulos y reseñas puede almacenarse de forma flexible.

Los datos pequeños y que se consultan junto con el contenido, como los géneros, se almacenan de forma anidada para facilitar las consultas.

En cambio, los capítulos y las reseñas utilizan referencias, ya que pueden existir muchos documentos relacionados y no sería conveniente duplicar información. Esto permite mantener los documentos organizados y reducir la redundancia de datos.

El modelo propuesto busca facilitar las consultas principales de la aplicación y mantener una estructura flexible que pueda ampliarse en el futuro.
