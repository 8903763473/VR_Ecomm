import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  email: string = '';
  password: string = '';
  constructor(private api: ServiceService,public app:AppComponent) {}
  ngOnInit(): void {
  }

  submitLogin() {
    // Validate form fields
    if (!this.email || !this.password) {
      alert('Please fill in both email and password.');
      return;
    }
  
    const post = {
      email: this.email,
      password: this.password
    };
  
    console.log(post);
  
    this.api.loginUser(post).subscribe({
      next: (res: any) => {
        console.log('Login successful', res);
          if (res.user && res.user.encryptedData && res.user.key && res.user.iv) {
          try {
            // Decrypting the data
            const decryptedData = this.decryptData(
              res.user.encryptedData,
              res.user.key,
              res.user.iv
            );
            console.log('Decrypted Data:', decryptedData);
            this.app.successPopup = true; 
          } catch (error) {
            console.error('Decryption failed', error);
          }
        } else {
          console.warn('Response missing required data for decryption');
        }
      },
      error: (err: any) => {
        console.error('Login failed', err);
        alert('Login failed. Please check your credentials and try again.');
        this.app.failedpopup=true
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
