const fs = require('fs')
const p = require('./modules/html/p')
const h = require('./modules/html/h')
const list = require('./modules/html/list')
const table = require('./modules/html/table')
const { Document, Packer, Paragraph, TextRun } = require('docx')
const getBody = require('./modules/getBody')
const getTags = require('./modules/getTags')

fs.readFile('./test.html', async (err, data) => {

	let doc = []
	doc.push(new Paragraph({
		text: "EEAASDASDA S",
		bullet: {
			level: 1,
		},
	}))
	const body = await getBody(data.toString())
	const tags = await getTags(body)
	let tableTag = []
	let listTag = {
		tags: [],
		countOpen: 0,
		countClose: 0
	}
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
			case 'ul':
				listTag.countOpen++
				listTag.tags.push(tag)
				break
			case 'li':
				listTag.tags.push(tag)
				break
			case '/ul':
				listTag.tags.push(tag)
				listTag.countClose++
				if(listTag.countOpen === listTag.countClose) {
					doc.push(...list(listTag.tags))
					listTag.countOpen = 0
					listTag.countClose = 0
					listTag.tags = []
				}
				break
			case 'table':
			case 'tr':
			case 'th':
			case 'td':
			case '/tr':
				tableTag.push(tag)
				break
			case '/table':
				tableTag.push(tag)
				doc.push(table(tableTag))
				tableTag = []
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
