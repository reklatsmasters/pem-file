/* eslint-env jest */
const fs = require('fs')
const pem = require('.')

const endline = '-----'
const label = 'PEM'
const buf = Buffer.from('pemfile')
const pemfile = `${endline}BEGIN ${label}${endline}\r\n${buf.toString('base64')}\r\n${endline}END ${label}${endline}`
const realpem = fs.readFileSync('./pubkey.pem')

test('should encode', () => {
  expect(pem.encode(buf, label)).toEqual(pemfile)
})

test('should decode', () => {
  expect(pem.decode(pemfile)).toEqual(buf)
})

test('should decode real PEM files', () => {
  expect(() => {
    pem.decode(realpem)
  }).not.toThrow()
})

test('should not decode empty file', () => {
  const pemfile = `${endline}BEGIN ${label}${endline}\r\n${endline}END ${label}${endline}`

  expect(() => {
    pem.decode(pemfile)
  }).toThrow('Invalid PEM data.')
})

test('should not decode file with missing end label', () => {
  const pemfile = `${endline}BEGIN ${label}${endline}\r\n01234\r\n56789`

  expect(() => {
    pem.decode(pemfile)
  }).toThrow('Invalid end of file.')
})

test('should not decode file with invalid end label', () => {
  const pemfile = `${endline}BEGIN ${label}${endline}\r\n012345\r\n${endline}END INVALID${endline}`

  expect(() => {
    pem.decode(pemfile)
  }).toThrow('Invalid end of file.')
})

test('should not decode file with invalid start label', () => {
  const pemfile = `${endline}BGN ${label}${endline}\r\n012345\r\n${endline}END INVALID${endline}`

  expect(() => {
    pem.decode(pemfile)
  }).toThrow('Invalid label.')
})
