import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import RecipeService from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

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
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]*$/)]],
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
  recipes: Recipe[] = [];
  recipeItem: Recipe | undefined;

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // You can access form values like this:
      const nameControl = this.form.get('name')?.value;
      const descriptionControl = this.form.get('description')?.value;
      const imagePath = this.form.get('imagePath')?.value;
      let newRecipe = new Recipe(
        0,
        nameControl,
        descriptionControl,
        imagePath,
        '',
        []
      );

      // this.recipeService.insertRecipe(newRecipe);
      this.httpService.insertRecipe(newRecipe).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );

      this.httpService.getAllRecipes().subscribe((data: any[]) => {
        this.recipes = data;
        console.log(this.recipes);
      });

      this.closeButton?.nativeElement.click();
      this.form.reset();
    }
  }
}
