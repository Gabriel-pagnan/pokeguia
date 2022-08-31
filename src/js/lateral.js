
const createLi = (li,bg) => {
    const ul = document.querySelector('#ul')
    const liContainer = document.createElement('li');
    liContainer.setAttribute('class', 'liList')
    liContainer.innerHTML = li;
    ul.appendChild(liContainer)
}

(async function () {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/type')
        const json = await res.json()
        for (let i in json.results) {
            createLi(json.results[i].name);
        }


    } catch (e) {
        console.log(e)
    }

})()

const list = ()=>{
    document.addEventListener('click', e=>{
        const el = e.target;
        if(el.classList.contains('liList')){
            
                (async function () {
                    
                    const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
                    try {
                        const response = await fetch(url);
                        const jsonDate = await response.json();
                        for(let n in jsonDate.results){
                            const newRes = await fetch(jsonDate.results[n].url)
                            const newJson = await newRes.json();
                            const types = newJson.types.map(typeInfo => typeInfo.type.name); 

                            if(newJson.types[0].type.name === el.innerHTML){
                                function type() {
                                    for (let i of newJson.types) {
                                        return i.type.name
                                    }
                                }
                                function ability() {
                                    for (let i in newJson.abilities) {
                                        return newJson.abilities[i].ability.name
                                    }
                                }
                                const card = `
                                <div class="card_poke">
                                    <div class="poke ${types[0]}">
                                        <img src="${newJson.sprites.other.dream_world.front_default}">
                                    </div>
                                    <div class="description">
                                    <p class="${newJson.name}">Nome: ${newJson.name}</p>
                                        <p class="${types[0]}" >Tipo: ${type()} </p>
                                        <p>Abilidade: ${ability()} </p>                    
                                    </div>
                                    </div>
                                `;
    
                                const div = document.createElement('div');
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
                                            document.querySelector('#num').innerHTML = `N°: ${newJson.id}`
                                            document.querySelector('#img').src = newJson.sprites.other.dream_world.front_default
                                            document.querySelector('#hp').innerHTML = `HP:  ${newJson.stats[0].base_stat}`
                                            document.querySelector('#ataque').innerHTML = `Ataque: ${newJson.stats[1].base_stat}`
                                            document.querySelector('#defesa').innerHTML = `Defesa: ${newJson.stats[2].base_stat}`
                                            document.querySelector('#speed').innerHTML = `Velocidade: ${newJson.stats[3].base_stat}`
                    
                                            modal_description.classList.add('anima_modal');
                    
                                            document.querySelector('.btn_close')
                                            .addEventListener('click', ()=>{
                                                modal_description.classList.remove('anima_modal')
                                            })
                                        }
                                    }) 
                                }
                                modalPokemon();
                            }
                            }
                            
                            
                        
                    } catch (e) {
                        console.log('Deu merda', e)
                    }
                    
                })()
            }
        
    })
}
list();