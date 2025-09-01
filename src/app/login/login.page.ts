import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { getAuth, GoogleAuthProvider, signInWithCredential,signInWithPopup,User } from '@angular/fire/auth';
import { isPlatform } from '@ionic/angular';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
    standalone: false,

})
export class LoginPage implements OnInit {

private router= inject(Router);
private auth=inject(ServicesService)
  ngOnInit() {
    
  }
 async googleLogin() {
    const user = await this.auth.signInWithGoogle();
    if (user) {
      this.router.navigate(['/home']);
    }
  }
}
