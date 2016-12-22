# monorepo-alle-example

> Example of monorepo in "alle" model

In this example we have [vue](https://github.com/vuejs/vue) components and an application that uses these components, the build is made with [rollup](https://github.com/rollup/rollup)

## Reference

This example has been constructed as an example of this post [blog post](http://nquicenob.github.io/2016/12/22/monorepos-javascript.html)

## scripts

### Development view of a module

Operating systems:

```bash
# module-name shoulds be the name of a folder in ./packages/node_modules/<module-name>
$ MODULE_NAME=<module-name> npm run start
```

Windows:

```bash
# module-name shoulds be the name of a folder in ./packages/node_modules/<module-name>
$ set MODULE_NAME=<module-name>
$ npm run start
```

### Build modules

```bash
$ npm run modules:build
```

### Publish modules

1. execute:

```bash
$ npm run modules:build
```
2. Move to module folder and execute:

```bash
npm run publish
```

# License

MIT @ Nicolas Quiceno
