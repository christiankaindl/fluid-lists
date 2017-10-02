/* Fluid Scrolling - Custom scrolling effect
  thanks SmoothMovement.js for inspiration
  This is still in an early stage and not yet usable for production.
*/


//IDEA: calcEase() <-- Respects items speed and returns amount of travel (calculates an ease curve to its target position)?

var fluid = function () {
  this.parent = document.getElementById("myList");
  document.addEventListener("wheel", function updateAccStack(e) {
    this.accelerationStack += e.deltaY;

    if (!isRunning) {
      this.isRunning = true;
      this.move();
    }
  }.bind(this));

  this.DOMItems = this.parent.getElementsByTagName("li");
  this.items = [];
  this.accelerationStack = 0;
  this.velocity = 0;
  this.activeItems = 0;
  this.isRunning = false;

  this.move = function () {
    function runner() {
      
    }
  }

  this.bored = function () {
    this.activeItems--;

    if (this.activeItems == 0) {
      this.isRunning = false;
    }
  }

  for (let i=0; i<list.length; i++) {
    //this.items[i].DOMItem = this.DOMItems[i];
    //testMovements[i].position = list[i].offsetTop;
    //testMovements[i].target = list[i].offsetTop;
    //testMovements[i].newPosition = function () {

    //}
  }
}





var listParent = document.getElementById("myList");
var list = listParent.getElementsByTagName('li');
var velocity = 0; //Should be used?
var testMovements = [];
var isRunning = false;

var idleElems = list.length;

// NOTE: Make scroller Object that includes testMovements[] and list and listParent, general velocity, ...

for (let i=0; i<list.length; i++) {
  testMovements[i] = new SmoothMovement();
  testMovements[i].element = list[i];
  testMovements[i].position = list[i].offsetTop;
  testMovements[i].target = list[i].offsetTop;
  testMovements[i].first = true;
  testMovements[i].idleElems = [];
  testMovements[i].bored = function () {
    console.log("THIS: ", this);
    idleElems++;

    if (idleElems >= list.length) {
      isRunning = false;
    }
  }
  testMovements[i].newPosition = function () {

  }
}

function myFunc(e) {

if (!isRunning) {
  var completeStatus = 0;
  move();
}





  function betterRunner() {

    if (isRunning === false) {
      console.log("Returned at isRunning");
      return;
    }
    /*for (let i=0; i<list.length; i++) {
      let currentElement = testMovements[i];

      if (currentElement.position == currentElement.target && currentElement.velocity == 0) {
        completeStatus++;
        console.log(completeStatus);
        if (completeStatus == 10) {
          isRunning = false;
          return;
        }
      }
      currentElement.target += (2 * e.deltaY);

      currentElement.position = currentElement.update();

    //  if (!currentElement.isRunning) runner(currentElement, 100);

  }*/

    for (let i=0; i<list.length; i++) {
      var pos = currentElement.newPosition();

      if (currentElement.position == currentElement.target && currentElement.velocity == 0) {
        currentElement.bored();
      }
      let currentElement = testMovements[i];
      currentElement.element.style.transform = `translateY(${currentElement.newPosition()}px)`;

    }

    requestAnimationFrame(betterRunner);




  }

  async function move() {

    betterRunner();

/*
    for (let i=0; i<list.length; i++) {
      let currentElement = testMovements[i];
      currentElement.target += (2 * e.deltaY);

      if (!currentElement.isRunning) runner(currentElement, 100);

    }

    async function runner (elem, temporary) {
      console.log(elem.first);
      //if(elem.first) {
        await resolveAfterDelay(temporary);
        //elem.first = false;
      //}
      elem.isRunning = true;
      if (elem.position == elem.target && elem.velocity == 0) {
        console.log("Returned because stopped");
        elem.isRunning = false;
        elem.first = true;
        return;
      }

      requestAnimationFrame(() => {runner(elem);});
      elem.position = elem.update();
      render(elem);
    }

    function render (elem) {
      elem.element.style.transform = `translateY(${elem.position}px)`;
    }

    function resolveAfterDelay(delay) {
      return new Promise((resolve) => {
        setTimeout(() => {resolve(delay)}, delay);
      });
    }

    function applyDelta(elem, index) {

  */

  }
}

/*

SmoothMovement.js

Facilitates smooth movement effects

Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/* Creates a SmoothMovement. A SmoothMovement produces integer position values
 * representing movement towards a target position, with a maximum acceleration
 * or deceleration of one distance unit per time unit squared. The parameters
 * are:
 *
 * position - the initial position - this optional parameter defaults to zero
 * target   - the target position - this optional parameter defaults to the
 *            value of the position parameter
 */
