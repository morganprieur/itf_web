

// export 
async function retrieveAllFilms(category) { 
    let response_categories; 
    if(category == 'best') { 
        response_categories = await fetch(
            `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`, {}
        ); 
    } else { 
        response_categories = await fetch(
            `http://localhost:8000/api/v1/titles/?genre_contains=${category}`, {}
        ); 
    } 
    const data_categories = await response_categories.json(); 
    return data_categories; 
} 

async function retrieveCategoriesSuite(category_name) { 
    let response_cat_suite; 
    if(category_name == 'best') { 
        response_cat_suite = await fetch(
            `http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=2`, {}
            ); 
    } else { 
        response_cat_suite = await fetch(
            `http://localhost:8000/api/v1/titles?genre_contains=${category_name}&page=2`, {}
            ); 
    } 
    const data_cat_suite = await response_cat_suite.json(); 
    return data_cat_suite; 
} 

async function retrieveOneFilm(id) { 
    const response_one_film = await fetch(`http://localhost:8000/api/v1/titles/${id}`, {}) 
    const data_one_film = await response_one_film.json(); 
    return data_one_film; 
} 


export {retrieveAllFilms, retrieveCategoriesSuite, retrieveOneFilm};  
