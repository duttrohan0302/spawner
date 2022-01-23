
module.exports.slugify =  (string) => {

    return string.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

}