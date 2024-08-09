import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  email: string = '';
  password: string = '';
  constructor(private api: ServiceService) {}
  ngOnInit(): void {
  }

  submitLogin() {
    let post = {
      "email": this.email,
      "password": this.password
    };
    console.log(post);
    this.api.loginUser(post).subscribe({
      next: (res: any) => {
        console.log('Login successful', res);
        // Decrypting the data
        const decryptedData = this.decryptData(
          res.user.encryptedData, 
          res.user.key, 
          res.user.iv
        );
        console.log('Decrypted Data:', decryptedData);
        alert("Successfully logged in");
      },
      error: (err: any) => {
        console.error('Login failed', err);
      }
    });
  }

  decryptData(encryptedData: string, key: string, iv: string): string {
    const keyBytes = CryptoJS.enc.Hex.parse(key);
    const ivBytes = CryptoJS.enc.Hex.parse(iv);
    const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedData);
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: encryptedBytes
    });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, keyBytes, {
      iv: ivBytes,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
