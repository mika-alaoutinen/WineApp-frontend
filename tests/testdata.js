export let wines = [
    {
        name: "Viini 1",
        type: "RED",
        country: "Italia",
        price: 8,
        volume: 0.75,
        description: [ "keskitanniininen", "luumuinen" ],
        foodPairings: [ "seurustelujuoma", "liharuuat" ],
        url: "http://viini.fi",
        reviews: [],
    },
    {
        name: "Viini 2",
        type: "RED",
        country: "Espanja",
        price: 9,
        volume: 0.75,
        description: [ "tanniininen", "tamminen" ],
        foodPairings: [ "seurustelujuoma", "liharuuat" ],
        url: "http://viini.fi",
        reviews: [],
    }
]

export let reviews = [
    {
        id: 1,
        author: "Mika",
        date: "2020-01-05",
        reviewText: "Viinin 1 arvostelu. Viini on erittäin herkullinen.",
        rating: 4.5,
        wine: wines[0],
    },
    {
        id: 2,
        author: "Salla",
        date: "2020-01-05",
        reviewText: "Viinin 1 arvostelu. Viini on kohtuullisen herkullinen.",
        rating: 3.5,
        wine: wines[0],
    }
]