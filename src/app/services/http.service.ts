import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl =
    'https://angular-complete-guide-cb559-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  recipeRouteParam = new Subject<boolean>();
  updateRecipeItem = new Subject<Recipe>();
  callRecipeList = new Subject<boolean>();
  loadRecipeDetail = new Subject<string>();

  insertRecipe(recipe: Recipe): Observable<any> {
    const url = `${this.baseUrl}recipes.json?${
      this.getTokenParam() == null ? '' : this.getTokenParam()
    }`;
    let res = this.http.post(url, recipe);
    return res;
  }
  updateRecipe(recipe: Recipe): Observable<any> {
    const url = `${this.baseUrl}recipes/${recipe.key}.json?${
      this.getTokenParam() == null ? '' : this.getTokenParam()
    }`;
    let res = this.http.patch(url, recipe);
    return res;
  }
  deleteRecipe(recipeId: string | undefined): Observable<any> {
    const url = `${this.baseUrl}recipes/${recipeId}.json?${
      this.getTokenParam() == null ? '' : this.getTokenParam()
    }`;
    return this.http.delete(url);
  }

  getAllRecipes(): Observable<Recipe[]> {
    const url = `${this.baseUrl}recipes.json?${
      this.getTokenParam() == null ? '' : this.getTokenParam()
    }`;
    return this.http.get<{ [key: string]: Recipe }>(url).pipe(
      map((response) => {
        const recipesArray: Recipe[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            let newRecipe = new Recipe(
              response[key].id,
              response[key].name,
              response[key].description,
              response[key].imagePath,
              key,
              []
            );
            recipesArray.push(newRecipe);
          }
        }
        return recipesArray;
      })
    );
  }

  getRecipeById(recipeId: string): Observable<Recipe> {
    const url = `${this.baseUrl}recipes/${recipeId}.json?${
      this.getTokenParam() == null ? '' : this.getTokenParam()
    }`;
    return this.http.get<Recipe>(url);
  }

  getTokenParam = (): any => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString != null) {
      const userData = JSON.parse(userDataString);
      const queryParams = {
        auth: userData._token,
      };
      const params = new HttpParams({ fromObject: queryParams });
      return params;
    }
    return null;
  };
}
