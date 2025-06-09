# Proyecto de delivery Tambo para Los Olivos

![Logo de tambo](https://marketing-peru.beglobal.biz/wp-content/uploads/2024/11/logo-tambo.png)

## Vista Previa

### Página principal

- ![alt text](docs/image-22.png)

### Página de inicio de sesión

- ![alt text](docs/image-23.png)

### Página de registro

- ![alt text](docs/image-24.png)

### Página para restablecer contraseña

- ![alt text](docs/image-25.png)

### Página para el carrito

- ![alt text](docs/image-26.png)

### Página del perfil de usuario

- ![alt text](docs/image-27.png)

## ☕ Requisitos para el proyecto

Antes de compilar y ejecutar este backend y fronted, asegúrate de tener instalado y configurado lo siguiente:

### ✅ Java 21

Spring Boot 3.4.5 requiere **Java 21**. Puedes descargarlo desde el sitio oficial de Oracle o utilizar una distribución alternativa como OpenJDK (Adoptium).

#### 🔧 Configurar JAVA_HOME

1. Verifica que Java esté instalado:

```bash
java -version
```

2. Configura la variable de entorno `JAVA_HOME`:

**Linux/macOS:**

Agrega a tu archivo `~/.bashrc`, `~/.zshrc` o similar:

```bash
export JAVA_HOME=/ruta/a/java-21
export PATH=$JAVA_HOME/bin:$PATH
```

**Windows:**

- Ve a _Configuración del sistema > Variables de entorno_.
- Crea una nueva variable `JAVA_HOME` apuntando al directorio de instalación de Java.
- Agrega `%JAVA_HOME%\bin` a la variable `Path`.

#### 🎥 Tutorial en YouTube

[![Tutorial en YouTube](https://i.ytimg.com/vi/4WKo13f2Qpc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA1KS4sC5u_qWUKkSEsAETT3ySk_Q)](https://www.youtube.com/watch?v=4WKo13f2Qpc)

### 📦 Maven

Maven es el sistema de construcción utilizado para compilar y gestionar dependencias del proyecto Spring Boot.

#### 📥 Instalar Maven

Puedes descargar Maven desde: https://maven.apache.org/download.cgi

Verifica la instalación con:

```bash
mvn -version
```

#### 🔧 Configurar MAVEN_HOME

**Linux/macOS:**

```bash
export MAVEN_HOME=/ruta/a/maven
export PATH=$MAVEN_HOME/bin:$PATH
```

**Windows:**

- Agrega `MAVEN_HOME` como variable de entorno.
- Añade `%MAVEN_HOME%\bin` al `Path`.

#### 🎥 Tutorial en YouTube

[![Tutorial en YouTube](https://i.ytimg.com/vi/Rb1hViGAceE/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLATGtWEjSEf5_PhGGcLQYIe2xLqWQ)](https://www.youtube.com/watch?v=Rb1hViGAceE)

### 🟢 Node.js y npm

Node.js es un entorno de ejecución para JavaScript en el servidor. npm es su sistema de gestión de paquetes.

- Descarga e instala desde: [https://nodejs.org/](https://nodejs.org/)
- Verifica la instalación:

```bash
node -v
npm -v
```

#### 🎥 Tutorial en YouTube

[![Tutorial en YouTube](https://i.ytimg.com/vi/iMStDdk5alg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCh7hOh7ckb3Mx-QXB1gtuKafgWEQ)](https://youtu.be/iMStDdk5alg)

### 🐬 Servidor MySQL

Necesitas tener un servidor MySQL en funcionamiento para poder almacenar y consultar datos desde la aplicación.

- Descarga e instala desde: [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
- Durante la instalación, configura un usuario y contraseña (por defecto suele ser `root` con una contraseña definida por ti).
- Sugerencia: Establecer como nombre de usuario `root` y contraseña `root`, o de lo contrario, puedes cambiar la propiedad en `Backend\src\main\resources\application.properties` y cambiar en:

  - ![alt text](docs/image-17.png)

### 🧰 MySQL Workbench (opcional pero recomendado)

MySQL Workbench es una herramienta visual para gestionar tu base de datos MySQL.

- Descárgalo desde: [https://dev.mysql.com/downloads/workbench/](https://dev.mysql.com/downloads/workbench/)
- Te permite visualizar tablas, ejecutar consultas y administrar el servidor fácilmente.

#### 🎥 Tutorial en YouTube

[![Tutorial en YouTube](https://i.ytimg.com/vi/EmQZt6o6-78/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD3vQsudGihNcMGDWSsyhmPVk8awQ)](https://youtu.be/EmQZt6o6-78)

## 🗄️ Configuración de la Base de Datos

Este proyecto requiere una base de datos llamada `tambo_bd`.

### 📌 Paso 1: Crear la base de datos

Asegúrate de tener instalado un motor la base de datos **MySQL**. Luego, crea la base de datos ejecutando el siguiente comando en tu cliente de base de datos:

#### Ejemplo en MySQL:

```sql
CREATE DATABASE tambo_bd;
```

- ![alt text](docs/image-12.png)
- ![alt text](docs/image-14.png)
- ![alt text](docs/image-15.png)
- ![alt text](docs/image-16.png)

## Extensiones para VSCode

1. Extension Pack for Java

- ![alt text](docs/image-10.png)

2. Spring Boot Tools

- ![alt text](docs/image-11.png)

## 📦 Instalación de dependencias esenciales para REACT

Este proyecto utiliza varias librerías fundamentales para manejar enrutamiento, estado global, autenticación y llamadas HTTP. A continuación se detallan las dependencias requeridas y cómo instalarlas con `npm`.

### 🔗 Axios

Cliente HTTP para realizar peticiones al backend.

```bash
npm install axios
```

### 🚦 React Router DOM

Manejo del enrutamiento en la aplicación React.

```bash
npm install react-router-dom
```

### 🧠 React Redux

Integración de Redux con React para manejo de estado global.

```bash
npm install react-redux
```

### 🛠️ Redux Toolkit

Conjunto de utilidades recomendadas para escribir lógica Redux de forma más eficiente y segura.

```bash
npm install @reduxjs/toolkit
```

### 🔐 JWT Decode

Decodificador de tokens JWT del lado del cliente.

```bash
npm install jwt-decode
```

> ✅ **Requisito importante:** Asegúrate de estar utilizando **React 18 o superior** para que `createRoot` desde `react-dom/client` funcione correctamente.

```js
import { createRoot } from "react-dom/client";
```

## 🛠️ Instalación del Proyecto

1. Clona este repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

o desde VsCode

- ![alt text](docs/image.png)

## ▶️ Ejecución del Proyecto

Para evitar problemas con la terminal, abrir visual studio code como `Administrador`

### Backend

1. Abre el terminal en vscode con `Ctrl + ñ`
2. Abre `Command Prompt`
   - ![alt text](docs/image-1.png)
3. Ubicarte en el Backend `cd Backend`
   - ![alt text](docs/image-5.png)
4. Ejecutar spring

   ```bash
   mvn spring-boot:run
   ```

### Fronted

1. Abre otro terminal en vscode con `Ctrl + ñ`
2. Abre `Command Prompt`
   - ![alt text](docs/image-1.png)
3. Ubicarte en el Fronted `cd Fronted`
   - ![alt text](docs/image-3.png)
4. Instalar las dependencias

   ```bash
   npm install
   ```

5. Ejecutar react con vite

   ```bash
   npm run dev
   ```

## 🧪 Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo.
- `npm run build`: Compila el proyecto para producción.

---
