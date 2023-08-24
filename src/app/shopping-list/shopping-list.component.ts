import { Component } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import RecipeService from '../services/recipe.service';
import { IngredientService } from '../services/ingredient.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [];

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService
  ) {
    this.recipeService.updateShopping.subscribe((ingredient: Ingredient) => {
      this.ingredients.push(ingredient);
    });
  }

  ngOnInit() {
    this.ingredientService.getIngredients().subscribe((data) => {
      this.ingredients = data;
    });
  }

  onReceiveIngredient = (ingredient: Ingredient) => {
    //this.ingredients.push(ingredient);
  };

  onEdit(index: number) {
    this.ingredientService.getSelectedIngredient(index).subscribe((ingredient: Ingredient) => {
      this.ingredientService.startEditing.next(index);
    });
  }
}
