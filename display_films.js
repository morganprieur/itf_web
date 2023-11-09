
// The best films category page 1 
import { retrieveApiBestFilm } from "./requests.js"; 
// The best films category page 2 
import { retrieveBestPage2 } from "./requests.js"; 
// The films by categories page 1 
import { retrieveFilmsByCategories } from "./requests.js"; 
// The films by categories page 2 
import { retrieveGenrePage2 } from "./requests.js"; 
// 1 film 
import { retrieveOneFilm } from "./requests.js"; 



// orchestrateur : dagster 

const clear_div = document.createElement('div'); 
clear_div.classList.add('clear'); 

// titles in bold 
const span_bold = (element, string, parent) => { 
    const name_var = document.createElement(element); 
    name_var.classList.add('bold'); 
    name_var.innerHTML = string; 
    parent.appendChild(name_var); 
} 

const create_node = (element, class_name, parent) => { 
    const name_var = document.createElement(element); 
    name_var.classList.add(class_name); 
    parent.appendChild(name_var); 
    return name_var; 
} 

const create_modal = async (id) => { 
    
    let one_modal; 
    // document container 
    const container_div = document.getElementById('container'); 

    const best__intro__text = document.getElementsByClassName('best__intro__text')[0]; 
    best__intro__text.innerHTML += 'ça marche ?'; 
    // one_modal 
    one_modal = document.createElement('div'); 
    one_modal.classList.add('modal'); 
    one_modal.classList.add('block'); 
    one_modal.setAttribute('id', `modal_${id}`); 
    
    // wraper modal 
    const modal_wraper = document.createElement('div'); 
    modal_wraper.classList.add('modal_wraper'); 
    // modal_wraper.setAttribute('id', `modal_${id}`); 
    one_modal.appendChild(modal_wraper) 
    container_div.appendChild(one_modal); 

    // 4 columns 
    let div_list = []; 
    let modal_col; 
    for (let i=1; i<=4; i++) { 
        modal_col = document.createElement('div'); 
        modal_col.classList.add('modal__col_' + i); 
        div_list.push(modal_col); 
    } 
    
    const modal_cols = document.createElement('div'); 
    modal_cols.classList.add('modal__columns'); 
    modal_cols.appendChild(div_list[1]); 
    modal_cols.appendChild(div_list[2]); 
    modal_wraper.appendChild(div_list[0]); 
    modal_wraper.appendChild(modal_cols); 

    // detail data 
    const details = await retrieveOneFilm(id); 

    // modal column 1 
    // modal image 
    const modal_img = document.createElement('img') 
    modal_img.className = 'modal__img' 
    modal_img.setAttribute('alt', `Affiche du film ${details.title}`)
    modal_img.setAttribute('src', `${details.image_url}`); 
    // modal_col_1.appendChild(modal_img); 
    div_list[0].appendChild(modal_img); 

    // modal column 2 
    // modal title 
    const modal_title = document.createElement('h3'); 
    modal_title.className = 'modal__title'; 
    modal_title.innerHTML += `${details.title} ${details.id}`; 
    div_list[1].appendChild(modal_title); 

    // modal genres 
    const modal_genres = document.createElement('p'); 
    modal_genres.className = 'modal__genres'; 
    span_bold('span', 'Genres : ', modal_genres); 
    if (details.genres>1) { 
        for(let genre of details.genres) { 
            modal_genres.innerHTML += `${genre}<br>`; 
        } 
    } else { 
        modal_genres.innerHTML += details.genres[0]; 
    } 
    div_list[1].appendChild(modal_genres); 

    // modal date 
    const modal_date = document.createElement('p'); 
    modal_date.className = 'modal__publish_date'; 
    const modal_date_title = span_bold('span', 'Publication : ', modal_date); 
    modal_date.innerHTML += details.date_published;  
    div_list[1].appendChild(modal_date); 

    // modal rated 
    const modal_rated = document.createElement('p') 
    modal_rated.className = 'modal__rated' 
    const modal_rated_title = span_bold('span', 'Note moyenne : ', modal_rated); 
    modal_rated.innerHTML += details.rated; 
    div_list[1].appendChild(modal_rated); 

    // modal imdb_score 
    const modal_imdb_score = document.createElement('p'); 
    modal_imdb_score.className = 'modal__imdb_score'; 
    const modal_imdb_score_title = span_bold('span', 'Score Imdb : ', modal_imdb_score); 
    modal_imdb_score.innerHTML += details.imdb_score; 
    div_list[1].appendChild(modal_imdb_score); 

    // modal duration 
    const modal_duration = document.createElement('p'); 
    modal_duration.className = 'modal__duration'; 
    const modal_duration_title= span_bold('span', 'Durée : ', modal_duration); 
    modal_duration.innerHTML += details.duration; 
    div_list[1].appendChild(modal_duration); 

    // modal country 
    const modal_country = document.createElement('p'); 
    modal_country.className = 'modal__country'; 
    const modal_country_title = span_bold('span', 'Pays : <br>', modal_country); 
    if (details.countries.length>1) { 
        for(let country of details.countries) { 
            modal_country.innerHTML += `${country}<br>`; 
        }
    } else { 
        modal_country.innerHTML += details.countries[0]; 
    } 
    div_list[1].appendChild(modal_country); 

    // modal box office  
    const modal_income = document.createElement('p'); 
    modal_income.className = 'modal__income'; 
    const modal_income_title = span_bold('span', 'Box office : ', modal_income); 
    modal_income.innerHTML += details.worldwide_gross_income; 
    div_list[1].appendChild(modal_income); 

    
    // modal column3 
    // Close_modal button 
    const modal_close_button = document.createElement('button'); 
    modal_close_button.className = 'modal__close_button btns__modal'; 
    modal_close_button.onclick = function() { 
        one_modal.remove(); 
        one_modal.classList.remove('block'); 
        one_modal.classList.add('display_none'); 
    } 
    modal_close_button.innerHTML = 'X Fermer' 
    div_list[2].appendChild(modal_close_button); 

    // modal directors 
    const modal_director = document.createElement('p'); 
    modal_director.className = 'modal__director'; 
    const modal_director_title = span_bold('span', 'Directors : <br>', modal_director); 
    if (details.directors.length>1) { 
        for(let director of details.directors) { 
            modal_director.innerHTML += `${director}<br>`; 
        } 
    } else { 
        modal_director.innerHTML += details.directors[0]; 
    } 
    div_list[2].appendChild(modal_director); 

    // modal casting 
    const modal_casting_list = document.createElement('p'); 
    modal_casting_list.className = 'modal__casting_list'; 
    const modal_casting_list_title = span_bold('span', 'Casting : <br>', modal_casting_list); 
    if (details.actors.length>1) { 
        for(let actor of details.actors) { 
            modal_casting_list.innerHTML += `${actor}<br>`; 
        } 
    } else { 
        modal_casting_list.innerHTML += details.actors[0]; 
    } 
    div_list[2].appendChild(modal_casting_list); 


    // modal abstract 
    const modal_abstract = document.createElement('p'); 
    modal_abstract.className = 'modal__abstract'; 
    const modal_abstract_title = span_bold('span', 'Synopsis : <br>', modal_abstract); 
    modal_abstract.innerHTML += details.long_description; 
    div_list[3].appendChild(modal_abstract); 
    
    modal_wraper.appendChild(div_list[3]); 
} 

