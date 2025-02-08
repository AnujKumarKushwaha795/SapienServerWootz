const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint for quick verification
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is running',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Add error logging middleware
app.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    }
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    console.log('Health check requested');
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Data endpoints
app.post('/api/data', (req, res) => {
    try {
        console.log('Received data:', req.body);
        const receivedData = req.body;
        res.status(200).json({
            message: 'Data received successfully',
            data: receivedData
        });
    } catch (error) {
        res.status(400).json({
            error: 'Invalid data format'
        });
    }
});

app.get('/api/data', (req, res) => {
    res.status(200).json({
        message: 'Sample data',
        data: {
            id: 1,
            name: 'Test Data',
            timestamp: new Date().toISOString()
        }
    });
});

// Add deployment info endpoint
app.get('/deployment-info', (req, res) => {
    res.status(200).json({
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 3000,
        railway_service: process.env.RAILWAY_SERVICE_NAME,
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
        console.log('Environment:', process.env.NODE_ENV);
        console.log('Railway Service:', process.env.RAILWAY_SERVICE_NAME);
        console.log('Current timestamp:', new Date().toISOString());
    });

    // Add error handling for the server
    server.on('error', (error) => {
        console.error('Server error:', error);
    });
}

module.exports = app; 