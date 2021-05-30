var express = require('express')
var app = express()
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("todo.db");
db.run("CREATE TABLE IF NOT EXISTS list (deskripsi TEXT)");

const cors = require('cors')
app.use(cors())

 const bpar = require('body-parser')
 app.use(bpar.urlencoded({extended:true}))


 app.get('/', function (req, res) {
 	res.send(`<html>
 	<body>
 	<form action="/todo" method="post">
 	<input name="deskripsi"/>
 	<button>Add</button>
 	</form>
 </body>
 </html>
 `)
 })

 app.post('/todo', function (req, res) {
 	res.send(
 		db.serialize(function() {
         var desc = req.body.deskripsi
         var input = db.prepare("INSERT INTO list VALUES (?)")
         input.run(desc) }))
 	res.end()
 	})

app.get('/todo', function (req, res) {
 	
		db.serialize(function() {
 			db.all("SELECT rowid AS id, deskripsi from list", function (err, row) {
        		console.log(row)
        		res.json(row)
				res.end()
			})
		})
})

app.post('/todo/:id',function(req,res) {
	 var id=req.params.id;
     var del = db.run("DELETE FROM list WHERE id=?")
     del.run(id)
     res.end()

})

 app.listen(3000)