
import { retrieveApiBestFilm } from "./requests.js"; 
import { retrieveBestPage2 } from "./requests.js"; 
import { retrieveFilmsByCategories } from "./requests.js"; 
import { retrieveGenrePage2 } from "./requests.js"; 
import { retrieveOneFilm } from "./requests.js"; 

// one_modal 
let one_modal = document.createElement('div') 
one_modal.className = `modal display_none` 


const get_details = async (id) => { 
    console.log(`id L65 : ${id}`) 
    const details = await retrieveOneFilm(id) 
    console.log(`détails : ${details}`) 

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
    console.log('genres : '+genres)
    modal_genres.innerHTML = 'Genres : <br>'; 
    for(let genre of genres) { 
        modal_genres.innerHTML += `${genre}<br>`; 
    } 
    modal_wraper.appendChild(modal_genres); 

    let modal_date = document.createElement('p'); 
    modal_date.className = 'modal__publish_date'; 
    modal_date.innerHTML = `Publication : ${details.date_published}`;  
    modal_wraper.appendChild(modal_date); 

    let modal_rated = document.createElement('p') 
    modal_rated.className = 'modal__rated' 
    modal_rated.innerHTML = `Note moyenne : ${details.rated}`; 
    modal_wraper.appendChild(modal_rated); 

    let modal_imdb_score = document.createElement('p'); 
    modal_imdb_score.className = 'modal__imdb_score'; 
    modal_imdb_score.innerHTML = `Score Imdb : ${details.imdb_score}`; 
    modal_wraper.appendChild(modal_imdb_score); 

    let modal_director = document.createElement('p'); 
    modal_director.className = 'modal__director'; 
    modal_director.innerHTML = 'Directors : <br>'; 
    directors = element.directors; 
    console.log('directors 126 : '+directors); 
    for(director of directors) { 
        console.log('director 128 : '+director); 
        modal_director.innerHTML += `${director}<br>`; 
    } 
    modal_wraper.appendChild(modal_director); 
    
    let modal_casting_list = document.createElement('p'); 
    modal_casting_list.className = 'modal__casting_list'; 
    modal_casting_list.innerHTML = 'Casting : <br>'; 
    actors = element.actors; 
    for(actor of actors) { 
        modal_casting_list.innerHTML += `${actor}<br>`; 
    } 
    modal_wraper.appendChild(modal_casting_list); 
    
    let modal_duration = document.createElement('p'); 
    modal_duration.className = 'modal__duration'; 
    modal_duration.innerHTML = `Durée : ${details.duration}`; 
    modal_wraper.appendChild(modal_duration); 

    let modal_country = document.createElement('p'); 
    modal_country.className = 'modal__country'; 
    modal_country.innerHTML = 'Pays : <br>'; 
    countries = details.countries; 
    for(country of countries) { 
        modal_country.innerHTML += `${country}<br>`
    }
    modal_wraper.appendChild(modal_country); 
    
    // c'est quoi ? *** 
    let modal_income = document.createElement('p'); 
    modal_income.className = 'modal__income'; 
    modal_income.innerHTML = `Box office : ${details.worldwide_gross_income}`; 
    modal_wraper.appendChild(modal_income); 

    let modal_abstract = document.createElement('p'); 
    modal_abstract.className = 'modal__abstract'; 
    modal_abstract.innerHTML = `Synopsis : ${details.long_description}`; 
    modal_wraper.appendChild(modal_abstract); 

    let clear_div = document.createElement('div') 
    clear_div.className = 'clear' 
    modal_wraper.appendChild(clear_div) 

    one_modal.appendChild(modal_wraper) 

    return details 
} 

const display_best_film = async () => { 
    const apiBestFilm = await retrieveApiBestFilm(); 
    const bestFilm = apiBestFilm.results[0]; 
    console.log('bestFilm.title : '+bestFilm.title); 

    const best_section = document.getElementsByClassName('best')[0]; 
    const best_intro_div = document.getElementsByClassName('best__intro')[0]; 
    const best_intro_title_h3 = document.getElementsByClassName('best__intro__title')[0]; 
    const best_intro_subtitle_h4 = document.getElementsByClassName('best__intro__subtitle')[0]; 
    const best_intro_text_p = document.getElementsByClassName('best__intro__text')[0]; 
    const best_img = document.getElementsByClassName('best__img')[0]; 

    best_intro_title_h3.innerHTML = bestFilm.title+' '+bestFilm.imdb_score; 

} 
display_best_film(); 

