import { Component, OnInit } from '@angular/core';
import { ConfirmationResult } from '@angular/fire/auth';
import { ServicesService } from '../services.service';
@Component({
  selector: 'app-log-with-phone',
  templateUrl: './log-with-phone.page.html',
  styleUrls: ['./log-with-phone.page.scss'],
  standalone:false,
})
export class LogWithPhonePage implements OnInit {
phoneNumber: string = '';
  otpCode: string = '';
  showOTP: boolean = false;

  constructor(private authService: ServicesService) {}
  ngOnInit(): void {
  }

  async sendOTP() {
    try {
      await this.authService.sendOTP(this.phoneNumber);
      this.showOTP = true;
    } catch (err) {
      console.error('Error sending OTP:', err);
    }
  }

  async verifyOTP() {
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
