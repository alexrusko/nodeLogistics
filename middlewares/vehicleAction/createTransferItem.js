/**
 * Create a new transferItem, and save it to db
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    let transferItemModel = requireOption(objectRepository, 'transferItemModel');
    let productModel = requireOption(objectRepository, 'productModel');

    return function (req, res, next) {

        if ((req.body.product === '-') ||
            (req.body.quantity === '') ||
            (req.body.quantity === '0')) {
            return next();
        }

        if (req.body.quantity <= (res.locals.vehicle.maxCapacity-res.locals.vehicle.currentCapacity)) {
            productModel.findOne({ _id: req.body.product }, (err, result) => {
                if (err) {
                    return next(err);
                }
    
                let transferItem = new transferItemModel();
                transferItem.quantity = req.body.quantity;
                transferItem.name = result.name;
                transferItem.imageUrl = result.imageUrl;
                transferItem.value = transferItem.quantity * result.unitPrice;
    
                transferItem.save((err) => {
                    if (err) {
                        return next(err);
                    }
    
                    res.locals.vehicle._storage.push(transferItem);
    
                    res.locals.vehicle.save((err) => {
                        if (err) {
                            return next(err);
                        }
    
                        return next();
                    });
                });
            });
        } else {
            return next('A megadott áru mennyisége meghaladja a jármű kapacitását');
        }

    };
};