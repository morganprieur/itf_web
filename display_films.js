
import { retrieveApiBestFilm } from "./requests.js"; 
import { retrieveBestPage2 } from "./requests.js"; 
import { retrieveFilmsByCategories } from "./requests.js"; 
import { retrieveGenrePage2 } from "./requests.js"; 
import { retrieveOneFilm } from "./requests.js"; 


// // Probleme *** 
// const get_details = async (id) => { 
//     console.log(`id L65 : ${id}`) 
//     // const details = await retrieveOneFilm(id).then(function(result){ 
//     // const details = await retrieveOneFilm(id).then(function(result){ 
//     //     console.log('result : ', result); 
//     // }) 
//     // console.log(`détails : ${details}`) 
//     return details; 
// } 

// FunctionWhichReturnsAPromise()
//    .then(function(result){
//         console.log(result)
//     }) 

// orchestrateur : dagster 


const clear_div = document.createElement('div'); 
clear_div.classList.add('clear'); 


const create_modal = async (id) => { 

    // document container 
    const container_div = document.getElementById('container'); 

    // one_modal 
    const one_modal = document.createElement('div'); 
    one_modal.classList.add('modal'); 
    one_modal.classList.add('block'); 
    
    // wraper modal 
    const modal_wraper = document.createElement('div'); 
    modal_wraper.classList.add('modal_wraper'); 
    modal_wraper.setAttribute('id', `modal_${id}`); 

    // 3 columns 
    const modal_col_1 = document.createElement('div'); 
    modal_col_1.classList.add('modal__col_1'); 
    modal_wraper.appendChild(modal_col_1); 

    const modal_col_2 = document.createElement('div'); 
    modal_col_2.classList.add('modal__col_2'); 
    modal_wraper.appendChild(modal_col_2); 
    
    const modal_col_3 = document.createElement('div'); 
    modal_col_3.classList.add('modal__col_3'); 
    modal_wraper.appendChild(modal_col_3); 

    const modal_col_4 = document.createElement('div'); 
    modal_col_4.classList.add('modal__col_4'); 
    modal_wraper.appendChild(modal_col_4); 

    // const div_list = [modal_col_1, modal_col_2, modal_col_3, modal_col_4]; 
    let div_list = []; 
    let modal_col; 
    for (let i=1; i<=4; i++) { 
        modal_col = document.createElement('div'); 
        modal_col.classList.add('modal__col_' + i); 
        div_list.push(modal_col); 
        modal_wraper.appendChild(modal_col); 
    }


    // detail data 
    const details = await retrieveOneFilm(id); 

    // modal column 1 
    // modal image 
    const modal_img = document.createElement('img') 
    modal_img.className = 'modal__img' 
    modal_img.setAttribute('alt', `Affiche du film ${details.title}`)
    modal_img.setAttribute('src', `${details.image_url}`); 
    modal_col_1.appendChild(modal_img); 
    div_list[0].appendChild(modal_img); 

    // modal column 2 
    // title modal 
    const modal_title = document.createElement('h3'); 
    modal_title.className = 'modal__title'; 
    modal_title.innerHTML = `${details.title}`; 
    modal_col_2.appendChild(modal_title); 

    // modal genres 
    const modal_genres = document.createElement('p'); 
    modal_genres.className = 'modal__genres'; 
    modal_genres.innerHTML = 'Genres : <br> '; 
    // console.log('genres : '+genres) 
    if (details.genres>1) { 
        for(let genre of details.genres) { 
            modal_genres.innerHTML += `${genre}<br>`; 
        } 
    } else { 
        modal_genres.innerHTML += `${details.genre}<br>`; 
    } 
    modal_col_2.appendChild(modal_genres); 

    // modal date 
    const modal_date = document.createElement('p'); 
    modal_date.className = 'modal__publish_date'; 
    modal_date.innerHTML = `Publication : ${details.date_published}`;  
    modal_col_2.appendChild(modal_date); 

    // modal rated 
    const modal_rated = document.createElement('p') 
    modal_rated.className = 'modal__rated' 
    modal_rated.innerHTML = `Note moyenne : ${details.rated}`; 
    modal_col_2.appendChild(modal_rated); 

    // modal imdb_score 
    const modal_imdb_score = document.createElement('p'); 
    modal_imdb_score.className = 'modal__imdb_score'; 
    modal_imdb_score.innerHTML = `Score Imdb : ${details.imdb_score}`; 
    modal_col_2.appendChild(modal_imdb_score); 

    // modal duration 
    const modal_duration = document.createElement('p'); 
    modal_duration.className = 'modal__duration'; 
    modal_duration.innerHTML = `Durée : ${details.duration}`; 
    modal_col_2.appendChild(modal_duration); 

    // modal country 
    const modal_country = document.createElement('p'); 
    modal_country.className = 'modal__country'; 
    modal_country.innerHTML = 'Pays : <br>'; 
    console.log('countries L138 : '+details.countries[0]); 
    if (details.countries.length>1) { 
        for(let country of details.countries) { 
            modal_country.innerHTML += `${country}<br>`; 
        }
    } else { 
        modal_country.innerHTML += `${details.countries[0]}<br>`; 
    } 
    modal_col_2.appendChild(modal_country); 

    // modal box office  
    const modal_income = document.createElement('p'); 
    modal_income.className = 'modal__income'; 
    modal_income.innerHTML = `Box office : ${details.worldwide_gross_income}`; 
    modal_col_2.appendChild(modal_income); 



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
    modal_col_3.appendChild(modal_close_button); 

    // modal directors 
    const modal_director = document.createElement('p'); 
    modal_director.className = 'modal__director'; 
    modal_director.innerHTML = 'Directors : <br>'; 
    console.log('directors L103 : '+details.directors[0]); 
    if (details.directors.length>1) { 
        for(let director of details.directors) { 
            // console.log('director 128 : '+director); 
            modal_director.innerHTML += `${director}<br>`; 
        } 
    } else { 
        modal_director.innerHTML += `${details.directors[0]}<br>`; 
    } 
    modal_col_3.appendChild(modal_director); 

    // modal casting 
    const modal_casting_list = document.createElement('p'); 
    modal_casting_list.className = 'modal__casting_list'; 
    modal_casting_list.innerHTML = 'Casting : <br>'; 
    console.log('actors L118 : '+details.actors[0]); 
    console.log('actors.length L119 : '+details.actors.length); 
    if (details.actors.length>1) { 
        for(let actor of details.actors) { 
            modal_casting_list.innerHTML += `${actor}<br>`; 
        } 
    } else { 
        modal_casting_list.innerHTML += `${details.actors[0]}<br>`; 
    } 
    modal_col_3.appendChild(modal_casting_list); 

    
    // modal wraper 
    // const clear_div = document.createElement('div') 
    // clear_div.className = 'clear' 
    modal_wraper.appendChild(clear_div) 

    // modal abstract 
    const modal_abstract = document.createElement('p'); 
    modal_abstract.className = 'modal__abstract'; 
    modal_abstract.innerHTML = `Synopsis : ${details.long_description}`; 
    modal_col_4.appendChild(modal_abstract); 



    // append modal into container 
    one_modal.appendChild(modal_wraper) 
    container_div.appendChild(one_modal); 
} 



