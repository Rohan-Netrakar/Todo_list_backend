//to create a database table

// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   task VARCHAR(255)
// );

//to INSERT a todo item
// try {
//     const query = `
//       INSERT INTO todos (task)
//       VALUES ($1)
//     `;
//     await db.query(query, [task]);
//     res.send('Todo added successfully!');
//   } catch (err) {
//     console.error("Error inserting todo", err.stack);
//     res.status(500).send('Database error');
//   }
// });


//to DELETE a todo item by id
// try {
//     const query = `
//       DELETE FROM todos
//       WHERE id = $1
//     `;
//     await db.query(query, [id]);
//     res.send('Todo deleted successfully!');
//   } catch (err) {
//     console.error("Error deleting todo", err.stack);
//     res.status(500).send('Database error');
//   }
// });


//to SELECT all todo items
// try {
//     const query = `
//       SELECT id, task
//       FROM todos
//       ORDER BY id ASC
//     `;
//     const result = await db.query(query);
//     res.render('index', { tasks: result.rows });
//   } catch (err) {
//     console.error("Error retrieving todos", err.stack);
//     res.status(500).send("Database error");
//   }
// });
