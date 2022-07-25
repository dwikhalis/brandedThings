## Endpoints

List of Available Endpoints:
- `GET /`
- `GET /users`
- `POST /users`
- `GET /users/:id`
- `DELETE /users/:id`
- `GET /products`
- `POST /products`
- `GET /products/:id`
- `DELETE /products/:id`

### GET /
#### Description
- Route to Landing Page

#### Response
_200 - OK_
- Body
    ```json
    {
    "message": "SUCCESS_landing"
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "ERR_userList_SERVER"
    }
    ```
==  User Route  ==
### GET /users
#### Description
- Get all user list

#### Response
_200 - OK_
- Body
    ```json
    {
    "message": "SUCCESS_userList_READ",
    "users": [
        {
            "id": Integer,
            "userName": String,
            "email": String,
            "password": String,
            "role": String,
            "phoneNumber": String,
            "address": String,
            "createdAt": Date,
            "updatedAt": Date
        },
        {
        ...
        }
      ]
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "ERR_userList_SERVER"
    }
    ```

### POST /users
#### Description
- Create a new user data

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
       "userName": String,
       "email": String,
       "password": String,
       "role": String,
       "phoneNumber": String,
       "address": String
    }
    ```

#### Response
_201 - CREATED_
- Body
    ```json
    {
       "message": "SUCCESS_userPost_CREATE",
       "user": [
          {
            "id": 8,
            "userName": String,
            "email": String,
            "password": String,
            "role": String,
            "phoneNumber": String,
            "address": String,
            "createdAt": Date,
            "updatedAt": Date
          }
       ]
    }
    ```
_400 - BAD REQUEST_
- Body
    ```json
    {
    "message": "ERR_userPost_[String]"
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "ERR_userPost_SERVER"
    }
    ```

### GET /users/:id
#### Description
- Get user details based on given id (params)

#### Response
_200 - OK_
- Body
    ```json
    {
    "message": "SUCCESS_userDetails_READ",
    "users": [
        {
            "id": Integer,
            "userName": String,
            "email": String,
            "password": String,
            "role": String,
            "phoneNumber": String,
            "address": String,
            "createdAt": Date,
            "updatedAt": Date
        },
        {
        ...
        }
      ]
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "ERR_userDetails_SERVER"
    }
    ```

### DELETE /users/:id
#### Description
- Remove a user data based on given id (params)

#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "SUCCESS_userDelete_[:id]_DELETE",
      "users": {
          "id": Integer,
          "userName": String,
          "email": String,
          "password": String,
          "role": String,
          "phoneNumber": String,
          "address": String,
          "createdAt": Date,
          "updatedAt": Date
       }
    }
    ```
_404 - NOT FOUND_
- Body
    ```json
    {
      "message": "ERR_userDelete_NULL-NOT_FOUND"
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "ERR_userDelete_SERVER"
    }
    ```

==  Product Route  ==

### GET /products
#### Description
- Get all product list

#### Response
_200 - OK_
- Body
    ```json
    {
    "message": "SUCCESS_productList_READ",
    "products": [
        {
            "id": Integer,
            "name": String,
            "description": String,
            "price": Integer,
            "stock": Integer,
            "imgUrl": String,
            "categoryId": Integer,
		    "authorId": Integer,
            "createdAt": Date,
            "updatedAt": Date
        },
        {
        ...
        }
      ]
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "ERR_productList_SERVER"
    }
    ```

### POST /products
#### Description
- Create a new product data

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
       "name": String,
       "description": String,
       "price": Integer,
       "stock": Integer,
       "imgUrl": String,
       "categoryId": Integer,
       "authorId": Integer
    }
    ```

#### Response
_201 - CREATED_
- Body
    ```json
    {
       "message": "SUCCESS_productPost_CREATE",
       "product": [
          {
            "id": Integer,
            "name": String,
            "description": String,
            "price": Integer,
            "stock": Integer,
            "imgUrl": String,
            "categoryId": Integer,
		    "authorId": Integer,
            "createdAt": Date,
            "updatedAt": Date
          }
       ]
    }
    ```
_400 - BAD REQUEST_
- Body
    ```json
    {
    "message": "ERR_productPost_[String]"
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "ERR_productPost_SERVER"
    }
    ```

### GET /products/:id
#### Description
- Get product details based on given id (params)

#### Response
_200 - OK_
- Body
    ```json
    {
    "message": "SUCCESS_productDetails_READ",
    "products": [
        {
            "id": Integer,
            "name": String,
            "description": String,
            "price": Integer,
            "stock": Integer,
            "imgUrl": String,
            "categoryId": Integer,
		    "authorId": Integer,
            "createdAt": Date,
            "updatedAt": Date
        },
        {
        ...
        }
      ]
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "ERR_productDetails_SERVER"
    }
    ```

### DELETE /products/:id
#### Description
- Remove a product data based on given id (params)

#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "SUCCESS_productDelete_[:id]_DELETE",
      "products": {
            "id": Integer,
            "name": String,
            "description": String,
            "price": Integer,
            "stock": Integer,
            "imgUrl": String,
            "categoryId": Integer,
		    "authorId": Integer,
            "createdAt": Date,
            "updatedAt": Date
       }
    }
    ```
_404 - NOT FOUND_
- Body
    ```json
    {
      "message": "ERR_productDelete_NULL-NOT_FOUND"
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "ERR_productDelete_SERVER"
    }
    ```
== Global ==
### Global Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": "Internal Server Error"
      }
    }
    ```