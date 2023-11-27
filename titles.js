
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

    let spinner = document.getElementById('spinner'); 
    console.log(parent); 

    // JS DOM 
    const create_node = (tag, class_name, parent) => { 
        let name_var = document.createElement(tag); 
        name_var.className = class_name; 
        parent.appendChild(name_var); 
        return name_var; 
    } 
    
    let main_tag = document.getElementsByTagName('main')[0]; 
    
    // one_modal 
    let one_modal = document.createElement('div') 
    one_modal.className = `modal display_none` 
    
    
    // theBest section 
    spinner.remove(); 
    const best_intro_title_h3 = document.getElementsByClassName('best__intro__title')[0]; 
    const best_intro_text_p = document.getElementsByClassName('best__intro__text')[0]; 
    const best_img_a = document.getElementsByClassName('best__img__a')[0]; 
    best_img_a.setAttribute('cursor', 'pointer'); 
    const best_img = document.getElementsByClassName('best_img')[0]; 
    

    best_intro_title_h3.innerHTML = theBest.title; 
    const theBestDetails = await retrieveOneFilm(theBest.id); 
    best_intro_text_p.innerHTML = theBestDetails.description; 

    best_img.innerHTML = `<img class="best__img" alt="Affiche best film" height="450px" src="${theBest.image_url}">`; 

    const sliders_section = create_node('section', 'sliders', main_tag); 

    // Divs categries 
    for(let cat of cats) { 

        let cat_name = categories_names[cats.indexOf(cat)]; 

        const one_category_title = create_node('h4', `sliders__category__title`, sliders_section); 
        one_category_title.innerHTML = cat_titles[cats.indexOf(cat)]; 

        const sliders__category__films = create_node('article', 'sliders__category__films', sliders_section); 
        sliders__category__films.className += ' carousel slide'; 

        // Buttons prev next 
        let button_prev = create_node('button', 'carousel-control-prev', sliders__category__films); 
        let button_prev_icon = create_node('span', 'carousel-control-prev-icon', button_prev); 
        button_prev.setAttribute('id', `${cat_name}_prev`); 
        button_prev

        const carousel_inner = create_node('div', 'carousel-inner', sliders__category__films); 
        carousel_inner.setAttribute('id', `carousel-inner-${cat_name}`); 

        let button_next = create_node('button', 'carousel-control-next', sliders__category__films); 
        let button_next_icon = create_node('span', 'carousel-control-next-icon', button_next); 
        button_next.setAttribute('id', `${cat_name}_next`); 


        for(let film of cat) { 

            let one_film_div = create_node('div', `one_carousel_item_${cat_name}`, carousel_inner); 
            let position = 0; 
            
            for(let i=0; i<one_film_div.length; i++) { 
                one_film_div.style.display = 'none'; 
            } 
            
            for(let i = position; i<position+5; i++) { 
                one_film_div.style.display = 'inline-block'; 
            } 

            let one_film_div_a; 
            one_film_div_a = create_node('a', `one_film_img`, one_film_div); 
            if(film.id=='259534') { 
                one_film_div_a.style.backgroundImage = 'url(https://m.media-amazon.com/images/M/MV5BNTJjZTViZTEtNGVhNy00ODlmLTg2YTEtZDQ4NzBiNGMzMGJkXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_.jpg)' 
            } else { 
                one_film_div_a.style.backgroundImage = `url(${film.image_url})` 
            } 
            
            let one_film_div_a_h5; 
            one_film_div_a_h5 = create_node('h5', 'one_film_title', one_film_div_a); 
            one_film_div_a_h5.innerHTML = film.title+' '+film.id; 
            
            // // Open modal button 
            // let one_film_div_a_button; 
            // one_film_div_a_button = create_node('button', 'one_film_button', one_film_div_a); 
            // one_film_div_a_button.classList.add('btns__modal'); 
            
            const id = film.id; 
            
            // details film onclick 
            // one_film_div_a_button.onclick = async function() { 
            one_film_div_a.onclick = async function() { 
                one_modal.classList.remove('display_none') 
                one_modal.classList.add('block') 
                one_modal.setAttribute('id', `modal_${id}`) 
                
                /* Get the details data for one film */ 
                await get_details(id) 
            } 
            // one_film_div_a_button.innerHTML = 'Détails'; 
        } 

        function toSlide(event) { 

            let x = document.getElementsByClassName(`one_carousel_item_${cat_name}`)
            for(let i = 0; i<x.length; i++) { 
                x[i].style.display = 'none'; 
            } 

            if(event.currentTarget.id.includes('prev')) { 
                for(let i=0; i<5; i++) { 
                    x[i].style.display = 'inline-block'; 
                } 
            } else if(event.currentTarget.id.includes('next')) { 
                for(let i = 2; i<x.length; i++) { 
                    x[i].style.display = 'inline-block'; 
                } 
            } 
        } 

        button_prev.addEventListener("click", toSlide); 
        button_next.addEventListener("click", toSlide); 

        // let main_tag = document.getElementsByTagName('main')[0]; 
        main_tag.appendChild(one_modal) 
    } 

    // Modal content 
    async function get_details(id) { 
        const details = await retrieveOneFilm(id) 
        // console.log(details); 

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
        console.log(id); 
        if(id=='259534') { 
            modal_img.setAttribute('src', 'https://m.media-amazon.com/images/M/MV5BNTJjZTViZTEtNGVhNy00ODlmLTg2YTEtZDQ4NzBiNGMzMGJkXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_.jpg'); 
            // modal_img.setAttribute('src', 'https://www.imdb.com/title/tt0259534/mediaviewer/rm2605132289/?ref_=tt_ov_i'); 
        } else { 
            modal_img.setAttribute('src', `${details.image_url}`); 
        } 

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
        let modal_genres_span = create_node('span', 'bold', modal_genres)
        modal_genres_span.innerHTML = 'Genres : <br> '; 
        const genres = details.genres; 
        for(let genre of genres) { 
            modal_genres.innerHTML += `${genre}<br>`; 
        } 

        // publication date 
        let modal_date = create_node('p', 'modal__publish_date', modal_div2); 
        let modal_date_span = create_node('span', 'bold', modal_date); 
        modal_date_span.innerHTML = 'Publication : ';  
        modal_date.innerHTML += details.date_published;  

        // rated 
        let modal_rated = create_node('p', 'modal__rated', modal_div2); 
        let modal_rated_span = create_node('span', 'bold', modal_rated); 
        modal_rated_span.innerHTML = 'Note moyenne : '; 
        modal_rated.innerHTML += details.rated; 

        // imdb_score 
        let modal_imdb_score = create_node('p', 'modal__imdb_score', modal_div2); 
        let modal_imdb_score_span = create_node('span', 'bold', modal_imdb_score); 
        modal_imdb_score_span.innerHTML = 'Score Imdb : '; 
        modal_imdb_score.innerHTML += details.imdb_score; 

        // duration 
        let modal_duration = create_node('p', 'modal__duration', modal_div2); 
        let modal_duration_span = create_node('span', 'bold', modal_duration); 
        modal_duration_span.innerHTML = 'Durée :'; 
        modal_duration.innerHTML += details.duration; 

        // countries 
        let modal_countries = create_node('p', 'modal__country', modal_div2); 
        let modal_countries_span = create_node('span', 'bold', modal_countries); 
        modal_countries_span.innerHTML = 'Pays : <br>'; 
        const countries = details.countries; 
        for(let country of countries) { 
            modal_countries.innerHTML += `${country}<br>`
        }
        
        // gross income 
        let modal_income = create_node('p', 'modal__income', modal_div2); 
        let modal_income_span = create_node('span', 'bold', modal_income); 
        modal_income_span.innerHTML = 'Box office : '; 
        modal_income.innerHTML += details.worldwide_gross_income; 

        // directors 
        let modal_director = create_node('p', 'modal__director', modal_div3); 
        let modal_director_span = create_node('span', 'bold', modal_director); 
        modal_director_span.innerHTML = 'Directors : <br>'; 
        const directors = details.directors; 
        for(let director of directors) { 
            modal_director.innerHTML += `${director}<br>`; 
        } 
        
        // casting 
        let modal_casting = create_node('p', 'modal__casting_list', modal_div3); 
        let modal_casting_span = create_node('span', 'bold', modal_casting); 
        modal_casting_span.innerHTML = 'Casting : <br>'; 
        const actors = details.actors; 
        for(let actor of actors) { 
            modal_casting.innerHTML += `${actor}<br>`; 
        } 
        
        // long description 
        let modal_abstract = create_node('p', 'modal__abstract', modal_div4); 
        let modal_abstract_span = create_node('span', 'bold', modal_abstract); 
        modal_abstract_span.innerHTML = 'Synopsis : '; 
        modal_abstract.innerHTML += details.long_description; 

        one_modal.appendChild(modal_wraper); 

        return details; 
    } 

    // theBest details button 
    // best_more_button.onclick = function() { 
    best_img_a.onclick = function() { 
        one_modal.classList.remove('display_none') 
        one_modal.classList.add('block') 
        one_modal.setAttribute('id', `modal_${theBest.id}`) 
        get_details(theBest.id); 
    } 

} 

main(['best', 'romance', 'drama', 'animation'], ['Les mieux notes', 'Romance', 'Drama', 'Animation']); // , 'drama', 'animation' 

