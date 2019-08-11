function convertAny(input){
    const removeSpecial =  input.replace(/[^\w\s]/gi,"")
    const lowerCase = removeSpecial.toLowerCase()
    const trimWord = lowerCase.trim()
    return trimWord
}

function convertLower(input){
    const lowerCase = input.toLowerCase()
    return lowerCase
}

module.exports = {
    convertLower: convertLower,
    convertAny:convertAny

}