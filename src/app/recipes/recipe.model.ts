import { Ingredient } from '../Shared/ingredient.model';

export class Recipe {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(
    id: number,
    name: string,
    description: string,
    imagePath: string,
    ingredients: Ingredient[]
  ) {
    this.id = id;
    this.name = name.trim();
    this.description = description.trim();
    this.imagePath = imagePath.trim();
    this.ingredients = ingredients;
  }
}
