// requires ele.js

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
