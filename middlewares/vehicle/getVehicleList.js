/**
 * Get all the vehicles from the db
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    let vehicleModel = requireOption(objectRepository, 'vehicleModel');

    return function (req, res, next) {

        vehicleModel.find({}, (err, result) => {
            if (err) {
                return next(err);
            }

            res.locals.vehicleList = result;
            return next();
        });
    };
};