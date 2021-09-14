const { request, response } = require('express');
const pool = require('../data/config');

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Soamee Books&Authors Backend'
        });
    });
    //Return the book's name list with ISBN
    app.get('/books', (request, response) => {
        pool.query('SELECT _name, _isbn FROM Book', (error, result) => {
            if(error) throw error;

            response.send(result);
        }
        )
    });
    //Return the author's name list
    app.get('/authors', (request, response) => {
        pool.query('SELECT _last_name FROM Author', (error, result) => {
            if(error) throw error;

            response.send(result);
        }
        )
    });
    //Return all the data from {id} book and author's data nested
    app.get('/books/:id', (request, response) => {
        const id = request.params.id;
        pool.query('SELECT * FROM Book b INNER JOIN Author a ON a._last_name = b._author WHERE b._isbn = ?', id, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });
    //Return author's name and last name
    app.get('/authors/:id', (request, response) => {
        const id = request.params.id;
        pool.query('SELECT * FROM Author WHERE _last_name = ?', id, (error, result) => {
            if (error) throw error;
         
            response.send(result);
        });
    });
    //Upload a new book to the Book Table
    app.post('/books', (request, response) => {
        pool.query('INSERT INTO Book SET ?', request.body, (error, result) => {
            if (error) throw error;
 
        response.status(201).send(`Book added succesfully`);
        });
    });
    //Upload a new author to Author Table
    app.post('/authors', (request, response) => {
        pool.query('INSERT INTO Author SET ?', request.body, (error, result) => {
         if (error) throw error;
 
            response.status(201).send(`Author added succesfully`);
        });
    });
    //Updates the data inside the {id} book row
    app.put('/books/:id', (request, response) => {
        const id = request.params.id;
 
        pool.query('UPDATE Book SET ? WHERE _isbn = ?', [request.body, id], (error, result) => {
         if (error) throw error;
 
         response.send('Book updated successfully.');
     });
    });
    //Updates the data inside the {id} book row
    app.put('/authors/:id', (request, response) => {
        const id = request.params.id;
    
        pool.query('UPDATE Author SET ? WHERE _last_name = ?', [request.body, id], (error, result) => {
            if (error) throw error;
    
            response.send('Author updated successfully.');
        });
    });
}
module.exports = router;
