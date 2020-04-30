const fs = require('fs')
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx')
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
							new TextRun({
								text: content
							})
						]
					})
				)
				break
			case 'h1':
				doc.push(
					new Paragraph({
								children: [
									new TextRun({
										text:content,
										color: '000000'
									})
								],
								heading: HeadingLevel.HEADING_1
							})
						)
				break
			case 'h2':
				doc.push(
					new Paragraph({
								children: [
									new TextRun({
										text:content,
										color: '000000'
									})
								],
								heading: HeadingLevel.HEADING_2
							})
						)
				break
			case 'h3':
				doc.push(
					new Paragraph({
								children: [
									new TextRun({
										text:content,
										color: '000000'
									})
								],
								heading: HeadingLevel.HEADING_3
							})
						)
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
