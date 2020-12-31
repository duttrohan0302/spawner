/**
 * Function to slugify string
 */
module.exports.slugify =  (string) => {

    // console.log(string);

    return string.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

}