/**
 * Created by fish on 4/13/17.
 */

let fetch = (_this) => {
    _this.setState({foo: 'bar'});
    return {
        then: () => {
            return {
                then: () => {
                    return {
                        catch: () => {

                        },
                    };
                },
            };
        },
    };
};

module.exports.fetch = fetch;
