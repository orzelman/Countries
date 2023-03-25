const switchMode = document.querySelector(".switch-mode");
const body = document.body;
const main = document.querySelector("main");

let darkMode = localStorage.getItem("theme") || "light";
let theme = localStorage.getItem("theme");
if (theme === "dark") {
    body.classList.add("dark-mode");
}

switchMode.addEventListener("click", () => {
    if (theme === "light") {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark")
    }
    else {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }
})


const API = "https://restcountries.com/v3.1/all";
let countries;
const inputSearch = document.getElementById("inputsearch");
const selectRegion = document.getElementById("select-region");
const flags = document.getElementById("flags");


const countriesList = (countries) => {
    flags.innerHTML = "";
    countries.forEach(country => flags.appendChild(createCountry(country)))
}

const filterInputAndRegion = () => {
    let countriesFilter = countries.filter(country => {
        return country.name.includes(inputSearch.value)
    })
    countriesFilter.forEach(item => {
        if (selectRegion.value === item.region) {
        }
    })
    let countriesRegion = countriesFilter.filter(country => {
        return country.region.includes(selectRegion.value);
    })
    countriesList(countriesRegion);
}

function createCountry(country) {
    const link = document.createElement("a");
    const divTile = document.createElement("div");
    link.setAttribute("href", `?${country.cioc}`);
    divTile.classList.add("tile");
    divTile.innerHTML = `
        <div class="country-flag"><img class="img" src="${country.flag}"></div>
        <div class="country-info">
            <div class="country-name">${country.name}</div>
            <div class="population">Population: ${country.population}</div>
            <div class="region">Region: ${country.region}</div>
        </div>`;
    link.appendChild(divTile);
    return link;
}

if (window.location.search === '') {
    fetch(API)
        .then(res => res.json())
        .then(countriesAPI => {
            countries = countriesAPI.map(item => {
                return {
                    flag: item.flags.png,
                    name: item.name.common,
                    population: item.population.toLocaleString(),
                    region: item.region,
                    cioc: item.cioc
                }
            })
            if (window.location.search === '') {
                countriesList(countries);
            }
            else {
                filterInputAndRegion();
            }
        });
}
else {
    viewDetails();
}



inputSearch.addEventListener("input", filterInputAndRegion);
selectRegion.addEventListener("change", filterInputAndRegion);
