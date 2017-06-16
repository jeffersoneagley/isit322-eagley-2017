/**
 * Created by fish on 6/14/17.
 */

export const BROWSER_MODES = {
    BASE: 'BASE',
    VIEW: 'VIEW',
    EDIT: 'EDIT',
    CREATE: 'CREATE',
};
export const ACTION_TYPES = {
    SET_BROWSER_MODE: 'SET_BROWSER_MODE',
};

export function getActionTypeSetBrowserMode(mode) {
    return (dispatch) => {
        return dispatch({
            type: ACTION_TYPES.SET_BROWSER_MODE,
            browserMode: mode,
        });
    };
}

export function getActionTypeExitBrowserMode() {
    return getActionTypeSetBrowserMode(BROWSER_MODES.BASE);
}

let BrowserActions = {
    BROWSER_MODES, getActionTypeExitBrowserMode, getActionTypeSetBrowserMode, ACTION_TYPES,
};

export default BrowserActions;
