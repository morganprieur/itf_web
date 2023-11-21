
// All the films by categories 
import { retrieveAllFilms } from "./requests.js"; 
import { retrieveCategoriesSuite } from "./requests.js"; 
// 1 film 
import { retrieveOneFilm } from "./requests.js"; 


// main 
const main = async (categories_names, cat_titles) => { 

    let theBest; 
    async function get_films(categories_names) { 

        let truncated_categories = []; 

        // let best_film; 
        for(let cat_name of categories_names) { 
            const api_category = await retrieveAllFilms(cat_name); 
            const api_category_suite = await retrieveCategoriesSuite(cat_name); 
            const one_category = api_category.results; 
            for(let cat_suite of api_category_suite.results) { 
                one_category.push(cat_suite); 
            } 

            // Récupérer theBest 
            if(cat_name=='best') { 
                theBest = one_category.shift(); 
            } 
            truncated_categories.push(one_category.slice(0, 7)); 
        } 
        return truncated_categories; 
    } 
    const cats = await get_films(categories_names); 


    // JS DOM 
    const create_node = (tag, class_name, parent) => { 
        let name_var = document.createElement(tag); 
        name_var.className = class_name; 
        parent.appendChild(name_var); 
        return name_var; 
    } 
    
    // one_modal 
    let one_modal = document.createElement('div') 
    one_modal.className = `modal display_none` 

    
    // theBest section 
    const best_intro_title_h3 = document.getElementsByClassName('best__intro__title')[0]; 
    const best_intro_text_p = document.getElementsByClassName('best__intro__text')[0]; 
    const best_img = document.getElementsByClassName('best_img')[0]; 
    
    //  Button "More infos" for the best film 
    const best_more_button = document.getElementsByClassName('btns__more_infos')[0]; 

    best_intro_title_h3.innerHTML = theBest.title+' '+theBest.imdb_score+' '+theBest.id; 
    const theBestDetails = await retrieveOneFilm(theBest.id); 
    best_intro_text_p.innerHTML = theBestDetails.description; 

    best_img.innerHTML = `<img class="best__img" alt="Affiche best film" height="450px" src="${theBest.image_url}">`; 


    // Divs categries 
    for(let cat of cats) { 

        // h4 class "sliders__category__title" 
        let one_category_title; 
        for(let i=0; i<4; i++) { 
            one_category_title = document.getElementsByClassName(`sliders__category__title`)[i]; 
            one_category_title.innerHTML = cat_titles[i]; 
        } 

        let cat_name = categories_names[cats.indexOf(cat)]; 
        let x = document.getElementsByClassName(`one_carousel_item_${cat_name}`); 
        let position = 0; 
        
        for(let i=0; i<x.length; i++) { 
            x[i].style.display = 'none'; 
        } 
        
        for(let i = position; i<position+5; i++) { 
            x[i].style.display = 'inline-block'; 
        } 

        // Buttons prev next 
        let button_prev = document.getElementsByClassName('carousel-control-prev')[cats.indexOf(cat)] 
        button_prev.setAttribute('id', `${cat_name}_prev`); 
        button_prev.addEventListener("click", toSlide); // *** 

        let button_next = document.getElementsByClassName('carousel-control-next')[cats.indexOf(cat)]; 
        button_next.setAttribute('id', `${cat_name}_next`); 
        button_next.addEventListener("click", toSlide); 
        
        function toSlide(event) { 
            for(let i = 0; i<x.length; i++) { 
                x[i].style.display = 'none'; 
            } 

            if(event.currentTarget.id.includes('prev')) { 
                for(let i=0; i<5; i++) { 
                    console.log(i); 
                    x[i].style.display = 'inline-block'; 
                } 
            } else if(event.currentTarget.id.includes('next')) { 
                for(let i = 2; i<7; i++) { 
                    console.log(i); 
                    x[i].style.display = 'inline-block'; 
                } 
            } 
        } 


        for(let film of cat) { 

            let one_film_div = document.getElementsByClassName(`one_carousel_item_${cat_name}`); 

            let film_div = one_film_div[cat.indexOf(film)];

            let one_film_div_a; 
            one_film_div_a = create_node('a', `one_film_img`, film_div); 
            one_film_div_a.style.backgroundImage = `url(${film.image_url})` 
            
            let one_film_div_a_h5; 
            one_film_div_a_h5 = create_node('h5', 'one_film_title', one_film_div_a); 
            one_film_div_a_h5.innerHTML = film.title+' '+film.id; // à retirer *** 
            
            // Open modal button 
            let one_film_div_a_button; 
            one_film_div_a_button = create_node('button', 'one_film_button', one_film_div_a); 
            one_film_div_a_button.classList.add('btns__modal'); 
            
            const id = film.id; 
            
            // details button onclick 
            one_film_div_a_button.onclick = async function() { 
                one_modal.classList.remove('display_none')
                one_modal.classList.add('block') 
                one_modal.setAttribute('id', `modal_${id}`) 
                
                /* Get the details data for one film */ 
                await get_details(id) 
            } 
            one_film_div_a_button.innerHTML = 'Détails'; 
        }

        let container_div = document.getElementById('container') 
        container_div.appendChild(one_modal) 
    } 

    // Modal content 
    async function get_details(id) { 
        const details = await retrieveOneFilm(id) 

        // wraper modal 
        let modal_wraper = document.createElement('div'); 
        modal_wraper.setAttribute('id', 'modal_wraper'); 

        // 4 divs into the modal 
        let modal_div1 = create_node('div', 'modal__divs', modal_wraper); 
        let modal_div2 = create_node('div', 'modal__divs', modal_wraper); 
        let modal_div3 = create_node('div', 'modal__divs', modal_wraper); 
        
        let modal_close_button = create_node('button', 'modal__close_button btns__modal', modal_wraper); 
        let clear_div = create_node('div', 'clear', modal_wraper); 
        
        let modal_div4 = create_node('div', 'modal__x_div', modal_wraper); 


        // détails modal 
        let modal_img = create_node('img', 'modal__img', modal_div1);  
        modal_img.setAttribute('alt', `Affiche du film ${details.title}`);
        modal_img.setAttribute('src', `${details.image_url}`); 

        // Close_modal button 
        modal_close_button.onclick = function() { 
            modal_wraper.remove(); 
            one_modal.classList.remove('block'); 
            one_modal.classList.add('display_none'); 
        } 
        modal_close_button.innerHTML = 'X Fermer' 
        
        // title 
        let modal_title = create_node('h3', 'modal__title', modal_div2); 
        modal_title.innerHTML = details.title; 

        // genres 
        let modal_genres = create_node('p', 'modal__genres', modal_div2); 
        let modal_genres_span; 
        modal_genres_span = create_node('span', 'bold', modal_genres)
        modal_genres_span.innerHTML = 'Genres : <br> '; 
        const genres = details.genres; 
        for(let genre of genres) { 
            modal_genres.innerHTML += `${genre}<br>`; 
        } 

        // publication date 
        let modal_date = create_node('p', 'modal__publish_date', modal_div2); 
        let modal_date_span; 
        modal_date_span = create_node('span', 'bold', modal_date); 
        modal_date_span.innerHTML = 'Publication : ';  
        modal_date_span.innerHTML = details.date_published;  

        // rated 
        let modal_rated; 
        modal_rated = create_node('p', 'modal__rated', modal_div2); 
        let modal_rated_span = create_node('p', 'modal__rated', modal_div2); 
        modal_rated_span.innerHTML = 'Note moyenne : '; 
        modal_rated_span.innerHTML = details.rated; 

        // imdb_score 
        let modal_imdb_score; 
        modal_imdb_score = create_node('p', 'modal__imdb_score', modal_div2); 
        let modal_imdb_score_span; 
        modal_imdb_score_span = create_node('span', 'bold', modal_imdb_score); 
        modal_imdb_score_span.innerHTML = details.imdb_score; 
        modal_imdb_score_span.innerHTML = 'Score Imdb : '; 

        // duration 
        let modal_duration; 
        modal_duration = create_node('p', 'modal__duration', modal_div2); 
        let modal_duration_span; 
        modal_duration_span = create_node('span', 'bold', modal_duration); 
        modal_duration_span.innerHTML = `Durée : ${details.duration}`; 

        // countries 
        let modal_countries; 
        modal_countries = create_node('p', 'modal__country', modal_div2); 
        let modal_countries_span; 
        modal_countries_span = create_node('span', 'bold', modal_countries); 
        modal_countries_span.innerHTML = 'Pays : <br>'; 
        const countries = details.countries; 
        for(let country of countries) { 
            modal_countries.innerHTML += `${country}<br>`
        }
        
        // gross income 
        let modal_income; 
        modal_income = create_node('p', 'modal__income', modal_div2); 
        let modal_income_span; 
        modal_income_span = create_node('span', 'bold', modal_income); 
        modal_income_span.innerHTML = 'Box office : '; 
        modal_income.innerHTML = details.worldwide_gross_income; 

        // directors 
        let modal_director = create_node('p', 'modal__director', modal_div3); 
        let modal_director_span; 
        modal_director_span = create_node('span', 'bold', modal_director); 
        modal_director_span.innerHTML = 'Directors : <br>'; 
        const directors = details.directors; 
        for(let director of directors) { 
            modal_director.innerHTML += `${director}<br>`; 
        } 
        
        // casting 
        let modal_casting; 
        modal_casting = create_node('p', 'modal__casting_list', modal_div3); 
        let modal_casting_span; 
        modal_casting_span = create_node('span', 'bold', modal_casting); 
        modal_casting_span.innerHTML = 'Casting : <br>'; 
        const actors = details.actors; 
        for(let actor of actors) { 
            modal_casting.innerHTML += `${actor}<br>`; 
        } 
        

        // long description 
        let modal_abstract; 
        modal_abstract = create_node('p', 'modal__abstract', modal_div4); 
        let modal_abstract_span; 
        modal_abstract_span = create_node('span', 'bold', modal_abstract); 
        modal_abstract_span.innerHTML = `Synopsis : ${details.long_description}`; 

        one_modal.appendChild(modal_wraper); 

        return details; 
    } 

    // theBest details button 
    best_more_button.onclick = function() { 
        one_modal.classList.remove('display_none') 
        one_modal.classList.add('block') 
        one_modal.setAttribute('id', `modal_${theBest.id}`) 
        get_details(theBest.id); 
    } 

} 

main(['best', 'romance', 'drama', 'animation'], ['Les mieux notes', 'Romance', 'Drama', 'Animation']); // , 'drama', 'animation' 

