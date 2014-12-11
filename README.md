# Mystique

Things are not always as they seem!

This library is a thin abstraction to allow you to map your domain logic results to something suitable for your API output.
While not anywhere near as complete or powerful, Mystique is influenced by the ideals behind [Fractal](http://fractal.thephpleague.com).

## Installation

Via NPM

```sh
npm install mystique
```

## Defining Transformers

To define a transformer, only two things are needed:

1. A resource name
2. A tranformation mapping function

```js
var Mystique = require('mystique');

var Post = new mystique.Transformer({
  resourceName: 'post',
  map: function (item) {
    return {
        first_name: item.user.firstName,
        last_name: item.user.lastName,
        title: item.post.title,
        year: item.meta.date
    };
  }
});

module.exports = Post
```


## Storing Transformers

To have Mystique remember a named transformer use the `registerTransformer` function.
Then transformers can be recalled using `getTransformer`.
This prevents having to use relative paths to look up transformers in your app.

The `registerTransformer` function takes two arguments:

1. A Transformer name
2. A Transformer Definition

```js
var Post = new mystique.Transformer({
  resourceName: 'post',
  map: function (item) {
    return {
        first_name: item.user.firstName,
        last_name: item.user.lastName,
        title: item.post.title,
        year: item.meta.date
    };
  }
});

mystique.registerTransformer('Post', Post);
```

The `getTransformer` function takes a single argument:

1. The Transformer name to look up

```js
var Mystique = require('mystique'),
    PostTransformer = Mystique.getTransformer('Post');
```

## TODO

* More error handling
* Create Result Objects
* Create Serializers
* Meta Data Story
* Tests

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
