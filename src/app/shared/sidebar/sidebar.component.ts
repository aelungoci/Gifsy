import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {

  get historial () {
    return [...this.gifsService.historial]; // Llamo a la propiedad historial del servicio ( no hace falta variable local )
  }

  constructor (private gifsService: GifsService){} // Llamamos al servicio

  buscar(termino: string) {
    this.gifsService.buscarGifs(termino);
  }

}
