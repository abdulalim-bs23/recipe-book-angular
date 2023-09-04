import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'auth', component: AuthComponent },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    children: [{ path: ':id', component: RecipeDetailComponent }],
  },
  { path: 'recipes/:name', component: RecipesComponent },
  // {
  //   path: 'recipes',
  //   loadChildren: () =>
  //     import('./recipes/recipe.module').then((m) => m.RecipeModule),
  // },

  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  }, // Customer module
  { path: 'not-found', component: PageNotFountComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
