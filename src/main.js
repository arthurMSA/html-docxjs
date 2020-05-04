const fs = require('fs')
const p = require('./modules/html/p')
const h = require('./modules/html/h')
const { Document, Packer } = require('docx')
const getBody = require('./modules/getBody')
const getTags = require('./modules/getTags')


fs.readFile('./test.html', async (err, data) => {
	let doc = []
	const body = await getBody(data.toString())
	const tags = await getTags(body)
	console.log(tags)
	tags.forEach(tag => {
		switch (tag['name']) {
			case 'p':
				doc.push(p(tag['content']))
				break
			case 'h1':
				doc.push(h(tag['content'], 1))
				break
			case 'h2':
				doc.push(h(tag['content'], 2))
				break
			case 'h3':
				doc.push(h(tag['content'], 3))
				break
		}
	})

	// Create document
	const docx = new Document();
	docx.addSection({
		properties: {},
		children: doc
	})

	// Used to export the file into a .docx file
	Packer.toBuffer(docx).then((buffer) => {
		fs.writeFileSync("My Document.docx", buffer);
	})
})
