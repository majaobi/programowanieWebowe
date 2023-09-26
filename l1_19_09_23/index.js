const { stdin, stdout } = require('process')

function guessClass(gClass){
    return gClass*gClass
}

const readLine = require('readline').createInterface({
    input: stdin,
    output: stdout
})

readLine.question("\nPodam Ci kwadrat dowolnej liczby!\n\n Podaj liczbe:", gClass =>{
    console.log(`\n\nKwadrat twojej liczby to: ${guessClass(gClass)}\n\n`)
    readLine.close()
})