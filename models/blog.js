const pool = require("../config/database");

class Blog {
  //Get all blogs (sorted by newest first)
  static async findAll() {
    const query = "SELECT * FROM blogs ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
  }

  //Get single blog by id
  static async findById(id) {
    const query = "SELECT * FROM blogs WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  //Create new blog
  static async create(blogData) {
    const { title, snippet, body } = blogData;
    const result = await pool.query(
      `
        INSERT INTO blogs (title, snippet, body) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
      [title, snippet, body]
    );
    return result.rows[0];
  }

  //Update blog
  static async update(id, blogData) {
    const { title, snippet, body } = blogData;
    const query = `
    UPDATE blogs
    SET title = $1, snippet =$2, body = $3, updated_at = CURRENT_TIMESTAMP
    where id = $4
    RETURNING *`;
    const result = await pool.query(query, [title, snippet, body, id]);
    return result.rows[0];
  }

  //Delete blog
  static async delete(id) {
    const query = `DELETE FROM blogs WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Blog;
