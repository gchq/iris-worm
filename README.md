# IRIS Worm

IRIS Worm is a real-time data graphing component. With straight-forward initialisation and a core set of methods, the component is easy to set up and an intuitive and beautiful data visualisation tool.

## Features
* Easy Initialisation
* Zero Dependencies
* Built on HTML5 canvas - performant, scalable and fully supported in all major browsers
* Accessibility - using ARIA alert and aria-live tags, screenreaders can read the worm to users

## Installation

We've packaged up all the dependencies into a minified distribution for you so you just need to include it on your page somehow;

```
<script src="node_modules/dist/js/iris-worm.min.js"></script>
```
This registers IRIS.Worm in the global scope, allowing you to start using the component.

## Accessibility

It is very important that any applications you make are useable by visually impaired users. The worm is a graphical 
interface rendered on to an html canvas, and so will not naturally be parseable by screen readers. The worm provides
an interface to aria live/alert features to get around this, which will broadcast changes to the worm live to screen 
readers. Settings follow the standard aria naming convention, so that allows you to set broadcasts to be;

off - the worm will not broadcast anything.
polite - if the worm changes, it will broadcast the new value when the user is idle (i.e. it won't interrupt them).
assertive - if the worm changes, it will interrupt the user and tell them that the change has occurred (i.e. it will interrupt them).

You should tailor which option to go for depending on what your use case is. If you have many worms on one page, with data that changes 
very frequently, you might be better off disabling the broadcasts and just providing a seperate screen-reader-friendly interface. 

Implementation details can be found in the options section.

## Example

Pass in a containing div and some options, and the worm will set up a canvas element. Then just call the `start()` method
to start the worm.

```
// construct a new instance
var worm = new IRIS.Worm(document.querySelector('#wormCanvas'));

// Start it
worm.start();

// Change the value
worm.setValue(75);
```

## Options
You can get or set the options for a timeline using the following interface;
```
worm.getOption(<optionName>);
worm.setOption(<optionName>, <optionValue>);
```

The options themselves are documented within the code however have been reproduced here for convinience.

```
      // The width of the component
      width: 600,

      // The height of the component
      height: 400,

      // The maximum value that can be set in the component (used for scaling) -
      // defaults to 100, meaning that "100" is the "Top of the worm".
      maxValue: 100,

      // When a value changes, the worm will accelerate towards that value smoothly
      // if smoothMode is set to true, otherwise it will jump straight to it.
      smoothMode: true,

      // Color mode: options are: 'greenIsGood', 'greenIsBad', 'monochrome'
      colorMode: 'greenIsGood',

      // How quickly the worm accelerates towards its target (NOTE: this value really is only useful if you keep it
      // below 1, otherwise you might as well just use smoothMode: false and have it instantly jumping)
      acceleration: 0.1,

      // How thick the line is
      lineWidth: 5,

      //how insistant the aria-live tag is. Default is polite;
      //options are: off, polite, assertive
      accessibilityBroadcast: 'polite'
```

## Events

The worm emits events that can be subscribed to in order to provide custom behaviour. These events are subscribed to using the following interface;

```
worm.on('valueChanged', function(value) {
  console.log("Value changed to " + value);
});
```
Events are as follows

```
valueChanged
valueIncreased
valueDecreased
valueBecameMinimum
valueBecameMaximum
```

## Public Methods

```
worm.start()
```
Starts the worm.

```
worm.stop()
```
Stops the worm.

```
worm.setValue(value)
```
Sets the current value of the worm.

```
worm.getValue()
```
Gets the current value of the worm.

```
worm.on(event, callback)
```
Event hook (see "events" section)