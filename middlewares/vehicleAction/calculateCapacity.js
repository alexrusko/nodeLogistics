/**
 * Calculates if there is enough capacity for
 * adding a new transferItem to the vehicle
 */

module.exports = function (objectRepository) {
    return function (req, res, next) {

        let productSum = 0;

        res.locals.vehicle._storage.forEach(item => {
            productSum += item.quantity;
        });

        res.locals.vehicle.currentCapacity = productSum;

        res.locals.vehicle.save(err => {
            if (err) {
                return next(err);
            }

            return next();
        });

    };
};