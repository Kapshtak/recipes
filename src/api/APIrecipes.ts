import { BASE_URL } from '../utils/constants'
import axios from 'axios'

export const getRecipes = async () => {
  try {
    const response = await axios.get(BASE_URL + 'recipes')
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export const addRecipe = async (recipe: any) => {
  try {
    const response = await axios.post(BASE_URL + 'recipes', {
      title: recipe.title,
      description: recipe.description,
      instruction: recipe.instruction,
      origin: recipe.origin,
      authorId: recipe.authorId,
      image: recipe.image,
      ingredients: recipe.ingredients
    })
    if (response.status === 201) {
      return true
    }
  } catch (error) {
    console.log(error)
  }
}

export const addComment = async (comment: any) => {
  try {
    const response = await axios.post(BASE_URL + 'comments', {
      authorId: comment.authorId,
      recipeId: comment.recipeId,
      text: comment.text,
      createdAt: comment.createdAt
    })
    if (response.status === 201) {
      return true
    }
  } catch (error) {
    console.log(error)
  }
}

export const getUsers = async () => {
  try {
    const response = await axios.get(BASE_URL + 'users')
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAllComments = async () => {
  try {
    const response = await axios.get(BASE_URL + 'comments?_sort=createdAt&_order=desc')
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}
