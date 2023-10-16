
# Use a imagem base do Node.js com um servidor HTTP embutido (por exemplo, Nginx)
FROM node:18-alpine

# Crie um diretório para o frontend dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY package.json yarn.lock ./

# Instale as dependências do Node.js para o frontend
RUN yarn install

# Copie o resto do código fonte do frontend para o contêiner
COPY . .

CMD ["yarn", "dev"]
