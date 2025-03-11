# Proyecto - Lista de Usuarios
Esta aplicación web es un proyecto desarrollado en PHP v8.0.30 usando Slim Framework para el consumo de una API Externa (reqres.in) y desplegar la data en pantalla.

## Herramientas utilizadas
- PHP 8.0.30
- Slim Framework 4.10
- Bootstrap 5
- jQuery 3.7.1

## Funcionalidades
- Listado en pantalla de usuarios desde API externa.
- Paginación y ordenamiento de usuarios (ascendente, descendente).
- Búsqueda de usuarios por nombre y correo.
- Exportación en formato CSV de la data de usuarios.
- Modal con detalle del usuario.

## Instalación y Configuración
1. Clonar el repositorio:  
git clone https://github.com/ricardoeng/listado-usuarios.git

2. Instalar dependencias con composer:
composer install

3. Arranque servidor PHP:
php -S localhost:8080 -t public

4. Ver aplicativo:
abrir en navegador http://localhost:8080/index.html

## Validación de Endpoint API externa
- En el navegador abrir la siguiente url: http://localhost:8080/listaUsuarios
  
## Créditos
- Developer: Ricardo Norambuena


