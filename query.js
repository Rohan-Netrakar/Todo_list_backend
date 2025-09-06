//to create a database table

// CREATE TABLE Todo_list_backend (
//   id SERIAL PRIMARY KEY,
//   task VARCHAR(255)
// );

//to INSERT a Todo_list_backend item
// try {
//     const query = `
//       INSERT INTO Todo_list_backend (task)
//       VALUES ($1)
//     `;
//     await db.query(query, [task]);
//     res.send('Todo_list_backend added successfully!');
//   } catch (err) {
//     console.error("Error inserting Todo_list_backend", err.stack);
//     res.status(500).send('Database error');
//   }
// });


//to DELETE a Todo_list_backend item by id
// try {
//     const query = `
//       DELETE FROM Todo_list_backend 
//       WHERE id = $1
//     `;
//     await db.query(query, [id]);
//     res.send('Todo_list_backend deleted successfully!');
//   } catch (err) {
//     console.error("Error deleting Todo_list_backend", err.stack);
//     res.status(500).send('Database error');
//   }
// });


//to SELECT all Todo_list_backend items
// try {
//     const query = `
//       SELECT id, task
//       FROM Todo_list_backend 
//       ORDER BY id ASC
//     `;
//     const result = await db.query(query);
//     res.render('index', { tasks: result.rows });
//   } catch (err) {
//     console.error("Error retrieving Todo_list_backends", err.stack);
//     res.status(500).send("Database error");
//   }
// });


//to SELECT and display all tasks with id in descending order
// try {
//     const query = `
//       SELECT id, task
//       FROM Todo_list_backend
//       ORDER BY id DESC
//     `;
//     const result = await db.query(query);
//     res.render('index', { tasks: result.rows });
//   } catch (err) {
//     console.error("Error retrieving tasks", err.stack);
//     res.status(500).send("Database error");
//   }
// });


//to REORDER ids sequentially
// try {
//     const query = `
//       WITH reordered AS (
//         SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS new_id
//         FROM Todo_list_backend
//       )
//       UPDATE Todo_list_backend t
//       SET id = r.new_id
//       FROM reordered r
//       WHERE t.id = r.id;
//     `;
//     await db.query(query);
//     res.send('IDs reordered successfully!');
//   } catch (err) {
//     console.error("Error reordering IDs", err.stack);
//     res.status(500).send('Database error');
//   }
// });

//to UPDATE (edit) a Todo_list_backend item by id
// try {
//     const query = `
//       UPDATE Todo_list_backend
//       SET task = $1
//       WHERE id = $2
//     `;
//     await db.query(query, [editedTask, id]);
//     res.send('Todo_list_backend updated successfully!');
//   } catch (err) {
//     console.error("Error updating Todo_list_backend", err.stack);
//     res.status(500).send('Database error');
//   }
// });
