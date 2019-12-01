let root = document.documentElement;
let maxPokemons = 964;
let maxUsedPokemons = 100;

let typeSlide = 0;
let slidePage = 0;
let folderPath = "assets/";

let typeNames = ["All", "Fire", "Water", "Electric", "Grass",
"Ice", "Fighting", "Poison", "Ground", "Flying",
"Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark",
"Steel", "Fairy" ];

let typeImgs = ["all.png", "fire.png", "water.png", "electric.png", 
"grass.png", "ice.png", "fighting.png", "poison.png", "ground.png", 
"flying.png", "psychic.png", "bug.png", "rock.png", "ghost.png", 
"dragon.png", "dark.png", "steel.png", "fairy.png" ];


function plusSlides(n) {
    let carousel = document.getElementsByClassName("inner-carousel")[0];
    let pages = carousel.children;
    slidePage += n;    
    if (slidePage > carousel.children.length-1) {slidePage = 1}
    if (slidePage <= 0) {slidePage = carousel.children.length-1}
    
    for (i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
        pages[i].className = pages[i].className.replace(" active", "");
    }
    //pages[slidePage-1].style.display = "block";
    pages[slidePage-1].className += " active";
    
}

function plusType(n) {
    typeSlide += n;
    if (typeSlide >= typeNames.length) {typeSlide = 0}
    if (typeSlide < 0) {typeSlide = typeNames.length-1}
    updateTypeToShow();
}

function resetCarousel() {
    let carousel = document.getElementsByClassName("inner-carousel")[0];
    while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild);
    }
}

function updateTypeToShow() {
    let imgFile = typeImgs[typeSlide];
    let newTitle = typeNames[typeSlide].toUpperCase();

    let image = document.getElementsByClassName("type-img")[0];
    image.src = folderPath + imgFile;

    let title = document.getElementsByClassName("type-title")[0];
    title.innerHTML = newTitle; 
    resetCarousel();  
    getPokemonTypeList();
}

function createSelectedInfoCard(p) {
    var icontent = document.createElement("SECTION");
    icontent.classList.add("item-content");   
    
    for ( j = 0; j < p.stats.length; j++) {

        var statContainer = document.createElement("SECTION");
        statContainer.classList.add("stat-container");  
        
        var statName = document.createElement("H5");
        statName.innerHTML = p.stats[j].stat.name;

        var statBar = document.createElement("DIV");
        statBar.classList.add("progress-bar"); 
        var statSpan = document.createElement("SPAN");
        statBar.appendChild(statSpan);
        statBar.style.width = "" + ((p.stats[j].base_stat*100)/200) + "%";


        statContainer.appendChild(statName);
        statContainer.appendChild(statBar);

        icontent.appendChild(statContainer);
    }

    item.appendChild(icontent);
}

function createPokemonCard(p, destination) {

    var item = document.createElement("SECTION");
    item.classList.add("content-item");

    var image = document.createElement("IMG");
    var pokeImg = p.sprites.front_default;
    if (pokeImg !== null) {
        image.setAttribute("src", pokeImg);
    } 
    image.setAttribute("alt", p.name);
    
    item.appendChild(image);

    var name = document.createElement("H3");
    name.innerHTML = p.name.toUpperCase();

    item.appendChild(name);
    destination.appendChild(item);
}

function getPokemonInfo(pokemon, id) {

    fetch(pokemon.url)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        p = myJson;  
        if (p !== undefined) {
            var dest = document.getElementsByClassName("cb" + id)[0];
            createPokemonCard(p, dest);
        }      
    })
    .catch(function(error) {
    console.log('Hubo un problema con la petición Fetch:' + error.message);
    });

    return null;
}

function createNewCarouselChild(id) {

    var item = document.createElement("SECTION");
    item.classList.add("content-box");
    item.classList.add("cb" + id);
    if (id == 1) {     
        item.classList.add("active");
    }
    document.getElementsByClassName("inner-carousel")[0].appendChild(item);
}

function getPokemonTypeList() {
    
    if (typeSlide > 0) {
        var url = 'https://pokeapi.co/api/v2/type/' + 
        typeNames[typeSlide].toLowerCase() + '/';

        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            let pokemons = myJson.pokemon;  
            let containerBox = 0;
            let counter = 0;

            for (i = 0; i < pokemons.length; i++) {
                p = pokemons[i].pokemon;

                if (p !== undefined) {
                    if (counter%6 == 0) {       
                        createNewCarouselChild(containerBox+1);
                        containerBox++;
                    }
                    getPokemonInfo(p, containerBox);
                    counter++;
                }
            } 
        })
        .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
    } else {
        getAllPokemons();
    }

    return null;
}

function getAllPokemons() {

    let containerBox = 0;
    let counter = 0;

    for (i = 1; i < maxUsedPokemons; i++) {
        var url = 'https://pokeapi.co/api/v2/pokemon/' + i + '/';
        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            p = myJson;     

            if (p !== undefined) {
                if (counter%6 == 0) {       
                    createNewCarouselChild(containerBox+1);
                    containerBox++;
                }
                var dest = document.getElementsByClassName("cb" + containerBox)[0];
                createPokemonCard(p, dest); 
                counter++;
            }
            
            
        })
        .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
    }

    return null;
}








