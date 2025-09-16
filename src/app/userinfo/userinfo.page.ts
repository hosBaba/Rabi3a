import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Database, ref, set } from '@angular/fire/database';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
  standalone:false
})
export class UserinfoPage implements OnInit {

  loginForm: FormGroup;
  uid: string | null = null;
  private fb=inject(FormBuilder)
  private router=inject(Router)
  private auth: Auth = inject(Auth);
  private db: Database = inject(Database);

  constructor() {  this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
    });}

  ngOnInit() {
  }

async saveProfile() {
    const user = this.auth.currentUser;
    if (user) {
      const uid = user.uid;

      const userinfo = {
        id: uid,
        name: this.loginForm.value.name,
        phone: this.loginForm.value.phone,
      };

      await set(ref(this.db, `userinfo/${uid}`), userinfo);

      // ✅ بعد الحفظ → يروح للصفحة الرئيسية
      this.router.navigate(['/home']);
    }
}
}