import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component'; 
import { RouterModule, Routes } from '@angular/router'; 
import { AuthGuardService } from '../services/auth-guard.service'; 
import { RecipeRoutingModule } from './recipe-routing.module';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';  
import { SharedModule } from '../Shared/shared.module';
import { CarouselComponent } from './carousel/carousel.component';

const routes: Routes = [
  {
    path: '',
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
    // NewRecipeComponent, 
    // CarouselComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    //RecipeRoutingModule,
    RouterModule,
  ],
  exports: [],
  providers: [],
})
export class RecipeModule {}
