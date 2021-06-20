const express =  require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("todos.db");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended:true }))
app.use(express.json())


app.get('/', (req,res) => {
    res.send(`
    <html>
        <body>
            <form action="/todo" method="post">
            <input name="description" />
            <button> Add </button>
            </form>
        </body>
    </html>`)
})

app.get('/todo', (req,res) => {
    var sql ='SELECT * from `todo`'
    db.all(sql, (err,data) => {
        if (err) throw err
        res.send(data);
    })
})

app.post('/todo', (req, res) => {
     let sql = `INSERT INTO todo(description) VALUES (?)`
     let values = [req.body.description]
     db.run(sql, values, function(err) {
        if (err){
      res.status(500).json({'error': err.message});
      return;
    }
    res.status(200).json('Insert Berhasil');
      })
})

app.delete('/todo/:id', function(req,res){
db.run('DELETE FROM `todo` WHERE id = ?',req.params.id,function (err, result) {
        if (err){
            res.status(400).json({'error': res.message})
            return;
        }
        res.json({'message': 'Delete berhasil.'})
});
})

app.listen(3000, function() {
  console.log('Server listens on port 3000');
});