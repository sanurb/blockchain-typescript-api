## Introducción
Este proyecto implementa una API de Blockchain simple. Utiliza tecnologías modernas como Express.js, TypeScript. La API permite a los usuarios realizar diversas operaciones relacionadas con la Blockchain, como crear billeteras, transacciones y minar bloques.

## API Endpoints

A continuación se describe cómo interactuar con la API.

### General

Todos los endpoints devuelven una respuesta en formato JSON.

#### Base URL

Todos los endpoints comienzan con `/api`.

---

### GET `/api/check`

Verifica la salud del servidor.

- **Ejemplo de respuesta**

  ```json
  {
    "message": "server running ok"
  }
  ```

---

### GET `/api/blocks`

Devuelve la cadena de bloques actual.

- **Ejemplo de respuesta**

  ```json
  [
    //array of blocks
  ]
  ```

---

### GET `/api/transactions`

Devuelve las transacciones actuales en el pool de transacciones.

- **Ejemplo de respuesta**

  ```json
  [
    {
        "timestamp": "genesis time",
        "transactions": [
        "genesis block"
        ],
        "previousHash": "genesis block",
        "hash": "53e6466e1ab65622b6afb0cf5ae9fd41bae6f5591871480184893b62a8f9fc5e",
        "nonce": 0,
        "validator": "genesis block",
        "signature": "genesis block"
    },
    {
        "timestamp": "1693249723333",
        "transactions": [],
        "previousHash": "53e6466e1ab65622b6afb0cf5ae9fd41bae6f5591871480184893b62a8f9fc5e",
        "hash": "1d92503734c58331d682b90285bc218b1d351d7879c061925e259e037711ae16",
        "nonce": 0,
        "validator": "",
        "signature": ""
    },
    {
        "timestamp": "1693249737033",
        "transactions": [],
        "previousHash": "1d92503734c58331d682b90285bc218b1d351d7879c061925e259e037711ae16",
        "hash": "9bfebd50527f1e01fd9255b6f51211bb25142f2d90c16c9afc397298f54c5a75",
        "nonce": 0,
        "validator": "",
        "signature": ""
    },
    {
        "timestamp": "1693249739049",
        "transactions": [],
        "previousHash": "9bfebd50527f1e01fd9255b6f51211bb25142f2d90c16c9afc397298f54c5a75",
        "hash": "a320155300c0ced03b3960bdcf670afb7618d0d0c696b9ded09e495384ca4151",
        "nonce": 0,
        "validator": "",
        "signature": ""
    }
  ]
  ```

---

### GET `/api/wallet`

Devuelve la primera billetera en el pool de billeteras.

- **Ejemplo de respuesta**

  ```json
  {
    "publicKey": "",
    "privateKey": "",
    "balance": ""
  }
  ```

---

### GET `/api/walletsPool`

Devuelve todas las billeteras en el pool de billeteras.

- **Ejemplo de respuesta**

  ```json
  [
    {
        "publicKey": "2eb988847570cbf7d85f8b39489e1e8c3989df535d085bd8e0854dc7e578d549",
        "privateKey": "01693246506476",
        "balance": 100,
        "secret": "1693246506476"
    },
    {
        "publicKey": "740e3777114194b2d787648e869b926408864e3e1cf30384a4eed3cb1f462546",
        "privateKey": "01693249601585",
        "balance": 100,
        "secret": "1693249601585"
    },
  ]
  ```

---

### POST `/api/transact`

Crea una nueva transacción.

- **Parámetros del cuerpo**

  ```json
  {
    "block": {
        "timestamp": "1693250364745",
        "transactions": [],
        "previousHash": "a320155300c0ced03b3960bdcf670afb7618d0d0c696b9ded09e495384ca4151",
        "hash": "ff2826906d0c3e61de1ea8c3be58b89cf34698adb7576a6579e27b1c2e5a69ce",
        "nonce": 0,
        "validator": "",
        "signature": ""
    },
    "transaction": {
        "to": "2eb988847570cbf7d85f8b39489e1e8c3989df535d085bd8e0854dc7e578d549",
        "amount": 1,
        "fee": 1
    }
  }
  ```

---

### POST `/api/newWallet`

Crea una nueva billetera.

- **Ejemplo de respuesta**

  ```json
  {
    "publicKey": "",
    "privateKey": "",
    "balance": "",
    "secret": ""
  }
  ```

---

### POST `/api/mine`

Minar un nuevo bloque.

- **Parámetros del cuerpo**

  ```json
  {
    "data": ""
  }
  ```

- **Ejemplo de respuesta**

  ```json
  {
    "data": ""
  }
  ```

---

Esta documentación del README proporciona a los desarrolladores una comprensión clara de cómo utilizar cada uno de los endpoints.

¿Hay algo más en lo que te gustaría que me concentre antes de pasar a la refactorización del código?