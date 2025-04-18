'use client'

import { Recipe } from "../objects/recipe";
import { Ingredient } from "../objects/ingredient";
import { useEffect, useState } from "react";
import { convertUnit } from "../libraries/unitConversions";

interface Props {
  recipes: Recipe[],
}

export const IngredientsList = (props: Props) => {
  const getIngredientsList = (recipes: Recipe[]): Ingredient[] => {
    const newIngredients: Ingredient[] = []
    
    // Todo Make Recipes Add based on Units
    // Start ChatGPT Code with modification
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const existing = newIngredients.find(
          (i) => i.name === ingredient.name
        );
  
        if (existing) {
          // existing.quantity += ingredient.quantity * recipe.quantity
          if(existing.units === "pick" && ingredient.units === "pick") {
            existing.quantity += ingredient.quantity * recipe.quantity
          }
          else if(existing.units === "pick" && ingredient.units !== "pick") {}
          else if(existing.units !== "pick" && ingredient.units === "pick") {}
          else {
            existing.quantity += convertUnit(ingredient.quantity, ingredient.units.toLowerCase(), existing.units.toLowerCase())
          }

        } else {
          newIngredients.push(JSON.parse(JSON.stringify(ingredient)))
          newIngredients[newIngredients.length - 1].quantity *= recipe.quantity
        }
      });
    });
    // End ChatGPT Code with modification

    return newIngredients
  }

  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>(getIngredientsList(props.recipes))

  useEffect(() => {
    setIngredientsList(getIngredientsList(props.recipes))
  }, [props.recipes])

  return (
    <div tabIndex={0} className="bg-base-100">
      <h2 className="font-bold">Ingredients List</h2>
      <table className="table table-zebra" >
        <tbody>
          {ingredientsList.map((ingredient) => {
            return (<tr key={ingredient.name}>
              <td>{ingredient.name}</td>
              <td>{ingredient.quantity == 0 ? "For Taste" : ingredient.quantity}</td>
              <td>{ingredient.units == "pick" ? "" : ingredient.units}</td>
            </tr> 
          )})}
        </tbody>
      </table>
    </div>
  )
}