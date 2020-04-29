module.exports = (pHtml) => {
	pHtml = pHtml.substring(pHtml.indexOf('<body>')+6, pHtml.indexOf('</body>'))
	return pHtml.match(/<([A-Za-z0-9]*)>.*<[/]\1>/g)
}