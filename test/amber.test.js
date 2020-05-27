const assert = require('assert');
const amberjs = require('../index');

describe('Test of the Schema class', () => {

    var amberid = 0;

    describe('GetAlerts()', () => {
        it('should return the active alerts', () => {
            let result = amberjs.GetAlerts();
            assert.doesNotReject(result);
            return result.then((res) => {
                assert(Array.isArray(res));
                console.log(res);
                amberid = (res[0]) ? res[0].amberId : 0;
            })
        });

        it('should return the active alerts in a state', () => {
            let result = amberjs.GetAlerts("KY");
            assert.doesNotReject(result);
            return result.then((res) => {
                assert(Array.isArray(res));
                console.log(res);
            })
        });
    });

    describe('GetDetails()', () => {
        it('should return the details of the latest alert', () => {
            let result = amberjs.GetDetails(amberid);
            assert.doesNotReject(result);
            return result.then((res) => {
                assert(typeof res === 'object');
                console.log(res);
            })
        });
    });

});