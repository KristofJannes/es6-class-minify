# es6-class-minify

Package to minify ES6 classes and objects.

Current minifiers cannot minify ES6 class fields and member functions.
This is because they are not able to track the class when a method is called on an object.

This package provides a simple way to minify class fields and members by
manually prefixing the name with a `_`.
This package will rename all fields and members in a class and all corresponding
accesses on an object.
This package does not need to track which object is an instance of which class,
because it can simply rename all usages of a field or method prefixed by `_`.
The standard JavaScript definitions do not include such names, so built-in
names are never accidentally minified.

## Installation

```bash
npm install es6-class-minify
```

## Usage

Single file:

```javascript
import { ES6ClassMinify } from "es6-class-minify";

const es6ClassMinify = new ES6ClassMinify();
es6ClassMinify.minify("...");
```

## Example

Plain code:

```javascript
class Counter {
  _count = 0;

  _plus() {
    this._count++;
  }

  _get() {
    return this._count;
  }
}

const counter = new Counter();
counter._plus();
counter._plus();
console.log(counter._get());
```

Minified code:

```javascript
class Counter {
  a = 0;

  b() {
    this.a++;
  }

  c() {
    return this.a;
  }
}

const counter = new Counter();
counter.b();
counter.b();
console.log(counter.c());
```

All class members and fields are minified.
Other variables are not minified, since there are already very good minifiers
for those things.
You should use this package in addition to another classical minifier.
