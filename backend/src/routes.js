const {celebrate,Segments,Joi}= require('celebrate');

const express = require('express');
const routes = express.Router();
const OngCrontroller = require('./controller/OngsController')
const IncidentController = require('./controller/IncidentController');
const ProfileController = require('./controller/profileController');
const sessionController = require('./controller/sessionController');

/**Adm Casos */
    routes.get('/incidents',celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
        }),
    }),IncidentController.Index);

    routes.post('/incidents',celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            desciption: Joi.string().required(),
            value: Joi.number().required(),
        }),
    }
),celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    }).unknown()
}),IncidentController.Create);

    routes.delete('/incidents/:id',celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
    }),IncidentController.delete);
/**Fim casos */
routes.post('/sessions',sessionController.create);
routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    }).unknown(),
}),ProfileController.index);

/*Adm Ongs*/
    routes.get('/ongs',OngCrontroller.Index);

    routes.post('/ongs',celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string(),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2)
        })
    }), OngCrontroller.Create);
/**Fim Ongs */    

module.exports = routes;