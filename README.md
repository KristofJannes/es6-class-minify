# es6-class-minify

Current minifiers cannot minify ES6 class fields and members functions.
This is mostly because they are not able to track the class when a method is
called on an object.

This package provides a simple way to minify class fields and members by
manually prefixing the name with a `$`-sign.
This package will rename all fields and members in a class and all corresponding
accesses on an object.
This package does not need to track which object is an instance of which class,
because it can simply rename all usages of a `$`-field or method.
The standard JavaScript definitions do not include such names, so built-in 
names are never accidentally minified.

## Installation

Using npm:
```bash
npm i es6-class-minify
```

In Node.js:
```javascript
import ES6ClassMinify  from 'es6-class-minify'

const minifier = new ES6ClassMinify()
const plainCode = '...'
const minifiedCode = minifier.minify(plainCode)
```

## Example

Plain code:
```javascript
class Counter {
  $count = 0
  
  $plus() {
    this.$count++
  }
  
  $get() {
    return this.$count
  }
}

const counter = new Counter()
counter.$plus()
counter.$plus()
console.log(counter.$get())
```

Minified code:
```javascript
class Counter {
  a = 0
  
  b() {
    this.a++
  }
  
  c() {
    return this.a
  }
}

const counter = new Counter()
counter.b()
counter.b()
console.log(counter.c())
```

All class members and fields are minified.
Other variables are not minified, since there are already very good minifiers 
for those things.
You should use this package in addition to another classical minifier.

## Notes
You can call `ES6ClassMinify#minify` multiple times, the previous mappings are
remembers are will be applied to the next strings.
Within one call to `ES6ClassMinify#minify`, the mappings are allocated to end up
with the smallest possible file size.
So variables that occur most, get a smaller minified name.
It is advisable to first bundle your code in one (or a few) large bundles, and 
then pass the bundle to the minifier, to end up with the smallest possible end 
file.

The allocation of the mappings is global, i.e. even when two different classes
has a method with the same name, they will get the same mapping.
This way, there is no need for this package to track the classes of objects.