// const display_the_best = () => {} 

// const get_films_data = async (category_name, category_id) => { 
// const get_films_data = async (category_name) => { 
    
//     if(category_name=='best_films') { 
//         apiFilms = await retrieveApiBestFilm(); 
//         apiSuite = await retrieveBestsPage2(); 
//         theBest = apiFilms.results[0]; 
//     } else { 
//         apiFilms = await retrieveFilmsByCategories(category_name); 
//         apiSuite = await retrieveCategoryPage2(category_name); 
//     } 

//     films = apiFilms.results; 
//     films_suite = apiSuite.results; 
//     // console.log('theBest : '+theBest.id); 
//     console.log('films : '+films.title); 
//     console.log('films_suite : '+films_suite.title); 
    
// } 
// await get_films_data('best_films'); 
// await get_films_data('romance'); 
// await get_films_data('drama'); 
// await get_films_data('animation'); 


// main 
const main = async(category_name, category_id) => { 

    let apiFilms, apiSuite; 
    if(category_name=='best_films') { 
        apiFilms = await retrieveApiBestFilm(); 
        apiSuite = await retrieveBestsPage2(); // category_name 
    } else { 
        apiFilms = await retrieveFilmsByCategories(category_name); 
        apiSuite = await retrieveCategoryPage2(category_name); 
    } 

    // const bestFilm = apiFilms.results[0]; 
    const films = apiFilms.results; 
    const films_suite = apiSuite.results; 
    // console.log('bestFilm : '+bestFilm.id); 
    

    if(films.length<=5) { 
        // console.log(films.length); 
        for(let i=0; i<2; i++) { 
            films.push(films_suite[i]); 
        } 
        // console.log(films.length); 
    } 

    // the best 
    const theBest = apiFilms.results[0]; 
    const details = await retrieveOneFilm(theBest.id); 
    console.log(theBest); 
    
    const best_section = document.getElementsByClassName('best')[0]; 
    const best_intro_div = document.getElementsByClassName('best__intro')[0]; 
    const best_intro_title_h3 = document.getElementsByClassName('best__intro__title')[0]; 
    best_intro_title_h3.innerHTML = theBest.title+' '+theBest.imdb_score; 
    
    const best_intro_text_p = document.getElementsByClassName('best__intro__text')[0]; 
    best_intro_text_p.innerHTML = details.long_description+' '+theBest.id; 

    const btns_more_infos = document.getElementsByClassName('btns__more_infos')[0]; 
    btns_more_infos.onclick = async function() { 
        await create_modal(theBest.id); 
    } 
    
    const best_img = document.createElement('div'); 
    best_img.classList.add('best__img'); 
    best_img.style.backgroundImage = `url(${theBest.image_url})`; 

    best_section.appendChild(best_intro_div); 
    best_section.appendChild(best_img); 
    best_section.appendChild(clear_div); 
    // /the best 

    const data_one_category = document.getElementById(category_id); 

// const display_sliders = async (div_name, category_name) => { 

//     if(category_name=='best_films') { 
//         apiFilms = await retrieveApiBestFilm(); 
//         apiSuite = await retrieveBestsPage2(); 
//         // theBest = apiFilms.results[0]; 
//     } else { 
//         apiFilms = await retrieveFilmsByCategories(category_name); 
//         apiSuite = await retrieveCategoryPage2(category_name); 
//     } 

//     films = apiFilms.results; 
//     films_suite = apiSuite.results; 
//     // console.log('theBest : '+theBest.id); 
//     console.log('films : '+films.title); 
//     console.log('films_suite : '+films_suite.title); 

    
//     const data_one_category = document.getElementById(div_name); 
//     // console.log(data_one_category.textContent); 
//     console.log(div_name); 
    // const data_one_category = document.getElementById('slider_mieux_notes'); 
    // const slide_left = document.getElementsByClassName('slide_left')[0]; 
    
    for (let element of films) { 
        
        const carousel_inner = data_one_category.getElementsByClassName('carousel-inner')[0]; 
        // console.log(carousel_inner.textContent); 

        let one_film_div; 
        one_film_div = create_node('div', 'one_film', carousel_inner); 
        one_film_div.classList.add('carousel-item'); 
        
    
        const one_film_div_a = create_node('a', 'one_film__img', one_film_div); 
        one_film_div_a.classList.add(`one_film_${element.id}`); 
        one_film_div_a.classList.add(`d-block`); 
        one_film_div_a.classList.add(`w-100`); 
        one_film_div_a.style.backgroundImage = `url(${element.image_url})`; 

        const one_film_div_a_h5 = create_node('h5', 'one_film__title', one_film_div_a); 
        one_film_div_a_h5.innerHTML = element.title 
         
        // Open modal button 
        const one_film_div_a_button = create_node('button', 'one_film__button', one_film_div_a);  
        one_film_div_a_button.classList.add('btns__modal'); 
        one_film_div_a_button.innerHTML = 'Détails'; 

        // details button onclick 
        one_film_div_a_button.onclick = function() { 
            create_modal(element.id); 
        } 
    } 

    const slide_right = document.getElementsByClassName('slide_right')[0]; 
} 


