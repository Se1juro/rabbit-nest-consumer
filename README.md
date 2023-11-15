# Rabbit Consumer

Este proyecto es una aplicacion hibrida entre HTTP y RabbitMQ.

Su puerto principal es el `3001`.

## Requisitos

1. Una instancia de RabbitMQ, ya sea local o remota
2. Una instancia de MongoDB corriendo.

## Como correrlo

1. `npm i`

2. `npm run start:dev`

### Como se desarrollo

Se creo primeramente un modulo llamado `users`, el cual contiene los servicios, repositorios y controladores para el manejo de los mensajes entrantes.

El archivo `main.ts` contiene el punto de entrada a al aplicacion, aca se realiza la conexion a RabbitMQ.

Se prioriza que las colas sean persistentes aunque se reinicie rabbitMQ y se indica que el `ACK` va a ser manual para no perder mensajes que han entrado pero no se han procesado al perder conexion con el consumer.

El controller de users contiene dos puntos de entrada mediante mensajes y uno por peticion HTTP.

El punto de entrada por peticion HTTP extrae los datos de los usuarios creados en MongoDB.

El evento que se encarga de crear los usuarios recibe un payload llamado message, de tipo `string`, el cual es un Json llevado string.

Al parsear este JSON, vemos que contiene siempre dos elementos, un id, que es un uid generado en el producer y el nombre del usuario a crear.

`get-all-users` funciona de la misma manera, pero no recibe un payload, simplemente recibe el mensaje, lo procesa y le confirma al producer que fue exitoso y retorna la lista de usuarios.
