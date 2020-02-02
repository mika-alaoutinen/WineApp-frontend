export let wine1 = {
    name: "Viini",
    type: "RED",
    country: "Italia",
    price: 8,
    volume: 0.75,
    description: [ "keskitanniininen", "luumuinen" ],
    foodPairings: [ "seurustelujuoma", "liharuuat" ],
    url: "http://viini.fi",
    reviews: [],
}

export let reviews = [
    {
        author: "Mika",
        date: "2020-01-05",
        reviewText: "Viinin 1 arvostelu. Viini on erittäin herkullinen.",
        rating: 4.5,
        wine: wine1,
    },
    {
        author: "Salla",
        date: "2020-01-05",
        reviewText: "Viinin 1 arvostelu. Viini on kohtuullisen herkullinen.",
        rating: 3.5,
        wine: wine1,
    }
]