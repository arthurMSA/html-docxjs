module.exports = (pHtml) => {
	return pHtml.substring(pHtml.indexOf('<body>')+6, pHtml.indexOf('</body>'))
}