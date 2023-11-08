// @ts-nocheck

import { Web3Storage } from 'web3.storage'
import { WEB3STORAGE_TOKEN } from '../env'

function getAccessToken () {

  return WEB3STORAGE_TOKEN
}

export default function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}