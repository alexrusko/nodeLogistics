var expect = require('chai').expect;
var getProductListMW = require('../../middlewares/product/getProductList');

describe('getProductList middleware ', function () {
    it('should return products', function (done) {
        var req = {};
        var res = {
          locals: {}
        };
        var fakeProductModel = {
          find: function (some, cb) {
            cb(undefined, ['product1', 'product2'])
          }
        };
    
        getProductListMW({
          productModel: fakeProductModel
        })(req, res, function (err) {
          expect(res.locals.productList).to.eql(['product1', 'product2']);
          expect(err).to.eql(undefined);
          done();
        });
      });
    
      it('should return error when db returns error', function (done) {
        var fakeProductModel = {
          find: function (some, cb) {
            cb('ERROR', undefined)
          }
        };
    
        getProductListMW({
          productModel: fakeProductModel
        })({}, {}, function (err) {
          expect(err).to.eql('ERROR');
          done();
        });
      });
});