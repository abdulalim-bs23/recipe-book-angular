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
    private activateRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private httpService: HttpService, 
  ) {}
  ngOnInit() {
    this.activateRoute.params.subscribe(async (params) => {
      this.routeParamId = params['id'];
      // this.recipeItem = await this.recipeService.getRecipeByRecipeId(this.routeParamId);
      this.getRecipeById();
      this.httpService.recipeRouteParam.next(false);
    });
    this.httpService.callRecipeList.subscribe((data) => {
      this.getRecipeById();
    });
    // this.router.queryParams.subscribe((params) => {
    //   this.queryParam = params['name'];
    // });
  }

  onUpdate() {
    if (this.recipeItem)
      this.httpService.updateRecipeItem.next(this.recipeItem);
  }
  onDelete() {
    // this.confirmBoxEvokeService
    //   .danger('Are you sure to delete?', 'Confirm', 'Decline')
    //   .subscribe((resp) => {
    //     console.log(resp);
    //   });
    if (confirm('Are you sure to delete?')) {
      this.httpService.deleteRecipe(this.recipeItem?.key).subscribe((data) => {
        this.httpService.callRecipeList.next(true);
        this.router.navigate(['/recipes']);
      });
    }
  }

  async getRecipeById() {
    await this.httpService
      .getRecipeById(this.routeParamId)
      .subscribe((data) => {
        this.recipeItem = data;
        if (!!this.recipeItem)
          this.recipeItem.key =
            this.routeParamId == null ? '' : this.routeParamId;
      });
  }
}
