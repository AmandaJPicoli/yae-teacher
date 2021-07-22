import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GrupoModel } from 'src/app/models/GrupoModel';
import { ExpressoesService } from 'src/app/services/expressoes/expressoes.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {

  constructor(
    private router: Router,
    private grupoService: ExpressoesService) { }

  public grupos$: Observable<GrupoModel[]> | undefined;


  ngOnInit(): void {
    this.retornaGrupos();
  }

  //Retorna grupos
  retornaGrupos() {
    this.grupos$ = this.grupoService.getGrupos();
  }

  abrirModulo(grupoId: number) {
    this.router.navigate([`/exercise/${grupoId}`]);
  }

}
