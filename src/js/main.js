const search = document.querySelector('#search')
const container = document.querySelector('#container_card');
const btnSearch = document.querySelector('.btnSearch');


search.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        card()
    }
})

btnSearch.addEventListener('click', card)

function card() {
    const div = document.createElement('div');
    
    (async function () {
        const url = `https://pokeapi.co/api/v2/pokemon/${search.value}`;
        try {
            const response = await fetch(url);
            const jsonDate = await response.json();
            const types = jsonDate.types.map(typeInfo => typeInfo.type.name);   

            function type() {
                for (let i of jsonDate.types) {
                    return i.type.name
                }
            }
            function ability() {
                for (let i in jsonDate.abilities) {
                    return jsonDate.abilities[i].ability.name
                }
            }

            const card = `
            <div class="card_poke">
                <div class="poke ${types[0]}">
                    <img src="${jsonDate.sprites.other.dream_world.front_default}">
                </div>
                <div class="description">
                <p class="${jsonDate.name}">Nome: ${jsonDate.name}</p>
                    <p class="${types[0]}" >Tipo: ${type()} </p>
                    <p>Habilidade: ${ability()} </p>                    
                </div>
                </div>
            `;
            div.innerHTML = card;
            container.appendChild(div);            
            
            function modalPokemon() {
                const card_poke = document.querySelectorAll('.card_poke');
                const modal_description = document.querySelector('.modal_description')
                
                div.addEventListener('click', ()=>{
                    for(let c = 0; c <= card_poke.length; c++){

                        const teste = document.querySelector('.img_modal')
                            teste.innerHTML = `
                                <div class="img_modal ${types[0]}">
                                    <h3 id="num"></h3>
                                    <img id="img" src="" alt="">
                                </div>
                            `
                        document.querySelector('#num').innerHTML = `N°: ${jsonDate.id}`
                        document.querySelector('#img').src = jsonDate.sprites.other.dream_world.front_default
                        document.querySelector('#hp').innerHTML = `HP:  ${jsonDate.stats[0].base_stat}`
                        document.querySelector('#ataque').innerHTML = `Ataque: ${jsonDate.stats[1].base_stat}`
                        document.querySelector('#defesa').innerHTML = `Defesa: ${jsonDate.stats[2].base_stat}`
                        document.querySelector('#speed').innerHTML = `Velocidade: ${jsonDate.stats[3].base_stat}`

                        modal_description.classList.add('anima_modal');

                        document.querySelector('.btn_close')
                        .addEventListener('click', ()=>{
                            modal_description.classList.remove('anima_modal')
                        })
                    }
                }) 
            }
            modalPokemon();
        } catch (e) {
            console.log('Deu merda', e)
        }
        
    })()
}

