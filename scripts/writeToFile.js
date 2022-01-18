const fse = require('fs-extra');



exports.writeToFile = async (dir,fileName,text) => {
    try{
        await fse.outputFile(dir+fileName, text);
    }catch(err){
        console.log(err)
    }
}