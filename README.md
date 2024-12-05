README.md
# Guía de Instalación y Despliegue

Esta es la orientación para instalar y poner en marcha el proyecto que incluye un frontend en React JS y un backend en.NET Core 8. Sigue las instrucciones siguientes para activar la aplicación.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- **Node.js v23.3.0** (para ejecutar el frontend en React)
- **Visual Studio 2022** o superior (para el backend en .NET Core 8)
- **.NET Core 8 SDK**
- **Git** (para clonar el repositorio)

## Clonación del Repositorio

1. Clona el repositorio utilizando Git:

    ```bash
    https://github.com/leydijo/InventarioManufactura.git
    ```

2. Navega a la carpeta del proyecto:

    ```bash
    cd InventarioManufactura
    ```

## Instalación y Ejecución del Frontend (React JS)

### Paso 1: Navegar a la carpeta del frontend

1. Dentro del proyecto clonado, navega a la carpeta del frontend:

    ```bash
    cd FrontIventory/appcrud
    ```

### Paso 2: Instalar dependencias

2. Instala las dependencias necesarias usando **npm**:

    ```bash
    npm install
    ```

### Paso 3: Configurar la URL de la API

3. Dentro de la carpeta del frontend FrontIventory/appcrud/src/settings, encuentra el archivo `appsettings.json` (ubicado en la carpeta raíz del frontend). Asegúrate de que la URL de la API del backend esté configurada correctamente:

    ```json
    {
      "apiUrl": "http://localhost:5000/api"
    }
    ```

    Asegúrate de reemplazar la URL con la ruta correcta del backend.

### Paso 4: Iniciar el servidor de desarrollo

4. Ejecuta el servidor de desarrollo para levantar el frontend:

    ```bash
    npm run dev
    ```

5. Accede al frontend abriendo tu navegador y visitando `http://localhost:3000`.

## Instalación y Ejecución del Backend (.NET Core 8)

### Paso 1: Abrir el proyecto en Visual Studio

1. Abre **Visual Studio 2022**.
2. Selecciona **Abrir un Proyecto/Solución**.
3. Navega a la carpeta del backend dentro del proyecto clonado y abre la solución (`.sln`).

### Paso 2: Instalar dependencias de NuGet

El backend ya tiene las dependencias necesarias incluidas en el archivo `.csproj`, pero asegúrate de que todos los paquetes NuGet estén instalados y actualizados. Para hacer esto:

1. Abre la consola de **Package Manager** en Visual Studio.
2. Ejecuta el siguiente comando para restaurar los paquetes NuGet:

    ```bash
    dotnet restore
    ```

### Paso 3: Configurar la conexión a la base de datos

Dentro del archivo `appsettings.json` en el backend, asegúrate de que los valores para la cadena de conexión de la base de datos y JWT estén configurados correctamente:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=Localhost;Database=ManagementInventoryDB;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "JwtSettings": {
    "SecretKey": "tu_clave_secreta",
    "Issuer": "tu_issuer",
    "Audience": "tu_audience",
    "ExpirationMinutes": 60
  }
}
