import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpressaoModel } from 'src/app/models/ExpressaoModel';
import { GrupoModel } from 'src/app/models/GrupoModel';

@Injectable({
  providedIn: 'root'
})
export class ExpressoesService {

  private API_GRUPOS = "https://back-yae.herokuapp.com";
  constructor(private http: HttpClient) { }

  private mapGrupos(grupos: Array<any>): GrupoModel[] {
    return grupos.map(grupo => ({
      id: grupo.id,
      nome: grupo.nome
    }));
  }

  public getGrupos(): Observable<GrupoModel[]> {
    return this.http.get<any[]>(`${this.API_GRUPOS}/grupos`)
      .pipe(
        map((res: any) => this.mapGrupos(res))
      );
  }

  getConjuntoPorGrupo(grupoId: number) {
    let qtdExpressoes = this.http.get<any>(`${this.API_GRUPOS}/grupos/${grupoId}/conjunto`);
    return qtdExpressoes;
  }

  private mapExpressao(expressoes: Array<any>): ExpressaoModel[] {
    return expressoes.map(expressao => ({
      grupoId: expressao.grupoId,
      id: expressao.id,
      expressao: expressao.expressao,
      dica: expressao.dica
    }));
  }

  getConjuntoPorGrupoPaginado(grupoId: number, page: number): Observable<ExpressaoModel[]> {
    return this.http.get<any>(`${this.API_GRUPOS}/grupos/${grupoId}/conjunto?_page=${page}&_limit=1`)
      .pipe(
        map((res: any) => this.mapExpressao(res))
      );
  }
}
