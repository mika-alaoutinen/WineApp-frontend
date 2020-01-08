import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend("required", {
    ...required,
    message: "Tämä kenttä on pakollinen",
});

extend("price", {
    validate: number => ({
        required: true,
        valid: number >= 0,
    }),
    message: "Luku ei voi olla negatiivinen!",
    computesRequired: true,
});

extend("volume", {
    validate: number => ({
        required: true,
        valid: number > 0,
    }),
    message: "Määrän tulee olla positiivinen luku!",
    computesRequired: true,
});



// extend("volume", {
//     validate: number => number > 0,
//     message: "Määrän tulee olla positiivinen luku",
// });


// Custom required field:
// extend("required", {
//     validate(value) {
//         return {
//             required: true,
//             valid: value.length > 0,
//         };
//     },
//     message: "Tämä kenttä on pakollinen!",
//     computesRequired: true
// });