/**
 * Created by fish on 6/11/17.
 */

export const TYPE_GIT_GET_USER_RESPONSE = 'TYPE_GIT_GET_USER_RESPONSE';

export function getTypeGitUserResponse(userData) {
    return {
        type: TYPE_GIT_GET_USER_RESPONSE,
        userData,
    };
}
