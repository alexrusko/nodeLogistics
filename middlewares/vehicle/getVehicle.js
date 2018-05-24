/**
 * Get a specific vehicle from the db
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    let vehicleModel = requireOption(objectRepository, 'vehicleModel');

    return function (req, res, next) {

        vehicleModel.findOne({_id: req.params.id}).populate('_storage').exec((err, result) => {
            if (err) {
                return next(err);
            }
            
            res.locals.vehicle = result;

            return next();
        });
    };
};