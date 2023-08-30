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
  @ViewChild('openRecipeModal') openRecipeModal: ElementRef | undefined;
  recipes: Recipe[] = [];
  recipeItem: Recipe | undefined;
  isUpdate: boolean = false;

  onSubmit() {
    if (this.form.valid) {
      let newRecipe = new Recipe(
        0,
        this.form.get('name')?.value,
        this.form.get('description')?.value,
        this.form.get('imagePath')?.value,
        '',
        []
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
      this.form = this.fb.group({
        name: [data.name],
        description: [data.description],
        imagePath: [data.imagePath],
      });
      this.openRecipeModal?.nativeElement.click();
      this.isUpdate = true;
    });
  }
}
