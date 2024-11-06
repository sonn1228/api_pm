import cors from 'cors';
import userRoutes from './user.route.js';
import authRoutes from './auth.route.js';
import todoRoutes from './todo.route.js';
import productRoutes from './product.route.js';

// Configurations can either come from environment variables or be set statically
const config = {
  v1: process.env.API_PREFIX || '/api/v1', // Default to "/api/v1" if not set in environment
  whiteList: process.env.CORS_WHITELIST?.split(',') || ['http://127.0.0.1:5500', 'http://localhost:5173/'],
};

const corsOptions = {
  origin: function (origin, callback) {
    const mode = process.env.NODE_ENV || 'development'; // Default to 'development' if NODE_ENV is not set
    if (
      mode === 'development' || // Allow in development mode
      !origin || // Allow no-origin requests (e.g., Postman or testing)
      config.whiteList.includes(origin) // Check if the origin is in the whitelist
    ) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
};

export const routesV1 = (app) => {
  app.use(cors(corsOptions)); // Apply CORS options

  // Define routes with a common prefix
  app.use(`${config.v1}/todos`, todoRoutes);
  app.use(`${config.v1}/users`, userRoutes);
  app.use(`${config.v1}/auth`, authRoutes);
  app.use(`${config.v1}/products`, productRoutes); // Fixed plural form here for consistency
};
