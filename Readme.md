# E-commerce Full Stack

## Grupo 4
Ismael Freire
Jorge Torres
Alexis Vasco

Este proyecto es una aplicación web de comercio electrónico desarrollada para poner en práctica conceptos de ingeniería de software y desarrollo web. El sistema consta de una API RESTful en el backend y una interfaz de usuario dinámica en el frontend, logrando un flujo completo desde el registro de usuarios hasta el procesamiento de compras.

## 🛠️ Tecnologías Utilizadas

**Backend (Servidor y API)**
* **Lenguaje:** C# (.NET 8)
* **Base de Datos:** PostgreSQL
* **Seguridad:** BCrypt (Encriptación de contraseñas)
* **Pruebas y Documentación:** Swagger

**Frontend (Interfaz de Cliente)**
* **Core:** React con TypeScript
* **Enrutamiento:** React Router Dom
* **Peticiones HTTP:** Axios
* **Estilos:** Styled-components y Material UI (MUI)
* **Gestión de Estado:** Context API

## 📋 Requisitos Previos

Para ejecutar este proyecto de forma local, es necesario tener instalado:
* [Node.js](https://nodejs.org/)
* [.NET 8 SDK](https://dotnet.microsoft.com/download)
* [PostgreSQL](https://www.postgresql.org/)

## 🚀 Instrucciones de Ejecución

### 1. Configurar el Backend

1. Abre una terminal y navega a la carpeta del backend (`Ecommerce.API`).
2. Revisa el archivo `appsettings.json` y actualiza la cadena de conexión (`DefaultConnection`) con tu usuario y contraseña de PostgreSQL.
3. Aplica las migraciones para generar la base de datos y las tablas correspondientes:
```bash
     dotnet ef database update
```
4. Inicia el servidor local:
```bash
    dotnet run
```
5. Abre una nueva terminal y navega a la carpeta del frontend (ecommerce).

Instala las dependencias necesarias:
```bash
    npm install
```
6. Inicia la aplicación de React:
```bash
    npm start
```

# Funcionalidades Principales

Catálogo de Productos: Interfaz conectada a la base de datos para mostrar los artículos disponibles.

Carrito de Compras: Gestión del estado global para agregar productos, ajustar cantidades y calcular totales en tiempo real.

Autenticación: Sistema de registro e inicio de sesión de usuarios con validación de credenciales.

Historial de Usuario: Panel de perfil donde cada cliente puede revisar sus recibos y órdenes pasadas.

Diseño Adaptativo: Interfaz modular con soporte para alternar entre Modo Claro y Modo Oscuro.
