leftslideshow
=============
leftSlideshow is a jQuery plugin that offers a slight and simple way to add slide for images on your webpages.


###Homepage
<http://zzbaivong.blogspot.com/>


###Basic usage:
```javascript
$(selector).leftslideshow({
    itemsSelector: ".bv_img",
    appendTo: "",
    infoContent: "",
    effect: "slide",
    width: "640px",
    height: "480px",
    speed: 3000,
    slideRight: false,
    autoStart: false,
    autoPlay: false,
    controlRight: false,
    hideControl: false,
    infoBtn: false,
    noCopy: false,
    autoResize: true,
    closeBtn: true,
    hideItems: true,
    scrollTo: true,
    open: function () {},
    start: function () {},
    pause: function () {},
    close: function () {}
});
```


Config options
==============
**Option**    | **Type** | **Default values** | **Note**
--------------|----------|--------------------|---------
itemsSelector |	selector | ".bv_img"          |	Selector of gallery item.
appendTo      | selector | ""                 |	Selector of element that slideshow will append.
infoContent   | string   | ""                 | Set default image captions.
effect        | string   | "slide"            |	Image Slider Transition Effects, "fade" or "slide".
width         | string   | "640px"            | Slideshow width.
height        | string   | "480px"            | Slideshow height.
speed         | Number   | 3000               | Slideshow speed in milliseconds.
slideRight    | Boolean  | false              | If set to true, slide is reverse, from left to right.
Autostart     | Boolean  | false              | If set to true, slideshow will create.
Autoplay      | Boolean  | false              | If set to true, slideshow will play after slideshow is create.
controlRight  | Boolean  | false              | If set to true, control is reverse, from left to right.
hideControl   | Boolean  | false              | Hide / Show control bar, if hidden, hover the bottom slideshow to show.
infoBtn       | Boolean  | false              | Hide / Show the info button.
noCopy        | Boolean  | false              | Enable / disable copy and download image at the usual way.
autoResize    | Boolean  | true               | If set to true, automatically resize when the window size is less than the options set.
closeBtn      | Boolean  | true               | Hide / Show the close button.
hideItems     | Boolean  | true               | Hide gallery item that slideshow at created.
scrollTo      | Boolean  | true               | Scrolling to the slideshow place.
open          | function | function () {}     | Perform at slideshow created.
start         | function | function () {}     | Perform at slideshow started.
pause         | function | function () {}     | Perform at slideshow paused.
close         | function | function () {}     | Perform at slideshow closed.


Getting Started
=============
Create the image element.
Add attribute `class="bv_img"` for pictures to put in the slideshow.
Add captions to photos to attribute alt.


**Example:**
```html
<img class="bv_img" src="/images/img1.jpg" alt="Lorem ipsum dolor sit amet, consectetur adipisicing." />
```
Attach `.leftslideshow()` from the image element parents.
```javascript 
$(document).ready(function() {
	$("body").leftslideshow();
});
```	

jsFiddle: http://jsfiddle.net/baivong/28sUB/
