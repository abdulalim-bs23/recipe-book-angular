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

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent {
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

  @ViewChild('myModal') modalElement: any;
  @ViewChild('closeButton') closeButton: ElementRef | undefined;
  @ViewChild('openRecipeModal') openRecipeModal: ElementRef | undefined;
  recipes: Recipe[] = [];
  recipeItem: Recipe | undefined;
  isUpdate: boolean = false;
  recipeIngredients = new FormArray<any>([]);

  onSubmit() {
    if (this.form.valid) {
      let newRecipe = new Recipe(
        0,
        this.form.get('recipeName')?.value,
        this.form.get('description')?.value,
        this.form.get('imagePath')?.value,
        '',
        [
          { name: 'Banana', amount: 11 },
          { name: 'Apple', amount: 22 },
        ]
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
    }
  }
  ngOnInit() {
    this.httpService.updateRecipeItem.subscribe((data) => {
      this.recipeItem = data;
      console.log(this.recipeItem);
      for (let ingredient of this.recipeItem.ingredients) {
        this.recipeIngredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name),
            amount: new FormControl(ingredient.amount),
          })
        );
      }
      this.form = this.fb.group({
        recipeName: [data.name],
        description: [data.description],
        imagePath: [data.imagePath],
        ingredients: this.recipeIngredients,
      });

      this.openRecipeModal?.nativeElement.click();
      this.isUpdate = true;
    });
  }

  removeIngredient() {
    console.log('aaaaaaaaaa');
  }
  addIngredient() {
    const newIngredientGroup = new FormGroup({
      name: new FormControl(''),
      amount: new FormControl(''),
    });
    // Push the new FormGroup to the FormArray
    this.recipeIngredients.push(newIngredientGroup);
  }
}
