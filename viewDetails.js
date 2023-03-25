API_DETAIL = "https://restcountries.com/v3.1/alpha/";
let response;

function viewDetails() {
    const filters = document.getElementById("filters");
    filters.style.display = "none";
    fetch(API_DETAIL + window.location.search.slice(1))
        .then(res => res.json())
        .then(res => {
            response = res[0];
            showCountry(res[0]);
        })
}

const createButton = (text, link) => {
    const anchorElement = document.createElement("a");
    anchorElement.classList.add("detailed-button");
    anchorElement.setAttribute("href", link);
    anchorElement.textContent = text;
    return (anchorElement);
}
const createFlag = (country) => {
    const imgFlag = document.createElement("img");
    imgFlag.classList.add("img-detailed");
    imgFlag.setAttribute("src", country.flags.png);
    return imgFlag;
}

const createCountryName = (country) => {
    const countryName = document.createElement("h2");
    countryName.textContent = country.name.common;
    return countryName;
}

const createCountryDetail = (text, country) => {
    const nativeName = document.createElement("p");
    nativeName.innerHTML = `<span class = strong>${text}:</span> ${country}`;
    return nativeName;
}

const createNeighbours = (country) => {
    const div = document.createElement("div");
    if (country.borders.length === 0) {
        return;
    }
    else {
        const codes = country.borders;
        div.style.display = "flex";
        div.style.flexWrap = "wrap";
        div.style.gap = '10px';
        codes.forEach(cca3Code => div.appendChild(createButton(cca3Code, window.location.pathname)))
    }
    return div;

}


function showCountry(country) {
    flags.innerHTML = "";
    const main = document.querySelector("main");
    main.appendChild(createButton("Back", window.location.pathname));
    main.appendChild(createFlag(country));
    main.appendChild(createCountryName(country));
    main.appendChild(createCountryDetail("Native Name", Object.values(response.name.nativeName)[0].official))
    main.appendChild(createCountryDetail("Population", country.population.toLocaleString()))
    main.appendChild(createCountryDetail("Region", country.region))
    main.appendChild(createCountryDetail("Sub Region", country.subregion))
    main.appendChild(createCountryDetail("Capital", country.capital[0]))
    main.appendChild(createCountryDetail("Border Countries", ''))
    main.appendChild(createNeighbours(country));
}

