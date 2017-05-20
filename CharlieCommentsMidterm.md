# Comments Midterm Isit322 2017

This document contains Charlie's comments on your Isit322 2017 Midterm.

This is great. You have well formated code, very little dead code, your program runs fine once I figured out what you were doing with the token and user name. I guess we will need to work this out for everyone, but you are the first one who does not provide a token for me. I put mine in the environment, but still had to modify your user name in the **gists.js**. I think we can use the package **dotenv** to simplify this process with a **.env** file. You should have told me I need to do this. It was creating a lot of strange errors that were hard to track down until I straightened this out.

But this code is great. The ability to define a gist and view the gists and explore them with clicks is all great. We meed to get the view to refresh after the update, and clean up the interface some in general. But overall great.

Thanks for moving this out of the **Source** directory. I'm really not sure it was adding much and it was breaking my scripts.

## Basics

Your application has a styled menu and supports component switching. You included the following menu items:

- **Home**
- **GetFoo**
- **SmallNumbers**

## Additional Requests

- You made at least two more requests of the GitHub API
- You sort of included the results of these requests in the menu. But what you did in terms of integrating the two requests into one component view was very nice.
- Your app switches between your Git request views

## Tests and Polish

- You have 180 tests in 6 test suites.
- JSCS is available and most major files in the project pass JSCS tests.
- Your code runs without warnings and errors (once I got the token user name issue fixed.)
- There is a bit of dead code in some files such as **routes/api.js**. Just delete it and depend on Git to get it back if needed, or else create a file called **deadcode.js** and put it there.

## Extra Credit

- Your **git-convert** program spits out field definitions. Very nice. Can you use this directly in your program? I think so.

## Comments

My comments are in a file called **CharlieCommentsMidterm** in the **charlie-midterm** branch of your repository:

https://bitbucket.org/jeffersoneagley/ist322-eagley-2017/src/bf51ee5df6fe2c1b4526a3faf92ceae50e7f1cdb/?at=charlie-midterm

https://bitbucket.org/jeffersoneagley/ist322-eagley-2017/src/bf51ee5df6fe2c1b4526a3faf92ceae50e7f1cdb/CharlieCommentsMidterm.md?at=charlie-midterm&fileviewer=file-view-default

Because BitBucket puts the commit number in these links, there may be a more up to date copy of this file in your repository. Just search on the branch.

And also attached, but easier to read through the above link to your repository.
