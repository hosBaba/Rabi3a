import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoProductPage } from './video-product.page';

describe('VideoProductPage', () => {
  let component: VideoProductPage;
  let fixture: ComponentFixture<VideoProductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
