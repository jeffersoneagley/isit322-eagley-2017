## Overview

This document covers the following assignments:

- **ReactProps**
- **ReactPropsRefine**
- **ReactPropsMounted**
- **ReactPropsShow**

## Client Side

This looks great. The build I'm looking at is a little closer to the midterm than to this assignment, but that is what you pointed me at. I can grade this just as easily as an assignment that did not include a menu.

Your CSS is well formed and your code is reasonably well structured.

Main Issues:

- Your work is in the **GitExplorer** folder.
- Your code runs without errors or warnings.
- I can see User, Foo and Numbers views. With the menu in your case.
- You have a \_\_mocks\_\_ folder with a working **fetch** mock in it
- You autogenerate the **form** controls with **ElfElements**.
- In **SmallNumbers**, you provide a view of 9 numbers. Good.

You have properly refactored your code into the following files or something similar:

- ElfElements.js
- GetFoo.js
- GetUserInfo.js
- ElfHeader.js
- ShowUserInfo.js
- SmallNumbers

As suggested, your React components are in files that begin with a capital letter and use Pascal casing.

You have gone further than this and created a number of folders. Some of these don't make a great deal of sense of to me. For instance, the Elf folder doesn't seem quite right. Should **ElfElements** go in the **paragraphs** folder? I'm not sure that **App.js** is still being used. You should delete it.

The following directories exist:

- \_\_tests\_\_
- components
- css
- images (img in your case. best not to abbreviate)

Smaller Issues

- **.bowerrc** changed to include **bower-components**
- **index.js** is properly implemented. You have moved properly moved the following to **DataMaven**: **ElfHeader**, **GetUserInfo**, **App**/**GetFoo**, **SmallNumbers** in it.
- You do a good job of formatting your code.

## Testing

You have 21 working tests and they are refactored into 7 **modules**, at least approximately one per component.

Overall this is good, but you could have had a few more tests.

I'm not seeing much evidence that you got the Enzyme debug statements working. You have fewer tests than others. One reason might be the lack of EnzymeDebug. Everyone is different, but it saves me a great deal of time. It makes testing much easier for me.

## Commit Graded

Here is what I was looking at:

```
commit 8e0c7be85eb4aa80554ae4a0412f31826b3f9416
Author: Jefferson on ist320 vbox <jefferson.eagley@gmail.com>
Date:   Tue May 9 18:37:48 2017 -0700

    working client tests
```

If you feel this was the wrong commit, let me know.

## Create Charlie Branch for Comments

Here is how I created the branch where I place your comments. First I find the commit you want me to grade. Then I:


```bash
git branch charlie-props
git checkout charlie-props
touch CharlieComments.md
```

## Push Comments

Here is how I push that branch.


```bash
git add CharlieComments.md
git commit -m "CharlieComments for props assignments"
git push --set-upstream origin charlie-props
```

I provide a link to the comments, but if you can't find them, just go to your online repository, select the charlie-comment branch, and look for the file called **CharlieComments.md**.

## Comment Location

My comments are here:



And also attached, but easier to read through the above link to your repository.
