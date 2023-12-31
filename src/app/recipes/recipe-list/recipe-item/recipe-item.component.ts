import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { Route, Router } from '@angular/router';
import RecipeService from 'src/app/services/recipe.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipeItem: Recipe | undefined;

  isHighlighted: boolean = false;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private httpService: HttpService
  ) {}

  onClickItem() {
    // this.outRecipeItem.emit(this.recipeItem);
    //  this.recipeService.sendRecipe.emit(this.recipeItem);
    this.httpService.callRecipeList.next(true);
    this.isHighlighted = true;
    this.router.navigate(['/recipes', this.recipeItem?.key]);
  }
}
