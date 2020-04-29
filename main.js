const fs = require('fs')
const { Document, Packer, Paragraph, TextRun } = require('docx')
const splitTags = require('./modules/splitTag')

// Create document
const docx = new Document();

fs.readFile('./test.html', async (err, data) => {
	let tags = await splitTags(data.toString())
	let tag = []
	let doc = []
	tags.forEach(line => {
		let tag = line.substring(1, line.indexOf('>'))
		let content = line.replace(/<[a-zA-z0-9]*>/g, '')
		content = content.replace(/<[/][a-zA-z0-9]*>/g, '')
		switch (tag) {
			case 'p':
				doc.push(
					new Paragraph({
						children: [
							new TextRun(content)
						]
					})
				)
				break
			case 'h1':
				break
			default:
				break;
		}
	})
	docx.addSection({
			properties: {},
			children: doc
	})

// Used to export the file into a .docx file
Packer.toBuffer(docx).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
})
