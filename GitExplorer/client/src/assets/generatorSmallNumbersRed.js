/**
 * Created by fish on 6/6/17.
 */
const numberResults = {
    one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
};

printNumberEnumCaseToConsole = (item) => {
    console.log('        case \'NUMBER_' + item.toUpperCase() + '\':');
    console.log(
        '            return {...state, numbers:{...state.numbers, ' + item + ': ' + numberResults[item] + '}};');
};

printSmallNumbersReducerMainBody = () => {
    console.log('const smallNumbersReducer = (state = smallNumbersState, action) => {');
    console.log('    switch (action.type) {');

    for (let item in numberResults) {
        if (numberResults.hasOwnProperty(item)) {
            printNumberEnumCaseToConsole(item);
        }
    }
    console.log('    default:');
    console.log('        return state;');
    console.log('    }');
    console.log('};');

    console.log('export default smallNumbersReducer;');
};

printVariableDeclaration = () => {
    console.log('const smallNumbersState = {');
    console.log('    numbers: {');
    for (let item in numberResults) {
        if (numberResults.hasOwnProperty(item)) {
            printVariableDeclarationBody(item);
        }
    }
    console.log('    },');
    console.log('};');
};

printVariableDeclarationBody = (item) => {
    console.log('        ' + item + ': \'' + 0 + '\',');
};

generateAll = () => {
    printVariableDeclaration();
    printSmallNumbersReducerMainBody();
};

generateAll();