const display_best_film = async () => { 
    const apiBestFilm = await retrieveApiBestFilm(); 
    const bestFilm = apiBestFilm.results[0]; 
    // console.log('bestFilm.id : '+bestFilm.id); 

    // const result = get_details(bestFilm.id); 
    const details = await retrieveOneFilm(bestFilm.id); 
    // console.log('bestFilm details : ', details); 
    // console.log('bestFilm detail.id : ', detail.id); 

    const best_section = document.getElementsByClassName('best')[0]; 
    const best_intro_div = document.getElementsByClassName('best__intro')[0]; 
    const best_intro_title_h3 = document.getElementsByClassName('best__intro__title')[0]; 
    best_intro_title_h3.innerHTML = bestFilm.title+' '+bestFilm.imdb_score; 
    
    const best_intro_text_p = document.getElementsByClassName('best__intro__text')[0]; 
    best_intro_text_p.innerHTML = details.long_description+' '+bestFilm.id; 

    const btns_more_infos = document.getElementsByClassName('btns__more_infos')[0]; 
    btns_more_infos.onclick = async function() { 
        await create_modal(bestFilm.id); 
    } 

    
    const best_img = document.createElement('div'); 
    best_img.classList.add('best__img'); 
    best_img.style.backgroundImage = `url(${bestFilm.image_url})`; 


    best_section.appendChild(best_img); 
    best_section.appendChild(clear_div); 



} 
await display_best_film(); 



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

