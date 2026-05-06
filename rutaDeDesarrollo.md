# Hoja de Ruta Actualizada — Evalix

## Objetivo General
Construir una aplicación real de gestión de notas escalable, mantenible y lista para evolucionar a SaaS.

---

## FASE 0: Preparación del Entorno
- ~~Inicialización con Vite + React~~
- ~~Limpieza del proyecto base~~
- ~~Entorno validado con npm run dev~~
- [x] Estructura de carpetas básica creada

---

## FASE 1: Skeleton / Base Visual
- ~~Layout principal~~
- ~~Tabla de notas renderizada~~
- ~~Mock data inicial~~
- ~~Mapeo dinámico de estudiantes~~
- ~~Inputs visuales de notas~~

---

## FASE 2: Estado Reactivo
- ~~Estado global de estudiantes~~
- ~~Estado global de actividades~~
- ~~Inputs sincronizados con estado~~
- ~~Prop drilling funcional entre componentes~~

---

## FASE 3: Lógica Académica
- ~~Cálculo automático de promedio~~
- ~~Promedio reactivo en tiempo real~~
- ~~Columna de promedio visible~~
- [ ] Sistema de ponderaciones por categoría

---

## FASE 4: UX/UI
- ~~Indicadores de estado~~
- ~~Estilos condicionales~~
- [x] UI funcional
- [ ] Pulido visual profesional

---

## FASE 5: Actividades / Modelo Académico
- ~~Modelo de actividades con metadata~~
- ~~Agregar actividad dinámicamente~~
- ~~Eliminar actividad~~
- ~~Relación actividad-nota funcional~~

---

## FASE 6: Persistencia Local
- ~~Guardado en localStorage~~
- ~~Hydration automática~~
- [x] Validación básica de datos guardados

---

## FASE 7: Búsqueda y Filtros
- ~~Buscador por estudiante~~
- [ ] Filtro por fecha
- [ ] Optimización de performance para datasets grandes

---

## FASE 8: Importación CSV
- ~~Formato estándar definido~~
- ~~Plantilla descargable~~
- ~~Validación de encabezado~~
- ~~Prevención de duplicados~~
- ~~Feedback UX de importación~~

---

## FASE 9: Analítica / Visualización
- [ ] Gráficas de rendimiento por estudiante
- [ ] Estadísticas generales del curso

---

## FASE 10: Testing Real
- [ ] Prueba con docentes reales
- [ ] Recolección de feedback UX

---

## FASE 11: Refactor para Escalabilidad

### 11.1 Limpieza Arquitectónica
- [ ] Mover utilidades a `/utils`
- [ ] Separar lógica de localStorage a `/hooks` o `/services`
- [ ] Reducir tamaño de `TablaNotas.jsx`

### 11.2 Normalización de Datos
- [ ] Rediseñar estructura de notas para backend-friendly

#### Estructura actual

estudiante.notas = {
  actividadId: valor
}

## 11.3 Preparación Backend

- [ ] Definir modelos finales de datos
- [ ] Diseñar esquema relacional
- [ ] Preparar capa de servicios API

---

## FASE 12: Backend / Supabase

- [ ] Configurar proyecto Supabase
- [ ] Crear tablas relacionales
- [ ] Migrar estado local a nube
- [ ] Sincronizar frontend con base de datos

---

## FASE 13: Autenticación

- [ ] Login / Registro docente
- [ ] Aislamiento de datos por usuario

---

## FASE 14: Vista Estudiante

- [ ] Consulta de resultados por código/token
- [ ] Vista de solo lectura para estudiantes

---

## FASE 15: Lanzamiento

- [x] Deploy inicial en Vercel
- [ ] Dominio personalizado
- [ ] Landing page / presentación comercial
- [ ] Demo final lista para clientes

---

## Próxima Prioridad

**FASE 11.1 — Limpieza Arquitectónica**


Ruta de arquitectura para supabase 



src/
│
├── components/
│   ├── TablaNotas/
│   │   ├── TablaNotas.jsx
│   │   ├── TablaNotasHeader.jsx
│   │   ├── TablaNotasRow.jsx
│   │   ├── FormActividad.jsx
│   │   ├── FormEstudiante.jsx
│   │   └── FiltrosTabla.jsx
│
├── hooks/
│   └── useTablaNotas.js
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