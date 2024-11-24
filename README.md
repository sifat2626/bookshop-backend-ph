# book-ph 
- A Book Selling Platform book-ph is a full-featured book-selling platform built with Node.js, Express, and MongoDB. It allows users to manage books, place orders, and calculate total revenue, all through a set of APIs. The platform supports the management of book inventory, orders, and revenue calculations for administrators. 
## Features 
- **Product Management**: 
- **Create a new product** (API: `POST /api/products`). 
- **Get all products** or search for products by title, author, or category (API: `GET /api/products`). 
- **Get a specific product by ID** (API: `GET /api/products/:id`). 
- **Update product details** (price or quantity) (API: `PUT /api/products/:id`).
- **Delete a product** by ID (API: `DELETE /api/products/:id`). 
- **Order Management**: 
- **Create an order** for a product, updating stock and creating order details (API: `POST /api/orders`). 
- **Revenue Calculation**: 
- **Calculate total revenue** generated from all orders (API: `GET /api/orders/revenue`). 
## API Endpoints 
### Product Management 
#### Create a New Product 
- **Endpoint**: `POST /api/products` 
- **Request Body**: ```json { "title": "Book Title", "author": "Author Name", "price": 20.99, "category": "Fiction", "description": "Book Description", "quantity": 100, "inStock": true } ``` 
- **Response**: ```json { "success": true, "data": { "_id": "product_id", "title": "Book Title", "author": "Author Name", "price": 20.99, "category": "Fiction", "description": "Book Description", "quantity": 100, "inStock": true } } ``` 
#### Get All Products or Search for Products 
- **Endpoint**: `GET /api/products?searchTerm={searchTerm}` 
- **Query Parameters**: `searchTerm` (optional, for searching by title, author, or category). - **Response**: ```json { "message": "Products retrieved successfully", "status": true, "data": [ { "_id": "product_id", "title": "Book Title", "author": "Author Name", "price": 20.99, "category": "Fiction", "description": "Book Description", "quantity": 100, "inStock": true } ] } ``` 
#### Get a Specific Product by ID 
- **Endpoint**: `GET /api/products/:id` 
- **Response**: 
```json { "message": "Product retrieved successfully", "status": true, "data": { "_id": "product_id", "title": "Book Title", "author": "Author Name", "price": 20.99, "category": "Fiction", "description": "Book Description", "quantity": 100, "inStock": true } } ``` 
#### Update Product Details (Price or Quantity) 
- **Endpoint**: `PUT /api/products/:id` 
- **Request Body**: ```json { "price": 18.99, "quantity": 150 } ``` 
- **Response**: ```json { "message": "Product updated successfully", "status": true, "data": { "_id": "product_id", "title": "Book Title", "author": "Author Name", "price": 18.99, "category": "Fiction", "description": "Book Description", "quantity": 150, "inStock": true } } ``` 
#### Delete a Product
- **Endpoint**: `DELETE /api/products/:id`
- **Response**: ```json { "message": "Product deleted successfully", "status": true, "data": {} } ``` 
### Order Management 
#### Create an Order 
- **Endpoint**: `POST /api/orders` 
- **Request Body**: ```json { "email": "user@example.com", "product": "product_id", "quantity": 2, "totalPrice": 39.98 } ``` 
- **Response**: ```json { "message": "Order created successfully", "status": true, "data": { "_id": "order_id", "email": "user@example.com", "product": "product_id", "quantity": 2, "totalPrice": 39.98 } } ``` 
### Revenue Calculation 
#### Calculate Total Revenue from All Orders 
- **Endpoint**: `GET /api/orders/revenue` 
- **Response**: ```json { "message": "Revenue calculated successfully", "status": true, "data": { "totalRevenue": 9999.99 } } ```
## Tech Stack 
- Backend: Node.js, Express.js, MongoDB, Mongoose
## Setup Instructions 
### Prerequisites Before running the project locally, ensure that you have the following installed: - Node.js - MongoDB (or MongoDB Atlas for cloud-based storage) 
### 1. Clone the Repository 
```bash git clone <repository_url> cd book-ph ``` 
### 2. Set up the Backend Navigate to the backend folder. Install dependencies: 
```bash cd backend npm install ``` 
Create a `.env` file in the backend directory and add the following environment variables: 
```bash MONGO_URI=your_mongo_db_connection_string PORT=5000 ``` 
Start the backend server: 
```bash npm run dev ```
The backend will run on `http://localhost:5000`. 
### 3. Access the APIs Use a tool like Postman or Insomnia to interact with the API endpoints at `http://localhost:5000/api/`. 
## Contribution:
- Feel free to fork the repository, create branches for your features, and submit pull requests. Contributions are always welcome!
