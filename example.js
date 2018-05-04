const fs = require('fs')
const pem = require('.')

const file = fs.readFileSync('./pubkey.pem')
console.log(pem.decode(file))

const source = Buffer.from('12345')

console.log(pem.encode(source, 'DATA'))
