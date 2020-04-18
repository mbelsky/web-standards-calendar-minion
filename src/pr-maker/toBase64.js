const toBase64 = (input) => Buffer.from(input, 'utf8').toString('base64')

module.exports = toBase64
