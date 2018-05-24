/**
 * Create a new vehicle and save it to db
 */

const requireOption = require('../common').requireOption;
const states = require('../common').states;

module.exports = function (objectRepository) {

    let vehicleModel = requireOption(objectRepository, 'vehicleModel');

    return function (req, res, next) {

        if ((req.body.type === '') ||
            (req.body.licensePlate === '') ||
            (req.body.maxCapacity === '')) {
            return next();
        }

        let vehicle = {};

        if (typeof res.locals.vehicle !== 'undefined') {
            vehicle = res.locals.vehicle;
        } else {
            vehicle = new vehicleModel();
            vehicle.currentCapacity = 0;
            vehicle.state = states.waiting;
        }
        
        vehicle.type = req.body.type;
        vehicle.licensePlate = req.body.licensePlate;
        vehicle.maxCapacity = req.body.maxCapacity;

        if (req.body.imageUrl === '') {
            vehicle.imageUrl = 'https://thumbs.dreamstime.com/b/vector-car-2-2971290.jpg';
        } else {
            vehicle.imageUrl = req.body.imageUrl;
        }

        vehicle.save((err, result) => {
            if (err) {
                return next(err);
            }

            return next();
        });
    };
};