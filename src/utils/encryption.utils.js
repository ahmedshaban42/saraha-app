import CryptoJS from "crypto-js";


export const encryption=async({value,secretkey}={})=>{
    return CryptoJS.AES.encrypt(JSON.stringify(value),secretkey).toString()
}

export const decryption=async({cipher,secretkey}={})=>{
    return CryptoJS.AES.decrypt(cipher,secretkey).toString(CryptoJS.enc.Utf8)

}