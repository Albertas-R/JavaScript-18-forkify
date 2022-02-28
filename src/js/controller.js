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
    recipeView.renderSpiner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

// 288 Rendering the Recipe
console.log(`---------- 288 Rendering the Recipe ----------`);

// npm i core-js regenerator-runtime

// 289 Listening For load and hashchange Events
console.log(
  `---------- 289 Listening For load and hashchange Events ----------`
);

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
// same as these two lines
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

// 293 Event Handlers in MVC_ Publisher-Subscriber Pattern
console.log(
  `---------- 293 Event Handlers in MVC_ Publisher-Subscriber Pattern ----------`
);
