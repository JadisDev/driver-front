# Usar uma imagem base com o Node.js 16
FROM node:16

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos package.json e yarn.lock para o diretório de trabalho
COPY ./package.json  ./

# Instalar as dependências do projeto
RUN yarn install

# Copiar todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Executar o comando de build do React.js
RUN yarn build

# Expor a porta 3000 (ou a porta que você usa para executar a aplicação React.js)
EXPOSE 3000

# Comando para iniciar o servidor web da aplicação React.js
CMD ["yarn", "start"]