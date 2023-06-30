// const fs = require("fs")
const fsPromises = require("fs").promises


const fileOps = async () => {
    try {
        const data  = await fsPromises.readFile('./read.txt', 'utf8');
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}

fileOps()





// fs.readFile('./read.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data)
// } )

// fs.writeFile('./sample.txt','Hello, Nice o meet You', (err) => {
//     if (err) throw err;
//     console.log("Write Done")
// } )

// fs.appendFile('./append.txt','Hello, Appending 2', (err) => {
//     if (err) throw err;
//     console.log("Appendd Done")
// } )

// ===> using call backs
// fs.writeFile('./sample.txt','Hello, Nice o meet You', (err) => {
//     if (err) throw err;
//     console.log("Write Done")
//     fs.appendFile('./append.txt','Hello, Appending 2 3 ', (err) => {
//         if (err) throw err;
//         console.log("Appendd Done")
//     } )
// } )






