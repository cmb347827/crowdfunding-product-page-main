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

- I'm also updating the amount of pledges that are left, as well as updating the button text if none are left, and I'm updating the number of days left.
- I could re-use code from my insure-landing-page-master project for the header nav section.
- couldn't use Bootstrap collapse for the pledge inner sections on input select because Bootstrap collapse only works for buttons and anchors, not input.(see link)
- I first tried to get the 'disabled background' behaviour myself , by disabling all the background buttons and adding some overlay. But, I quickly ran 
  into problems, as disabling buttons isn't Aria friendly and by using Aria attributes it became very daunting and wouldn't work.
  Someone pointed the use of Dialog out to me (see link) and that was the push in the right direction that I needed (see link)
- By the time I had finished a version of my code (in ignore-old-js folder, see Copy-2) , I realized it was not Aria friendly,as I simply disabled the background buttons using `btn.disabled=true`  instead of  `btn.setAttribute('aria-disabled','true')`. 
- I had a lot of trouble getting the grayed out/disabled background look when the 'Back our project' modal popped up. First I tried using `filter:grayscale;`(by adding/removing css classes in JS), but that did not work as expected. I did manage to get something working using `opacity:0.5;` so a background color would become visible on adding/removing classes (which I had added to my 'addOpacity' class in my CSS then ). And I used a class in css ('show-for-all-screens') to hide/display the 'Back our project' modal to make it appear 'popped up'. 
- When I first discoverd the dialog element I immediately tried to change from using my 'addOpacity' CSS class to using the CSS ::backdrop property, but it wasn't needed as the default gray color worked.
- When it came to coding the 'bookmark' button, I could make a toggle work with Bootstrap 5 toggle, but the image and text would appear on two lines for 'bookmarked', and I didn't see a way to change it (see link)
- I also discovered the use of `{once : true}` which I needed to add to the handleSuccess function or it would be called twice with the double 'click' event (see link)
- For the updateDays function I could use an addDays function from a Stackoverflow post and add it to my code (see link)
- I also , somehow, only now noticed that `element.textcontent = Number(element.textcontent)`  does not save to number type, had to save to another variable instead `const raised= Number((data.raised).textContent);` and then convert back using toLocaleString.
- Thanks to freecodecamp help, solved an issue I had with the progress bar (see link)



### Continued development

- Daily tutorials and projects in HTML5, CSS3, Javascript, Bootstrap, Sass/SCSS. For now, in time I will go re-learn React ect.

### Useful resources

[Creating a collapsable with input and just css](https://stackoverflow.com/questions/61011140/how-do-i-create-a-collapsible-element-with-just-css-using-input-and-labels)

[How to ensure an event is fired only once in JS](https://www.educative.io/answers/how-to-ensure-an-event-listener-is-only-fired-once-in-javascript)

[freecodecame forum post help](https://forum.freecodecamp.org/t/disabling-a-button-or-input-type-checkbox-using-aria-disabled/683462/10)

[Bootstrap 5 toggle](https://palcarazm.github.io/bootstrap5-toggle/#custom-text)

[addDays function](https://stackoverflow.com/questions/563406/how-to-add-days-to-date)

[freecodecamp forum post progress bar](https://forum.freecodecamp.org/t/progress-bar-not-behaving-as-expected/685406/3)


## Author

- Website - [One of my latest codepens](https://codepen.io/cynthiab72/pen/oNybYON)
- Frontend Mentor - [@cmb347827](https://www.frontendmentor.io/profile/cmb347827)

