import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowProductPage } from './show-product.page';

describe('ShowProductPage', () => {
  let component: ShowProductPage;
  let fixture: ComponentFixture<ShowProductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
