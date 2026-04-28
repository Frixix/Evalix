# Evalix

Aplicación web para gestión académica y control de notas de estudiantes.

## Descripción

Evalix permite administrar estudiantes, actividades y calificaciones dentro de una tabla dinámica de notas, con persistencia local en el navegador.

---

## Funcionalidades actuales

### Gestión de estudiantes
- Agregar estudiantes manualmente
- Eliminar estudiantes
- Buscar estudiantes por nombre

### Gestión de actividades
- Crear actividades académicas
- Categorizar actividades:
  - Tarea
  - Quiz
  - Examen
  - Proyecto
  - Laboratorio
- Asignar fecha de creación
- Eliminar actividades

### Calificaciones
- Registrar notas entre 0.0 y 5.0
- Marcar actividad como NP (No presentó)
- Cálculo automático de promedio
- Estado académico automático:
  - Aprueba
  - Riesgo
  - Pierde

### Persistencia
- Guardado automático en localStorage
- Recuperación automática de datos al cargar la app

### Arquitectura UI
- Header de navegación
- Vista separada para:
  - Tabla de notas
  - Importación CSV (estructura base)

---

## Stack Tecnológico

- React
- JavaScript
- CSS Modular por componente
- LocalStorage API

---

## Estructura actual

```bash
src/
│
├── components/
│   ├── Header.jsx
│   ├── TablaNotas.jsx
│   └── ImportarCSV.jsx
│
├── data/
│   └── estudiantes.js
│
├── styles/
│   └── tabla.css
│
└── App.jsx

Estado actual del proyecto

Versión funcional inicial con arquitectura base preparada para futura modularización de responsabilidades.

Próximas mejoras planeadas
Separar lógica de negocio de TablaNotas
Modularizar hooks personalizados
Extraer utilidades de cálculo
Mejorar importación CSV
Validaciones avanzadas
Persistencia backend futura