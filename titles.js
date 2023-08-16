

async function retrieveApiFilms(category_name) { 

    const response_films = await fetch("http://localhost:8000/api/v1/titles/?genre="+category_name, {
    // 'headers': {} 
    }) 
    const data_films = await response_films.json(); 

    return data_films; 
} 
async function retrieveApiBestFilms() { 

    const response_films = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", {
    // 'headers': {} 
    }) 
    const data_films = await response_films.json(); 

    return data_films; 
} 

async function retrieveApiCategories() { 

    const response_genres = await fetch("http://localhost:8000/api/v1/genres/", {
    // 'headers': {} 
    }) 
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

    /* modal */ 
    // const set_one_modal = () => { 

        modal_classnames_by_tags = {
            'img': 'modal__img', 
            'h3': 'modal__title', 
            'p': 'modal__genre', 
            'p':'modal__publish_date'
        }; 
        // const one_modal = document.getElementById('one_modal') 
    // } 

    films.forEach(element => {
        // console.log(element) 

        let one_film_div = document.createElement('div') 
        one_film_div.className = 'one_film' 
        
        let one_film_div_a = document.createElement('a') 
        one_film_div_a.className = 'one_film__img one_film_0_1' 
        one_film_div_a.style.backgroundImage = `url(${element.image_url})` 
        
        let one_film_div_a_h5 = document.createElement('h5') 
        one_film_div_a_h5.className = 'one_film__title' 
        one_film_div_a_h5.innerHTML = element.title 
        
        /* one_modal */ 
        let one_modal = document.createElement('div') 
        one_modal.className = 'modal' 
        // set_one_modal() 
        for (property in modal_classnames_by_tags) { 
            let modal_img = document.createElement(property) 
            modal_img.className = modal_classnames_by_tags[property] 
            
            one_modal.appendChild(modal_img) 
        }
        one_film_div.appendChild(one_modal) 


        one_film_div_a.appendChild(one_film_div_a_h5) 
        one_film_div.appendChild(one_film_div_a) 


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

