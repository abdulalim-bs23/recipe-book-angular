import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import RecipeService from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent {
  // @Input() recipeItem: Recipe | undefined;
  routeParamId: number = 0;
  queryParam: string = '';
  recipeItem : Recipe | undefined ;
  constructor(
    private router: ActivatedRoute,
    private recipeService: RecipeService
  ) {}
  ngOnInit() {
    console.log('from recipe detail');
    this.router.params.subscribe(async (params) => {
      this.routeParamId = params['id']; 
      console.log(this.routeParamId);
      this.recipeItem = await this.recipeService.getRecipeByRecipeId(this.routeParamId); 
    });

    this.router.queryParams.subscribe((params) => {
      this.queryParam = params['name'];
    });
  }
}
