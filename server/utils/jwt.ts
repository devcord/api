import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

let publicKey = ''
let privateKey = ''

const credentialsPath = path.join(__dirname, '../../credentials')

if (fs.existsSync(credentialsPath)) {
  publicKey = fs.readFileSync(path.join(credentialsPath, 'public'), 'utf8')
  privateKey = fs.readFileSync(path.join(credentialsPath, 'private'), 'utf8')
} else {
  const keypair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,

    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem', 
    },

    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem', 
    },
  })

  publicKey = keypair.publicKey
  privateKey = keypair.privateKey

  fs.mkdirSync(credentialsPath)

  fs.writeFileSync(path.join(credentialsPath, 'public'), keypair.publicKey, 'utf8')
  fs.writeFileSync(path.join(credentialsPath, 'private'), keypair.privateKey, 'utf8')
}

export const sign = (data): string | object => {
  return jwt.sign(data, privateKey, { algorithm: 'RS256' })
}

export const verify = (token): string | object => {
  return jwt.verify(token, publicKey)
}

export default {
  sign,
  verify,
}
