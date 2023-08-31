# Use a imagem base do Node.js
FROM node:18-alpine

# Crie um diretório para o backend dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY package.json yarn.lock ./

# Instale as dependências do Node.js para o backend
RUN yarn install

# Copie o resto do código fonte do backend para o contêiner
COPY . .

# Exponha a porta do servidor Node.js (por exemplo, 3001, caso sua API utilize essa porta)
EXPOSE 3001

# Comando para iniciar o servidor Node.js (verifique qual é o comando para iniciar o servidor no seu projeto)
CMD ["yarn", "dev"]
