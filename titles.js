
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
    // const main = async(categories) => { 
const main = async(categories_names) => { 

    // let categories_names = []; 
    // let categories_ids = []; 
    // for(let in_cat of categories) { 
    //     categories_names.push(in_cat[0]); 
    //     categories_ids.push(in_cat[1]); 
    // } 
    // console.log(categories_names); 
    // console.log(categories_ids); 

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
            // console.log(theBest); // ok 
            troncated_categories.push(one_category.slice(0, 7)); 
            // console.log(troncated_categories); // 4 listes de 7 objets
        } 
        return troncated_categories; 
    } 
    const cats = await get_films(categories_names); 
    console.log(cats);  // 4 listes de 7 objets ok 

    // const bestsFilms = cats[0]; 
    // console.log(bestsFilms); 
    // cats.shift(); 
    console.log(cats); 


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


    // JS DOM 
    const create_node = (tag, class_name, parent) => { 
        let name_var = document.createElement(tag); 
        name_var.classList.add(class_name); 
        parent.appendChild(name_var); 
        return name_var; 
    } 
    
    
    // one_modal 
    let one_modal = document.createElement('div') 
    one_modal.className = `modal display_none` 

    const best_section = document.getElementsByClassName('best')[0]; 
    const best_intro_div = document.getElementsByClassName('best__intro')[0]; 
    const best_intro_title_h3 = document.getElementsByClassName('best__intro__title')[0]; 
    const best_intro_subtitle_h4 = document.getElementsByClassName('best__intro__subtitle')[0]; 
    const best_intro_text_p = document.getElementsByClassName('best__intro__text')[0]; 
    // const best_img = document.getElementsByClassName('best__img')[0]; 
    const best_img = document.getElementsByClassName('best_img')[0]; 
    
    //  Button "More infos" for the best film 
    const best_more_button = document.getElementsByClassName('btns__more_infos')[0]; 
    // console.log('best_more_button : '+best_more_button.textContent) 
    // Voir si le bouton "fermer" s'affiche 
    best_more_button.onclick = function() { 
        one_modal.classList.remove('display_none') 
        one_modal.classList.add('block') 
        one_modal.setAttribute('id', `modal_${element.id}`) 
        get_details(element.id); 
    } 

    // Section id "Sliders" 
    const sliders_section = document.getElementById('sliders'); 
    // sliders_section.innerHTML = 'sliders section'; 
    
    // for(let cat_name of categories_names) { 
    for(let cat of cats) { 
        
        let cat_name = categories_names[cats.indexOf(cat)]; 
        console.log(cat_name); 
        // Div class "sliders__category" 
        let one_category_div = document.createElement('div'); 
        one_category_div.className = `sliders__category`; 
        // console.log(cat_name); 
        one_category_div.setAttribute('id', `cat_${cat_name}`); 
        // one_category_div.innerHTML = `one_category_div ${cat_name}`; 
        sliders_section.appendChild(one_category_div); 

        // h4 class "sliders__category__title" 
        let one_category_title; 
        one_category_title = create_node('h4', 'sliders__category__title', one_category_div); 
        one_category_title.innerHTML = cat_name; 

        // Div id "slider_cat_name" class "carousel slide sliders__category__films" 
        let one_category_slider; 
        one_category_slider = create_node('div', 'sliders__category__films', one_category_div); 
        one_category_slider.classList.add('carousel'); 
        one_category_slider.classList.add('slide'); 

        
        function onClicNext() { 
            one_category_slider.innerHTML += ' test'; 
            // if('active' in cats[0].classList) { 
            //     console.log(cats[0].title); 
            //     // one_category_carousel_inner.setAttribute('style', 'slide_right'); 
            //     // one_category_carousel_inner.style('animation', 'slide_right'); 
            //     one_film_div.innerHTML = 'test'; 
            // } 
        } 

        // Buttons prev next 
        let button_prev; 
        button_prev = create_node('button', 'carousel-control-prev', one_category_slider); 
        let button_next; 
        button_next = create_node('button', 'carousel-control-next', one_category_slider); 

        // Icones buttons prev next 
        let span_button_prev; 
        span_button_prev = create_node('span', 'carousel-control-prev-icon', button_prev); 
        let span_button_prev_text; 
        span_button_prev_text = create_node('span', 'visually-hidden', button_prev); 
        span_button_prev_text.innerHTML = 'Previous'; 
        let span_button_next; 
        span_button_next = create_node('span', 'carousel-control-next-icon', button_next); 
        // span_button_next.setAttribute('onclick', onClicNext()); 
        span_button_next.addEventListener('click', onClicNext()); 
        let span_button_next_text; 
        span_button_next_text = create_node('span', 'visually-hidden', button_next); 
        span_button_next_text.innerHTML = 'Next'; 

        
        // <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        //     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        //     <span class="visually-hidden">Previous</span>
        // </button>
        // <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        //     <span class="carousel-control-next-icon" aria-hidden="true"></span>
        //     <span class="visually-hidden">Next</span>
        // </button>

        // exemple web 
        // function onClickPrev(){ 
        //     if (currentImage == 0){ 
        //         slideTo(imageNumber - 1); 
        //     } 
        //     else{ 
        //         slideTo(currentImage - 1); 
        //     } 
        // } 
        // exemple codepen css 
        // .slide-right { 
        //     animation: 3s slide-right; 
        // } 


        // Div class "carousel-inner" 
        let one_category_carousel_inner; 
        one_category_carousel_inner = create_node('div', 'carousel-inner', one_category_slider); 
        // one_category_carousel_inner = create_node('div', 'carousel-inner', one_category_div); 

        // for(let cat of cats) { 
        for(let film of cat) { 
            // console.log(film);               
            console.log(film.id+' '+film.title); 

            // const test = document.createElement('p'); 
            // test.innerHTML = 'TEST'; 
            // one_category_carousel_inner.appendChild(test); 
            // let test; 
            // test = create_node('p', 'test', one_category_carousel_inner); 
            // test.innerHTML = 'TEST'; 

            /* ==== */ 
            // let one_film_div = document.createElement('div'); 
            // one_film_div.className = 'carousel-item'; 
            // one_film_div.classList.add('active'); 
            // one_film_div.className = 'one_film' 
            let one_film_div; 
            one_film_div = create_node('div', 'one_carousel_item', one_category_carousel_inner); 
            // one_film_div.setAttribute('id', `one_film_${film.id}`); // à décommenter 
            // one_category_carousel_inner.appendChild(one_film_div); 
            // when document loaded : position 1 
            // if(cats.indexOf(cat)<6 && cats.indexOf(cat)>0) { 
            //     one_film_div.classList.add('active'); 
            // }; 
            
            // let one_film_div_a = document.createElement('a') 
            // one_film_div_a.className = `one_film__img one_film_${element.id}` 
            let one_film_div_a; 
            // one_film_div_a = create_node('a', `one_film__img`, one_film_div); 
            one_film_div_a = create_node('a', `one_film_img`, one_film_div); 
            one_film_div_a.style.backgroundImage = `url(${film.image_url})` 
            
            // let one_film_div_a_h5 = document.createElement('h5') 
            // one_film_div_a_h5.className = 'one_film__title' 
            let one_film_div_a_h5; 
            // one_film_div_a_h5 = create_node('h5', 'one_film__title', one_film_div); 
            one_film_div_a_h5 = create_node('h5', 'one_film_title', one_film_div_a); 
            one_film_div_a_h5.innerHTML = film.title; 
            console.log(film.id+' '+film.image_url+' '+film.title); 
            
            // Open modal button 
            let one_film_div_a_button; 
            // one_film_div_a_button = create_node('button', 'one_film__button', one_film_div); 
            one_film_div_a_button = create_node('button', 'one_film_button', one_film_div_a); 
            one_film_div_a_button.classList.add('btns__modal'); 

            const id = film.id; 

            // details button onclick 
            one_film_div_a_button.onclick = function() { 
                one_modal.classList.remove('display_none')
                one_modal.classList.add('block') 
                one_modal.setAttribute('id', `modal_${id}`) 
                // one_modal.setAttribute('id', `modal_${element.id}`) 
                
                /* Get the details data for one film */ 
                get_details(id) 
            } 
            one_film_div_a_button.innerHTML = 'Détails'; 


            
            // one_film_div_a.appendChild(one_film_div_a_h5) 
            // // one_film_div_a.appendChild(one_film_div_a_genre) 
            // one_film_div_a.appendChild(one_film_div_a_button) 
            // one_film_div.appendChild(one_film_div_a) 
            // // one_film_div.appendChild(one_modal) 
            // one_category_div.appendChild(one_film_div); 
            // // data_one_category.appendChild(one_film_div); 

            let container_div = document.getElementById('container') 
            container_div.appendChild(one_modal) 
            /* ==== */ 
        } 
        // } 
    } 






    // Modal content 
    async function get_details(id) { 
        console.log(`id T238 : ${id}`) 
        const details = await retrieveOneFilm(id) 
        // console.log(`détails : ${details}`) 

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
        const genres = details.genres; 
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
        const directors = details.directors; 
        console.log('directors 126 : '+directors); 
        for(let director of directors) { 
            console.log('director 128 : '+director); 
            modal_director.innerHTML += `${director}<br>`; 
        } 
        modal_wraper.appendChild(modal_director); 
        
        let modal_casting_list = document.createElement('p'); 
        modal_casting_list.className = 'modal__casting_list'; 
        modal_casting_list.innerHTML = 'Casting : <br>'; 
        const actors = details.actors; 
        for(let actor of actors) { 
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
        const countries = details.countries; 
        for(let country of countries) { 
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
    const best_details = await get_details(theBest.id); 
    best_intro_text_p.innerHTML = best_details.description; 
    let best__img; 
    // best_img = create_node('div', 'best__img', best_section); 
    console.log('theBest.image_url : '+theBest.image_url); 
    best_img.innerHTML = `<img class="best__img" alt="Affiche best film" height="450px" src="${theBest.image_url}">`; 
    // best_img.innerHTML = `<img class="best_img alt="Affiche best film" height="450px" src=${bestFilm.image_url}>`; 
    // best_section.appendChild(best_img); 
    
    // console.log('bestsFilms[0].title T231 : '+bestsFilms[0].title); 
    // console.log('cats[0].title T357 : '+cats[0][0].title); 
    // console.log('films[0].title T229 : '+films[0].title); 



} 

main(['best', 'romance', 'drama', 'animation']); 
// main([['best', 'slider_mieux_notes'], ['romance', 'slider_cat1'], ['drama', 'slider_cat2'], ['animation', 'slider_cat3']]); 
// main('best', 'slider_mieux_notes') 
// main('romance', 'slider_cat1') 
// main('drama', 'slider_cat2') 
// main('animation', 'slider_cat3') 