// await display_the_best(); 

await main('best_films', 'slider_mieux_notes'); 
await main('romance', 'slider_cat1'); 
await main('drama', 'slider_cat2'); 
await main('animation', 'slider_cat3'); 
// await display_sliders('slider_mieux_notes', 'best_films'); 
// await display_sliders('slider_cat1', 'romance'); 
// await display_sliders('slider_cat2', 'drama'); 
// await display_sliders('slider_cat3', 'animation'); 




/* draft */ 
// main 
// const main = async(category_name, category_id) => { 

//     let apiFilms, apiSuite; 
//     if(category_name=='best_films') { 
//         apiFilms = await retrieveApiBestFilm(); 
//         apiSuite = await retrieveBestPage2(); // category_name 
//     } else { 
//         apiFilms = await retrieveFilmsByCategories(category_name); 
//         apiSuite = await retrieveCategoryPage2(category_name); 
//     } 

//     const bestFilm = apiFilms.results[0]; 
//     const films = apiFilms.results; 
//     const films_suite = apiSuite.results; 
//     console.log('bestFilm : '+bestFilm.id); 
    

//     if(films.length<=5) { 
//         // console.log(films.length); 
//         for(let i=0; i<2; i++) { 
//             films.push(films_suite[i]); 
//         } 
//         // console.log(films.length); 
//     } 


