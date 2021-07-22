import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { GrupoComponent } from './components/grupo/grupo.component';

const routes: Routes = [{
  path: 'exercise/:grupoId',
  component: ExercisesComponent
}, {
  path: '',
  component: GrupoComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
