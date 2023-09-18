

// export 
async function retrieveFilmsByCategories(category_name) { 
    const response_categories = await fetch("http://localhost:8000/api/v1/titles/?genre="+category_name, {}) 
    const data_categories = await response_categories.json(); 
    return data_categories; 
} 
// export 
async function retrieveApiBestFilm() { 
    const response_best_film = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", {}) 
    const data_best_film = await response_best_film.json(); 
    return data_best_film; 
} 
// export 
async function retrieveOneFilm(id) { 
    const response_one_film = await fetch(`http://localhost:8000/api/v1/titles/${id}`, {}) 
    const data_one_film = await response_one_film.json(); 
    return data_one_film; 
} 
// export 
async function retrieveGenrePage2(category_name) { 
    const response_genre_p2 = await fetch(`http://localhost:8000/api/v1/titles?genre=&genre_contains=${category_name}&page=2`, {}) 
    const data_genre_p2 = await response_genre_p2.json(); 
    return data_genre_p2; 
} 
// export 
async function retrieveBestsPage2() { // category_name 
    const response_best_p2 = await fetch(`http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=2`, {}) 
    const data_best_p2 = await response_best_p2.json(); 
    return data_best_p2; 
} 


export {retrieveApiBestFilm, retrieveBestsPage2, retrieveFilmsByCategories, retrieveGenrePage2, retrieveOneFilm};  
