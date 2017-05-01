/**
 * Created by charlie on 4/20/17.
 */

/*eslint no-unused-vars: "off" */
const unknown = 'unknown';
const PARAGRAPH = 0;
const TEXT = 1;
const DEFAULT = PARAGRAPH;
const types = ['paragraph', 'text'];

export default [
    {
        id    : 'username',
        label : 'username',
        type  : types[DEFAULT],
        sample: 'login-' + unknown
    }, {
        id    : 'display_name',
        label : 'display name',
        type  : types[DEFAULT],
        sample: 'ai' + unknown
    },
    {
        id    : 'url',
        label : 'Url',
        type  : types[DEFAULT],
        sample: 'url' + unknown
    },
    {
        id    : 'html_url',
        label : 'HTML Url',
        type  : types[DEFAULT],
        sample: 'htmlUrl' + unknown
    },
    {
        id    : 'followers_url',
        label : 'Followers URL',
        type  : types[DEFAULT],
        sample: 'followersUrl' + unknown
    }
]