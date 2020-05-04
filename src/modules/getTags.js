module.exports = (body) => {
	let tags = body.match(/<([a-zA-Z0-9])*>|<[/][a-zA-Z0-9]*>|.*/g)
	tags = cleanTag(tags)
	let objTags = []
	tags.forEach(tag => {
		let name = tag.substring(tag.indexOf('<')+1, tag.indexOf('>'))
		let content = tag.replace(/<[a-zA-z0-9]*>/g, '')
		while(content.indexOf('\t') !== -1) {
			content = content.replace('\t', '')
		}
		content = content.replace(/<[/][a-zA-z0-9]*>/g, '')
		objTags.push({
			name,
			content
		})
	})
	return objTags
}

function cleanTag(tags) {
	let tag = []
	tags.forEach(data => {
		if(data !== '') {
			tag.push(data)
		}
	})
	return tag
}