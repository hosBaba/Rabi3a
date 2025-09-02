import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ImageProduct } from '../image-product';
import { ImageService } from '../image.service';
import { RealtimedataService } from '../realtimedata.service';


@Component({
  selector: 'app-image-product',
  templateUrl: './image-product.page.html',
  styleUrls: ['./image-product.page.scss'],
  standalone: false,
})
export class ImageProductPage implements OnInit {
  form!: FormGroup;
  imageFile?: File | null;
  imagePreview: string | ArrayBuffer | null = null;
  produits: ImageProduct[] = [];

  categories = ['Phone','Mode', 'Sac', 'Chaussures', 'Autre'];

  private fb = inject(FormBuilder);
  private toastCtrl = inject(ToastController);
    private imageservice = inject(ImageService);
        private real = inject(RealtimedataService);



  constructor() {
    this.form = this.fb.group({
      file: [null, Validators.required],   // 🔥 petit f (pas File)
      category: ['', Validators.required],
      prix: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {}

  // Soumission
  async submit() {
    if (this.form.invalid) {
      this.showToast('Veuillez remplir tous les champs obligatoires');
      return;
    }

    this.addProduit()

    console.log('Produit à publier:');

    this.showToast('Produit ajouté avec succès ✅');
    this.form.reset();
    this.imagePreview = null;
    this.imageFile = null;
  }

  // Gestion de l’image
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.form.patchValue({ file: file });
      this.form.get('file')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Pour trigger l’input caché
  openFilePicker() {
    const input = document.getElementById('imageInput') as HTMLInputElement;
    input.click();
  }

  // Toast helper
  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }

      //Ajouter le produit
   async addProduit() {
    const image=this.form.value.file;
    const category=this.form.value.category;
    const prix=this.form.value.prix;
    const description=this.form.value.description;

   const imageUrl = await this.imageservice.uploadImage(image, `imageProduct/${Date.now()}.jpg`);
    const produit: ImageProduct = {
      imageUrl,
      prix,
      category,
      description
    };
    await this.real.addItem('produit',produit);
  }


}
