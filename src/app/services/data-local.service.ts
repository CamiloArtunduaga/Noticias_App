import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Articulos } from '../interfaces/interfaces';
 
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
 
  private _storage: Storage | null = null;
 
  noticias: Articulos[] = [];
 
  constructor(private storage: Storage) {
 
    this.cargarFavoritos();
 
  }
  async guardarNoticia(noticia: Articulos) {
const existe = this.noticias.find(noti => noti.title === noticia.title);
 
    if (!existe) {
 
      this.noticias.unshift(noticia);
      await this.cargarFavoritos();
      this._storage.set('favoritos', this.noticias);
    }
   
  }
 
  async cargarFavoritos() {
    let storageData = await this.storage.create();
    this._storage = storageData;
    const favoritos = await this._storage.get('favoritos');
 
    if (favoritos) {
 
      this.noticias = favoritos;
 
    }
  } 
 
}