import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { ImageProduct } from './image-product';
import { Observable } from 'rxjs';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
private firestore=inject(Firestore);
private storage=inject(Storage)

 // Ajouter un produit
  addProduit(produit: ImageProduct) {
    const produitsRef = collection(this.firestore, 'produits');
    return addDoc(produitsRef, produit);
  }

  // Récupérer tous les produits
  getProduits(): Observable<ImageProduct[]> {
    const produitsRef = collection(this.firestore, 'produits');
    return collectionData(produitsRef, { idField: 'id' }) as Observable<ImageProduct[]>;
  }

  // Supprimer un produit
  deleteProduit(id: string) {
    const docRef = doc(this.firestore, `produits/${id}`);
    return deleteDoc(docRef);
  }

  // image uplode
 async uploadImage(file: File, path: string): Promise<string> {
    const fileRef = ref(this.storage, path);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef); // URL publique de l'image
  }


}
