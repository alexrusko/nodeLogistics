const states = require('../common').states;

module.exports = function (objectRepository, action) {

    return function (req, res, next) {

        if (action === 'depart') {
            res.locals.vehicle.state = states.enRoute;
        } else if (action === 'arrive') {
            res.locals.vehicle.state = states.waiting;
            res.locals.vehicle._storage = [];
        }

        res.locals.vehicle.save(err => {
            if (err) {
                return next(err);
            }

            return next();
        });
    };
};