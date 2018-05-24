/**
 * Removes the vehicle from db
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    let vehicleModel = requireOption(objectRepository, 'vehicleModel');

    return function (req, res, next) {

        if (typeof res.locals.vehicle === 'undefined') {
            return next();
        }

        res.locals.vehicle.remove((err) => {
            if (err) {
                return next(err);
            }

            console.log('removed from db:' + res.locals.vehicle);
            return next();
        });
    };
};