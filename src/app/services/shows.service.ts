import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shows } from '../interfaces/shows';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {


  url = environment.apiUrl

  httpHeaders = {
    headers: new HttpHeaders(
      { 
        'Content-Type': 'application/json' 
      }
    )
  }

  constructor(private http: HttpClient) { }

  getShows(){
    return this.http.get<Shows[]>(`${this.url}/shows`)
  
  }

  getShowsByName(string: string){
    return this.http.get<Shows[]>(`${this.url}/search/shows?q=:${string}`)
  }

  getShowInfo(id: number){
    return this.http.get<Shows[]>(`${this.url}/shows/${id}?embed[]=episodes&embed[]=cast&embed[]=crew`)
  }
}
