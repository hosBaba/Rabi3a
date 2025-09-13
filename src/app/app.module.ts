import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage'
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule,ScrollingModule
 
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },      
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),    
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()) ,
    provideAuth(() => getAuth()) ,
        provideDatabase(() => getDatabase()),



],
  bootstrap: [AppComponent],

})
export class AppModule {


  
}
