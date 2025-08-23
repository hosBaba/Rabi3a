import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageProductPage } from './image-product.page';

describe('ImageProductPage', () => {
  let component: ImageProductPage;
  let fixture: ComponentFixture<ImageProductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
