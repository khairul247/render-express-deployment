const pool = require('./db'); // adjust if your pool file has a different name

async function migrate() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        snippet TEXT,
        body TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('✅ Table check complete: blogs table exists');

    const res = await pool.query('SELECT COUNT(*) FROM blogs');
    const count = parseInt(res.rows[0].count, 10);

    if (count === 0) {
      console.log('📥 Seeding initial blog posts...');

      await pool.query(`
        INSERT INTO blogs (title, snippet, body)
        VALUES
        ('Welcome to My Blog', 'This is the first snippet', 'This is the first blog post content.'),
        ('Second Post', 'Another snippet', 'Here goes the content of the second blog post.'),
        ('Render + PostgreSQL', 'Using Render with Node.js and pg', 'This post explains how to use PostgreSQL on Render.');
      `);

      console.log('✅ Seed data inserted');
    } else {
      console.log(`ℹ️ Blogs table already has ${count} rows. Skipping seed.`);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed', err);
    process.exit(1);
  }
}

migrate();
