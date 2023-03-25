let myCountry;

const createButton = (text, path) => {
    const button = document.createElement('a');
    button.setAttribute('href', path);
    button.setAttribute('class', 'button');
    button.innerHTML = text;
    return button;
};
const createLargeFlag = (country) => {
    const largeFlag = document.createElement('div');
    const imgFlag = document.createElement('img');
    largeFlag.setAttribute('class', 'large-flag');
    imgFlag.setAttribute('src', country.flags.png);
    imgFlag.setAttribute('class', 'img-flag');
    largeFlag.appendChild(imgFlag);
    return largeFlag;
};

const createOfficialName = country => {
    const officialName = document.createElement('h1');
    officialName.setAttribute('class', 'official-name');
    officialName.textContent = country.name.official;
    return officialName;
};
const createRightSideInfo = country => {
    let currencies;
    let currenciesSymbol;
    if (country.nativeName) {
        const nativeName = Object.values(country.name.nativeName)[0].common;
    }
    else nativeName = '';
    if (country.currencies) {
        currencies = Object.values(country.currencies)[0].name;
        currenciesSymbol = Object.values(country.currencies)[0].symbol;
    }
    else {
        currencies = '';
        currenciesSymbol = '';
    }
    const rightSideInfo = document.createElement('div');
    rightSideInfo.setAttribute('class', 'right-side-info');
    rightSideInfo.innerHTML = `
    <div class="right-side-column">
        <p>Native Name: ${nativeName}</p>
        <p>Population: ${country.population}</p>
        <p>Region: ${country.region}</p>
        <p>Subregion: ${country.subregion}</p>
        <p>Captal: ${country.capital}</p>
    </div>
    <div class="right-side-column">
        <p>Top Level Domain: ${country.tld}</p>
        <p>Currencies: ${currencies} (${currenciesSymbol})</p>
    </div>`;
    return rightSideInfo;
};
const createBorders = country => {
    const borders = document.createElement('div');
    borders.setAttribute('class', 'borders');
    if (country.borders) {
        country.borders.forEach(item => {
            fetch('https://restcountries.com/v3.1/alpha/' + item)
                .then(res => res.json())
                .then(neighbour => {
                    const neighbourName = neighbour[0].name.common;
                    borders.appendChild(createButton(neighbourName, `?country=${item}`));
                });
        })
    }
    return borders;
}

const createRightSideDashboard = country => {
    const rightSideDashboard = document.createElement('div');
    rightSideDashboard.setAttribute('class', 'right-side-dashboard');
    rightSideDashboard.appendChild(createOfficialName(country));
    rightSideDashboard.appendChild(createRightSideInfo(country));
    rightSideDashboard.appendChild(createBorders(country));
    return rightSideDashboard;
}


const createCountryInfo = (country) => {
    const countryDetail = document.createElement('div');
    countryDetail.classList.add('country-detail');
    countryDetail.appendChild(createLargeFlag(country));
    countryDetail.appendChild(createRightSideDashboard(country));
    return countryDetail;
}

function viewCountry() {
    const countryDashboard = document.querySelector('.country-dashboard');
    const parms = new URLSearchParams(window.location.search);
    const cioc = parms.get("country");
    const API_COUNTRY_CODE = "https://restcountries.com/v3.1/alpha/" + cioc;
    fetch(API_COUNTRY_CODE)
        .then(res => res.json())
        .then(country => {
            myCountry = country;
            container.innerHTML = '';
            countryDashboard.appendChild(createButton('&#x2190 Back', 'index.html'));
            countryDashboard.appendChild(createCountryInfo(country[0]))
        })
}