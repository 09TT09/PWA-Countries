// récupérer paramètres URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const countryParam = urlParams.get('country');
console.log(countryParam);

const result = document.getElementById('result');

const fetchCountries = async () => {
    country = await fetch(`https://restcountries.com/v3.1/name/${countryParam}`).then((response) => response.json());
    console.log(country);
};

const countriesDisplay = async () => {

    await fetchCountries();

    result.innerHTML = country.map((uniqueCountry) =>
        `
        <div class="div_country">
            <h3>${uniqueCountry.name.common}</h3>
            <img src="${uniqueCountry.flags.svg}" class="flag" alt="drapeau : ${uniqueCountry.name.common}">
            <div>
                <p>Capitale: ${uniqueCountry.capital}</p>
                <p>Continent: ${uniqueCountry.continents[0]}</p>
                <p>Langue Principale: ${Object.values(uniqueCountry.languages)[0]}</p>
                <p>Superficie: ${uniqueCountry.area} km²</p>
                <p>Population: ${uniqueCountry.population} habitants</p>
            <div>
        <div>
        `
    ).join("");
};

countriesDisplay();