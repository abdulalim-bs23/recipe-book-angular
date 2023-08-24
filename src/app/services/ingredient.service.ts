import { Injectable } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 2),
    new Ingredient('Banana', 5),
  ];

  startEditing = new Subject<number>();

  getIngredients(): Observable<Ingredient[]> {
    return of(this.ingredients);
  }

  getSelectedIngredient(index: number): Observable<Ingredient> {
    return of(this.ingredients[index]);
  }

  insertIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  deleteIngredient(index: number) { 
    this.ingredients.splice(index, 1);
  }

  constructor() {}
}
