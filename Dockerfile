# Use a imagem base do Node.js
FROM node:14

# Crie um diretório para o backend dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY BackPainelDadosBe/package*.json ./

# Instale as dependências do Node.js para o backend
RUN yarn

# Copie o resto do código fonte do backend para o contêiner
COPY BackPainelDadosBe/ .

# Exponha a porta do servidor Node.js (por exemplo, 3001, caso sua API utilize essa porta)
EXPOSE 3001

# Comando para iniciar o servidor Node.js (verifique qual é o comando para iniciar o servidor no seu projeto)
CMD ["yarn", "start"]
