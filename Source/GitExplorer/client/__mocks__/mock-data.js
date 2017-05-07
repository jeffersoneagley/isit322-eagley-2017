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
                // body    : JSON.stringify({
                //
                //     'username'    : 'robindudette',
                //     'display_name': 'Robin Dudette'
                // })
                body    : JSON.stringify(
                    {
                        "login"              : "charliecalvert",
                        "id"                 : 1811478,
                        "avatar_url"         : "https://avatars3.githubusercontent.com/u/1811478?v=3",
                        "gravatar_id"        : "",
                        "url"                : "https://api.github.com/users/charliecalvert",
                        "html_url"           : "https://github.com/charliecalvert",
                        "followers_url"      : "https://api.github.com/users/charliecalvert/followers",
                        "following_url"      : "https://api.github.com/users/charliecalvert/following{/other_user}",
                        "gists_url"          : "https://api.github.com/users/charliecalvert/gists{/gist_id}",
                        "starred_url"        : "https://api.github.com/users/charliecalvert/starred{/owner}{/repo}",
                        "subscriptions_url"  : "https://api.github.com/users/charliecalvert/subscriptions",
                        "organizations_url"  : "https://api.github.com/users/charliecalvert/orgs",
                        "repos_url"          : "https://api.github.com/users/charliecalvert/repos",
                        "events_url"         : "https://api.github.com/users/charliecalvert/events{/privacy}",
                        "received_events_url": "https://api.github.com/users/charliecalvert/received_events",
                        "type"               : "User",
                        "site_admin"         : false,
                        "name"               : "Charlie Calvert",
                        "company"            : "Bellevue College",
                        "blog"               : "http://www.elvenware.com/charlie",
                        "location"           : "Bellevue, WA",
                        "email"              : null,
                        "hireable"           : null,
                        "bio"                : null,
                        "public_repos"       : 30,
                        "public_gists"       : 8,
                        "followers"          : 85,
                        "following"          : 6,
                        "created_at"         : "2012-06-03T04:58:22Z",
                        "updated_at"         : "2017-05-04T22:59:56Z"
                    }
                )
            };

        default:
            return {}
    }
};

export default getData;
