
// All the films by categories 
import { retrieveAllFilms } from "./requests.js"; 
import { retrieveCategoriesSuite } from "./requests.js"; 
// // The best films category page 1 
// import { retrieveApiBestFilm } from "./requests.js"; 
// The best films category page 2 
// import { retrieveBestsPage2 } from "./requests.js"; 
// // The films by categories page 1 
// import { retrieveFilmsByCategories } from "./requests.js"; 
// The films by categories page 2 
// import { retrieveCategoryPage2 } from "./requests.js"; 
// 1 film 
import { retrieveOneFilm } from "./requests.js"; 



// main 
// const main = async(category_name, category_id) => { 
const main = async(categories_names, category_id) => { 

    let theBest; 
    async function get_films(categories_names) { 

        let troncated_categories = []; 
        // let best_film; 
        for(let cat_name of categories_names) { 
            const api_category = await retrieveAllFilms(cat_name); 
            const api_category_suite = await retrieveCategoriesSuite(cat_name); 
            const one_category = api_category.results; 
            for(let cat_suite of api_category_suite.results) { 
                one_category.push(cat_suite); 
            } 
            // Récupérer tehBest 
            if(cat_name=='best') { 
                theBest = one_category.shift(); 
                // console.log(one_category);  // ok 
            } 
            console.log(theBest); // ok 
            troncated_categories.push(one_category.slice(0, 7)); 
            // console.log(troncated_categories); // 4 listes de 7 objets
        } 
        return troncated_categories; 
    } 
    const cats = await get_films(categories_names); 
    // console.log(cats);  // 4 listes de 7 objets ok 


    /* Tronquer une liste : 
    python : 
    firsts = selected[::2] 1 sur 2 à partir de 0 
    seconds = selected[1::2] 1 sur 2 à partir de 1 
    args : start:stop:step 
    JS : 
    animals.slice(2); 
    arg : start 
    animals.slice(2, 4); 
    args : stop, nombre, stop 
    animals.slice(-2); 
    args : start en partant de la fin 
    */ 

    // Afficher les données des films : 
    /* 
    id 
    title 
    votes 
    image_url 
    details.long_description 
    genres (liste) 
    details.date_published 
    details.rated 
    details.imdb_score 
    element.directors (liste) 
    element.actors (liste) 
    details.duration 
    details.countries (liste) 
    details.worldwide_gross_income 


    */ 
    

    
    // one_modal 
    let one_modal = document.createElement('div') 
    one_modal.className = `modal display_none` 



    const best_section = document.getElementsByClassName('best')[0]; 
    const best_intro_div = document.getElementsByClassName('best__intro')[0]; 
    const best_intro_title_h3 = document.getElementsByClassName('best__intro__title')[0]; 
    const best_intro_subtitle_h4 = document.getElementsByClassName('best__intro__subtitle')[0]; 
    const best_intro_text_p = document.getElementsByClassName('best__intro__text')[0]; 
    const best_img = document.getElementsByClassName('best__img')[0]; 
    
    const data_one_category = document.getElementById(category_id); 

    //  Button "More infos" for the best film 
    const best_more_button = document.getElementsByClassName('btns__more_infos')[0]; 
    // console.log('best_more_button : '+best_more_button.textContent) 
    // Voir avec co si le bouton "fermer" s'affiche 
    best_more_button.onclick = function() { 
        one_modal.classList.remove('display_none') 
        one_modal.classList.add('block') 
        one_modal.setAttribute('id', `modal_${element.id}`) 
        get_details(element.id); 
    } 

    // Modal content 
    async function get_details(id) { 
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
    
    // console.log('max : '+Math.max(films.imdb_score)+' '+films.title); 
    best_intro_title_h3.innerHTML = theBest.title+' '+theBest.imdb_score+' '+theBest.id; 
    best_img.innerHTML = `<img class="best_img alt="Affiche best film" height="450px" src=${theBest.image_url}>`; 
    // best_img.innerHTML = `<img class="best_img alt="Affiche best film" height="450px" src=${bestFilm.image_url}>`; 
    best_section.appendChild(best_img); 
    
    console.log('films[0].title T220 : '+films[0].title); 
    for (let element of films) { 

        // console.log(element); 


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

        // async function get_details(id) { 
        //     const details = await retrieveOneFilm(id) 
        //     // console.log(details) 

        //     details here ? *** 

        //     return details 
        // } 

        // details button onclick 
        one_film_div_a_button.onclick = function() { 
            one_modal.classList.remove('display_none')
            one_modal.classList.add('block') 
            one_modal.setAttribute('id', `modal_${element.id}`) 
            
            /* Get the details data for one film */ 
            get_details(id) 
        } 
        one_film_div_a_button.innerHTML = 'Détails'; 


        
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

main(['best', 'romance', 'drama', 'animation'], 'slider_mieux_notes') 
// main('best', 'slider_mieux_notes') 
// main('romance', 'slider_cat1') 
// main('drama', 'slider_cat2') 
// main('animation', 'slider_cat3') 

