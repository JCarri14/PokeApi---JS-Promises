let root = document.documentElement;
let maxPokemons = 964;
let maxUsedPokemons = 100;

function getPokemonInfo() {

    for (i = 1; i < maxUsedPokemons; i++) {
        var url = 'https://pokeapi.co/api/v2/pokemon/' + i + '/';
        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            p = myJson;     

            if (p !== undefined) {

                var item = document.createElement("SECTION");
                item.classList.add("content-item");

                var iheader = document.createElement("SECTION");
                iheader.classList.add("item-header");

                var image = document.createElement("IMG");
                var pokeImg = p.sprites.front_default;
                image.setAttribute("src", pokeImg);
                image.setAttribute("alt", p.name);
                iheader.appendChild(image);

                var name = document.createElement("H3");
                name.innerHTML = p.name.toUpperCase();
                iheader.appendChild(name);

                item.appendChild(iheader);

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
                
                document.getElementById("content-box").appendChild(item);
            }
            
        })
        .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
    }

    return null;
}