// main 
// const main = async(category_name, category_id) => { 

//     let apiFilms, apiSuite; 
//     if(category_name=='best_films') { 
//         apiFilms = await retrieveApiBestFilm(); 
//         apiSuite = await retrieveBestPage2(); // category_name 
//     } else { 
//         apiFilms = await retrieveFilmsByCategories(category_name); 
//         apiSuite = await retrieveGenrePage2(category_name); 
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

    
    
    
    
//     for (let element of films) { 

//         // console.log(element); 


//         let one_film_div = document.createElement('div') 
//         one_film_div.className = 'one_film' 
        
//         let one_film_div_a = document.createElement('a') 
//         one_film_div_a.className = `one_film__img one_film_${element.id}` 
//         one_film_div_a.style.backgroundImage = `url(${element.image_url})` 
        
//         let one_film_div_a_h5 = document.createElement('h5') 
//         one_film_div_a_h5.className = 'one_film__title' 
//         one_film_div_a_h5.innerHTML = element.title 
        
//         // Open modal button 
//         let one_film_div_a_button = document.createElement('button') 
//         one_film_div_a_button.classList = 'one_film__button btns__modal' 
        
//         const id = element.id 
//         // console.log('id L118 : '+id) 

//         // async function get_details(id) { 
//         //     const details = await retrieveOneFilm(id) 
//         //     // console.log(details) 

//         //     details here ? *** 

//         //     return details 
//         // } 

//         // details button onclick 
//         one_film_div_a_button.onclick = function() { 
//             one_modal.classList.remove('display_none')
//             one_modal.classList.add('block') 
//             one_modal.setAttribute('id', `modal_${element.id}`) 
            
//             /* Get the details data for one film */ 
//             get_details(id) 
//         } 
//         one_film_div_a_button.innerHTML = 'Détails'; 

        

//         // /* détails modal --> to integrate */ 

//         // // let modal_imdb_score = document.createElement('p') 
//         // // modal_imdb_score.className = 'modal__imdb_score' 
//         // // modal_imdb_score.innerHTML = element.imdb_score 
//         // // one_modal.appendChild(modal_imdb_score) 

//         // // let modal_director = document.createElement('p') 
//         // // modal_director.className = 'modal__director' 
//         // // modal_director.innerHTML = 'Directors : <br> ' 
//         // // directors = element.directors 
//         // // // console.log('genres 70 : '+genres) 
//         // // for(let director of directors) { 
//         // //     // console.log('genre 72 : '+genre) 
//         // //     modal_director.innerHTML += `${director}<br>` 
//         // // } 
//         // // one_modal.appendChild(modal_director) 
        
//         // let modal_casting_list = document.createElement('p') 
//         // modal_casting_list.className = 'modal__casting_list' 
//         // one_modal.appendChild(modal_casting_list) 
//         // let modal_duration = document.createElement('p') 
//         // modal_duration.className = 'modal__duration' 
//         // one_modal.appendChild(modal_duration) 
//         // let modal_country = document.createElement('p') 
//         // modal_country.className = 'modal__country' 
//         // one_modal.appendChild(modal_country) 
//         // let modal_entries = document.createElement('p') 
//         // modal_entries.className = 'modal__entries' 
//         // one_modal.appendChild(modal_entries) 
//         // let modal_abstract = document.createElement('p') 
//         // modal_abstract.className = 'modal__abstract' 
//         // one_modal.appendChild(modal_abstract) 
//         // let clear_div = document.createElement('div') 
//         // clear_div.className = 'clear' 
//         // one_modal.appendChild(clear_div) 
        
        
//         one_film_div_a.appendChild(one_film_div_a_h5) 
//         // one_film_div_a.appendChild(one_film_div_a_genre) 
//         one_film_div_a.appendChild(one_film_div_a_button) 
//         one_film_div.appendChild(one_film_div_a) 
//         // one_film_div.appendChild(one_modal) 
//         data_one_category.appendChild(one_film_div) 

//         let container_div = document.getElementById('container') 
//         container_div.appendChild(one_modal) 


//     } // ); 
    

// } 

// main('best_films', 'slider_mieux_notes') 
// main('romance', 'slider_cat1') 
// main('drama', 'slider_cat2') 
// main('animation', 'slider_cat3') 

