/**
 * Removes the transferItem from the vehicle
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    let transferItemModel = requireOption(objectRepository, 'transferItemModel');

    return function (req, res, next) {

        for (let i = 0; i < res.locals.vehicle._storage.length; i++) {
            if (res.locals.vehicle._storage[i]._id.toString() === req.params.item) {
                res.locals.vehicle._storage.splice(i, 1);
            }
        }

        res.locals.vehicle.save(err => {
            if (err) {
                return next(err);
            }

            return next();
        });

        // transferItemModel.remove({_id: req.params.item}, err => {
        //     if (err) {
        //         return next(err);
        //     }

            
        // });
    };
};