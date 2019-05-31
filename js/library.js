/* https://medium.freecodecamp.org/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862 */
/* https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript */
/* 600px, 900px, 1200px, 1800px */

class Breakpoints {
  constructor() {
    this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    if (this.width < 600) {
      this.state = "xs"; // phone/mobile
    }
    else if (this.width < 900) {
      this.state = "sm"; // tablet portrait
    }
    else if (this.width < 1200) {
      this.state = "md"; // tablet landscape
    }
    else if (this.width < 1800) {
      this.state = "lg"; // desktop
    }
    else {
      this.state = "xl"; // desktop big
    }
  }
}

class DOMTable {

  constructor(data, settings) {
    this.ref = "";
    this.data = {};
    this.settings = {
      "pagination": 50,
      "columns": []
    };
  }

  data(data) {
    this.data = data;
    return this;
  }

  settings(settings) {
    this.settings =  settings;
    return this;
  }

  insert(element) {
    alert(this.name);
  }

  build() {
    var e = this.createElement;
    this.settings["columns"].foreach(build_thead);
    var columns = this.settings["columns"];
    for (var key in columns) {
      columns[key]
    }
  }


  thead(item, index) {
    var e = this.createElement;
    e("thead")
    e("th")
  }

  tbody() {

  }
}

class NonAsyncQueue {
  constructor() {
    this.callbacks = [];
    this.state = "waiting";
  }

  add(callback, key) {
    if (key == undefined) {key = "default";}
    this.callbacks.push({"cb": callback, "key": key});
  }
  ready(callback) { // callbacks to run at document ready
    this.play("ready")
  }
  interrupt(callback, key){ // new callback to be ran NEXT instead of added at end of queue
    this.stop();
    if (key == undefined) {key = "default";}
    this.callbacks.splice(1, 0, {"cb": callback, "key": key});
  }
  stop() {
    this.state = "stop";
  }
  play(key) { // run through calls [recursive to allow queue to change]
    this.state = "play";
    var removeByIndex = [];0
    for (var i in this.callbacks) {
      if (key && key == this.callbacks[i]['key'] == key) {
        this.callbacks[i]['cb']();
        removeByIndex.push(i);
      }
      else {
        if (this.callbacks[i]['key'] == "default") {
          this.callbacks[i]['cb']();
          removeByIndex.push(i);
        }
      }
      if (this.state == "stop") {
        break;
      }
    }
    if (removeByIndex.length > 0) {
      for (var i = removeByIndex.length -1; i >= 0; i--) { // work in reverse order
        this.callbacks.splice(removeByIndex[i],1);
      }
    }
  }
}


function $ready(callback){
    if (queue === true) {
      window.ready_queue["callbacks"].push(callback);
    }
    else {
      if (document.readyState!='loading') {callback();} // document is ready now
      else if (document.addEventListener) {document.addEventListener('DOMContentLoaded', callback);}
      else {document.attachEvent('onreadystatechange', function(){
          if (document.readyState=='complete') callback();
      });}
    }
}

function $queue(callback, key) {
  window.queue.add();
}


function $(ref) {
  return new ele(ref);
}

function $cleanProp(str) {
  var str = str.replace(/\s\s+/g, ' ');
  if (str.substring(0,1) == " ") {
    str = str.substring(1,str.length); // trim start space
  }
  if (str.substring(str.length-1, str.length) == " ") {
    str = str.substring(0,str.length-1); // trim end space
  }
  return str;
}

class ele {
  // jQuery like element finder and builder
  constructor(ref) {
    this.ref = ref;
    if (ref.substring(0,1) == "#") {
      this.element = document.getElementById(ref);
    }
    else if (ref.substring(0,1) == "."){
      this.element = document.getElementsByClassName(ref);
    }
    else if (ref.substring(0,1) == "<" && ref.substring(ref.length-1,ref.length) == ">"){
      this.element = document.createElement(ref.substring(1,ref.length-1));
    }
    this.classList();
  }

  append(element) {
    this.element.insertChild(element);
  }
  appendTo(element) {
    element.insertChild(this.element);
  }
  id(id) {
    if (id) {
      this.element.id=id;
    }
    return this.element.id;
  }
  addClass(className) {
    var className = $cleanProp(className);
    if (className.indexOf(" ") > -1) { /* Multiple classes should be added individually */
      className.split(" ").foreach(this.addClass);
    }
    if (this.element.className.length == 0) {
      this.element.className = className;
    }
    else {
      var pre = " " + this.element.className + " ";
      if (pre.indexOf(" " + className + " ") == -1) {
        this.element.className = $cleanProp(pre + " " + className);
      }
    }
    this.classList();
  }
  removeClass(className) {
    var className = $cleanProp(className);
    var pre = " " + this.element.className + " ";
    if (pre.indexOf(" " + className + " ") > -1) {
      this.element.className = $cleanProp(pre.replace(" " + className + " ", ""));
    }
    this.classList();
  }
  swapClass(oldClass, newClass) {
    var oldClass = $cleanProp(oldClass);
    var newClass = $cleanProp(newClass);
    var pre = " " + this.element.className + " ";
    if (pre.indexOf(" " + oldClass + " ") > -1) {
      this.element.className = $cleanProp(pre.replace(" " + className + " ", ""));
    }
    else {
      this.addClass(newClass);
    }
    this.classList();
  }
  classList() {
    var classes = this.element.className.split(" ");
    if (classes.length == 1) {
      this.classes = classes[0];
    }
    else {
      this.classes = classes;
    }
    return this.classes[0];
  }

}



window.queue = new NonAsyncQueue();
document.addEventListener('DOMContentLoaded', window.queue.ready());
