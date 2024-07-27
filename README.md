# Azgaurd Node.js Backend

## Overview
Azgaurd is a Node.js backend application that provides a RESTful API for managing a todo list, including CRUD operations, CSV upload/download, and status filtering. This project uses Express.js for routing, MongoDB for the database, and Swagger for API documentation.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/azgaurd-node.git
    ```
2. Navigate to the project directory:
    ```bash
    cd azgaurd-node
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Configuration
The application configuration is stored in `config.json`. Make sure to update it with your settings:
- `port`: The port on which the application will run.
- `hostAddress`: The host address of the application.
- `databasePort`: The port on which the MongoDB database is running.
- `databaseName`: The name of the MongoDB database.
- `databaseHostLocal`: The local host address for the database.
- `databaseHost`: The host address for the database.
- `dbUserName`: The database username.
- `dbPass`: The database password.
- `swaggerDefinition`: Swagger configuration for API documentation.
- `cloudinary`: Configuration for Cloudinary if you use it for file uploads.

## Running the Application
1. Start the application:
    ```bash
    npm start
    ```
2. The application will be available at `http://localhost:2046`.

## API Documentation
The API documentation is available via Swagger. Once the application is running, you can access the documentation at:

## Environment Variables
You can also configure the application using environment variables. The following variables are supported:
- `PORT`: Port on which the application will run.
- `HOST_ADDRESS`: Host address of the application.
- `DB_PORT`: Port on which the MongoDB database is running.
- `DB_NAME`: Name of the MongoDB database.
- `DB_HOST_LOCAL`: Local host address for the database.
- `DB_HOST`: Host address for the database.
- `DB_USERNAME`: Database username.
- `DB_PASSWORD`: Database password.
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name.
- `CLOUDINARY_API_KEY`: Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Cloudinary API secret.

## Dependencies
- Node.js
- Express.js
- MongoDB
- Swagger
- Cloudinary (optional)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

