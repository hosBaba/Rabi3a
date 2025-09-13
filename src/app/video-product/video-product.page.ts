import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RealtimedataService } from '../realtimedata.service';
import { ImageProduct } from '../image-product';
import { VideoProduct } from '../video-product';
@Component({
  selector: 'app-video-product',
  templateUrl: './video-product.page.html',
  styleUrls: ['./video-product.page.scss'],
  standalone:false,
})
export class VideoProductPage implements OnInit {
form!: FormGroup;
videoFile?: File | null;
videoPreview?: string | null;
uploadProgress = 0; // 0..1
isUploading = false;
  produits: ImageProduct[] = [];


  categories = ['Phone','Mode', 'Sac', 'Chaussures', 'Autre'];

private fb=inject(FormBuilder);
private toastCtrl=inject(ToastController);
private real=inject(RealtimedataService);




constructor() {
this.form = this.fb.group({
description: ['', [Validators.maxLength(500)]],
category: ['Produit', Validators.required],
video: [null, Validators.required],
});

}
 

  ngOnInit(): void {

}


ngOnDestroy(): void {
if (this.videoPreview) URL.revokeObjectURL(this.videoPreview);
}

get tags(): FormArray { return this.form.get('tags') as FormArray; }


addTagFromInput(event: any) {
const value = (event?.target?.value || '').trim();
if (!value) return;
if (this.tags.value.includes(value)) { event.target.value=''; return; }
this.tags.push(this.fb.control<string>(value));
event.target.value = '';
}


removeTag(index: number) { this.tags.removeAt(index); }


onFileInputChange(event: Event) {
const input = event.target as HTMLInputElement;
if (!input.files || input.files.length === 0) return;
const file = input.files[0];
this.setVideoFile(file);
}

onDrop(event: DragEvent) {
event.preventDefault();
if (!event.dataTransfer) return;
const file = event.dataTransfer.files?.[0];
if (file) this.setVideoFile(file);
}


onDragOver(event: DragEvent) { event.preventDefault(); }


private setVideoFile(file: File) {
if (!file.type.startsWith('video/')) {
this.presentToast('Veuillez choisir un fichier vidéo.');
return;
}
this.videoFile = file;
this.form.patchValue({ video: file });


if (this.videoPreview) URL.revokeObjectURL(this.videoPreview);
this.videoPreview = URL.createObjectURL(file);
}


async submit() {
if (this.form.invalid || !this.videoFile) {
this.form.markAllAsTouched();
this.presentToast('Complétez les champs requis.');
return;
}

// Simulate upload
this.isUploading = true;
this.uploadProgress = 0;


// TODO: Replace this with your real upload logic (Firebase Storage / Cloudflare Stream / API)
const interval = setInterval(() => {
if (this.uploadProgress >= 1) {
clearInterval(interval);
this.isUploading = false;
this.addProduit(),
this.presentToast('Vidéo téléchargée avec succès !');
this.resetForm();
} else {
this.uploadProgress = Math.min(1, this.uploadProgress + 0.07);
}
}, 150);
}


resetForm() {
this.form.reset({ category: 'Produit', visibility: 'public', allowComments: true });
this.videoFile = null;
if (this.videoPreview) URL.revokeObjectURL(this.videoPreview);
this.videoPreview = null;
this.uploadProgress = 0;
}


async presentToast(message: string) {
const toast = await this.toastCtrl.create({
message,
duration: 2000,
position: 'bottom'
});
toast.present();
}

triggerFileInput() {
  const input = document.getElementById('videoInput') as HTMLInputElement;
  input?.click();
}

     //Ajouter le produit
   async addProduit() {
    const video=this.form.value.video;
    const category=this.form.value.category;
    const prix=this.form.value.prix;
    const description=this.form.value.description;

   const videoUrl = await this.real.uploadVideo(video);
    const produit: VideoProduct = {
  videoUrl:videoUrl,
  category: category,
  description:description,
    };
    await this.real.addItem('video-produit',produit);
  }

}
