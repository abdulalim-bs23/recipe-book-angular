import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import RecipeService from 'src/app/services/recipe.service';
import { NgForm } from '@angular/forms';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @Output() outIngredient = new EventEmitter<Ingredient>();
  editedItem: Ingredient | undefined;
  @ViewChild('f') form: NgForm | undefined;
  editMode: boolean = false;
  editIndex: number = 0;
  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredientService.startEditing.subscribe((index: number) => {
      this.editedItem = this.ingredientService.getIngredient(index);
      this.form?.setValue({
        name: this.editedItem?.name,
        amount: this.editedItem?.amount,
      });
      this.editMode = true;
      this.editIndex = index;
    });
  }

  onAdd(form: NgForm) {
    let formValue = form.value;

    if (this.editMode) {
      this.ingredientService.updateIngredient(
        this.editIndex,
        new Ingredient(formValue.name, formValue.amount)
      );
    } else {
      this.ingredientService.insertIngredient(
        new Ingredient(formValue.name, formValue.amount)
      );
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.form?.reset();
    this.editMode = false;
  }

  onDelete() {
    this.ingredientService.deleteIngredient(this.editIndex);
    this.form?.reset();
    this.editMode = false;
  }
  
}


