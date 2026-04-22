# Sistema simple de gestión de notas

## Problema real

- Errores en fórmulas de Excel  
- Desincronización de archivos (versiones distintas)  
- Falta de visibilidad en tiempo real  
- Pérdida de tiempo en cálculos manuales  

### Objetivo del sistema
Permitir a docentes registrar, calcular y visualizar notas de forma automática, clara y en tiempo real, sin usar fórmulas.

---

# MVP (versión 1 realista)

## 1. Panel docente

### Funcionalidades:
- Crear curso  
- Agregar estudiantes manualmente  
- Crear actividades (Ej: Taller 1, Parcial, Quiz)  
- Ingresar notas en tabla tipo Excel  

### Filtros:
- Buscar estudiante por nombre  
- Filtrar actividades por fecha  

---

## 2. Cálculo automático

### Funcionalidades:
- Promedio automático por estudiante  
- Configuración de porcentajes por categorías  

### Categorías de evaluación (ejemplo):
- Tareas → 40%  
- Parciales → 40%  
- Final → 20%  

Cada actividad pertenece a una categoría.

---

## 3. Vista clara

### Funcionalidades:
- Promedio visible por estudiante  
- Estado del estudiante:
  - Pierde (<3.0)
  - Riesgo
  - Aprueba  

- Indicadores visuales por color en la tabla  

---

# Funcionalidades PLUS

## 1. Gráfica de rendimiento
- Evolución de notas por estudiante  
- Visualización simple (línea de progreso)

## 2. Tiempo real
- Docente ve cambios al instante  
- Estudiante puede ver sus notas  

## 3. Historial
- Guardar periodos (Ej: Periodo 1, 2, 3)  
- Consultar notas anteriores  

---

# Estrategia de desarrollo

## Versión 1 (MVP)
- Solo panel docente  
- Datos almacenados localmente (sin backend)  
- Enfoque en funcionamiento completo y estable  

## Versión 2
- Base de datos en línea  
- Sincronización en tiempo real  
- Acceso para estudiantes  
- Historial persistente  

---

# Tecnologías

## Frontend
- React  
- Vite  

## Backend (para versión 2)
- Supabase (recomendado)  
- Alternativa: Firebase  

---

# Estructura de datos

## Estudiante
```js
{
  id: 1,
  nombre: "Juan"
}