let renderMW = require('../middlewares/generic/render');
let getVehicleListMW = require('../middlewares/vehicle/getVehicleList');
let createOrUpdateVehicleMW = require('../middlewares/vehicle/createOrUpdateVehicle');
let updateVehicleMW = require('../middlewares/vehicle/updateVehicle');
let deleteVehicleMW = require('../middlewares/vehicle/deleteVehicle');
let getVehicleMW = require('../middlewares/vehicle/getVehicle');

let vehicleModel = require('../models/Vehicle');


module.exports = function (app) {

    let objectRepository = {
        vehicleModel: vehicleModel
    };

    /**
     * List all vehicles
     */
    app.get('/vehicles',
        getVehicleListMW(objectRepository),
        renderMW(objectRepository, 'vehicleList'));

    /**
     * Render the vehicle creating form
     */
    app.get('/vehicles/add',
        renderMW(objectRepository, 'newVehicle')
    );

    /**
     * Create and save the newly created vehicle to the db
     */
    app.post('/vehicles/add',
        createOrUpdateVehicleMW(objectRepository),
        function (req, res, next) {
            res.redirect('/vehicles');
        }
    );

    /**
     * Render the vehicle editing form and pre-fill
     * the input fields
     */
    app.get('/vehicles/:id/edit',
        getVehicleMW(objectRepository),
        renderMW(objectRepository, 'newVehicle')
    );

    /**
     * Save the updated vehicle to the db
     */
    app.post('/vehicles/:id/edit',
        getVehicleMW(objectRepository),
        createOrUpdateVehicleMW(objectRepository),
        function (req, res, next) {
            res.redirect('/vehicles');
        }
    );

    /**
     * Delete the vehicle
     */
    app.get('/vehicles/:id/delete',
        getVehicleMW(objectRepository),
        deleteVehicleMW(objectRepository),
        function (req, res, next) {
            res.redirect('/vehicles');
        }
    );
};