import { Component, Input, OnInit } from '@angular/core';
import { Articulos } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  @Input() noticias: Articulos[] = [];
  @Input() enFavoritos: boolean = false;

  constructor() { }

  ngOnInit() {}

}
