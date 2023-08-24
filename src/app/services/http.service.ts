import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl =
    'https://angular-complete-guide-cb559-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  insertRecipe(recipe: Recipe): Observable<any> {
    let url = this.baseUrl + 'recipes.json';
    let res = this.http.post(url, recipe);
    return res;
  }

  getAllRecipes(): Observable<Recipe[]> {
    let url = this.baseUrl + 'recipes.json';
    return this.http.get<{ [key: string]: Recipe }>(url).pipe(
      map((response) => {
        const recipesArray: Recipe[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            recipesArray.push(response[key]);
          }
        }
        return recipesArray;
      })
    );
  }
}
