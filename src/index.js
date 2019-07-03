/*
Vytvoř seznam, do kterého si budeš moci přidávat věci, které si máš sbalit na cestu.
Věci v seznamu by měly zůstat i po obnovení stránky (refresh, zavření prohlížeče, apod.)
*/


const formElement = document.querySelector('#formular'); // formulář
const itemElement = document.querySelector('#polozka'); // pole pro zadávání
const listElement = document.querySelector('#seznam'); // <ul>, kam vypisujeme seznam

/* pole pro seznam položek */
const travelList = JSON.parse(localStorage.getItem('travellist')) || [];

ukazSeznam();

formElement.addEventListener("submit", pridejPolozku);

listElement.addEventListener("click", priKliknuti);

function priKliknuti(e){
    if(e.target.matches("input[type=checkbox]")){
        let index = e.target.dataset.index;
        travelList[index].checked = !travelList[index].checked; //uloží opak toho co tam je
        localStorage.setItem('travellist', JSON.stringify(travelList));

    };
}

function pridejPolozku(e){
    e.preventDefault(); //vykašle se na standartní akce - neodešle data na tu stejnou stránku

    let item = {
        text: itemElement.value,
        checked: false
    };

    travelList.push(item);

    ukazSeznam();

    formElement.reset(); //vynuluje celý formulář

    localStorage.setItem('travellist', JSON.stringify(travelList));
  
}

function ukazSeznam(){
    /* POMOCI forEach:
    let html = "";
    travelList.forEach((item, index )=> { //ternární výraz: podmína ? když true : když false
        html += `<li>
            <input type="checkbox" name="item${index}" id="item${index}" ${item.checked ? 'checked' : ''}> 
            <label for="item${index}">${item.text}</label>
        </li>`
    })

    listElement.innerHTML = html;*/

     /* POMOCI map
     let html = travelList.map((item, index) => {
        return `<li>
            <input type="checkbox" name="item${index}" id="item${index}" ${item.checked ? 'checked' : ''}> 
            <label for="item${index}">${item.text}</label>
        </li>`;
    }).join(' '); //join vypíše pole s oddělovačem co napíšeš do závorky

    listElement.innerHTML = html;*/

    //POMOCI reduce
    let html = travelList.reduce((suma, item, index) => {
        return suma + `<li>
            <input type="checkbox" data-index="${index}" name="item${index}" id="item${index}" ${item.checked ? 'checked' : ''}> 
            <label for="item${index}">${item.text}</label>
        </li>`;
    }, '');

    listElement.innerHTML = html;

}