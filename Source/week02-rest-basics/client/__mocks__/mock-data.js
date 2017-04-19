/**
 * Created by fish on 4/18/17.
 */
const getData = (url) => {
    switch (url) {
        case '/api/foo':
            return {
                result: 'success',
                foo   : 'bar',
                file  : 'api.js'
            };
        case '/api/user':
            return {
                error   : {},
                response: {},
                body    : JSON.stringify({
                    login: 'Gonk'
                })
            };
        default:
            return {};
    }
};

export default getData;