import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend("positive", {
    validate: number => number >= 0,
    message: "Luku ei voi olla negatiivinen!"
});

extend("required", {
    ...required,
    message: "Tämä kenttä on pakollinen!"
});

extend("notEmpty", {
    validate: string => string.length > 0,
    message: "Kenttä ei voi olla tyhjä!"
});

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