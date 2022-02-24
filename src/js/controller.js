// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../img/icons.svg'; // Parcel 2
// added in html 14 -> type="module" because was error
// console.log(icons);

import 'core-js/stable'; // polyfiling everything else
import 'regenerator-runtime/runtime'; // polifiling async await

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// 287 Loading a Recipe from API
console.log(`---------- 287 Loading a Recipe from API ----------`);

// 1. npm init (creates package.json file)
// 2. npm i parcel@2 -D (install parcel) (install latest version npm i parcel -D)
// 3. npm run start (start parcel) (arba be run -> npm start)
// 4. npm install (jei kazko truksta arba klaidos)
// 5. // npm i core-js regenerator-runtime (182)

const renderSpiner = function (parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    // 1) Loading recipe
    renderSpiner(recipeContainer);

    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40'
    );
    const data = await response.json();

    if (!response.ok)
      throw new Error(`🔔 ${data.message} 🔔 (${response.status})`);

    console.log(response);
    console.log(data);

    let { recipe } = data.data; // same as let recipe = data.data.recipe;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    // 2) Rendering recipe
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${recipe.ingredients
            .map(ing => {
              return `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>
            `;
            })
            .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            recipe.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
    recipeContainer.innerHTML = ''; // emptying container
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
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
  window.addEventListener(event, showRecipe)
);
// same as these two lines
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

// 290 The MVC Architecture
console.log(`---------- 290 The MVC Architecture ----------`);
