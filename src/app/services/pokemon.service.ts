import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";

import {environment} from '../../environments/env.test';
import {APIResponse} from "../components/utils/utils";
import {Pokemon} from "../models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private _http: HttpClient
  ) { }

  public getPokemons(options: {offset: number, limit: number}): Observable<any> {
    let queryParams = new HttpParams({ fromObject: options });
    return this._http.get<APIResponse>(`${environment.urlAPI}/pokemon`, {params: queryParams}).pipe(map(response => {
      console.log(response);
      if (response) {
        return response;
      } else {
        throw 'error';
      }
    }));
  }

  public getPokemonDetails(name: string): Observable<any> {
    return this._http.get<Pokemon>(`${environment.urlAPI}/pokemon/${name}`).pipe(map(response => {
      console.log(response);
      if (response) {
        return response;
      } else {
        throw 'error';
      }
    }));
  }
}
