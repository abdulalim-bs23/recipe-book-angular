import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { RecipesComponent } from './recipes.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    children: [{ path: ':id', component: RecipeDetailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
