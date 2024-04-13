# Frontend Mentor - Crowdfunding product page solution

This is a solution to the [Crowdfunding product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- See hover states for interactive elements
- Make a selection of which pledge to make
- See an updated progress bar and total money raised based on their pledge total after confirming a pledge
- See the number of total backers increment by one after confirming a pledge
- Toggle whether or not the product is bookmarked

### Screenshot

### Screenshot

![screenshot](./images/screenshot.PNG "screenshot")

### Links

- Solution URL: [Github]()
- Live Site URL: [Live Github]()

## My process

### Built with

- Semantic HTML5 markup
- Sass/SCSS
- Bootstrap
- jQuery/Javascript
- Mobile-first workflow


### What I learned
- I could re-use code from my insure project for the header nav section.
- couldn't use bootstrap collapse for the pledge inner sections on input select(because input used vs button or anchor)
- I'm also updating the amount of pledges that are left, as well as updating the button text if none are left, and I'm updating the number of days left.
- dialog : first tried to get modal behaviour by disabling buttons myself
- after version2 , realized not aria friendly, used aria-disabled instead. first tried variables for btn-disabled , then data-disabled(auto false)


- fussy for grayed out background on popup : first tried filter:grayscale (using a removeclass in js), then html background color + .addOpacity to make visible, .white-non-opaque-background to remove this from popup , added in js.
- changed addOpacity to ::backdrop??

- Could make toggle work with bootstrap 5 toggle, but the image and text would appear on two lines for bookmarked, didn't see a way to change.
  so had to delete that and try something else.zie link.
- added , {once : true} to handleSuccess or it would be called twice, on teh second round of trying to close the success message.zie link
- updatedays (js links)
- spanleft.textcontent = number(spanleft.textcontent)  does not save to number type, wel console.log(number(spanleft.textcontent));



### Continued development

- Daily tutorials and projects in HTML5, CSS3, Javascript, Bootstrap, Sass/SCSS. For now, in time I will go re-learn React ect.

### Useful resources

-[Creating a collapsable with input and just css](https://stackoverflow.com/questions/61011140/how-do-i-create-a-collapsible-element-with-just-css-using-input-and-labels)

-[How to ensure an event is fired only once in JS](https://www.educative.io/answers/how-to-ensure-an-event-listener-is-only-fired-once-in-javascript)
## Author

- Website - [One of my latest codepens](https://codepen.io/cynthiab72/pen/oNybYON)
- Frontend Mentor - [@cmb347827](https://www.frontendmentor.io/profile/cmb347827)

