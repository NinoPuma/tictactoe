#base de la img - node - gestor de paquetes npm - v23.11.0
FROM node:23.11.0 
 
# Set the working directory in the container
WORKDIR /app
 
# Copia solo package.json y package-lock.json primero
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the entire application code to the container
COPY . .

# Construye la aplicación
RUN npm run build


#puerto de la aplicacion
EXPOSE 3000

#comando iniciar aplicacion
CMD [ "npm", "start" ]
 

 
 
