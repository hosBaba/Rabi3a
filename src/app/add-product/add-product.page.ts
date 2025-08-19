import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],

  standalone:false,
})


export class AddProductPage implements OnInit {
  productForm: FormGroup;
    imagePreview: string | ArrayBuffer | null = null;


  selectedFile!: File;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
selectedFiles: File[] = [];

  constructor(   private router:Router, private fb:FormBuilder) {
    this.productForm = this.fb.group({
      type: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      File: [null, Validators.required] // حقل الملف
    });
   }

  ngOnInit() {
     this.productForm = this.fb.group({
      file: [null]
    });
  }

    // معالجة رفع الصورة
   onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.productForm.patchValue({ file: file });
    }
     const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result; // عرض المعاينة
        };
        reader.readAsDataURL(file); // قراءة الصورة
      }
  }
  


