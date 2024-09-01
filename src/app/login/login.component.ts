import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { ServiceService } from '../service/service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  userDetails: any = []
  constructor(private api: ServiceService, public app: AppComponent) { }
  ngOnInit(): void {
  }

  submitLogin() {
    if (!this.email || !this.password) {
      this.app.warningpopup = true
      return;
    }

    const post = {
      'email': this.email,
      'password': this.password
    };

    console.log(post);

    this.api.loginUser(post).subscribe({
      next: (res: any) => {
        console.log('Login successful', res);

        if (res.user && res.user.encryptedData && res.user.key && res.user.iv) {
          try {
            // Decrypting the data
            let decryptedData: any = this.decryptData(
              res.user.encryptedData,
              res.user.key,
              res.user.iv
            );
            console.log(decryptedData);
           decryptedData= JSON.parse(decryptedData)
           console.log(decryptedData);
           
            localStorage.setItem('email', decryptedData.email);
            localStorage.setItem('mobile', decryptedData.mobile);
            localStorage.setItem('userId', decryptedData._id);
            localStorage.setItem('name', decryptedData.name);
            localStorage.setItem('image', decryptedData.image);
            // const UserData: any = [decryptedData]
            // localStorage.setItem('userDetails', JSON.stringify(UserData))
            // console.log('Decrypted Data:', JSON.parse(UserData));
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
        this.app.failedpopup = true
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
