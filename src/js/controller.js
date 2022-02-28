import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // polyfiling everything else
import 'regenerator-runtime/runtime'; // polifiling async await

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// 287 Loading a Recipe from API
console.log(`---------- 287 Loading a Recipe from API ----------`);

// 1. npm init (creates package.json file)
// 2. npm i parcel@2 -D (install parcel) (install latest version npm i parcel -D)
// 3. npm run start (start parcel) (arba be run -> npm start)
// 4. npm install (jei kazko truksta arba klaidos)
// 5. // npm i core-js regenerator-runtime (182)

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id); // getting acsess to model.state.recipe

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();

// 294 Implementing Error and Success Messages
console.log(
  `---------- 294 Implementing Error and Success Messages ----------`
);
