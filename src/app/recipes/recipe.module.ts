import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HighlightDirective } from '../Shared/highlight.directive';
import { AuthGuardService } from '../services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeRoutingModule } from './recipe-routing.module';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    children: [{ path: ':id', component: RecipeDetailComponent }],
  },
  { path: 'recipes/:name', component: RecipesComponent },
];

@NgModule({
  declarations: [
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeItemComponent,
    // RecipeDetailComponent,
    // HighlightDirective,
  ],
  imports: [
    //RouterModule.forChild(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
  ],
  exports: [],
  providers: [],
})
export class RecipeModule {}
