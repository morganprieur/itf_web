

async function retrieveApiFilms(category_name) { 
    const response_films = await fetch("http://localhost:8000/api/v1/titles/?genre="+category_name, {}) 
    const data_films = await response_films.json(); 

    return data_films; 
} 

async function retrieveApiBestFilms() { 
    const response_films = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", {}) 
    const data_films = await response_films.json(); 

    return data_films; 
} 

async function retrieveApiCategories() { 
    const response_genres = await fetch("http://localhost:8000/api/v1/genres/", {}) 
    const data_genres = await response_genres.json(); 

    return data_genres; 
} 

function replaceClass(classe) { 
    // console.log(classe) 
    // mod.removeClass('none') 
    // mod.className = 'block' 
    window.onload = function() { 
        mod = document.getElementById(classe)  // c'est ça la bonen question inspecteur ! 
        console.log(`mod : ${mod}`) 
        // mod.replace('none' , 'block' ) 
        mod.removeClass('none') 
        mod.className = 'block' 
        // mod.replace( /(?:^|\s)none(?!\S)/g , 'block' ) 
    } 
        // if (document.getElementsByClassName(classe).style.display == 'none') { 
            //     document.getElementsByClassName(classe).style.display = 'block';
            // } else { 
                //     document.getElementById(id).style.display = 'none';
                // } 
} 

// main 
const main = async(category_name, category_id) => { 
  
    let apiFilms; 
    if(category_name=='best_films') { 
        apiFilms = await retrieveApiBestFilms(); 
    } else { 
        apiFilms = await retrieveApiFilms(category_name); 
    }
    const films = apiFilms.results; 

    const apiGenres = await retrieveApiCategories(); 
    const categories = apiGenres.results; 

    
    const data_one_category = document.getElementById(category_id); 
    // const data_one_category = document.getElementById('sliders_one_category'); 


    films.forEach(element => {
        console.log(element) 

        let one_film_div = document.createElement('div') 
        one_film_div.className = 'one_film' 
        
        let one_film_div_a = document.createElement('a') 
        one_film_div_a.className = `one_film__img one_film_${element.id}` 
        one_film_div_a.style.backgroundImage = `url(${element.image_url})` 
        
        let one_film_div_a_h5 = document.createElement('h5') 
        one_film_div_a_h5.className = 'one_film__title' 
        one_film_div_a_h5.innerHTML = element.title 
        
        // // debug 
        // let one_film_div_a_genre = document.createElement('p') 
        // one_film_div_a_genre.className = 'one_film__genre' 
        // one_film_div_a_genre.innerHTML = '' 
        // genres = element.genres 
        // // console.log('genres 70 : '+genres) 
        // for(let genre of genres) { 
        //     // console.log('genre 72 : '+genre) 
        //     one_film_div_a_genre.innerHTML += `${genre}<br>` 
        // } 

        /* one_modal */ 
        let one_modal = document.createElement('div') 
        // one_modal.className = `modal__${element.id} none` 
        one_modal.className = `modal display_none` 
        one_modal.setAttribute('id', `modal_${element.id}`)
        
        // const replaceClass = () => { 
            // replace( /(?:^|\s)none(?!\S)/g , 'block' ) 
        // } 
        // classe = 'one_film__title' 
        let classe = `modal_${element.id}` 
        // console.log(classe) 
        // window.onload = function () {
            //     let els = document.getElementsByClassName("bold");
            //     console.log(els);
            // } 
            
            
        let one_film_div_a_button = document.createElement('button') 
        one_film_div_a_button.classList = 'one_film__button btns__modal' 
        // one_film_div_a_button.setAttribute('onclick', replaceClass(classe))
        
        one_film_div_a_button.onclick = function() { 
            // replaceClass(classe) 
            console.log(classe) 
            // window.onload = function () {
                // let mod = document.getElementById(classe)  // c'est ça la bonen question inspecteur ! 
                let mod = one_modal 
                console.log(mod.className) 
                // mod = document.getElementById(classe)  // c'est ça la bonen question inspecteur ! 
                // console.log(`mod : ${mod}`) 
                // mod.removeClass('none') 
                mod.classList.remove('display_none')
                mod.classList.add('block') 
                // mod.classList.remove('display_none').add('block') 
                // mod.className = 'block' 
                // mod.replace('none' , 'block' ) 
            // } 
        } 
        one_film_div_a_button.innerHTML = 'Détails' 
        
        // one_film_div_a_button.addEventListener('click', replaceClass(classe)) 
        // one_film_div_a_button.addEventListener('click', replaceClass(`modal__${element.id}`)) 
        // onclick="masquer_div('a_masquer');"
        
        let modal_img = document.createElement('img') 
        modal_img.className = 'modal__img' 
        modal_img.setAttribute('alt', `Affiche du film ${element.title}`)
        modal_img.setAttribute('src', `${element.image_url}`)
        one_modal.appendChild(modal_img) 
        
        let modal_title = document.createElement('h3') 
        modal_title.className = 'modal__title' 
        modal_title.innerHTML = element.title 
        one_modal.appendChild(modal_title) 

        let modal_genres = document.createElement('p') 
        modal_genres.className = 'modal__genres' 
        modal_genres.innerHTML = 'Genres : <br> ' 
        genres = element.genres 
        // console.log('genres 70 : '+genres) 
        for(let genre of genres) { 
            // console.log('genre 72 : '+genre) 
            modal_genres.innerHTML += `${genre}<br>` 
        } 
        one_modal.appendChild(modal_genres) 

        let modal_date = document.createElement('p') 
        modal_date.className = 'modal__publish_date' 
        modal_date.innerHTML = element.date_published 
        one_modal.appendChild(modal_date) 

        let modal_rated = document.createElement('p') 
        modal_rated.className = 'modal__rated' 
        modal_rated.innerHTML = element.rated 
        one_modal.appendChild(modal_rated) 

        let modal_imdb_score = document.createElement('p') 
        modal_imdb_score.className = 'modal__imdb_score' 
        modal_imdb_score.innerHTML = element.imdb_score 
        one_modal.appendChild(modal_imdb_score) 

        let modal_director = document.createElement('p') 
        modal_director.className = 'modal__director' 
        modal_director.innerHTML = 'Directors : <br> ' 
        directors = element.directors 
        // console.log('genres 70 : '+genres) 
        for(let director of directors) { 
            // console.log('genre 72 : '+genre) 
            modal_director.innerHTML += `${director}<br>` 
        } 
        one_modal.appendChild(modal_director) 
        
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
        one_film_div.appendChild(one_modal) 
        data_one_category.appendChild(one_film_div)  


    }); 
    

} 

main('best_films', 'slider_mieux_notes') 
main('romance', 'slider_cat1') 
main('drama', 'slider_cat2') 
main('animation', 'slider_cat3') 

