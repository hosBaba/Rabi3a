import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
    standalone: false,

})
export class LoginPage implements OnInit {

  phoneNumber: string = '';
  otpCode: string = '';
  showOTP: boolean = false;

  constructor( private authService:ServicesService) { }

  ngOnInit() {
  }


    async sendOT() {
    try {
      await this.authService.sendOTP(this.phoneNumber);
      this.showOTP = true;
    } catch (err) {
      console.error('Error sending OTP:', err);
    }
  }

  async verifyOT() {
    try {
      const userCred = await this.authService.verifyOTP(this.otpCode);
      console.log('User signed in:', userCred.user);
      alert('تم تسجيل الدخول بنجاح!');
    } catch (err) {
      console.error('Invalid OTP:', err);
      alert('رمز OTP غير صحيح!');
    }
  }
}
