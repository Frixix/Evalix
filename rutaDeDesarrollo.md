# 🗺️ Hoja de Ruta de Desarrollo: Sistema de Gestión de Notas

## 🎯 Objetivo General
Construir una aplicación funcional de gestión de notas desde cero hasta una versión lista para usar por docentes reales, avanzando por fases pequeñas, controladas y comprobables.

---

## 🏗️ FASE 0: Preparación del Entorno
**Objetivo:** Tener el proyecto base listo para desarrollar.

1. ~~ **Inicialización:** Crear proyecto con `Vite + React`.~~
2.  ~~ **Limpieza:** Eliminar archivos de ejemplo (`App.css`, `assets`, etc.).~~ 
3.  **Estructura de Carpetas:**
    ```bash
    src/
      components/ # Componentes visuales (Tabla, Input)
      data/       # Datos estáticos iniciales
      hooks/      # Lógica personalizada (useNotas)
      utils/      # Funciones de cálculo matemático
      App.jsx
    ```
4.  ~~  **Verificación:** Ejecutar `npm run dev` y confirmar que el entorno corre.~~ 


---
## 🦴 FASE 1: Estructura Base (Skeleton)
**Objetivo:** Interfaz visual inicial sin lógica compleja.

1.  ~~ **Layout:** Crear el contenedor principal de la aplicación.~~
2.  ~~**Tabla Base:** Diseñar una tabla tipo Excel (Filas = Estudiantes, Columnas = Actividades).
3.  ~~**Mock Data:** Crear un archivo de prueba:~~
    ```javascript
    const estudiantes = [
      { id: 1, nombre: "Juan Rodríguez" },
      { id: 2, nombre: "María Casallas" }
    ];
    ```
4.  ~~**Renderizado:** Mapear los datos estáticos en la tabla.~~
5. ~~ **Inputs:** Colocar campos de texto para las notas (solo visual).~~

---

## 🧠 ~~  FASE 2: Manejo de Estado~~ 
**Objetivo:** Hacer que la aplicación "recuerde" los cambios.

1.  **Estado Global:** Implementar `useState` para manejar la lista de estudiantes y sus notas.
2.  **Interactividad:** Permitir que al escribir en un input, el valor se guarde en el estado.
3.  **Sincronización:** Asegurar que el input refleje exactamente lo que hay en el estado del componente.

---

## 🔢 ~~ FASE 3: Lógica de Cálculo~~ 
**Objetivo:** Automatizar la matemática del docente.

1.  **Funciones Utilitarias:** Crear `calcularPromedio(notas)`.
2.  **Ponderación:** Implementar lógica para categorías con porcentajes (Tareas 40%, Parcial 60%).
3.  **Automatización:** El promedio debe actualizarse apenas cambie una nota.
4.  **Visualización:** Mostrar el resultado final en una columna dedicada.

---

## 🎨 ~~ FASE 4: Vista Clara (UX/UI)~~ 
**Objetivo:** Que la información sea fácil de leer de un vistazo.

1.  **Indicadores de Estado:**
    * 🔴 **Pierde:** < 3.0
    * 🟡 **Riesgo:** 3.0 - 3.4
    * 🟢 **Aprueba:** >= 3.5
2.  **Estilos Condicionales:** Cambiar el color del texto o celda según el estado.
3.  **Pulido Visual:** Ajustar márgenes, bordes y tipografía para reducir la fatiga visual.

---

~~ ## 📑 FASE 5: Actividades y Categorías~~ 
**Objetivo:** Estructurar las notas profesionalmente.

1.  **Modelo de Actividades:** Definir cada actividad con un ID y una categoría asociada.
2.  **Relaciones:** Vincular cada nota a una `actividadId` y un `estudianteId`.
3.  **Gestión:** Botón para "Agregar Actividad" que despliegue una nueva columna.

---

## 💾 FASE 6: Persistencia Local
**Objetivo:** Que los datos no se borren al cerrar el navegador.

1.  **LocalStorage:** Implementar un efecto (`useEffect`) que guarde el estado en el navegador.
2.  **Hydration:** Al cargar la app, buscar si existen datos previos y cargarlos.
3.  **Seguridad:** Validar que los datos cargados tengan el formato correcto.

---

## 🔍 FASE 7: Filtros y Búsqueda
**Objetivo:** Agilidad en listas grandes.

1.  **Buscador:** Filtrar estudiantes por nombre en tiempo real.
2.  **Filtro de Tiempo:** Opción para ver actividades por rangos de fecha.
3.  **Performance:** Asegurar que el filtrado no ralentice la aplicación.

---

## 📥 FASE 8: Importación de Datos (CSV)
**Objetivo:** Eliminar el registro manual de 40 estudiantes.

1.  **File Input:** Botón para cargar archivos `.csv`.
2.  **Parser:** Convertir el texto del CSV a objetos de JavaScript.
3.  **Mapeo:** Integrar los nuevos estudiantes al estado actual.

---

## 📈 FASE 9: Gráfica de Rendimiento (PLUS)
**Objetivo:** Visualizar el progreso individual.

1.  **Librería de Gráficos:** Instalar `Chart.js` o `Recharts`.
2.  **Línea de Tiempo:** Mostrar cómo han evolucionado las notas de un estudiante específico.

---

## 🧪 FASE 10: Pruebas Reales
**Objetivo:** Feedback directo.

1.  **Demo con Docente:** Observar a un docente real usando la herramienta.
2.  **Ajustes:** Corregir comportamientos confusos o añadir pequeños detalles solicitados (ej. botón de limpiar filtros).

---

## ☁️ FASE 11 - 15: Escalado a Versión Online (V2)

### FASE 11: Preparación
* Separar la lógica de negocio de los componentes.
* Limpiar el código para que sea legible por otros desarrolladores.

### FASE 12: Backend (Supabase)
* Configurar base de datos Postgres en Supabase.
* Sincronizar el estado de React con las tablas de la DB.

### FASE 13: Autenticación
* Login/Registro para que cada docente tenga su propia cuenta privada.

### FASE 14: Acceso Estudiantes
* Crear una vista de "Solo Lectura" donde el estudiante ingrese su código y vea sus resultados.

### FASE 15: Lanzamiento
* Hacer deploy en **Vercel** o **Netlify**.
* Preparar una demo final.

---

## 💡 Enfoque Clave
> **"Que funcione, que sea simple, que sea útil."**
> Evita la sobreingeniería. No pases a la fase de "Base de datos" si la lógica de cálculo local todavía falla.