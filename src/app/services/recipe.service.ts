import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { Recipe } from '../recipes/recipe.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      1,
      'A test recipe 1',
      'This is a test recipe',
      'https://rb.gy/z2w4r',
      '',
      [new Ingredient('Apples', 3), new Ingredient('Banana', 4)]
    ),
    new Recipe(
      2,
      'A test recipe 2',
      'This is a test recipe',
      'https://rb.gy/t6c48',
      '',
      [new Ingredient('Apples', 3), new Ingredient('Banana', 4)]
    ),
  ];

  constructor() {}

  updateShopping = new EventEmitter<any>();

  getAllRecipes = (): Observable<Recipe[]> => {
    return of(this.recipes.slice());
  };

  async getRecipeByRecipeId(id: number): Promise<any> {
    return this.recipes.find((obj) => obj.id == id);
  }

  async insertRecipe(recipe: Recipe): Promise<any> {
    recipe.id = this.recipes[this.recipes.length - 1].id + 1;
    recipe.imagePath = this.recipes[this.recipes.length - 1].imagePath;
    this.recipes.push(recipe);
  }
}
