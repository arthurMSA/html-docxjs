const { Paragraph, TextRun, HeadingLevel } = require('docx')

module.exports = (content, level) => {
	let nameLevel = `HEADING_${level}`
	return new Paragraph({
		children: [
			new TextRun({
				text: content,
				color: '000000'
			})
		],
		heading: HeadingLevel[nameLevel]
	})
}