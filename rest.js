const API_URL = "https://restcountries.com/v3.1/all";

const sortCountries = ((obj1, obj2) => {
    if (obj1.name.common > obj2.name.common) {
        return 1
    }
    if (obj2.name.common < obj2.name.coomon) {
        return 2
    }
    else return 0
})

if (window.location.search.includes('country')) {
    const filters = document.querySelector('.filters');
    filters.classList.add('hidden');
    viewCountry();
}
else {
    if (filters.classList.contains('hidden')) {
        filters.classList.remove('hidden');
    }
    fetch(API_URL)
        .then(result => result.json())
        .then(result => {
            let countries = result.map(country => {
                let countryCode = '';
                if (country.cioc !== undefined) {
                    countryCode = country.cioc;
                }
                else countryCode = country.cca2;
                return {
                    name: country.name.common,
                    flag: country.flags.png,
                    population: country.population,
                    region: country.region,
                    capital: country.capital,
                    code: countryCode
                }
            })
            countries = countries.sort(sortObj);
            let regionalCountries = countries;
            countriesList(countries);

            selectRegion.addEventListener('change', () => {
                container.innerHTML = '';
                regionalCountries = (filterByRegion(selectRegion.value, countries));
                countriesList(searchCountries(inputSearch.value, regionalCountries));
            });

            inputSearch.addEventListener("input", () => {
                container.innerHTML = '';
                countriesList(searchCountries(inputSearch.value, regionalCountries));
            });
        })
}