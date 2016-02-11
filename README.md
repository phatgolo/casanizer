# casanizer

## Description
I created this small npm module to make jeoman scaffolding and templating work a little bit easier.
It's not uncommon that you need a few different case variations of your file-name or project name when generating files. This lib and it's class helps you with this.

## How to install

``` bash
> npm install casanizer --save-dev

```
## How to use

You can now use it in your node module like this:

``` js
var casanizer = require('casanizer');

var fooBar = new casanizer.Caser('Foo Bar').case();
fooBar.camel; // fooBar
fooBar.dot; // foo.bar
fooBar.kebab; // foo-bar
fooBar.pascal; // FooBar
fooBar.snake; // foo_bar
fooBar.path; // foo\\bar
fooBar.uri; // foo/bar
fooBar.sentence; // foo bar
fooBar.realSentence; // Foo bar
fooBar.words; // ["foo", "bar"]

```

You can also use each method diretly if you don't want all cases.

``` js
var casanizer = require('casanizer');

var fooBarCaser = new casanizer.Caser('Foo Bar');
fooBarCaser.toCamel(); // fooBar
fooBarCaser.toDotl(); // foo.bar
fooBarCaser.toKebab(); // foo-bar
fooBarCaser.toPascal(); // FooBar
fooBarCaser.toSnake(); // foo_bar
fooBarCaser.toPath(); // foo\\bar
fooBarCaser.toUri(); // foo/bar
fooBarCaser.toSentence(); // foo bar
fooBarCaser.toRealSentence(); // Foo bar
fooBarCaser.toWords(); // ["foo", "bar"]
```

Also note that all special characters will be replaced with basic latin characters.

``` js
var casanizer = require('casanizer');

var fooBarCaser = new casanizer.Caser('Föö Bär');
fooBarCaser.toCamel(); // fooBar
```

On top of this all extra none basic characters will be removed.

``` js
var casanizer = require('casanizer');

var fooBarCaser = new casanizer.Caser('_foo_^$$__bar_');
fooBarCaser.toCamel(); // fooBar
```