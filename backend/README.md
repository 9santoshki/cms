# E-commerce Backend with Node.js and PostgreSQL

## Setup Instructions

1. Make sure PostgreSQL is installed and running on your system.

2. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE cms_ecomm;
   ```

3. Connect to the database and create the required tables using the schema in `database/schema.sql`.

4. Update the `.env` file with your PostgreSQL credentials if they differ from the defaults:
   ```
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=cms_ecomm
   DB_PASSWORD=postgres
   DB_PORT=5432
   ```

## Running the Backend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The server will start on port 5000 (or the port specified in your `.env` file).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires authentication)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product (requires authentication)
- `PUT /api/products/:id` - Update a product (requires authentication)
- `DELETE /api/products/:id` - Delete a product (requires authentication)

### Cart
- `GET /api/cart` - Get cart items (requires authentication)
- `POST /api/cart/add` - Add item to cart (requires authentication)
- `PUT /api/cart/update` - Update cart item (requires authentication)
- `DELETE /api/cart/remove/:productId` - Remove item from cart (requires authentication)
- `DELETE /api/cart/clear` - Clear cart (requires authentication)

### Orders
- `POST /api/orders` - Create a new order (requires authentication)
- `GET /api/orders` - Get user orders (requires authentication)
- `GET /api/orders/:id` - Get order by ID (requires authentication)