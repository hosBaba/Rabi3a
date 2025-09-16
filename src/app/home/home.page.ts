import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { RealtimedataService } from '../realtimedata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage  {
  private router = inject(Router);
  private authService = inject(ServicesService);
  private real = inject(RealtimedataService);

  displayMode: string = 'image';
  imageProducts: any[] = [];
  allVideos: any[] = [];
imagePairs: any[] = [];


 @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;
  
  private observer!: IntersectionObserver;
  private observedVideos = new Map<HTMLVideoElement, boolean>();
  // جلب جميع الفيديوهات من التمبلت
 // @ViewChildren('videoPlayer', { read: ElementRef }) videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;

  ngOnInit(): void {
    this.real.getItems('produit').subscribe((items: any[]) => {
      this.imageProducts = [...items].reverse();

    });

    this.real.videoItems('video-produit').subscribe((items: any[]) => {
      this.allVideos = [...items].reverse();
    });
  }

//observer section
 ngAfterViewInit() {
    this.setupIntersectionObserver();
    this.videoPlayers.changes.subscribe(() => {
      this.setupIntersectionObserver();
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  setupIntersectionObserver() {
    // Détruire l'observateur existant
    if (this.observer) {
      this.observer.disconnect();
      this.observedVideos.clear();
    }

    // Créer un nouvel observateur
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const video = entry.target as HTMLVideoElement;
          
          if (entry.isIntersecting) {
            // Vidéo visible - lecture
            this.playVideo(video);
          } else {
            // Vidéo non visible - pause
            this.pauseVideo(video);
          }
        });
      },
      {
        threshold: 0.5, // 50% de la vidéo doit être visible
        rootMargin: '0px'
      }
    );

    // Observer tous les lecteurs vidéo
    this.videoPlayers.forEach(videoRef => {
      const video = videoRef.nativeElement;
      if (!this.observedVideos.has(video)) {
        this.observer.observe(video);
        this.observedVideos.set(video, true);
      }
    });
  }

  playVideo(video: HTMLVideoElement) {
    if (video.paused) {
      video.play().catch(error => {
        console.log('Erreur de lecture vidéo:', error);
      });
    }
  }

  pauseVideo(video: HTMLVideoElement) {
    if (!video.paused) {
      video.pause();
    }
  }

  onVideoLoad(video: HTMLVideoElement) {
    // Optionnel: Précharger la vidéo mais ne pas jouer automatiquement
    video.preload = 'auto';
  }





//
  togglePlay(video: HTMLVideoElement) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  onlogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  trackByFn(index: number, item: any): string {
    return item.id || index.toString();
  }

  likeVideo(video: any) {
  console.log('Liked video', video.id);
  // هنا يمكن تحديث الـ likes في Firebase
}

commentVideo(video: any) {
  console.log('Comment on video', video.id);
  // هنا يمكن فتح modal أو صفحة التعليقات
}

}
