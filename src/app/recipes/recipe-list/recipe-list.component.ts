import { Component, ElementRef, ViewChild } from '@angular/core';
import { Recipe } from '../recipe.model';
import RecipeService from 'src/app/services/recipe.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  @ViewChild('myModal') modalElement: any;
  @ViewChild('closeButton') closeButton: ElementRef | undefined;
  recipes: Recipe[] = [];
  recipeItem: Recipe | undefined;

  currentDate: Date = new Date();

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe(
      (recipes) => {
        this.recipes = recipes;
      },
      (err) => {
        console.log(err);
      }
    );
 
    // this.httpService.getAllRecipes().subscribe((data: any[]) => {
    //   this.recipes = data;
    //   console.log(this.recipes);
    // });
  }

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private httpService: HttpService
  ) {
    this.form = this.fb.group({
      name: [
        'Pizza',
        [Validators.required, Validators.pattern(/^[A-Za-z ]*$/)],
      ],
      // email: ['', [Validators.required, Validators.email]],
      description: ['test description'],
      ingredients: this.fb.array([]),
    });

    // this.form = new FormGroup({
    //   name: new FormControl(null, Validators.required),
    //   description: new FormControl(null),
    // });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // You can access form values like this:
      const nameControl = this.form.get('name')?.value;
      const descriptionControl = this.form.get('description')?.value;
      let newRecipe = new Recipe(0, nameControl, descriptionControl, '', []);

      this.recipeService.insertRecipe(newRecipe);
      this.httpService.insertRecipe(newRecipe).subscribe(data => { 
        console.log(data);
      });
      
      this.httpService.getAllRecipes().subscribe((data: any[]) => {
        this.recipes = data;
        console.log(this.recipes);
      });

      this.closeButton?.nativeElement.click();
      this.form.reset();
    }
  }
  test()
  {
    console.log('test');
  }
}
