module.exports = (body) => {
	let tags = []
	body.forEach(tag => {
		let name = tag.substring(1, tag.indexOf('>'))
		let content = tag.replace(/<[a-zA-z0-9]*>/g, '')
		content = content.replace(/<[/][a-zA-z0-9]*>/g, '')
		tags.push({
			name,
			content
		})
	})
	return tags
}