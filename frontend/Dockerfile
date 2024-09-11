# frontend/Dockerfile

# Usar una imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y el lockfile (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código de la aplicación
COPY ./src /app/src
COPY ./public /app/public

# Compilar la aplicación
RUN npm run build

# Exponer el puerto en el que correrá la aplicación
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "start"]
