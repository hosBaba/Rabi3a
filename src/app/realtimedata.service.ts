import { Injectable, NgZone, inject } from '@angular/core';
import { Database, ref as dbRef, set, push, onValue, remove } from '@angular/fire/database';
import { getDownloadURL, ref as storageRef, Storage, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ImageProduct } from './image-product';
import { VideoProduct } from './video-product';

@Injectable({
  providedIn: 'root'
})
export class RealtimedataService {

  private db = inject(Database);
  private storage = inject(Storage);
  private ngZone = inject(NgZone);


  // إضافة عنصر
  addItem(path: string, data: any) {
    const listRef = dbRef(this.db, path);
    const newRef = push(listRef);
    return set(newRef, data);
  }

  // قراءة كل العناصر
getItems(path: string): Observable<ImageProduct[]> {
  return new Observable((observer) => {
    const listRef = dbRef(this.db, path); // ✅ استخدم dbRef هنا

    const unsubscribe = onValue(
      listRef,
      (snapshot) => {
        const items: ImageProduct[] = [];
        snapshot.forEach((childSnap) => {
          items.push({ id: childSnap.key!, ...childSnap.val() });
        });
        observer.next(items);
      },
      (error) => observer.error(error)
    );

    // تنظيف الاشتراك عند الانتهاء
    return () => unsubscribe();
  });
}


  // قراءة كل العناصر
 videoItems(path: string): Observable<VideoProduct[]> {
  return new Observable((observer) => {
    const listRef = dbRef(this.db, path); // ✅ استخدم dbRef هنا

    const unsubscribe = onValue(
      listRef,
      (snapshot) => {
        const items: VideoProduct[] = [];
        snapshot.forEach((childSnap) => {
          items.push({ id: childSnap.key!, ...childSnap.val() });
        });
        observer.next(items);
      },
      (error) => observer.error(error)
    );

    // تنظيف الاشتراك عند الانتهاء
    return () => unsubscribe();
  });
}


  // حذف عنصر
  deleteItem(path: string, id: string) {
    return remove(dbRef(this.db, `${path}/${id}`));
  }

  // رفع صورة
  async uploadImage(file: File): Promise<string> {
    const path = `produits/${Date.now()}.jpg`;
    const fileRef = storageRef(this.storage, path);  // ✅ StorageReference
    await uploadBytes(fileRef, file);               // رفع الصورة
    const imageUrl = await getDownloadURL(fileRef); // الحصول على رابط التحميل
    return imageUrl;
  }

   // Récupérer un produit spécifique par id
  getProductById(path: string, id: string): Observable<ImageProduct | null> {
    return new Observable((observer) => {
      const productRef = dbRef(this.db, `${path}/${id}`);
      console.log('Fetching product from path:', `${path}/${id}`);

      const unsubscribe = onValue(
        productRef,
        (snapshot) => {
          const data = snapshot.val();
          console.log('Snapshot value:', data);

          if (data) {
            observer.next({ id: snapshot.key!, ...data });
          } else {
            observer.next(null);
          }
        },
        (error) => {
          console.error('Firebase error:', error);
          observer.error(error);
        }
      );

      return () => unsubscribe();
    });
  }


  // uplod video

async uploadVideo(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `videos/${Date.now()}_${file.name}`;
      const storRef = storageRef(this.storage, filePath);
      const uploadTask = uploadBytesResumable(storRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => reject(error),
        async () => {
          // ✅ نرجع للـ Angular Zone عشان نتفادى الخطأ
          this.ngZone.run(async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          });
        }
      );
    });
  }

}
