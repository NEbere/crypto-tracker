## Crypto Tracker Application

### Client

 - Displays products for the exchanges ["BNB", "BTX", "BFX"]
 - User selects a product to view the prices of the product in the exchanges mentioned above.

#### Start client side app:

 - run `cd ./client`, `npm install` and `npm start` the navigate to `http://localhost:4200/` in the browser

### Server

- To start server side, `cd ./server`, run `npm install` then `npm start`
- Go to `http://localhost:5000/products` to view the products

Endpoints:

- `/products`: returns all products shared between the exchanges.
- `/products/<PRODUCT>/prices`: returns PRODUCT’s prices on all three exchanges.

NB: Start the server side app before the starting and interacting with the client side