function SmoothMovement(position, target){

  // initialise the position, target, velocity, and animation interval
  this.position          = (position == undefined ? 0             : position);
  this.target            = (target   == undefined ? this.position : target);
  this.velocity          = 0;
  this.animationInterval = null;

}

/* Updates the position an velocity for this SmoothMovement, and returns the
 * new position.
 */
SmoothMovement.prototype.update = function(){

  // check whether the velocity is negative
  if (this.velocity < 0){

    // check whether we must decelerate or can accelerate
    if (this.target > this.position - this.velocity * (this.velocity - 1) / 2){

      // we must decelerate to avoid overshooting, so decrease the speed
      this.velocity ++;

    }else if (this.target <=
        this.position - (this.velocity - 1) * (this.velocity - 2) / 2){

      // we can accelerate without overshooting, so increase the speed
      this.velocity --;

    }

  }else{

    // check whether we must decelerate or can accelerate
    if (this.target < this.position + this.velocity * (this.velocity + 1) / 2){

      // we must decelerate to avoid overshooting, so decrease the speed
      this.velocity--;

    }else if (this.target >=
        this.position + (this.velocity + 1) * (this.velocity + 2) / 2){

      // we can accelerate without overshooting, so increase the speed
      this.velocity++;

    }

  }

  // update the position
  this.position += this.velocity;

  // return the new position
  return this.position;

}

/* Returns true if this SmoothMovement has stopped, and false otherwise. Note
 * that this means that both the velocity and acceleration are zero (or
 * equivalently, that the velocity is zero and the position is at the target).
 */
SmoothMovement.prototype.hasStopped = function(){

  // return whether we have stopped
  return (this.position == this.target && this.velocity == 0);

}

/* Animates this SmoothMovement by calling the update function repeatedly until
 * the SmoothMovement has stopped. The parameters are:
 *
 * interval       - the interval between updates, in milliseconds
 * updateListener - a function to call after each update. This function is
 *                  passed the new position and the SmoothMovement as its
 *                  first and second parameters.
 * stopListener   - a function to call when the SmoothMovement has stopped. This
 *                  function is passed the SmoothMovement as its parameter. This
 *                  parameter is optional.
 */
SmoothMovement.prototype.animate = function(
    interval, updateListener, stopListener){

    if (this.isRunning) {
      return;
    }

  // clear any current animation interval
  this.running=true;


  // create the new animation interval
  requestAnimationFrame(updateListener);


}

/* Creates a closure for use in the animate function. This function is not
 * intended to be used elsewhere. The parameters are:
 *
 * updateListener - a function to call after each update
 * stopListener   - a function to call when the SmoothMovement has stopped
 */
SmoothMovement.prototype.createAnimationClosure = function(
    updateListener, stopListener){

  // store a reference to the 'this' object
  var thisObject = this;

  // return the animation closure
  return function(){

    // update the SmoothMovement
    thisObject.update();

    // call the update listener
    updateListener(thisObject.position, thisObject);

    // check whether the SmoothMovement has stopped
    if (thisObject.hasStopped()){

      // clear the animation interval
      //window.clearInterval(thisObject.animationInterval);
      thisObject.animationInterval = null;

      // call the stop listener if one was supplied
      if (stopListener) stopListener(thisObject);

    }

    requestAnimationFrame(updateListener);

  }

}



/*var velocity = 0;
var mass = 1;
var friction = 1;
var acceleration = 0;

var scrollTop = 0;

var listParent = document.getElementById("myList");
var list = listParent.getElementsByTagName("li");

console.log(listParent);
console.log(list);


listParent.addEventListener("scroll", handleScroll);

function handleScroll(e) {
  console.log(listParent.scrollTop);



  acceleration = (listParent.scrollTop - scrollTop);
  console.log("acceleration: ", acceleration);
  velocity += acceleration/4 - friction;
  console.log("velocity: ", velocity);

  physics();
  scrollTop = listParent.scrollTop;
}

function physics() {
  function animate() {
    var length = list.length;
    for (let i=0; i < length; i++) {
      console.log(list[i]);

      list[i].style.transform = `translateY(${velocity - friction}px)`;
    }



    //setTimeout(() => {requestAnimationFrame(animate)}, 200);
  }

  requestAnimationFrame(animate);
}*/
