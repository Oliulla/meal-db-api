// const loadFoods = async(search) => {
//     // console.log(search)
//     const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
//     try {
//         const res = await fetch(url);
//         const data = await res.json();
//         displayFoods(data.meals)
//     }
//     catch(err) {
//         console.log(err)
//     }
// }

const loadFoods = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoods(data.meals))
}

const displayFoods = meals => {
    const foodsContainer = document.getElementById('foods-container');
    foodsContainer.textContent = ``
    meals.forEach(meal => {
        // console.log(meal.idMeal)
        const foodCol = document.createElement('div');
        foodCol.classList.add('col');
        foodCol.innerHTML = `
        <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 50)}</p>
            </div>
            <button class="btn btn-info" onclick="foodsId(${meal.idMeal})">See Details</button>
        </div>
        `
        foodsContainer.appendChild(foodCol);
    })
}

const getSearchText = () => {
    const searchField = document.querySelector('[type]')
    // console.log(searchField)
    const searchText = searchField.value;
    loadFoods(searchText);
    // console.log(searchText)
}

const foodsId = (idMeal) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then(res => res.json())
        .then(data => displayDetails(data.meals))
        .catch(err => {
            console.log(err);
        })
}

const displayDetails = meals => {
    const detailsContainer = document.getElementById('see-details-container');
    detailsContainer.textContent = ``;
    meals.forEach(meal => {
        const detailCol = document.createElement('div');
        detailCol.classList.add('col');

        detailCol.innerHTML = `
        <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 50)}</p>
            </div>
        </div>
        `
        detailsContainer.appendChild(detailCol)
    })
}
 
loadFoods('');