//     const data_one_category = document.getElementById(category_id); 

//     //  Button "More infos" for the best film 
//     const best_more_button = document.getElementsByClassName('btns__more_infos')[0]; 
//     // console.log('best_more_button : '+best_more_button.textContent) 
//     // Voir avec co si le bouton "fermer" s'affiche 
//     best_more_button.onclick = function() { 
//         one_modal.classList.remove('display_none') 
//         one_modal.classList.add('block') 
//         one_modal.setAttribute('id', `modal_${element.id}`) 
//         get_details(element.id); 
//     } 

/* 
    // for (let element of films) { 
    //     // console.log(element); 

    //     let one_film_div = document.createElement('div') 
    //     one_film_div.className = 'one_film' 
        
    //     let one_film_div_a = document.createElement('a') 
    //     one_film_div_a.className = `one_film__img one_film_${element.id}` 
    //     one_film_div_a.style.backgroundImage = `url(${element.image_url})` 
        
    //     let one_film_div_a_h5 = document.createElement('h5') 
    //     one_film_div_a_h5.className = 'one_film__title' 
    //     one_film_div_a_h5.innerHTML = element.title 
        
    //     // Open modal button 
    //     let one_film_div_a_button = document.createElement('button') 
    //     one_film_div_a_button.classList = 'one_film__button btns__modal' 
        
    //     const id = element.id 
    //     // console.log('id L118 : '+id) 

    //     // async function get_details(id) { 
    //     //     const details = await retrieveOneFilm(id) 
    //     //     // console.log(details) 

    //     //     return details 
    //     // } 

    //     // details button onclick 
    //     one_film_div_a_button.onclick = function() { 
    //         one_modal.classList.remove('display_none')
    //         one_modal.classList.add('block') 
    //         one_modal.setAttribute('id', `modal_${element.id}`) 
            
    //         /* Get the details data for one film */ 
    //         get_details(id) 
    //     } 
    //     one_film_div_a_button.innerHTML = 'Détails'; 
/* */ 
        


//     } // ); 
    

// } 



