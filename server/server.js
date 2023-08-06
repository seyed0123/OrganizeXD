const express = require('express');
const cors = require('cors');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3005;

app.use(cors())
app.use(express.json()); // for parsing application/json

const storageFile = '../storage.db';

if (!fs.existsSync(storageFile)) {
    fs.openSync(storageFile, 'w');
}

let db = new sqlite3.Database('../storage.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the storage.db database.');
});

db.run(`CREATE TABLE IF NOT EXISTS todo_item (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                completed INTEGER DEFAULT 0,
                time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
console.log('table is now ready')

// Get all items
app.get('/todo_item', (req, res) => {
    console.log('get all');
    db.all('SELECT * FROM todo_item', (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

// Insert a new item
app.post('/todo_item', (req, res) => {
    console.log('add to db ->',req.body);
    const { name, completed  , time } = req.body;
    db.run(`INSERT INTO todo_item(name, completed , time) VALUES(?, ?, ?)`, [name, completed,time], function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.json({ id: this.lastID });
    });
});

// Update an item
app.put('/todo_item/:id', (req, res) => {
    console.log('update to db ->',req.body);
    const { id } = req.params;
    const { name, completed , time} = req.body;
    db.run(`UPDATE todo_item SET name = ?, completed = ? , time = ?WHERE id = ?`, [name, completed, time, id], function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.json({ changes: this.changes });
    });
});

// Delete an item
app.delete('/todo_item/:id', (req, res) => {
    console.log('delete to db ->',req);
    const { id } = req.params;
    db.run(`DELETE FROM todo_item WHERE id = ?`, id, function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.json({ changes: this.changes });
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
