import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class ScriptionService {


private AES_SECRET_KEY = 'eANp2iewi2Uywjiiplwe1245';

public  decrypt(encryptedText: any): any {
  const key = CryptoJS.enc.Utf8.parse(this.AES_SECRET_KEY);
  const dataString= CryptoJS.AES.decrypt(encryptedText, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);

  return JSON.parse( JSON.stringify(dataString));

}
public encrypt(encryptedText:any){
  const dataString=((typeof encryptedText) == "string")?encryptedText:JSON.stringify(encryptedText);
  const key = CryptoJS.enc.Utf8.parse(this.AES_SECRET_KEY);
  return  CryptoJS.AES.encrypt(dataString, key,{
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
}).toString();


}

}
