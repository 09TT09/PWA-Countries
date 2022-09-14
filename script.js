const form = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const result = document.getElementById('result');

let search = "all";
let countries = [];
let storedCountries = JSON.parse(localStorage.getItem('storedCountries'));

const fetchCountries = async () => {
    if (storedCountries === null || search != "all"){
        countries = await fetch(`https://restcountries.com/v3.1/${search}`)
            .then((response) => response.json())
            .catch((error) => console.log(error));
        if (search != "all") {
            storedCountries = countries
        }
        else {
            localStorage.setItem('storedCountries', JSON.stringify(countries));
            storedCountries = JSON.parse(localStorage.getItem('storedCountries'));
        }
    }
};

const countriesDisplay = async () => {

    await fetchCountries();

    if (storedCountries.status !== 404){
        result.innerHTML = storedCountries.map((country) =>
        
            `
            <div class="card" onclick="location.href='./country.html?country=${country.name.common}'">
                <h3>${country.name.common}</h3>
                <img src="${country.flags.svg}" class="flag" width="${country.flags.svg}" height="${country.flags.svg}" alt="drapeau : ${country.name.common}">
                <p>Capitale: ${country.capital}</p>
            </div>
            `
        ).join("");
    } else {
        console.log("Erreur 404 : Aucun pays ne contenant la suite de caractère suivante : " + searchInput.value);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if ((searchInput.value).toString() === "") search = "all"; 
    else search = `name/${(searchInput.value).toString()}`;
    console.log(searchInput.value)
    countriesDisplay();
});

countriesDisplay();