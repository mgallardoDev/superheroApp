# Superheroes


## Funcionamiento General

Gestión de un litado de héroes (que estamos faltos de ellos)

con 'npm run start:dev', lanzamos tanto el mock server como la aplicación

## Versiones

He utilizado la version 15LST de angular ya que era la mas alta que indicaba LST, ya que la 16 aun no esta etiquetada como tal.
## Uso de Interfaces en lugar de Clases

Para el modelo de datos, he optado por usar interfaces en lugar de clases. Esto es debido a que los héroes no necesitan lógica propia. Las interfaces en TypeScript nos proporcionan una forma efectiva de definir la forma de los objetos, garantizando que se cumplan ciertos contratos sin tener que implementar la lógica de una clase.

## Mock Server

La aplicación utiliza un mock server para simular llamadas a una API real. Esto nos ha permitido desarrollar y probar la aplicación sin depender de un back-end real.

## Gestión del Estado

He implementado una pequeña gestión de estadon usando RxJS en los servicios. decidí no utilizar soluciones más complejas como NgRx porque no era necesario para la naturaleza y el alcance de esta aplicación.

## Interceptor de Carga

Se ha implementado un interceptor que muestra un spinner de carga cada vez que hay una petición en curso de creación o edición. Esto mejora la experiencia del usuario al proporcionar un feedback visual mientras se espera la respuesta del servidor. Para poder apreciarlo he configurado en delay en las respuestas del servidor de 500 ms.

## Directiva para Capitalizar Texto

He creado una directiva que se puede aplicar a los inputs de texto según se requieran. Esta directiva se encarga de transformar el texto ingresado para que la primera letra de cada palabra esté en mayúsculas.

## Validación de formulario

Se han añadido validadores a los tres campos de los dos formularios. En todos los casos, los campos son obligatorios y deben tener un mínimo de tres letras. Cada palabra debe comenzar con una letra, puede contener guiones en medio, pero no se permiten más de uno consecutivo, y cada palabra debe tener un mínimo de tres caracteres.

Además, para el formulario de creación, se ha creado un validador personalizado asíncrono que realiza una llamada al backend para comprobar si ya existe una combinación de nombre y alias idéntica en la base de datos.

## Programación Reactiva

Se ha hecho un uso exhaustivo de la programación reactiva utilizando RxJS. Hemos aplicado este paradigma en prácticamente todas las partes de la aplicación que lo permitían, maximizando los beneficios de trabajar con flujos de datos asíncronos y reactivos.

## Test

Se ha generado una bateria de tests que cubren gran parte del comportamiento y funcionalidades tanto del HeroService como del HeroComponet y sus tres componentes hijos. 

## Docker

Usaremos 'docker-compose up --build' para levantar el proyecto y tendremos accesible el front en http://locahost:8081 y el back en http://locahost:3000


Desarrollado por Marco Antonio Gallardo. 

mgallardodev@gmail.com
