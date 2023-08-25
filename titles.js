

async function retrieveFilmsByCategories(category_name) { 
    const response_categories = await fetch("http://localhost:8000/api/v1/titles/?genre="+category_name, {}) 
    const data_categories = await response_categories.json(); 

    return data_categories; 
} 

async function retrieveApiBestFilm() { 
    const response_best_film = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", {}) 
    const data_best_film = await response_best_film.json(); 

    return data_best_film; 
} 

// async function retrieveApiCategories() { 
//     const response_genres = await fetch("http://localhost:8000/api/v1/genres/", {}) 
//     const data_genres = await response_genres.json(); 

//     return data_genres; 
// } 

async function retrieveOneFilm(id) { 
    const response_one_film = await fetch(`http://localhost:8000/api/v1/titles/${id}`, {}) 
    const data_one_film = await response_one_film.json(); 

    return data_one_film; 
} 

async function retrieveGenrePage2(category_name) { 
    const response_pg_2 = await fetch(`http://localhost:8000/api/v1/titles?genre=&genre_contains=${category_name}&page=2`, {}) 
    const data_page_2 = await response_pg_2.json(); 
    return data_page_2; 
} 
async function retrieveBestPage2(category_name) { 
    const response_pg_2 = await fetch(`http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=2`, {}) 
    const data_page_2 = await response_pg_2.json(); 
    return data_page_2; 
} 


// one_modal 
let one_modal = document.createElement('div') 
one_modal.className = `modal display_none` 
// one_modal.setAttribute('id', `modal_${element.id}`) 


