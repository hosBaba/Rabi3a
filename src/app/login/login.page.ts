import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { ref,get, Database } from '@angular/fire/database';
import { RealtimedataService } from '../realtimedata.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
    standalone: false,

})
export class LoginPage implements OnInit {

private router= inject(Router);
private auth=inject(ServicesService);
private real=inject(RealtimedataService)
private db: Database = inject(Database);

  ngOnInit() {
    
  }


async googleLogin() {
  try {
    const user = await this.auth.signInWithGoogle();

   if (user) {
        const id = user.uid;
        const userRef = ref(this.db, `userinfo/${id}`);

        // ✅ قراءة لمرة واحدة فقط
        const snapshot = await get(userRef);
        const userData = snapshot.exists() ? snapshot.val() : null;

        if (userData && userData.name && userData.phone) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/userinfo'], { queryParams: { id } });
        }
      }
    } catch (err) {
      console.error('Google login error:', err);
    }
}


    

  }

  
    
  

