/**
 * Gets the transfer item from url param and adds it to res.locals
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    let transferItemModel = requireOption(objectRepository, 'transferItemModel');

    return function (req, res, next) {

        transferItemModel.findOne({_id: req.params.item}, (err, result) => {
            if (err) {
                return next(err);
            }

            res.locals.transferItem = result;

            return next();
        });
    };
};