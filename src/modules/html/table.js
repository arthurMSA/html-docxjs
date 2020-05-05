const { Paragraph, Table, TableCell, TableRow, WidthType } = require('docx')
module.exports = (tags) => {
	let rows = []
	let cells = []
	let table
	let openRow = false
	tags.forEach(tag => {
		if(tag['name'] === '/tr') {
			openRow = false
			rows.push(new TableRow({children: cells}))
			cells = []
		}
		if(openRow) {
			cells.push(new TableCell({
				children: [new Paragraph(tag['content'])]
			}))
		}
		if(tag['name'] === 'tr') {
			openRow = true
		}
		if(tag['name'] === '/table') {
			table = new Table({
				rows,
				width: {
					size: 100,
					type: WidthType.PERCENTAGE,
				}
			})
		}
	})
	return table
}