/**
 * Created by fish on 6/10/17.
 */

export const TYPE_GET_FOO = 'TYPE_GET_FOO';

export function getTypeFooResponse(fooData) {
    return {
        type: TYPE_GET_FOO,
        fooData,
    };
}
