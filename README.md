## Getting snowpack to work with custom express server

There are situations where one might be serving the static assets, js/css/images etc., and the apis from the same url. In those cases, we can't use `snowpack dev` directly because snowpack dev doesn't know what to do with the api requests. One way to get across that limitation is to make a custom server which routes requests to static assets like js and css files to snowpack dev server and routes the other requests to it's regular server, which might be anything, like a python server or a rails server etc.

TODO:
[ ] Add react and jsx
[ ] Add support for css modules
[ ] HMR
[ ] react-fast refresh
