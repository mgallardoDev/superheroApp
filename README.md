# Superheroes


## Funcionamiento General

Gestión de un litado de héroes (que estamos faltos de ellos)

con npm run start:dev, lanzamos tante el mock server como la aplicacion

## Uso de Interfaces en lugar de Clases

Para el modelo de datos, hemos optado por usar interfaces en lugar de clases. Esto es debido a que los héroes no necesitan lógica propia. Las interfaces en TypeScript nos proporcionan una forma efectiva de definir la forma de los objetos, garantizando que se cumplan ciertos contratos sin tener que implementar la lógica de una clase.

## Mock Server

La aplicación utiliza un mock server para simular llamadas a una API real. Esto nos ha permitido desarrollar y probar la aplicación sin depender de un back-end real.

## Gestión del Estado

Hemos implementado una pequeña gestión de estado en los servicios. Se decidió no utilizar soluciones más complejas como NgRx porque no era necesario para la naturaleza y el alcance de esta aplicación.

## Interceptor de Carga

Se ha implementado un interceptor que muestra un spinner de carga cada vez que hay una petición en curso. Esto mejora la experiencia del usuario al proporcionar un feedback visual mientras se espera la respuesta del servidor.

## Directiva para Capitalizar Texto

Hemos creado una directiva que se puede aplicar a los inputs de texto según lo requieran. Esta directiva se encarga de transformar el texto ingresado para que la primera letra de cada palabra esté en mayúsculas.

## Programación Reactiva

Se ha hecho un uso exhaustivo de la programación reactiva utilizando RxJS. Hemos aplicado este paradigma en prácticamente todas las partes de la aplicación que lo permitían, maximizando los beneficios de trabajar con flujos de datos asíncronos y reactivos.

## Docker

Usaremos 'docker-compose up --build' para levantar el proyecto y tendremos accesible el front en http://locahost:8081 y el back en http://locahost:3000


Desarrollado por Marco Antonio Gallardo. 

mgallardodev@gmail.com
