

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
        // console.log(element) 

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
        // console.log('genres 70 : '+genres) 
        // for(let genre of genres) { 
        //     console.log('genre 72 : '+genre) 
        //     one_film_div_a_genre.innerHTML += `${genre}<br>` 
        // } 

        /* one_modal */ 
        let one_modal = document.createElement('div') 
        one_modal.className = `modal__${element.id} none` 
        
        // const replaceClass = () => { 
        //     replace( /(?:^|\s)none(?!\S)/g , 'block' ) 
        // } 
        // classe = 'one_film__title' 
        classe = `modal__${element.id}` 
        // console.log(classe) 
        // window.onload = function () {
        //     let els = document.getElementsByClassName("bold");
        //     console.log(els);
        // } 
        function replaceClass(classe) { 
            console.log(classe) 
            // mod.removeClass('none') 
            // mod.className = 'block' 
            window.onload = function() { 
                mod = document.getElementsByClassName(classe) 
                console.log(`mod : ${mod}`) 
                mod.replace('none' , 'block' ) 
                // mod.replace( /(?:^|\s)none(?!\S)/g , 'block' ) 
            } 
                // if (document.getElementsByClassName(classe).style.display == 'none') { 
                    //     document.getElementsByClassName(classe).style.display = 'block';
                    // } else { 
                        //     document.getElementById(id).style.display = 'none';
                        // } 
        } 

        let one_film_div_a_button = document.createElement('button') 
        one_film_div_a_button.classList = 'one_film__button btns__modal' 
        one_film_div_a_button.setAttribute('onclick', replaceClass(classe))
        one_film_div_a_button.innerHTML = 'Détails' 
        
        one_film_div_a_button.addEventListener('click', replaceClass(classe)) 
        // one_film_div_a_button.addEventListener('click', replaceClass(`modal__${element.id}`)) 
        // onclick="masquer_div('a_masquer');"
        
        let modal_img = document.createElement('img') 
        modal_img.className = 'modal__img' 
        one_modal.appendChild(modal_img) 
        let modal_title = document.createElement('h3') 
        modal_title.className = 'modal__title' 
        one_modal.appendChild(modal_title) 
        let modal_genres = document.createElement('p') 
        modal_genres.className = 'modal__genres' 
        one_modal.appendChild(modal_genres) 
        let modal_date = document.createElement('p') 
        modal_date.className = 'modal__publish_date' 
        one_modal.appendChild(modal_date) 
        let modal_rated = document.createElement('p') 
        modal_rated.className = 'modal__rated' 
        one_modal.appendChild(modal_rated) 
        let modal_score_imdb = document.createElement('p') 
        modal_score_imdb.className = 'modal__score_imdb' 
        one_modal.appendChild(modal_score_imdb) 
        let modal_director = document.createElement('p') 
        modal_director.className = 'modal__director' 
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
        
        
        one_film_div_a.appendChild(one_film_div_a_h5) 
        // one_film_div_a.appendChild(one_film_div_a_genre) 
        one_film_div_a.appendChild(one_film_div_a_button) 
        one_film_div.appendChild(one_film_div_a) 
        one_film_div.appendChild(one_modal) 
        data_one_category.appendChild(one_film_div)  


    }); 
    

    /* categories */ 
    // const data_sliders = document.getElementById('sliders'); 

    // categories.forEach(element => { 
    //     // console.log(element) 

    //     let one_slider = document.createElement('div') 
    //     one_slider.className = 'siders__category' 
        
    //     let sliders_category_title = document.createElement('h4') 
    //     sliders_category_title.className = 'sliders_one_category__title' 
    //     sliders_category_title.innerHTML = element.name 

    //     one_slider.appendChild(sliders_category_title) 
    //     one_slider.appendChild(data_one_category) 
    //     // one_slider.append(data_per_film()) 


    //     data_sliders.appendChild(one_slider) 

    // }); 



    //   } 
} 

main('best_films', 'slider_mieux_notes') 
main('romance', 'slider_cat1') 
main('drama', 'slider_cat2') 

