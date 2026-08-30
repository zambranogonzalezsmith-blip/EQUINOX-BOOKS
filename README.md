E Q U I N O X   B O O K SCORPORATE FINANCIAL BALANCE© 2026 Smith Business Solutions. All rights reserved.
# Equinox Books 🏛️

> **Balance Financiero Corporativo Perfecto**  
> Una solución contable de alta gama desarrollada bajo el ecosistema de Smith Business Solutions.

---

## 📋 Descripción del Proyecto

**Equinox Books** es un sistema de gestión contable y auditoría fiscal diseñado para ofrecer una experiencia visualmente limpia, robusta y de alta precisión para medianas y grandes empresas. Inspirado en la simetría del equinoccio, la plataforma garantiza el equilibrio absoluto entre activos y pasivos, centralizando los flujos financieros de manera eficiente y automatizada.

Este proyecto incorpora navegación avanzada de alto rendimiento optimizada para el procesamiento de grandes volúmenes de datos contables (incluyendo funciones de desplazamiento dinámico/scroll e inmovilización de paneles).

## 🚀 Características Principales

*   **Interfaz Corporativa Premium:** Diseño minimalista optimizado para la toma de decisiones ejecutivas.
*   **Gestión de Libros Mayor y Diario:** Automatización del registro de transacciones con validación de partida doble.
*   **Scroll & Navegación Fluida:** Optimización del desplazamiento vertical y horizontal para tablas de datos extensas.
*   **Módulos de Auditoría Fiscal:** Generación de estados financieros en tiempo real con altos estándares de seguridad y transparencia.

## 🛠️ Tecnologías Utilizadas

*   **Frontend:** HTML5, CSS3 (Diseño responsivo y elegante), JavaScript (ES6+).
*   **Backend / Lógica:** [Por ejemplo: Python / Node.js - *Modificar según tu stack*]
*   **Base de Datos:** [Por ejemplo: PostgreSQL / MySQL - *Modificar según tu stack*]

El código ya está listo. Ahí te dejo el proyecto completo empaquetado.

Qué quedó terminado en esta última fase:

Las pruebas de cierre revelaron un error real: `saldos_por_tercero` no reconocía el asiento de apertura como punto de partida, así que sumaba los movimientos históricos más los trasladados y duplicaba el saldo de cada cliente en el año nuevo (C001 salía en 46,400 en lugar de 23,200). Lo corregí aplicando el mismo criterio que ya usaba `saldo_cuenta`: sin fecha inicial explícita, la acumulación arranca en la última apertura vigente.

Estado final: 112 pruebas en verde (dinero, contrato, libro diario, reportes y cierre), la demostración corre de punta a punta cerrando el ejercicio y generando la apertura, y la ecuación contable cuadra. Verifiqué además que el ejemplo de uso del README se ejecuta tal como está escrito — de hecho eso descubrió dos firmas mal documentadas que ya ajusté.

El README cubre la arquitectura, las cuatro reglas de diseño (solo el libro diario escribe, nunca `float`, correcciones únicamente por reversión, idempotencia por referencia externa), el modelo de cuentas jerárquico con control por tercero, la mecánica de cierre y apertura, cómo apuntar a PostgreSQL, y el patrón a seguir para agregar módulos nuevos como compras o nómina.
