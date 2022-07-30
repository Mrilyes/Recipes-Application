import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const ControlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);
    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
    // 2nd method
    // const recipeView = new RecipeView(model.state.recipe);
  } catch (err) {
    // console.log(err.message);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) get serach query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) load search results
    await model.loadSearchResults(query);
    // 3) Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(ControlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