// main 
const main = async(category_name, category_id) => { 

    let apiFilms, apiSuite; 
    if(category_name=='best_films') { 
        apiFilms = await retrieveApiBestFilm(); 
        apiSuite = await retrieveBestPage2(category_name); 
    } else { 
        apiFilms = await retrieveFilmsByCategories(category_name); 
        apiSuite = await retrieveGenrePage2(category_name); 
    } 

    const films = apiFilms.results; 
    const films_suite = apiSuite.results; 

    if(films.length<=5) { 
        // console.log(films.length); 
        for(i=0; i<2; i++) { 
            films.push(films_suite[i]); 
        } 
        // console.log(films.length); 
    } 
    
    const data_one_category = document.getElementById(category_id); 
    
    for (element of films) { 

        console.log(element); 

        let one_film_div = document.createElement('div') 
        one_film_div.className = 'one_film' 
        
        let one_film_div_a = document.createElement('a') 
        one_film_div_a.className = `one_film__img one_film_${element.id}` 
        one_film_div_a.style.backgroundImage = `url(${element.image_url})` 
        
        let one_film_div_a_h5 = document.createElement('h5') 
        one_film_div_a_h5.className = 'one_film__title' 
        one_film_div_a_h5.innerHTML = element.title 
        
        // Open modal button 
        let one_film_div_a_button = document.createElement('button') 
        one_film_div_a_button.classList = 'one_film__button btns__modal' 
        
        const id = element.id 
        // console.log('id L118 : '+id) 

        async function get_details(id) { 
            const details = await retrieveOneFilm(id) 
            // console.log(details) 

            // wraper modal 
            let modal_wraper = document.createElement('div'); 
            modal_wraper.setAttribute('id', 'modal_wraper'); 

            // détails modal 
            let modal_img = document.createElement('img') 
            modal_img.className = 'modal__img' 
            modal_img.setAttribute('alt', `Affiche du film ${details.title}`)
            modal_img.setAttribute('src', `${details.image_url}`); 
            modal_wraper.appendChild(modal_img); 

            // Close_modal button 
            let modal_close_button = document.createElement('button') 
            modal_close_button.className = 'modal__close_button btns__modal' 
            
            modal_close_button.onclick = function() { 
                modal_wraper.remove(); 
                one_modal.classList.remove('block'); 
                one_modal.classList.add('display_none'); 
            } 
            modal_close_button.innerHTML = 'X Fermer' 
            modal_wraper.appendChild(modal_close_button); 
            
            let modal_title = document.createElement('h3'); 
            modal_title.className = 'modal__title'; 
            modal_title.innerHTML = `${details.title}`; 
            modal_wraper.appendChild(modal_title); 

            let modal_genres = document.createElement('p'); 
            modal_genres.className = 'modal__genres'; 
            modal_genres.innerHTML = 'Genres : <br> '; 
            genres = details.genres; 
            modal_genres.innerHTML = 'Genres : <br>'; 
            for(let genre of genres) { 
                modal_genres.innerHTML += `${genre}<br>`; 
            } 
            modal_wraper.appendChild(modal_genres); 

            let modal_date = document.createElement('p') 
            modal_date.className = 'modal__publish_date' 
            modal_date.innerHTML = details.date_published 
            modal_wraper.appendChild(modal_date); 

            let modal_rated = document.createElement('p') 
            modal_rated.className = 'modal__rated' 
            modal_rated.innerHTML = details.rated 
            modal_wraper.appendChild(modal_rated); 

            /* Here the rest of details */ 


            one_modal.appendChild(modal_wraper) 

            return details 
        } 

        // details button onclick 
        one_film_div_a_button.onclick = function() { 
            one_modal.classList.remove('display_none')
            one_modal.classList.add('block') 
            one_modal.setAttribute('id', `modal_${element.id}`) 
            /* Get the details data for one film */ 
            get_details(id) 
        } 
        one_film_div_a_button.innerHTML = 'Détails'; 

        

        /* détails modal --> to integrate */ 

        // let modal_imdb_score = document.createElement('p') 
        // modal_imdb_score.className = 'modal__imdb_score' 
        // modal_imdb_score.innerHTML = element.imdb_score 
        // one_modal.appendChild(modal_imdb_score) 

        // let modal_director = document.createElement('p') 
        // modal_director.className = 'modal__director' 
        // modal_director.innerHTML = 'Directors : <br> ' 
        // directors = element.directors 
        // // console.log('genres 70 : '+genres) 
        // for(let director of directors) { 
        //     // console.log('genre 72 : '+genre) 
        //     modal_director.innerHTML += `${director}<br>` 
        // } 
        // one_modal.appendChild(modal_director) 
        
        let modal_casting_list = document.createElement('p') 
        modal_casting_list.className = 'modal__casting_list' 
        one_modal.appendChild(modal_casting_list) 
        let modal_duration = document.createElement('p') 
        modal_duration.className = 'modal__duration' 
        one_modal.appendChild(modal_duration) 
        let modal_country = document.createElement('p') 
        modal_country.className = 'modal__country' 
        one_modal.appendChild(modal_country) 
        let modal_entries = document.createElement('p') 
        modal_entries.className = 'modal__entries' 
        one_modal.appendChild(modal_entries) 
        let modal_abstract = document.createElement('p') 
        modal_abstract.className = 'modal__abstract' 
        one_modal.appendChild(modal_abstract) 
        let clear_div = document.createElement('div') 
        clear_div.className = 'clear' 
        one_modal.appendChild(clear_div) 

        // <div class="clear"></div>
        
        
        one_film_div_a.appendChild(one_film_div_a_h5) 
        // one_film_div_a.appendChild(one_film_div_a_genre) 
        one_film_div_a.appendChild(one_film_div_a_button) 
        one_film_div.appendChild(one_film_div_a) 
        // one_film_div.appendChild(one_modal) 
        data_one_category.appendChild(one_film_div) 

        let container_div = document.getElementById('container') 
        container_div.appendChild(one_modal) 


    } // ); 
    

} 

main('best_films', 'slider_mieux_notes') 
main('romance', 'slider_cat1') 
main('drama', 'slider_cat2') 
main('animation', 'slider_cat3') 

