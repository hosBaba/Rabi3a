import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Database, ref, get, set } from '@angular/fire/database';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone:false
})
export class ProfilePage implements OnInit {
  private auth: Auth = inject(Auth);
  private db: Database = inject(Database);
  private fb: FormBuilder = inject(FormBuilder);
  private service=inject(ServicesService);
  private router=inject(Router)

  userInfo: any = null;
  showModal = false;
  updateForm: FormGroup;

  constructor() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  async ngOnInit() {
    await this.loadUserInfo();
  }

  async loadUserInfo() {
    const user = this.auth.currentUser;
    if (user) {
      const uid = user.uid;
      const snapshot = await get(ref(this.db, `userinfo/${uid}`));
      if (snapshot.exists()) {
        this.userInfo = snapshot.val();
      }
    }
  }

  openUpdateModal() {
    // تهيئة الفورم بالقيم الحالية
    if (this.userInfo) {
      this.updateForm.setValue({
        name: this.userInfo.name,
        phone: this.userInfo.phone,
      });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async saveUpdate() {
    const user = this.auth.currentUser;
    if (user && this.updateForm.valid) {
      const uid = user.uid;
      const updatedData = {
        id: uid,
        name: this.updateForm.value.name,
        phone: this.updateForm.value.phone,
      };

      await set(ref(this.db, `userinfo/${uid}`), updatedData);

      this.userInfo = updatedData; // تحديث العرض مباشرة
      this.closeModal();
    }
  }

  logout(){
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
