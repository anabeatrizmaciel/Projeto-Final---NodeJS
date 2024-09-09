const fs = require('fs')
const folderName='./LOG'

try {
    if(!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName)
    }
} catch (err) {
    console.error(err) 
}