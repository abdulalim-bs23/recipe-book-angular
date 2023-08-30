import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Recipe } from '../recipe.model';
import RecipeService from 'src/app/services/recipe.service';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  isRouteParam: boolean = true;
  constructor(
    private recipeService: RecipeService,
    private httpService: HttpService,
    private router: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // this.recipeService.getAllRecipes().subscribe(
    //   (recipes) => {
    //     this.recipes = recipes;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );

    this.RecipeList();
    this.httpService.callRecipeList.subscribe((data) => {
      if (data) this.RecipeList();
    });

    this.httpService.recipeRouteParam.subscribe((data) => {
      this.isRouteParam = false;
      this.cdr.detectChanges();
    });
    // this.router.params.subscribe(async (params) => {
    //   let routeParamId = params['id'];
    //   console.log(routeParamId);
    //   if (routeParamId != undefined) {
    //     this.isRouteParam = false;
    //   }
    // });
  }

  RecipeList() {
    this.httpService.getAllRecipes().subscribe((data: any[]) => {
      this.recipes = data;
    });
  }
}
