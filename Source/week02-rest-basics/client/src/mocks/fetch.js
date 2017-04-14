/**
 * Created by fish on 4/13/17.
 */

fetch = function (_this) {
    _this.setState({foo: 'bar'});
    return {
        then: function () {
            return {
                then: function () {
                    return {
                        catch: function () {

                        }
                    }
                }
            }
        }
    }
}


module.exports.fetch = fetch;