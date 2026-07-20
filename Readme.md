# CompoColtis - E-commerce Full Stack

Este proyecto es una aplicación web de comercio electrónico desarrollada para poner en práctica conceptos de ingeniería de software. El sistema consta de una API RESTful en el backend y una interfaz de usuario dinámica en el frontend, logrando un flujo completo desde el registro de usuarios hasta el procesamiento de compras.

## 🛠️ Tecnologías Utilizadas

**Backend (Servidor y API)**
* **Lenguaje:** C# (.NET 8)
* **Base de Datos:** PostgreSQL
* **ORM:** Entity Framework Core
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