import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    children: [{ path: ':id', component: RecipeDetailComponent }],
  },
  // {
  //   path: 'recipes',
  //   loadChildren: () =>
  //     import('./recipes/recipe.module').then((m) => m.RecipeModule),
  // },
  { path: 'not-found', component: PageNotFountComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
