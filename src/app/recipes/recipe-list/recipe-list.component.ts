import { Component, ElementRef, ViewChild } from '@angular/core';
import { Recipe } from '../recipe.model';
import RecipeService from 'src/app/services/recipe.service';
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
  constructor(
    private recipeService: RecipeService,
    private httpService: HttpService
  ) { }
  
  ngOnInit() {
    // this.recipeService.getAllRecipes().subscribe(
    //   (recipes) => {
    //     this.recipes = recipes;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );

    this.httpService.getAllRecipes().subscribe((data: any[]) => {
      this.recipes = data;
    });
  }
}
