# Posts Service

This folder demonstrates a complete feature service using API, business, and React Query layers.

## Request flow

`usePosts` calls `postsService.getPosts`, which applies the requested limit after `fetchPosts`
retrieves data through `placeholderClient`.

## How to use

Use `usePosts(limit)` from client UI that needs loading, error, and cached post data. Use
`postsService.getPosts(limit)` in framework-independent code.

Follow this separation when creating another feature: transport in an API module, business rules in
a service module, and React Query behavior in a `use...` hook.
