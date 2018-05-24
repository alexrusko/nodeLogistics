var expect = require('chai').expect;
var getVehicleListMW = require('../../middlewares/vehicle/getVehicleList');

describe('getVehicleList middleware ', function () {
    it('should return vehicles', function (done) {
        var req = {};
        var res = {
          locals: {}
        };
        var fakeVehicleModel = {
          find: function (some, cb) {
            cb(undefined, ['vehicle1', 'vehicle2'])
          }
        };
    
        getVehicleListMW({
          vehicleModel: fakeVehicleModel
        })(req, res, function (err) {
          expect(res.locals.vehicleList).to.eql(['vehicle1', 'vehicle2']);
          expect(err).to.eql(undefined);
          done();
        });
      });
    
      it('should return error when db returns error', function (done) {
        var fakeVehicleModel = {
          find: function (some, cb) {
            cb('ERROR', undefined)
          }
        };
    
        getVehicleListMW({
          vehicleModel: fakeVehicleModel
        })({}, {}, function (err) {
          expect(err).to.eql('ERROR');
          done();
        });
      });
});