<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    
# API-COMPRAS

## Sobre este projeto

Este projeto tem por principal objetivo o desenvolvimento de uma api de compras que será consumida pelo front-emd commerce suite, disponivel em: https://github.com/matheusgit1/commerce-suit


## Autores

- [Matheus Alves Pereira](https://www.linkedin.com/in/matheus-alves-pereira-4b3781222/)

## Stack utilizada


**Back-end:**
Node,
Express,
nestjs,
typescript,
javascrip,
aws,
Sql,
banco de dados postgress

**Ferramentas de teste:**
jest, postman




## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

no diretorio raíz copie e cole as chaves do arquivo ".env.example" em seu ".env" com os valores adequados

- exemplo
PORT = 3000



## Rodando localmente

### requisitos

nodejs na versao 15.x ou superior

pode ser baixado aqui: https://nodejs.org/pt-br/download/

verifique se o node foi instalado corretamente com o seguinte comendo no cmd ou powerShell

```bash
  node --version
```
#### em caso de comando não reconheciod, reinicie seu computador

#### baixe o aplicativo "expo" na playstore ou apple store.


####  (opcional) instale o yarn para o usar a cli do yarn
no seu cmd ou powerShell use o comando


```bash
  npm install yarn --global
```
verifique se o yarn foi instalado corretamente com o seguinte comendo no cmd ou powerShell

```bash
  yarn --version
```

Clone o projeto com o  seguinto comando no cmd, powerShell, wsl ou qualquer gerenciador
de sub sistemas de sua preferência


```bash
  git clone https://github.com/matheusgit1/api-compras.git
```

Entre no diretório do projeto

```bash
  cd api-compras
```

Instale as dependências

```bash
  yarn install
```

ou

```bash
  npm install
```

Inicie o servidor

```bash
  yarn start:dev
```
ou

```bash
  npm run yarn start:dev
```

## Condições iniciais

#### para o funcionamento adequado é necessario que suas variaveis de ambientes estejam corretas


# API-COMPRAS

a collection postman dessa api está disponivel dentro desse repositório: em: https://github.com/matheusgit1/api-compras/blob/main/purchases.api.collection

### variaveis

#### URL_API_COMPRAS: variavel onde a api estará rodando localmente

#### TOKEN: token de atuenticação (você só consegue ele na rota de login da api de autenticação)

### Retornos padronizados

status 400 - Bad request

status 404 - Recurso não encontrado

status 500 - erro interno

stauts 200 - ok

## Rotas


#### Criar um novo recurso no contexto de compras

```http
  POST /purchase/insert
```


| Headers   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. token de autenticação|


| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `productId` | `string` | **Obrigatório**. id de produto|
| `installments` | `number` | **Obrigatório**. parcelas|
| `amount` | `string` | **Obrigatório**.  quantidade|
| `adressId` | `array de string` | **Obrigatório**.  id de endereço|
| `creditCard` | `string` | **Obrigatório**.  credit card |
| `mouth` | `number` | **Obrigatório**.  mes de expiração do cartão| 
| `expYear` | `expYear` | **Obrigatório**.  ano de expiração do cartão | 
| `cvc` | `number` | **Obrigatório**.  códgo do cartão | 

#### retorna status 201 caso tudo esteja certo


#### Adiciona produor ao carrinho de compra

```http
  POST /purchase/cart/insert
```


| Headers   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. token de autenticação|


| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `productId` | `string` | **Obrigatório**. id de produto|
| `quantity` | `number` | **Obrigatório**. quantidades no carrinho|


#### retorna status 201 caso tudo esteja certo

#### Remove recurso do carrinho de compras

```http
  DELETE /purchase/cart/remove
```


| Headers   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. token de autenticação|


| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `productId` | `string` | **Obrigatório**. id de produto|


#### retorna status 201 caso tudo esteja certo


#### Recupera dados do carrinho

```http
  GET /purchase/cart/list
```


| Headers   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. token de autenticação|


#### retorna status 201 caso tudo esteja certo com o seguinte formato

```JSON
[
    {
        "id": "d040c410-fe28-442b-a948-f9459123003c",
        "co_product_id": "98d58bbc-5dcd-43b5-83d6-c1c09cc23ff8",
        "co_user_id": "95805cfe-8bab-4e30-a7ff-42600835cc34",
        "co_created_at": "2022-09-05T18:39:38.780Z",
        "co_updated_at": "2022-09-05T18:39:38.780Z",
        "co_quantity": 4
    },
    {
        "id": "83cfeed6-d326-4859-a94f-2f125db9711b",
        "co_product_id": "98d58bbc-5dcd-43b5-83d6-c1c09cc23ff8",
        "co_user_id": "95805cfe-8bab-4e30-a7ff-42600835cc34",
        "co_created_at": "2022-09-05T18:46:34.788Z",
        "co_updated_at": "2022-09-05T18:46:34.788Z",
        "co_quantity": 4
    },
    ...
]
```

#### Recupera dados do carrinho

```http
  GET /purchase/cart/list
```


| Headers   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. token de autenticação|


#### retorna status 201 caso tudo esteja certo com o seguinte formato

```JSON
[
    {
        "id": "d040c410-fe28-442b-a948-f9459123003c",
        "co_product_id": "98d58bbc-5dcd-43b5-83d6-c1c09cc23ff8",
        "co_user_id": "95805cfe-8bab-4e30-a7ff-42600835cc34",
        "co_created_at": "2022-09-05T18:39:38.780Z",
        "co_updated_at": "2022-09-05T18:39:38.780Z",
        "co_quantity": 4
    },
    {
        "id": "83cfeed6-d326-4859-a94f-2f125db9711b",
        "co_product_id": "98d58bbc-5dcd-43b5-83d6-c1c09cc23ff8",
        "co_user_id": "95805cfe-8bab-4e30-a7ff-42600835cc34",
        "co_created_at": "2022-09-05T18:46:34.788Z",
        "co_updated_at": "2022-09-05T18:46:34.788Z",
        "co_quantity": 4
    },
    ...
]
```

#### Recupera dados do carrinho em detalhes maiores

```http
  GET /purchase/cart/list
```


| Headers   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. token de autenticação|


#### retorna status 201 caso tudo esteja certo com o seguinte formato

```JSON
[
    {
        "id": "83cfeed6-d326-4859-a94f-2f125db9711b",
        "co_created_at": "2022-09-05T18:46:34.788Z",
        "co_updated_at": "2022-09-05T18:46:34.788Z",
        "co_product_name": "PALETA DE SOMBRAS",
        "co_product_price": "359",
        "co_product_description": "maquiagem e paleta de sombras",
        "co_product_categories": [
            "make",
            "make-up",
            "maquiagem",
            "sombras",
            "feminino"
        ],
        "co_product_main_categories": "maquiagem",
        "co_product_installments": "10",
        "co_product_images": [
            "https://sdcdn.io/mac/br/mac_sku_SGF701_1x1_0.png?width=1080&height=1080",
            "https://sdcdn.io/mac/br/mac_sku_SGF701_1x1_1.png?width=1080&height=1080",
            "https://sdcdn.io/mac/br/mac_sku_SGF701_1x1_6.png?width=1080&height=1080"
        ],
        "co_user_id": "95805cfe-8bab-4e30-a7ff-42600835cc34",
        "co_product_discount": "0",
        "co_product_marc": "NUDE MODEL",
        "co_product_conditions": "novo",
        "co_product_features": [
            {
                "title": "gerais",
                "body": {
                    "marca": "NUDE MODEL"
                }
            }
        ],
        "co_is_product_active": true,
        "co_five_stars": null,
        "co_four_stars": null,
        "co_three_stars": null,
        "co_two_stars": null,
        "co_one_stars": null,
        "co_zero_stars": "0",
        "co_product_seller": "DEFAULT",
        "co_product_stocks": "5",
        "co_product_id": "98d58bbc-5dcd-43b5-83d6-c1c09cc23ff8",
        "co_quantity": 4
    },
    {
        "id": "d040c410-fe28-442b-a948-f9459123003c",
        "co_created_at": "2022-09-05T18:39:38.780Z",
        "co_updated_at": "2022-09-05T18:39:38.780Z",
        "co_product_name": "PALETA DE SOMBRAS",
        "co_product_price": "359",
        "co_product_description": "maquiagem e paleta de sombras",
        "co_product_categories": [
            "make",
            "make-up",
            "maquiagem",
            "sombras",
            "feminino"
        ],
        "co_product_main_categories": "maquiagem",
        "co_product_installments": "10",
        "co_product_images": [
            "https://sdcdn.io/mac/br/mac_sku_SGF701_1x1_0.png?width=1080&height=1080",
            "https://sdcdn.io/mac/br/mac_sku_SGF701_1x1_1.png?width=1080&height=1080",
            "https://sdcdn.io/mac/br/mac_sku_SGF701_1x1_6.png?width=1080&height=1080"
        ],
        "co_user_id": "95805cfe-8bab-4e30-a7ff-42600835cc34",
        "co_product_discount": "0",
        "co_product_marc": "NUDE MODEL",
        "co_product_conditions": "novo",
        "co_product_features": [
            {
                "title": "gerais",
                "body": {
                    "marca": "NUDE MODEL"
                }
            }
        ],
        "co_is_product_active": true,
        "co_five_stars": null,
        "co_four_stars": null,
        "co_three_stars": null,
        "co_two_stars": null,
        "co_one_stars": null,
        "co_zero_stars": "0",
        "co_product_seller": "DEFAULT",
        "co_product_stocks": "5",
        "co_product_id": "98d58bbc-5dcd-43b5-83d6-c1c09cc23ff8",
        "co_quantity": 4
    },
    ...
]
```

#### atualiza dados do carrinho

```http
  PATCH /purchase/cart/patch
```


| Headers   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. token de autenticação|

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `productId` | `string` | **Obrigatório**. id de produto|
| `quantity` | `number` | **Obrigatório**. qunatia no carrinho|


#### retorna status 200 caso tudo esteja certo



#### Recupera lsta de compras já feita pelo usuario

```http
  GET /purchase/list/:pagination
```


| Headers   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. token de autenticação|


| params   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `pagination` | `number` | **Obrigatório**. paginação|


#### retorna status 20o caso tudo esteja certo com o seguinte formato

```JSON
[
    {
        "id": "e34c4f39-e757-48b6-94e5-8be4f989f485",
        "co_product_name": "BASE FLUÍDA STUDIO FIX COM FPS 15",
        "co_product_price": "239",
        "co_product_description": "",
        "co_product_categories": [
            "make",
            "make-up",
            "maquiagem",
            "sombras",
            "feminino",
            "base"
        ],
        "co_product_main_categories": "maquiagem",
        "co_product_installments": "3",
        "co_product_images": [
            "https://sdcdn.io/mac/br/mac_sku_M6JC04_1x1_3.png?width=1080&height=1080",
            "https://sdcdn.io/mac/br/mac_sku_M6JC04_1x1_2.png?width=1080&height=1080",
            "https://sdcdn.io/mac/br/mac_sku_M6JC04_1x1_0.png?width=1080&height=1080"
        ],
        "co_user_id": "95805cfe-8bab-4e30-a7ff-42600835cc34",
        "co_product_discount": "0",
        "co_product_marc": "MAC",
        "co_product_conditions": "novo",
        "co_product_features": {
            "title": "gerais",
            "body": {
                "marca": "MAC"
            }
        },
        "co_product_seller": "DEFAULT",
        "co_five_stars": null,
        "co_four_stars": null,
        "co_three_stars": null,
        "co_two_stars": null,
        "co_one_stars": null,
        "co_zero_stars": "0",
        "co_created_at": "2022-08-30T18:51:00.364Z",
        "co_updated_at": "2022-08-30T18:51:00.364Z",
        "co_product_seller_id": "0c5351a7-7aed-42bb-a992-40b414692929",
        "co_produdct_installment_price": "79.66",
        "co_product_id": "3c77a8cd-b2ca-4208-8ccb-a50465d17cbd",
        "co_purchase_total": "478",
        "co_purchase_amount": "2"
    },
    ...
]
```






