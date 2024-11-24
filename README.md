# Book Selling Platform (book-ph)

Book-ph is a comprehensive book-selling platform developed using **Node.js**, **Express**, and **MongoDB**. It provides a robust API for managing books, processing orders, and calculating total revenue, catering to both users and administrators.

## Features

### Product Management
- **Create a New Product**: Add new books to the inventory.
- **Get All Products**: Retrieve a list of all products or search by title, author, or category.
- **Get a Specific Product**: Access detailed information about a specific book using its ID.
- **Update Product Details**: Modify existing product information, such as price or stock quantity.
- **Delete a Product**: Remove a book from the inventory.

### Order Management
- **Create an Order**: Place an order for a product while updating stock levels.

### Revenue Calculation
- **Calculate Total Revenue**: Retrieve the total revenue generated from all orders.

## API Endpoints

### Product Management

#### Create a New Product
- **Endpoint**: `POST /api/products`
- **Request Body**:
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "price": 20.99,
      "category": "Fiction",
      "description": "Book Description",
      "quantity": 100,
      "inStock": true
    }
    ```
- **Response**:
    ```json
    {
      "success": true,
      "data": {
        "_id": "product_id",
        "title": "Book Title",
        "author": "Author Name",
        "price": 20.99,
        "category": "Fiction",
        "description": "Book Description",
        "quantity": 100,
        "inStock": true
      }
    }
    ```

#### Get All Products or Search for Products
- **Endpoint**: `GET /api/products?searchTerm={searchTerm}`
- **Query Parameters**: `searchTerm` (optional)
- **Response**:
    ```json
    {
      "message": "Products retrieved successfully",
      "status": true,
      "data": [
        {
          "_id": "product_id",
          "title": "Book Title",
          "author": "Author Name",
          "price": 20.99,
          "category": "Fiction",
          "description": "Book Description",
          "quantity": 100,
          "inStock": true
        }
      ]
    }
    ```

#### Get a Specific Product by ID
- **Endpoint**: `GET /api/products/:id`
- **Response**:
    ```json
    {
      "message": "Product retrieved successfully",
      "status": true,
      "data": {
        "_id": "product_id",
        "title": "Book Title",
        "author": "Author Name",
        "price": 20.99,
        "category": "Fiction",
        "description": "Book Description",
        "quantity": 100,
        "inStock": true
      }
    }
    ```

#### Update Product Details
- **Endpoint**: `PUT /api/products/:id`
- **Request Body**:
    ```json
    {
      "price": 18.99,
      "quantity": 150
    }
    ```
- **Response**:
    ```json
    {
      "message": "Product updated successfully",
      "status": true,
      "data": {
        "_id": "product_id",
        ...
        // other updated fields here
      }
    }
    ```

#### Delete a Product
- **Endpoint**: `DELETE /api/products/:id`
- **Response**:
    ```json
    {
      "message": "Product deleted successfully",
      "status": true,
      ...
    }
    ```

### Order Management

#### Create an Order
- **Endpoint**: `POST /api/orders`
- **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "product": "product_id",
      "quantity": 2,
      "totalPrice": 39.98
    }
    ```
- **Response**:
    ```json
    {
      "message": "Order created successfully",
      "status": true,
      "data": {
        "_id": "order_id",
        "email": "user@example.com",
        "product": "product_id",
        "quantity": 2,
        "totalPrice": 39.98
      }
    }
    ```

### Revenue Calculation

#### Calculate Total Revenue from All Orders
- **Endpoint**: `GET /api/orders/revenue`
- **Response**:
    ```json
    {
      "message": "Revenue calculated successfully",
      "status": true,
      "data": {
        "totalRevenue": 9999.99
      }
    }
    ```

## Tech Stack
- Backend: Node.js, Express.js, MongoDB, Mongoose

## Setup Instructions

### Prerequisites
Before running the project locally, ensure that you have the following installed:
- Node.js
- MongoDB (or MongoDB Atlas for cloud-based storage)

### 1. Clone the Repository
```bash
git clone <repository_url>
cd book-ph
``` 
### 2. Set up the Backend Navigate to the backend folder. Install dependencies: 
```bash 
cd backend npm install
 ``` 
Create a `.env` file in the backend directory and add the following environment variables: 
```bash
 MONGO_URI=your_mongo_db_connection_string PORT=5000 
 ``` 
Start the backend server: 
```bash 
npm run dev 
```
The backend will run on `http://localhost:5000`. 
### 3. Access the APIs Use a tool like Postman or Insomnia to interact with the API endpoints at
`http://localhost:5000/api/`. 
## Contribution:
- Feel free to fork the repository, create branches for your features, and submit pull requests. Contributions are always welcome!
