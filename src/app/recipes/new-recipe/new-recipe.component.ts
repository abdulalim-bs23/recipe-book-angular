import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import RecipeService from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent {
  @ViewChild('myModal') modalElement: any;
  @ViewChild('closeButton') closeButton: ElementRef | undefined;
  @ViewChild('openRecipeModal') openRecipeModal: MatButton | undefined;
  recipes: Recipe[] = [];
  recipeItem: Recipe | undefined;
  isUpdate: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private httpService: HttpService
  ) {
    this.form = this.fb.group({
      recipeName: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z ]*$/)],
      ],
      description: [''],
      imagePath: [''],
      ingredients: this.fb.array([]),
    });

    // this.form = new FormGroup({
    //   name: new FormControl(null, Validators.required),
    //   description: new FormControl(null),
    // });
  }

  get recipeIngredients() {
    return this.form.controls['ingredients'] as FormArray;
  }

  ngOnInit() {

    this.httpService.updateRecipeItem.subscribe((data) => {
      this.recipeItem = data;
      if (
        this.recipeItem.ingredients &&
        this.recipeItem.ingredients.length > 0
      ) {
        for (let ingredient of this.recipeItem.ingredients) {
          this.recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, Validators.required),
            })
          );
        }
      } else {
        // const newIngredientGroup = new FormGroup({
        //   name: new FormControl(''),
        //   amount: new FormControl(''),
        // });
        // this.recipeIngredients.push(newIngredientGroup);
      }
      this.form = this.fb.group({
        recipeName: [data.name],
        description: [data.description],
        imagePath: [data.imagePath],
        ingredients: this.recipeIngredients,
      });
      this.openRecipeModal?._elementRef.nativeElement.click();
      this.isUpdate = true;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const ingredientsArray: Ingredient[] = [];
      this.recipeIngredients.controls.forEach((control) => {
        const name = control.get('name')?.value;
        const amount = control.get('amount')?.value;
        if (name && amount !== null) {
          ingredientsArray.push(new Ingredient(name, amount));
        }
      });
      console.log(ingredientsArray);
      let newRecipe = new Recipe(
        0,
        this.form.get('recipeName')?.value,
        this.form.get('description')?.value,
        this.form.get('imagePath')?.value,
        '',
        ingredientsArray
      );

      // this.recipeService.insertRecipe(newRecipe);
      if (this.isUpdate) {
        newRecipe.key = this.recipeItem?.key;
        this.httpService.updateRecipe(newRecipe).subscribe((data) => {
          this.isUpdate = false;
          this.httpService.callRecipeList.next(true);
        });
      } else {
        this.httpService.insertRecipe(newRecipe).subscribe(
          (data) => {
            console.log(data);
            this.httpService.callRecipeList.next(true);
          },
          (err) => {
            console.log(err);
          }
        );
      }

      this.closeButton?.nativeElement.click();
      this.form.reset();
      this.recipeIngredients.clear();
    }
  }

  addIngredient() {
    const newIngredientGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });
    this.recipeIngredients.push(newIngredientGroup);
  }

  removeIngredient(index: number) {
    this.recipeIngredients.removeAt(index);
  }
  CloseModal() {
    this.form.reset();
    this.recipeIngredients.clear();
  }
}
