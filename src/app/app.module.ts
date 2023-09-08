import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ServersComponent } from './practice/servers/servers.component';
import { ServerComponent } from './practice/server/server.component';
import { CockpitComponent } from './practice/cockpit/cockpit.component'; 
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component'; 
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './Shared/loading-spinner/loading-spinner.component';
import { RecipeModule } from './recipes/recipe.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { HighlightDirective } from './Shared/highlight.directive';
import { NewRecipeComponent } from './recipes/new-recipe/new-recipe.component';  
import { CustomerModule } from './customer/customer.module';
import { SharedModule } from './Shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    ServersComponent,
    ServerComponent,
    CockpitComponent,
    PageNotFountComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    HighlightDirective,
    NewRecipeComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    //RecipeModule,
    CustomerModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
