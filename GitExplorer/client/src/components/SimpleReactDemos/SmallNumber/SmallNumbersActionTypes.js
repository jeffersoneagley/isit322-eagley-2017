/**
 * Created by fish on 6/10/17.
 */

export const TYPE_SMALL_NUMBERS_GET_NUMBER = 'TYPE_SMALL_NUMBERS_GET_NUMBER';

export function getSmallNumbersNumber(number) {
    return {
        type: TYPE_SMALL_NUMBERS_GET_NUMBER,
        number,
    };
}
