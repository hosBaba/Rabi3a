import { Injectable } from '@angular/core';
import { Auth, signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult, UserCredential, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
}) 
export class ServicesService {   

 confirmationResult: ConfirmationResult | null = null;

  constructor(private auth: Auth,private router:Router) {}

  // إرسال OTP
  async sendOTP(phoneNumber: string): Promise<void> {
    if (!phoneNumber) throw new Error('رقم الهاتف مطلوب');

    const appVerifier = new RecaptchaVerifier(this.auth, 'recaptcha-container', {
      size: 'invisible'
    });

    this.confirmationResult = await signInWithPhoneNumber(this.auth, phoneNumber, appVerifier);
    console.log('OTP sent successfully');
  }

  // التحقق من OTP
  async verifyOTP(code: string): Promise<UserCredential> {
    if (!this.confirmationResult) throw new Error('OTP لم يتم إرساله بعد');
    return this.confirmationResult.confirm(code);
  }

  
  // logout function:
  logout() {
    return signOut(this.auth)
      .then(() => {
      this.router.navigateByUrl('/login')
        console.log('User signed out successfully');
      })
      .catch(err => {
        console.error('Error signing out:', err);
      });
  }
}
