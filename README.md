#  Sistema de cadastro de motoristas

Sistema para gerenciar os motorista e seus veículos.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

* [Docker](https://www.docker.com/)
* [Docker compose](https://docs.docker.com/compose/install/)
* [Git](https://git-scm.com/)
* [Repositório](https://github.com/JadisDev/driver-front)

### 🔧 Instalação

Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.

Va até onde deseja instalar o projeto e baixe o código fonte

```
git clone git@github.com:JadisDev/driver-front.git
```

Entre no diretório:

```
cd driver-front
```

Construa as imagens do sistema com comando:

```
docker-compose build
```

Subir as imagens do sistema com comando:

```
docker-compose up
```

Acesse o seu navegador:

```
http://localhost:3000/
```

![image](https://github.com/JadisDev/driver-front/assets/20782995/fa9102ea-3ee3-4d58-9a24-2dca9fee1d68)

## ⚙️ Executando os testes

Os testes unitários são uma prática de desenvolvimento de software em que pequenas partes de código, chamadas unidades, são testadas de forma isolada.

O sistema tem alguns testes unitários. Para executar e ver a cobertura de teste rode o comando de dentro do container driver-front-app

Execute o comando, exemplo:

```
docker exec -it 8bdeef82353c bash
```
Depois:

```
yarn test
```
Saída:

![image](https://github.com/JadisDev/driver-front/assets/20782995/45fc1414-f1a8-478f-9deb-1ed59d613ec7)

## 🛠️ Construído com

Ferramentas usadas no projeto

* [Reactjs](https://react.dev/) - Lib
* [Bootstrap react](https://react-bootstrap.github.io/getting-started/introduction) - Lib
* [Jest](https://jestjs.io/docs/tutorial-react) - Usada para testar

## ✒️ Autor

* **Desenvolvedor responsável** [Jadis Jale](https://github.com/JadisDev)


---
⌨️ com ❤️ por [Jadis Jale](https://github.com/JadisDev) 😊
