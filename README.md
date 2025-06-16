# Overview

This comment section is currently an MVP-only. I plan to run performance and memory tests on it to ensure a pleasant experience for users. As of now, it serves as a good example of how I approach components' design and structure.

## Progress

I've implemented the essential features for the comment section. Everything's working properly without any side effects. This was the focus from the very beginning to prevent "feature creep" and ensure that a user is able to perform the necessary actions.

Here's a list of the essential features included:

- Create a comment
- Reply to a comment
- Reply to a reply with the username pointing to the right user
- Edit a comment or reply with the behavior being consistent regardless of which element is modified
- Delete a comment/reply
- Upvote a comment/reply
- Downvote a comment/reply

## Local Development

1. Install dependencies
```
pnpm i
```

2. Run the project in development mode:
```
pnpm run dev
```

3. Enjoy!
