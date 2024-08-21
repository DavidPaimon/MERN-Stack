import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import winston from 'winston';
import nodeCache from 'node-cache';
import paginate from 'express-paginate';

import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Configuración de Winston para logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ],
});

// Logger de Morgan
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Middlewares esenciales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(paginate.middleware(10, 50)); // Configuración de la paginación

// Protección CSRF (si es necesario para otras rutas más adelante)
// app.use(csrfProtection);

app.use("/api/users", userRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

app.listen(port, () => console.log(`Servidor corriendo en el puerto: ${port}`));
