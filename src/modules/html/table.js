const { Paragraph, Table, TableCell, TableRow, WidthType, TextRun } = require('docx')
module.exports = (tags) => {
	let rows = []
	let cells = []
	let isHead = false
	let table
	let openRow = false
	tags.forEach(tag => {
		if(tag['name'] === '/tr') {
			openRow = false
			rows.push(new TableRow({
				children: cells, tableHeader: isHead
			}))
			cells = []
			isHead = false
		}
		if(openRow) {
			let bold = false
			if(tag['name'] === 'th') {
				isHead = true
				bold = true
			}
			cells.push(new TableCell({
				children: [
					new Paragraph({
						children: [
							new TextRun({
								text: tag['content'],
								bold
							})
						]
					})
				]
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