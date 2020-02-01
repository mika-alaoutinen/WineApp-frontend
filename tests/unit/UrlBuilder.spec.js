import UrlBuilder from "@/utilities/UrlBuilder.js";

const wineUrl = UrlBuilder.wine.paths.search;
const reviewUrl = UrlBuilder.review.paths.search;
let review;
let wine;

// Reset search params:
beforeEach(() => {
    wine = {
        name: "",
        type: "",
        countries: [],
        priceRange: [],
        volumes: [],
    }

    review = {
        author: "",
        dateRange: [],
        ratingRange: [],
        wineId: "",
    }
});

// Testing review quicksearch:


// Testing review search:
test("review search with empty search parameter", () => {
    expect(UrlBuilder.review.getSearchUrl(review)).toBe(reviewUrl);
});

// Testing wine search:
test("wine search with empty search parameter", () => {
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineUrl);
});

test("wine search by name", () => {
    wine.name = "Kungfu";
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineUrl + "name=Kungfu");
});

test("wine search by type", () => {
    wine.type = "RED";
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineUrl + "type=RED");
});

test("wine search by country", () => {
    wine.countries = [ "Espanja" ];
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineUrl + "countries=Espanja");
});

test("wine search by two countries", () => {
    wine.countries = [ "Espanja", "Italia" ];
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineUrl + "countries=Espanja,Italia");
});

test("wine search by price range cheaper than 10", () => {
    wine.priceRange = [ 0, 10 ];
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineUrl + "priceRange=0,10");
});

test("wine search by price range more expensive than 15", () => {
    wine.priceRange = [ 15, 50 ];
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineUrl + "priceRange=15,50");
});

test("wine search by price range between 10 and 20", () => {
    wine.priceRange = [ 10, 20 ];
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineUrl + "priceRange=10,20");
});

test("wine search by volume equals 0.75", () => {
    wine.volume = [ 0.75 ];
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineUrl + "volume=0.75");
});

test("wine search by volume equals 0.75 or 3", () => {
    wine.volume = [ 0.75, 3 ];
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineUrl + "volume=0.75,3");
});

test("wine search by country and volume", () => {
    wine.countries = [ "Italia" ];
    wine.volume = [ 0.75 ];
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineUrl + "countries=Italia&volume=0.75");
});

test("wine search by type and price range between 7 and 12", () => {
    wine.type = "WHITE";
    wine.priceRange = [ 7, 12 ];
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineUrl + "type=WHITE&priceRange=7,12");
});

test("wine search by countries, price range and volume", () => {
    wine.countries = [ "Italia", "Espanja" ];
    wine.priceRange = [ 5, 10 ];
    wine.volume = [ 2, 3 ];
    const expectedUrl = "countries=Italia,Espanja&priceRange=5,10&volume=2,3";
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineUrl + expectedUrl);
});