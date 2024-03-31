const BaseJoi = require('joi');
const sanitizeHTML = require('sanitize-html');

// const extension = (joi) => {

//     return {
//         type: 'string',
//         base: joi.string(),
//         messages: {
//             'string.escapeHTML': '{{#label}} must not include HTML!',
//         },
//         rules: {
//             escapeHTML: {
//                 validate(value, helpers) {
//                     const clean = sanitizeHTML(value, {
//                         allowedTags: [],
//                         allowedAttributes: {},
//                     });
//                     if (clean !== value) return helpers.error('string.escapeHTML', { value });

//                     return clean;
//                 }
//             }
//         }
//     }
// }

const extension = (joi) => {
    return {
        type: 'string',
        base: joi.string(),
        messages: {
            'string.escapeHTML': '{{#label}} must not include HTML!'
        },
        rules: {
            escapeHTML: {
                validate(value, helpers) {
                    const clean = sanitizeHTML(value, {
                        allowedTags: [],
                        allowedAttributes: {},
                    });
                    if (clean !== value) return helpers.error('string.escapeHTML', { value });

                    return clean;
                }
            }
        }
    }
}

const Joi = BaseJoi.extend(extension);


// const productSchema = Joi.object({
//     name: Joi.string().required(),
//     imgUrl: Joi.string().required(),
//     desc: Joi.string().required(),
//     price: Joi.number().min(0).required()
// })

// const reviewSchema = Joi.object({
//     rating: Joi.number().min(0).max(5).required(),
//     comment: Joi.string().required()
// })

const productSchema = Joi.object({
    name: Joi.string().required().escapeHTML(),
    imgUrl: Joi.string().required(),
    price: Joi.number().min(0).required(),
    desc: Joi.string().required().escapeHTML()
});

const reviewSchema = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
    comment: Joi.string().required().escapeHTML()
})

module.exports = { productSchema, reviewSchema };