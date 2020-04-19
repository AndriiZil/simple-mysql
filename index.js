const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'andriu',
  password: '123456',
  database: 'acme'
});

db.connect();

app.get('/users', (req, res) => {
  const sql = `SELECT
    comments.body,
    posts.title,
    users.first_name,
    users.last_name
    FROM comments
    INNER JOIN posts ON posts.id = comments.post_id
    INNER JOIN users ON users.id = posts.user_id
    ORDER BY posts.title`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(3100, () => console.log('Server started on port 3100.'));