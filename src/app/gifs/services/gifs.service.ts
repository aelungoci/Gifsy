import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] =  [];

  private apiKey: string = 'GkUdh0dY7ftmnSHeFpYGhYDHuOgrqWD5';
  private apiService: string = 'https://api.giphy.com/v1/gifs';

  public resultados: Gifs[] = []; // public porque da igual quien acceda | Gifs[] es del tipo de la interfaz

  get historial() {
    return [...this._historial];
  }

  constructor (private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; // MUESTRA EL HISTORIAL DEL LOCAL STORAGE
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []; // MUESTRA LOS RESULTADOS ALMACENADOS EN EL LOCAL STORAGE

    // if (localStorage.getItem('historial')) { // Si el historial existe
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // } LO MISMO PERO MÁS LARGO
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    // Historial
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }

    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    // API resultados
    this.http.get<SearchGifsResponse>(`${this.apiService}/search`, {params})
      .subscribe(resp => {
        console.log(resp.data);
        this.resultados = resp.data;
        // Cuando ya tenga la respuesta, guárdala en el Local Storage
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })

  }
  
}
