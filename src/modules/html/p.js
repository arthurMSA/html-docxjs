const { Paragraph, TextRun } = require('docx')

module.exports = (content) => {
	return new Paragraph({
		children: [
			new TextRun({
				text: content
			})
		]
	})
}