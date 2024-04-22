'use state';
///////////
// 2.) Controller
// Which Include 1.Application Logic(Router)
//////////

//__Import__//
import * as model from './model'; //importing all export

import recipeView from './view/recipeView.js'; //importing Default export (this is new object create from RecipeView class)
import searchView from './view/searchView.js'; //importing Default export (this is new object create from searchView class)
import resultView from './view/resultView.js'; //importing Default export (this is new object create from resultView class)
import paginationView from './view/paginationView.js'; //importing Default export (this is new object create from paginationView class)
import bookmarkView from './view/bookmarkView.js'; //importing Default export (this is new object create from bookmarkView class)
import addRecipeView from './view/addRecipeView.js'; //importing Default export (this is new object create from addRecipeView class)

import { MODAL_CLOSE_SEC } from './config.js';

//Polifilling file
import 'core-js/stable'; //Polifilling Everthing
import 'regenerator-runtime/runtime'; //(Polyfilling Async/ Await)

//import { async } from 'regenerator-runtime';

//Hot_Module Reloading (This is from Parcel) (Whenever Page Reload in background It keep the page as it is)
/* if (module.hot) {
  module.hot.accept();
} */

//////////////////////////

// https://forkify-api.herokuapp.com/v2

////////////////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //It means URL

    //Guard clause
    if (!id) return;
    recipeView.renderSpinner();

    // 0.) Updated result view to mark selected search result
    resultView.update(model.getSearchResultPage());

    // 1.) Updating bookmark views
    bookmarkView.update(model.state.bookmarks);

    // 2.)Loading Recipe (async function)
    await model.loadRecipe(id);

    // 3.) Rendering recipe
    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
///////////////

const controlSearchResults = async function () {
  try {
    // 1) Get Search Query
    const query = searchView.getQuery();

    if (!query) return;

    resultView.renderSpinner();
    // 2) Load Search Result
    await model.loadSearchResults(query);

    // 3) Render initial Result
    /* resultView.render(model.state.search.results); */

    resultView.render(model.getSearchResultPage(1)); // Keeping the page 1. So we put 1 as Input

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goTopage) {
  // 1) Render New Result
  resultView.render(model.getSearchResultPage(goTopage));

  // 2) Render New pagination buttons
  paginationView.render(model.state.search);
};

const controlServing = function (newServing) {
  // 1) Updata the recipe servings (in state)
  model.updateServings(newServing);

  // 2.) Rendering recipe
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

  //Update the recipe view
};

const controlAddBookmarked = function () {
  // 1) Add/remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Show loading spinner
    addRecipeView.renderSpinner();

    //console.log(newRecipe);
    //upload new Recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render Recipe
    recipeView.render(model.state.recipe);

    //Success Message
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarkView.render(model.state.bookmarks);

    //Change ID in URL //(pushstate() method take 3 arugument state, title, url)
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close the form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log('🔥', err);
    addRecipeView.renderError(err.message);
  }
};

///////////////////
//Impliment the Pulisher- subscriber Pattern
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmarked(controlAddBookmarked);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('Welcome');
};
init();
