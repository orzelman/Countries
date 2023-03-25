const container = document.querySelector(".container");
const inputSearch = document.querySelector(".filters input");
const selectRegion = document.querySelector('#select-region');
const filters = document.querySelector('#filters');

let countries = [];

const searchCountries = (string, countries) => {
    let filteredCountries = countries.filter(country => {
        return country.name.toLowerCase().includes(string.toLowerCase());
    });
    return filteredCountries;
};

function filterByRegion(region, countries) {
    const filteredCountries = countries.filter(country => {
        return country.region.toLowerCase().includes(region.toLowerCase());
    })
    return filteredCountries;
}


const createShortInfo = (country) => {
    const info = document.createElement('div');
    info.classList.add('short-info');
    info.innerHTML =
        `<p class="short-info-name">${country.name}</p>
        <p><b>Population:</b> ${country.population.toLocaleString()}</p>
        <p><b>Region:</b> ${country.region}</p>
        <p><b>Capital:</b> ${country.capital}</p>`;
    return info;
}
const createCountry = (country => {
    const anchorCountry = document.createElement('a');
    anchorCountry.setAttribute('href', `?country=${country.code}`);
    anchorCountry.setAttribute('class', 'anchor-country')
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('country-div');
    const imgFlag = document.createElement('img');
    imgFlag.setAttribute('src', country.flag);
    countryDiv.appendChild(imgFlag);
    countryDiv.appendChild(createShortInfo(country));
    anchorCountry.appendChild(countryDiv);
    return anchorCountry;
})
const countriesList = (countries) => {
    countries.forEach(country => {
        container.appendChild(createCountry(country));
    });

}

const sortObj = (obj1, obj2) => obj1.name.localeCompare(obj2.name)


//set theme
const themeIcon = document.querySelector('.material-symbols-outlined');
const themeButton = document.querySelector('p.icon');
const themeText = document.querySelector('.theme-text')
let theme = localStorage.getItem('theme') || 'light';

const changeTheme = () => {
    theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        themeIcon.textContent = 'dark_mode';
        themeText.textContent = 'Light Mode';
    }
    else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        themeIcon.textContent = 'light_mode';
        themeText.textContent = 'Dark Mode';
    }
};
const setTheme = () => {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = 'dark_mode';
        themeText.textContent = 'Light Mode';
    }
    else {
        document.body.classList.remove('dark-mode');
        themeIcon.textContent = 'light_mode';
        themeText.textContent = 'Dark Mode';
    }
}
setTheme();
themeButton.addEventListener('click', changeTheme);
