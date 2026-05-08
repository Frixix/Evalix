# Evalix

Sistema de gestión de notas académicas construido con React y Supabase.

---

# Link 
https://evalix-iota.vercel.app/
---

# Estado actual del proyecto

El proyecto ya cuenta con:

* Gestión de estudiantes
* Gestión de actividades
* Registro de notas
* Persistencia local
* Integración inicial con Supabase
* Arquitectura modular con hooks y services

---

# Tecnologías utilizadas

## Frontend

* React
* Vite
* JavaScript
* CSS

## Backend / Base de datos

* Supabase
* PostgreSQL

---

# Arquitectura actual

```txt
src/
│
├── components/
├── hooks/
├── services/
├── utils/
├── constants/
├── styles/
└── data/
```

---

# Hooks personalizados

## useTablaNotas

Encapsula toda la lógica principal:

* agregar estudiantes
* eliminar estudiantes
* agregar actividades
* eliminar actividades
* actualizar notas

## useFiltroEstudiantes

Encapsula la lógica de filtrado y búsqueda.

## usePersistenciaNotas

Persistencia local usando localStorage.

---

# Services

## tablaNotasService

Capa encargada de comunicarse con Supabase.

Actualmente implementa:

* obtenerDatos()
* crearEstudiante()
* crearActividad()
* eliminarEstudiante()
* eliminarActividad()

---

# Integración con Supabase

## Tablas creadas

### estudiantes

```sql
id bigint primary key
nombre text
notas jsonb
created_at timestamp
```

### actividades

```sql
id bigint primary key
nombre text
categoria text
fecha_creacion date
created_at timestamp
```

### notas

```sql
id bigint primary key
estudiante_id bigint
actividad_id bigint
valor text
created_at timestamp
```

---

# Flujo actual

## React

React mantiene el estado principal.

## Supabase

Supabase almacena:

* estudiantes
* actividades

Actualmente las notas siguen guardándose dentro del estudiante usando JSONB.

---

# Problemas solucionados

## IDs duplicados

Antes:

* Date.now()
* conflictos de React keys

Ahora:

* IDs generados por Supabase

---

## Persistencia real

Antes:

* mock
* localStorage

Ahora:

* base de datos real

---

## Sincronización

Ahora:

* crear estudiante sincroniza con Supabase
* eliminar estudiante sincroniza con Supabase
* crear actividad sincroniza con Supabase
* eliminar actividad sincroniza con Supabase

---

# Próximos pasos

## Prioridad alta

### 1. Guardar actividades correctamente

Actualmente:

* React usa camelCase
* DB usa snake_case

Debe normalizarse.

---

### 2. Guardar notas reales

Actualmente:

* notas se guardan en JSONB

Futuro:

* usar tabla relacional notas

---

### 3. Importación CSV real

Actualmente:

* solo actualiza React

Debe:

* guardar también en Supabase

---

### 4. Actualización real de notas

Actualmente:

* mock

Debe:

* persistir en Supabase

---

# Mejoras futuras

* autenticación
* usuarios
* materias
* grupos
* profesores
* dashboards
* analytics
* exportación PDF
* gráficos
* reportes
* permisos y roles

---

# Objetivo arquitectónico

Construir una aplicación académica real:

Frontend:

* React

Backend:

* Supabase

Base de datos:

* PostgreSQL

Arquitectura:

* escalable
* modular
* mantenible
* preparada para producción

## Autor

Desarrollado por Robinson Estiben Rodríguez Albarracín
