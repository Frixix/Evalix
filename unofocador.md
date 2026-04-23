# Plan de Ejecución del Proyecto

## Objetivo
Traducir los requerimientos y la hoja de ruta en tareas concretas de desarrollo, organizadas para construir la aplicación paso a paso sin bloqueos.

---

# Estructura de trabajo

El desarrollo se divide en bloques pequeños llamados:

- Fase → Qué construir
- Tareas → Cómo construirlo
- Resultado esperado → Cuándo sabes que ya terminaste

---

# FASE 0: Setup del proyecto

## Tareas
- Crear proyecto con Vite + React
- Limpiar archivos innecesarios
- Crear estructura de carpetas:
  - components
  - hooks
  - utils
  - data

## Resultado esperado
- Proyecto corre sin errores
- Estructura limpia y entendible

---

# FASE 1: Tabla base (visual)

## Tareas
- Crear componente `TablaNotas.jsx`
- Renderizar lista de estudiantes
- Crear columnas fijas (ej: Nota 1, Nota 2)
- Agregar inputs en cada celda

## Resultado esperado
- Se ve una tabla tipo Excel
- Se pueden escribir valores (aunque no se guarden aún)

---

# FASE 2: Estado y datos dinámicos

## Tareas
- Crear estado con `useState`
- Guardar estudiantes en estado
- Guardar notas dentro de cada estudiante
- Conectar inputs con el estado

## Resultado esperado
- Al escribir una nota, se guarda correctamente
- Los datos no se pierden mientras la app está abierta

---

# FASE 3: Cálculo automático

## Tareas
- Crear función `calcularPromedio`
- Recorrer notas de cada estudiante
- Mostrar promedio en una nueva columna
- Actualizar en tiempo real

## Resultado esperado
- Cada estudiante muestra su promedio correctamente
- El cálculo cambia automáticamente al editar notas

---

# FASE 4: Estados visuales

## Tareas
- Crear función `obtenerEstado(promedio)`
- Aplicar clases CSS según resultado
- Pintar celdas o texto según:
  - Pierde
  - Riesgo
  - Aprueba

## Resultado esperado
- Se identifican estudiantes en riesgo de forma visual inmediata

---

# FASE 5: Actividades dinámicas

## Tareas
- Crear estado para actividades
- Permitir agregar nuevas actividades
- Generar columnas dinámicamente
- Relacionar notas con actividades

## Resultado esperado
- Se pueden crear nuevas columnas desde la UI
- Las notas se organizan correctamente

---

# FASE 6: Persistencia local

## Tareas
- Guardar estado en localStorage
- Cargar datos al iniciar la app
- Validar estructura de datos

## Resultado esperado
- Los datos permanecen después de recargar la página

---

# FASE 7: Búsqueda y filtros

## Tareas
- Input de búsqueda por nombre
- Filtrar estudiantes en tiempo real
- Filtrar actividades por fecha

## Resultado esperado
- La tabla responde rápido a búsquedas
- Mejora la navegación

---

# FASE 8: Importación CSV

## Tareas
- Crear input tipo file
- Leer archivo CSV
- Convertir a JSON
- Insertar estudiantes en el estado

## Resultado esperado
- Se pueden cargar listas de estudiantes en segundos

---

# FASE 9: Gráfica de rendimiento

## Tareas
- Instalar librería de gráficos
- Seleccionar estudiante
- Mostrar evolución de notas

## Resultado esperado
- Se visualiza el progreso del estudiante claramente

---

# FASE 10: Validación real

## Tareas
- Probar con una docente
- Observar uso real
- Anotar problemas
- Ajustar UI

## Resultado esperado
- Feedback real aplicado
- Producto usable

---

# FASE 11: Preparación para backend

## Tareas
- Separar lógica en utils
- Limpiar componentes
- Organizar estado

## Resultado esperado
- Código listo para escalar

---

# FASE 12: Integración con backend

## Tareas
- Crear proyecto en Supabase
- Crear tablas
- Conectar React con API
- Reemplazar localStorage

## Resultado esperado
- Datos persistentes en la nube

---

# FASE 13: Autenticación

## Tareas
- Login de docentes
- Asociar datos por usuario

## Resultado esperado
- Cada docente tiene su propio espacio

---

# FASE 14: Acceso estudiantes

## Tareas
- Vista de solo lectura
- Consulta de notas

## Resultado esperado
- Estudiantes pueden ver sus resultados

---

# FASE 15: Deploy

## Tareas
- Subir a Vercel
- Probar en producción
- Preparar demo

## Resultado esperado
- App accesible desde internet

---

# Reglas de desarrollo

## 1. No avanzar sin cerrar la fase actual
Si algo falla, no sigas.

## 2. Priorizar funcionamiento sobre diseño
Primero que funcione, luego que se vea bonito.

## 3. Probar constantemente
No acumular errores.

## 4. Mantener simple
Si algo se complica demasiado, estás haciendo más de lo necesario.

---

# Métrica de éxito

- Un docente puede usar la app sin explicación
- Puede ingresar notas sin errores
- Puede ver resultados en menos de 5 segundos
