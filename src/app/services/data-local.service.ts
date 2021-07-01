import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Articulos } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
 
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
 
  private _storage: Storage | null = null;
 
  noticias: Articulos[] = [];
 
  constructor(private storage: Storage,
              public toastCtrl_: ToastController) {
 
    this.cargarFavoritos();
 
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl_.create({
      message,
      duration: 1500
    });
    toast.present();
  }




  async guardarNoticia(noticia: Articulos) {
const existe = this.noticias.find(noti => noti.title === noticia.title);
 
    if (!existe) {
 
      this.noticias.unshift(noticia);
      await this.cargarFavoritos();
      this._storage.set('favoritos', this.noticias);
    }
    this.presentToast( 'Guardada en Favoritos' );
   
  }
 
  async cargarFavoritos() {
    let storageData = await this.storage.create();
    this._storage = storageData;
    const favoritos = await this._storage.get('favoritos');
 
    if (favoritos) {
 
      this.noticias = favoritos;
    }
  } 
  borrarNoticia( noticia: Articulos ) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    this._storage.set('favoritos', this.noticias);
    this.presentToast( 'Eliminada de favoritos' );
  }
 
}