# Gadgezio E-Commerce Web-APP

Welcome to Gadgezio, your one-stop destination for purchasing gadgets online!

## Overview

Gadgezio is an e-commerce platform specializing in selling a wide range of gadgets. Users can browse, purchase, and manage gadgets through an intuitive and user-friendly interface.

## Features

- **User Authentication**: Secure authentication system allowing users to sign up, log in, and log out.
- **Product Catalog**: Explore a diverse selection of gadgets available for purchase.
- **Shopping Cart**: Add gadgets to your cart for convenient checkout.
- **Wishlist**: Save favorite gadgets to your wishlist for future reference.
- **Seller Dashboard**: Sellers can list, edit, and delete gadgets they wish to sell.
- **Checkout Process**: Seamless checkout experience with integration of Stripe payment gateway.
- **Flash Messages**: Utilizes Connect Flash for displaying flash messages to users.
- **Security Measures**: Implements various security measures including HTML sanitization (using sanitize-html), Express MongoDB sanitize, and Helmet for HTTP headers protection.
## Tech Stack

**Client:** HTML, CSS, Bootstrap, EJS (Embedded JavaScript), JavaScript, Axios (for making HTTP requests)

**Server:** Node.js, Express.js, MongoDB, Joi (for input validation), Passport.js (for authentication), Stripe (for payment processing), Connect Flash (for flash messages), Sanitize-html (for HTML sanitization), Express-mongo-sanitize (for MongoDB query sanitization), Helmet (for HTTP headers protection)


## Run Locally

Clone the project

```bash
  git clone https://github.com/DBSxVEGETA/GADGEZIO-E-Commerce-Web-APP.git
```

Go to the project directory

```bash
  cd gadgezio
```
Create a .env file in the root directory and add the following environment variables:
```bash
PORT=3000
MONGODB_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=your_client_url
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
Visit http://localhost:3000 in your web browser to access the Gadgezio application locally.


## Demo
Access the demo application on below URL

https://gadgezio.onrender.com/


## Contributing

Contributions are always welcome!

Please adhere to this project's `code of conduct`.


## License

[MIT](https://choosealicense.com/licenses/mit/)

