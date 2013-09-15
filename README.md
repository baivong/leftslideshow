**leftslideshow**
=============

leftSlideshow is a jQuery plugin that offers a slight and simple way to add slide for images on your webpages.


###Home page

http://zzbaivong.blogspot.com/


###Basic usage:

	$(selector).leftslideshow();


**Config options**
==============
**Option** | **Type** | **Default values** | **Note**
-----------|----------|--------------------|--------------------------------------------
itemsSelector |	selector | ".bv_img" |	Selector of gallery item.
appendTo | selector | "" |	Selector of element that slideshow will append.
infoContent | string | "" | Set default image captions.
effect | string | "slide" |	Image Slider Transition Effects, "fade" or "slide".
width | string | "640px" | Width slideshow.
height | string | "480px" | Height slideshow.
speed | Number | 3000 | Slideshow speed in milliseconds	.
slideRight | Boolean | false | If set to true, slide is reverse, from left to right.
Autostart | Boolean | false | If set to true, slideshow will create.
Autoplay | Boolean | false | If set to true, slideshow will play after slideshow is create.
controlRight | Boolean | false | If set to true, control is reverse, from left to right.
hideControl | Boolean | false | Hide / Show control bar, if hidden, hover the bottom slideshow to show.
infoBtn | Boolean | false | Hide / Show the info button.
noCopy | Boolean | false | Enable / disable copy and download image at the usual way.
autoResize | Boolean | true | If set to true, automatically resize when the window size is less than the options set.
closeBtn | Boolean | true | Hide / Show the close button.
hideItems | Boolean | true | Hide gallery item that slideshow at created.
scrollTo | Boolean | true | Scrolling to the position of slideshow.
open | function | function () {} | Perform at slideshow created.
start | function | function () {} | Perform at slideshow started.
pause | function | function () {} | Perform at slideshow paused.
close | function | function () {} | Perform at slideshow closed.

**Getting Started**
=============
Create the image element.
Add attribute `class="bv_img"` for pictures to put in the slideshow.
Add captions to photos to attribute alt.

**Example:**

	`<img class="bv_img" src="/images/img1.jpg" alt="Lorem ipsum dolor sit amet, consectetur adipisicing." />`

Attach `.leftslideshow()` from the image element parents.
 
	$(document).ready(function() {
		$("body").leftslideshow();
	});

 jsFiddle: http://jsfiddle.net/baivong/28sUB/
