import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Define Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ticket API",
      version: "1.0.0",
      description: "API for managing ticket events and purchases",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply globally to all routes
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // Paths to files containing Swagger annotations
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Express) => {
  // Swagger UI route
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
