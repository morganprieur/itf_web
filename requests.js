

// export 
async function retrieveAllFilms(category) { 
    // let data_categories; 
    let response_categories; 
    if(category == 'best') { 
        response_categories = await fetch(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`, {}); 
        // data_categories = await retrieveAllFilms('best'); 
    } else { 
        response_categories = await fetch(`http://localhost:8000/api/v1/titles/?genre_contains=${category}`, {}); 
        // data_categories = await retrieveAllFilms(category_name); 
    } 
    // const response_categories = await fetch(`http://localhost:8000/api/v1/titles/?genre_contains=${category}`, {}) 
    const data_categories = await response_categories.json(); 
    return data_categories; 
} 
// // export 
// async function retrieveFilmsByCategories(category) { 
//     const response_categories = await fetch(`http://localhost:8000/api/v1/titles/?genre_contains=${category}`, {}) 
//     const data_categories = await response_categories.json(); 
//     return data_categories; 
// } 
// // export 
// async function retrieveApiBestFilm() { 
//     const response_best_film = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", {}) 
//     const data_best_film = await response_best_film.json(); 
//     return data_best_film; 
// } 
// export 
async function retrieveOneFilm(id) { 
    const response_one_film = await fetch(`http://localhost:8000/api/v1/titles/${id}`, {}) 
    const data_one_film = await response_one_film.json(); 
    return data_one_film; 
} 
async function retrieveCategoriesSuite(category_name) { 
    let response_cat_suite; 
    if(category_name == 'best') { 
        response_cat_suite = await fetch(`http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=2`, {}); 
    } else { 
        response_cat_suite = await fetch(`http://localhost:8000/api/v1/titles?genre_contains=${category_name}&page=2`, {}); 
    } 
    const data_cat_suite = await response_cat_suite.json(); 
    return data_cat_suite; 
} 
// // export 
// async function retrieveCategoryPage2(category_name) { 
//     const response_genre_p2 = await fetch(`http://localhost:8000/api/v1/titles?genre_contains=${category_name}&page=2`, {}) 
//     const data_genre_p2 = await response_genre_p2.json(); 
//     return data_genre_p2; 
// } 
// // export 
// async function retrieveBestsPage2() { // category_name 
//     const response_best_p2 = await fetch(`http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=2`, {}) 
//     const data_best_p2 = await response_best_p2.json(); 
//     return data_best_p2; 
// } 


// export {retrieveAllFilms, retrieveApiBestFilm, retrieveBestsPage2, retrieveFilmsByCategories, retrieveCategoryPage2, retrieveOneFilm};  
export {retrieveAllFilms, retrieveCategoriesSuite, retrieveOneFilm};  
