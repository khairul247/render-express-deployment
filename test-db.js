require('dotenv').config();
const pool = require('./config/database');

const testConnection = async () => {
    try {
        const result = await pool.query('SELECT NOW() as current_time, current_database() as database');
        console.log('✅ Database connection successful!');
        console.log('Current time:', result.rows[0].current_time);
        console.log('Connected to database:', result.rows[0].database);
        
        // Test if our blogs table exists
        const tableCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'blogs'
            );
        `);
        console.log('Blogs table exists:', tableCheck.rows[0].exists);
        
        pool.end(); // Close connection
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
    }
};

testConnection();