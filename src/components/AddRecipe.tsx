import React, { useContext, useState } from 'react'
import cl from '../styles/AddRecipe.module.css'
import { IngredientType } from '../types/recipes'
import { CurrentUserContext, RecipesContext } from '../utils/context'
import { getCountries } from '../utils/CountryCode'
import { JSX } from 'react/jsx-runtime'
import { addRecipe } from '../api/APIrecipes'

interface RecipeData {
  [key: string]: string | number | IngredientType[] | undefined
}

const AddRecipe = () => {
  const { fetchRecipes } = useContext(RecipesContext)[2]
  const currentUser = useContext(CurrentUserContext)[0]
  const [ingredientsCounter, setIngredientsCounter] = useState(1)
  const [recipeData, setRecipeData] = useState<RecipeData>({
    title: '',
    origin: '',
    description: '',
    instruction: '',
    image: '',
    authorId: 0,
    ingredients: []
  })

  const addIngredient = () => {
    setIngredientsCounter(ingredientsCounter + 1)
  }

  const removeIngredient = () => {
    if (ingredientsCounter > 1) {
      setIngredientsCounter(ingredientsCounter - 1)
    }
  }

  const onChangeInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    setRecipeData({
      ...recipeData,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const ingredients = []
    for (let i = 0; i < ingredientsCounter; i++) {
      const [name, quantity, units] = Object.keys(recipeData).filter((key) => {
        return key.includes('' + i)
      })
      ingredients.push({
        name: recipeData[name],
        quantity: recipeData[quantity],
        units: recipeData[units]
      })
    }
    if (currentUser) {
      const recipe = {
        title: recipeData.title,
        origin: recipeData.origin,
        description: recipeData.description,
        instruction: recipeData.instruction,
        image: recipeData.image,
        authorId: currentUser.id,
        ingredients: ingredients
      }
      if (await addRecipe(recipe)) {
        fetchRecipes()
      }
    }
  }

  const ingredientsList: JSX.Element[] = []

  for (let i = 0; i < ingredientsCounter; i++) {
    ingredientsList.push(
      <div className={cl.form_ingredients_row} key={i}>
        <input
          className={cl.form_input_ingredient}
          type="text"
          placeholder='name'
          name={`name${i}`}
          onChange={onChangeInput}
          required
        />
        <input
          className={cl.form_input_ingredient}
          type="number"
          placeholder='quantity'
          name={`quantity${i}`}
          onChange={onChangeInput}
          required
        />
        <input
          className={cl.form_input_ingredient}
          type="text"
          placeholder='units'
          name={`units${i}`}
          onChange={onChangeInput}
          required
        />
      </div>
    )
  }

  return (
    <div className={cl.form_container}>
      <form
        className={cl.form}
        onSubmit={onSubmit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
          }
        }}
      >
        <label className={cl.form_lable} htmlFor="title">Title</label>
        <input
          className={cl.form_input}
          type="text"
          name="title"
          onChange={onChangeInput}
          required
        />
        <label className={cl.form_lable} htmlFor="origin">Origin</label>
        <select className={cl.form_input_select} name="origin" onChange={onChangeInput}>
          {getCountries().map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <label className={cl.form_lable} htmlFor="description">Description</label>
        <textarea
          rows={4}
          className={cl.form_input}
          name="description"
          onChange={onChangeInput}
          required
        />
        <label className={cl.form_lable} htmlFor="instructions">Instructions</label>
        <textarea
          rows={10}
          className={cl.form_input}
          name="instruction"
          onChange={onChangeInput}
          required
        />
        <label className={cl.form_lable} htmlFor="image">Image</label>
        <input
          className={cl.form_input}
          type="text"
          name="image"
          onChange={onChangeInput}
          required
        />
        <label className={cl.form_lable}>Ingredients</label>
        {ingredientsList}
        <div className={cl.form_buttons}>
          <button className={cl.form_button} onClick={addIngredient}>Add ingredient</button>
          {ingredientsCounter > 1 && (
            <button className={cl.form_button} onClick={removeIngredient}>Remove ingredient</button>
          )}
        </div>
        <button className={cl.form_button_add} type="submit">Add recipe</button>
      </form>
    </div>
  )
}

export default AddRecipe