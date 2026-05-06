# Evalix

Aplicación web para gestión académica y control de notas de estudiantes.

---

## Descripción

Evalix permite administrar estudiantes, actividades y calificaciones dentro de una tabla dinámica de notas, con persistencia en proceso de migración hacia backend con Supabase.

Su objetivo es evolucionar hacia una plataforma SaaS para instituciones educativas y docentes independientes.

---

## Funcionalidades Actuales

### Gestión de Estudiantes

* Agregar estudiantes manualmente
* Eliminar estudiantes
* Buscar estudiantes por nombre

### Gestión de Actividades

* Crear actividades académicas
* Categorizar actividades:

  * Tarea
  * Quiz
  * Examen
  * Proyecto
  * Laboratorio
* Asignar fecha de creación
* Eliminar actividades

### Calificaciones

* Registrar notas entre 0.0 y 5.0
* Marcar actividad como NP (No presentó)
* Cálculo automático de promedio
* Estado académico automático:

  * Aprueba
  * Riesgo
  * Pierde

### Importación de Datos

* Importación CSV de estudiantes
* Validación de encabezados
* Prevención de duplicados

### Persistencia

* Arquitectura preparada para persistencia backend
* Integración inicial con Supabase en progreso

---

## Stack Tecnológico

* React
* JavaScript
* Vite
* CSS Modular
* Supabase (Backend en integración)

---

## Arquitectura del Proyecto

```bash id="g7zz9e"
src/
│
├── components/
│   ├── Header.jsx
│   ├── ImportarCSV.jsx
│   └── TablaNotas/
│       ├── TablaNotas.jsx
│       ├── TablaNotasHeader.jsx
│       ├── TablaNotasRow.jsx
│       ├── FormActividad.jsx
│       ├── FormEstudiante.jsx
│       └── FiltrosTabla.jsx
│
├── hooks/
│   ├── useTablaNotas.js
│   └── useFiltroEstudiantes.js
│
├── services/
│   └── tablaNotasService.js
│
├── lib/
│   └── supabase.js
│
├── constants/
│   └── reglasAcademicas.js
│
├── utils/
│   └── notas.js
│
└── App.jsx
```

---

## Estado Actual del Proyecto

Evalix se encuentra en transición desde una arquitectura local hacia una arquitectura fullstack basada en Supabase.

Actualmente:

* CRUD conectado a capa de servicios mock
* Base de datos Supabase configurada
* Variables de entorno listas
* Preparado para migración completa de persistencia

---

## Roadmap Próximo

* Integrar lectura inicial desde Supabase
* Reemplazar mocks por queries reales
* Implementar autenticación docente
* Añadir aislamiento de datos por usuario
* Preparar lanzamiento beta

---

## Visión a Futuro

Convertir Evalix en una plataforma SaaS educativa con:

* Gestión multi-docente
* Panel administrativo
* Vista para estudiantes
* Analítica avanzada
* Exportación de reportes
* Integración institucional

---

## Autor

Desarrollado por Robinson Estiben Rodríguez Albarracín
