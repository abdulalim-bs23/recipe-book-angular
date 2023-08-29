import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import RecipeService from 'src/app/services/recipe.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent {
  // @Input() recipeItem: Recipe | undefined;
  routeParamId: string = '';
  queryParam: string = '';
  recipeItem: Recipe | undefined;
  constructor(
    private router: ActivatedRoute,
    private recipeService: RecipeService,
    private httpService: HttpService
  ) {}
  ngOnInit() {
    console.log('from recipe detail');
    this.router.params.subscribe(async (params) => {
      this.routeParamId = params['id'];
      // this.recipeItem = await this.recipeService.getRecipeByRecipeId(this.routeParamId);
      await this.httpService
        .getRecipeById(this.routeParamId)
        .subscribe((data) => {
          this.recipeItem = data;
        });
    });

    this.router.queryParams.subscribe((params) => {
      this.queryParam = params['name'];
    });
  }
}
