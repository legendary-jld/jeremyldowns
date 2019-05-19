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
