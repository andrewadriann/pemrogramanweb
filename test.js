const http = require('http')
const moment = require('moment')
const randomstring = require('randomstring')

data = {}

const server = http.createServer(function(req,res){
	if (req.url ==='/masuk') {

	var d = new Date()
	const kode = randomstring.generate({length:8, capitalization :'uppercase'})
	data[kode]={kode: kode, waktu: d}
	res.write('Jam ' + moment(d).format('LTS')+ ' Kode: '+ kode)
	res.end()

	}else if(req.url.match(/^\/keluar\/.*/)){
	let kode = req.url.replace(/^\/keluar\//,'')
	let waktuMasuk = data[kode].waktu
	res.write('kode Anda ' + kode +' waktu masuk anda' + moment(waktuMasuk).format('LTS'))
	res.end()
	}else if(req.url ==='/info'){
	res.write(JSON.stringify(data))
	res.end()
	}else{
	res.statusCode = 404
	res.end()
	}
	
	})

server.listen(3000)