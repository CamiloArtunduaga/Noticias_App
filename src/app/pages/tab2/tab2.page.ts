import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Articulos } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias = [
    'business', 
    'entertainment', 
    'general', 
    'health', 
    'science', 
    'sports', 
    'technology'
  ];

  noticias: Articulos[] = [];

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.segment.value)
  }

  constructor( private noticiasService: NoticiasService ) {}

  cambioCategoria( ev ) {

    console.log(ev.detail.value)

    this.cargarNoticias(ev.detail.value);

    this.noticias= [];

  }

  cargarNoticias( categoria: string, event?) {
    
    this.noticiasService.getCategorias( categoria ).subscribe ( resp => {
      console.log(resp);

      if(resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
      } 
      this.noticias.push( ...resp.articles );

      if(event) {
        event.target.complete();
      }
    } );

  }

  loadData( event ) {

    this.cargarNoticias( this.segment.value, event );

  }

  

}
