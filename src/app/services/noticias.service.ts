import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  linesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http_:HttpClient ) { }

  private ejecutarQuery<T>( query: string) {

    query = apiUrl + query;

    return this.http_.get<T>( query, { headers } );
  }

  getTopHeadlines() {
    this.linesPage ++ ;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.linesPage}`);
    
  }

  getCategorias( categoria: string ) {
    if( this.categoriaActual === categoria ){
      this.categoriaPage ++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${ this.categoriaPage }`);
  
  }
}
