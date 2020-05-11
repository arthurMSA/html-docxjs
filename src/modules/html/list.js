const { Paragraph } = require('docx')
module.exports = (tags) => {
    let list = []
    let level = -1
    tags.forEach(tag => {
        switch (tag['name']) {
            case 'ul':
                level++
                break;
            case 'li':
                list.push(new Paragraph({
                    text: tag['content'],
                    bullet: {
                        level
                    }
                }))
                break
            case '/ul':
                level--
                break
        }
    })
    return list
}