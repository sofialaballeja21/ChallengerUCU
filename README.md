# ChallengerUCU

Este proyecto fue desarrollado como prueba técnica de la Universidad de Concepción del Uruguay UCU. 
Su objetivo es crear un sistema compuesto de un backend basado en NestJS y un frontend basado en React.

## Para poder iniciar el proyecto es necesario  tener instalado: 
- Docker
- Docker compose
- Git

## Pasos para levantar en entrono local
- 1° Clonar repositorio. git clone git@github.com:sofialaballeja21/ChallengerUCU.git
- 2° Acceder a "cd ChallengerUCU"
- 3° Escribir "docker compose up --build" y acceder a http://localhost:5173/characters

## Extra:
 - para ver los logs del contendor ejecutar: docker logs <nombre del contendor>
 - para detener y eliminar un contenedor ejecutar: docker compose down -v
 - para listar los contenedores: docker ps


## Estructura general: 
```text
ChallengerUCU/
│
├── backend-nestjs/
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   └── character/
│   │       ├── dto/
│   │       │   ├── create-character.dto.ts
│   │       │   └── update-character.dto.ts
│   │       ├── entities/
│   │       │   └── character.entity.ts
│   │       ├── character.module.ts
│   │       ├── character.controller.ts
│   │       └── character.service.ts
│   ├── Dockerfile
│   └── package.json
│
├── frontend-react/
│   ├── src/
│   │   ├── API/
│   │   │   └── api.ts
│   │   ├── components/
│   │   │   ├── CharacterCard.tsx
│   │   │   ├── CharacterCard.css
│   │   │   ├── CharacterComponent.tsx
│   │   │   ├── CharacterComponent.css
│   │   │   ├── CharacterForm.tsx
│   │   │   └── CharacterForm.css
│   │   ├── hooks/
│   │   │   ├── CharacterHooks.ts
│   │   │   └── useCharacterForm.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── main.tsx
│   │   └── store.ts
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## Flujo de datos:
- Backend: recibe un solicitud del frontend (GET, GET{id}, POST, PUT{id}, DELETE{id}) del frontend o de una herramienta como Insomnia y devuelve el dato en formato JSON. 
- Frontend: envia una solicitud HTTP al backend.
- Base de datos: almacena los datos que provienen de la api 
"characters": "https://rickandmortyapi.com/api/character" y los almacena en una base de datos MySQL mediante TypeORM.

## Creado por:
- Laballeja Dominguez, Sofia Milagros
- Correo: laballejasofia@gmail.com
- Linkedin: www.linkedin.com/in/sofia-laballeja-a31111248
- Github: github.com/sofialaballeja21