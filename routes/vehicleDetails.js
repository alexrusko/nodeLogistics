let renderMW = require('../middlewares/generic/render');
let getProductListMW = require('../middlewares/product/getProductList');
let getVehicleMW = require('../middlewares/vehicle/getVehicle');
let removeItemFromVehicleMW = require('../middlewares/vehicleAction/removeItemFromVehicle');
let createTransferItemMW = require('../middlewares/vehicleAction/createTransferItem');
let updateVehicleMW = require('../middlewares/vehicle/updateVehicle');
let updateVehicleStateMW = require('../middlewares/vehicleAction/updateVehicleState');
let calculateCapacityMW = require('../middlewares/vehicleAction/calculateCapacity');
let getTransferItemMW = require('../middlewares/vehicleAction/getTransferItem');

let productModel = require('../models/Product');
let vehicleModel = require('../models/Vehicle');
let transferItemModel = require('../models/TransferItem');

module.exports = function (app) {

    let objectRepository = {
        productModel: productModel,
        vehicleModel: vehicleModel,
        transferItemModel: transferItemModel
    };

    /**
     * Removes the item from the vehicles inventory
     */
    app.get('/vehicles/:id/remove/:item',
        getVehicleMW(objectRepository),
        removeItemFromVehicleMW(objectRepository),
        calculateCapacityMW(objectRepository),
        function(req, res, next) {
            res.redirect('/vehicles/' + res.locals.vehicle._id +'/view');
        }
    );

    /**
     * Add the item to the vehicles inventory
     */
    app.post('/vehicles/:id/addItem',
        getVehicleMW(objectRepository),
        createTransferItemMW(objectRepository),
        calculateCapacityMW(objectRepository),
        function(req, res, next) {
            res.redirect('/vehicles/' + res.locals.vehicle._id +'/view');
        }
    );

    /**
     * Modify the vehicles status
     */
    app.get('/vehicles/:id/depart',
        getVehicleMW(objectRepository),
        updateVehicleStateMW(objectRepository, 'depart'),
        function(req, res, next) {
            res.redirect('/vehicles/' + res.locals.vehicle._id +'/view');
        }
    );

    /**
     * Modify the vehicles status
     */
    app.get('/vehicles/:id/arrive',
        getVehicleMW(objectRepository),
        updateVehicleStateMW(objectRepository, 'arrive'),
        calculateCapacityMW(objectRepository),
        function(req, res, next) {
            res.redirect('/vehicles/' + res.locals.vehicle._id +'/view');
        }
    );

    /**
     * Render the vehicle detail page
     */
    app.get('/vehicles/:id/view',
        getVehicleMW(objectRepository),
        getProductListMW(objectRepository),
        renderMW(objectRepository, 'vehicle')
    );

};