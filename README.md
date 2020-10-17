
# VTEX Notes

## Useful Links

⭐ [Guides](https://developers.vtex.com/docs)

⭐ [Docs](https://vtex.io/docs)

⭐ [Changelog](https://developers.vtex.com/changelog)

⭐ [CLI](https://vtex.io/docs/recipes/development/vtex-io-cli-installation-and-command-reference/)

⭐ [Components](https://vtex.io/docs/components/all)

⭐ [GitHub](https://github.com/vtex-apps)

⭐ [Minimum Boilerplate](https://github.com/vtex-apps/minimum-boilerplate-theme)

⭐ [CSS Handles](https://developers.vtex.com/docs/vtex-io-documentation-using-css-handles-for-store-customization)

⭐ [Demo Store Theme](https://github.com/vtex-apps/demostore-theme)

⭐ [Store Block Template](https://github.com/vtex-trainings/store-block-template)

⭐ [Store Theme](https://github.com/vtex-apps/store-theme.git)

⭐ [API Client](https://github.com/vtex/commerce-io-clients)

⭐ [Node API Client](https://github.com/vtex/node-vtex-api)

⭐ [GraphQL IDE](https://github.com/vtex-apps/admin-graphql-ide)

⭐ [React App Template](https://github.com/vtex-apps/react-app-template)

⭐ [Test Tools](https://github.com/vtex/test-tools/tree/master/examples)

Other References:
- [Tachyons](https://tachyons.io/)
- [Pexels](https://www.pexels.com/) free stock photos


## Useful Commands
Command | Description
----|----
`npm i -g vtex` | installs vtex toolbelt
`vtex login {accountName}` | logs to a specific account
`vtex whoami` | shows workspace and login information
`vtex use workspace-name` | creates and switches to a workspace
`vtex list` | lists dependencies, installed apps and liked apps in current workspace
`vtex unlink --all` | clears all links
`vtex workspace reset` | clears current workspace content
`vtex link -c` | links current folder code and assets to logged workspace
`vtex browse` | open workspace in browser at address: `https://{workspace}-{accoutnName}.myvtex.com`


## Notes

⭐ - In VTEX IO, the accounts have three types of workspaces, as follows: [master](https://vtex.io/docs/recipes/store/promoting-a-workspace-to-master/), [producton](https://vtex.io/docs/recipes/store/creating-a-production-workspace) and development.
 - Workspaces are exact copies of your site front. They share the backend information, but have front configuration segregation. Meaning that everything that is under CMS will be unique to the workspace, but information such as price, catalog, and everything else will be the same for all workspaces.
 - **Development Workspace**: you can link, install, and publish apps in this workspace. It is not available to common customers, meaning one should need to login to VTEX to see it.
 ```
 vtex publish
 vtex install [{vendor}.{appName}@{version}]
 ```
 - **Production Workspace**: Can be used with VTEX A/B Testing tools and can be promoted to *master*. Can't be linked and can be available to common customers.
 ```
 vtex use {WorkspaceName} --production
 ```
 - **Master Workspace**: Unique workspace that serves the store front for customers. Only one master can exist at the same time.

⭐ - Enable CSS Inspector by adding `?__inspect` at the end of url, like so: 
 ```
 https://yourworkspace--youraccount.myvtex.com?__inspect
 ```

## Performance Tips

⭐ - `__fold__` **block**
 - the fold block sets a lazy load threshold. Whatever is below the `__fold__` block will load after the page load is complete and are within scroll frame.

⭐ - **Menus**
 - Menus load in every page. That makes them a major performance concern, since they have a site wide impact.
 - One technique to reduce menu loading time in VTEX IO is to define its items as props instead of children blocks.
 - In cases where one might have sub menus declared, the above tip might not work. But one can still use it on the menu leaf items (the last elements on the menu tree). Also, the sub menu items load can be deferred.

⭐ - **Images**
 - Images can have its size significantly reduced before being uploaded by using tools such as [Squoosh](https://squoosh.app/).
 - We can also tell VTEX IO to resize images at the server side using VTEX IO server side rendering features. To do that, set the `width` or `maxWidth` **props** in the image blocks such as `product-image`, `product-summary-image` and `image`.
 - It also helps to use all images from store assets instead to use external sources. That way, the image is served by VTEX CDN.

⭐ - **Search**
 - Search behavior can also impact on site performance. One can configure the `store.search` component `context` prop to improve its performance. `"skusFilter": "FIRST_AVAILABLE"` returns the first skus available instead of all available and `"simulationBehavior": "skip"` skips price simulation, consuming cached price for each sku.

⭐ - **Tools and other tips**
 - [Lighthouse](https://developers.google.com/web/tools/lighthouse)
    - Google dev performance tool
 - [Page Speed Insights](https://developers.google.com/speed/pagespeed/insights/)
    - Same as lighthouse, but for more standardized connection parameters since it's not executed in dev's machine, but in a server with control over connection and context variables
    - Take a look at the **Lighthouse Scoring Calculator** to check what is the metric that could bring the biggest gain on performance
 - [Web.dev](https://web.dev/)
    - Performance concepts and techniques documentation
    - Each metric in *lighthouse* has a different way to be improved
 - ![Browser Performance Tab](docs/BrowserPerformanceTab.png)
    - Use this on a incognito window
    - One can simulate the load of the page by using the performance tab on the browser dev tools. This will generate a load report that can be used to identify how each metric might be impacted during load and what files might be the offenders.
 - ![VTEX Performance Settings](docs/VTEXPerformanceSettings.png)
    - VTEX has exposed many configurations regarding performance tweaks
    - ❗ Test these features before deploying. These features should be used with caution. Since they are in CMS section of the admin, they should be applied to the workspace only.
 - [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
    - ![Profiler](docs/profiler.png)
    - The profiler can show what components are taking most time to load.
    - Gaps mean potential performance opportunities
    - Use this profiler assessment in production workspaces