# Base
jQuery plugin that contains different interaction and information elements

Base is a non markup specific jQuery plugin somewhat reminiscent of jQueryUI.

For example rSlide, which is a part of Base, doesn't care if you write:

<div>
  <div></div>
  <div></div>
  <div></div>
</div>

or
<ul>
  <li></li>
  <li></li>
  <li></li>
</li>

It will add slider functionality just the same. It also doesn't impose a unique navigation. 
Simply adding $().rSlide({direction: 'right'}) to your button's click event will cause a slide in that direction.
This makes it super easy to include other libraries like hammer/touchswipe to add touch functionality.
