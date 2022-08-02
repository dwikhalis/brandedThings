## Endpoints

List of Available Endpoints:
### Users Route
- `GET /`
- `GET /users`
- `POST /users/signup`
- `POST /users/login`
- `GET /users/:id`

### Products Route
- `GET /products`
- `POST /products`
- `GET /products/categories`
- `GET /products/:id`
- `PUT /products/:id`
- `PATCH /products/:id`
- DEPRECETED - `DELETE /products/:id` 

###  <<< `===  Users Route  ===` >>>

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
    "message": "Internal Server Error"
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
    "message": "Internal Server Error"
    }
    ```

### POST /users/signup
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
       "message": "User [ ${userName} ] succesfully created",
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
    "message": "SequelizeUniqueConstraintError"
    }
    ```
    ```json
    {
    "message": "SequelizeValidationError"
    }
    ```
    ```json
    {
    "message": "SequelizeDatabaseError"
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "Internal Server Error"
    }
    ```

### POST /users/login
#### Description
- Authenticate user data when login

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
       "userNameOrEmail": String,
       "password": String,
    }
    ```

#### Response
_200 - OK_
- Body
    ```json
    {
       "message": "SUCCESS_userLogin",
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
    "message": "userNameOrEmailRequired"
    }
    ```
    ```json
    {
    "message": "passwordRequired"
    }
    ```
_401 - NOT AUTHORIZED_
- Body
    ```json
    {
    "message": "InvalidCredentials"
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
_404 - NOT FOUND_
- Body
    ```json
    {
    "message": "UserNotFound"
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "Internal Server Error"
    }
    ```

###  <<< `===  Products Route  ===` >>>

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
            "status": String,
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
    "message": "Internal Server Error"
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
       "authorId": Integer,
       "status": String,
    }
    ```

#### Response
_201 - CREATED_
- Body
    ```json
    {
       "message": "Product [${product_name}] with id [${product_id}] succesfully updated by [${product_updatedBy}]",
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
            "status": String,
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
    "message": "SequelizeUniqueConstraintError"
    }
    ```
    ```json
    {
    "message": "SequelizeValidationError"
    }
    ```
    ```json
    {
    "message": "SequelizeDatabaseError"
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "Internal Server Error"
    }
    ```

### GET /products/categories
#### Description
- Get all category list

#### Response
_200 - OK_
- Body
    ```json
    {
    "message": "SUCCESS_categoryList_READ",
    "products": [
        {
            "id": Integer,
            "name": String
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
    "message": "Internal Server Error"
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
    "users": [
        {
            "id": Integer,
            "name": String,
            "description": String,
            "price": Integer,
            "stock": Integer,
            "imgUrl": String,
            "categoryId": Integer,
		    "authorId": Integer,
            "status": String,
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
    "message": "ParamsIdNotValid"
    }
    ```
_404 - NOT FOUND_
- Body
    ```json
    {
    "message": "ProductNotFound"
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "Internal Server Error"
    }
    ```

### PUT /products/:id
#### Description
- Update product data based on given id (params)

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
       "authorId": Integer,
       "status": String,
    }
    ```

#### Response
_200 - OK_
- Body
    ```json
    {
       "message": "Product [${product_name}] with id [${product_id}] succesfully updated by [${product_updatedBy}]",
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
            "status": String,
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
    "message": "ProductNotFound"
    }
    ```
    ```json
    {
    "message": "SequelizeUniqueConstraintError"
    }
    ```
    ```json
    {
    "message": "SequelizeValidationError"
    }
    ```
    ```json
    {
    "message": "SequelizeDatabaseError"
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "Internal Server Error"
    }
    ```

### PATCH /products/:id
#### Description
- Change product status on given id (params)

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
       "status": String,
    }
    ```

#### Response
_200 - OK_
- Body
    ```json
    {
       "message": "Product [${product_name}] with id [${product_id}] status has been updated from [${readProduct.status}] into [${product_status}]",
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
            "status": String,
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
    "message": "ProductNotFound"
    }
    ```
    ```json
    {
    "message": "SameStatus"
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "Internal Server Error"
    }
    ```

### DEPRECETED [ DELETE /products/:id ]
#### Description
- Remove a product data based on given id (params)

#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "Product id [${productId}] succesfully deleted",
      "products": {
            "id": Integer,
            "name": String,
            "description": String,
            "price": Integer,
            "stock": Integer,
            "imgUrl": String,
            "categoryId": Integer,
		    "authorId": Integer,
            "status": String,
            "createdAt": Date,
            "updatedAt": Date
       }
    }
    ```
_404 - NOT FOUND_
- Body
    ```json
    {
      "message": "ProductNotFound"
    }
    ```
_500 - INTERNAL SERVER ERROR_
- Body
    ```json
    {
    "message": "Internal Server Error"
    }
    ```

###  <<< `===  Histories Route  ===` >>>

### GET /histories
#### Description
- Get all history list

#### Response
_200 - OK_
- Body
    ```json
    {
    "message": "SUCCESS_history_READ",
    "users": [
        {
            "id": Integer,
            "entityId": Iteger,
            "name": String,
            "description": String,
            "updatedBy": String,
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
    "message": "Internal Server Error"
    }
    ```

###  <<< `===  Global  ===` >>>

### Global Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
    "message": "Internal Server Error"
    }
    ```