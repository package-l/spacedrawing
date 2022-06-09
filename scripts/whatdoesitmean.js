window.onload = function() {

  let mouseEvent = false;

  var canvas = document.querySelector('#myCanvas');
  var ctx = canvas.getContext("2d");

  let start_position = {
    x: 0,
    y: 0
  };

  let position = {
    x: 0,
    y: 0
  };

  function getPosition(e){
    position.x = e.clientX - canvas.offsetLeft;
    position.y = e.clientY - canvas.offsetTop;
  }

  function mouseDown(e) {
    mouseEvent = true;
    getPosition(e);
    start_position.x = e.clientX - canvas.offsetLeft;
    start_position.y = e.clientY - canvas.offsetTop;
  }

  function mouseUp() {
    mouseEvent = false;
  }

  function mouseMove(e) {
    if (mouseEvent) {
      position.x = e.pageX - canvas.offsetLeft;
      position.y = e.pageY - canvas.offsetTop;
      line(ctx);
    }
  }

  document.getElementById("pen").addEventListener("click", function(eve) {
    toolSwitch("pen");
  }, false);

  document.getElementById("line").addEventListener("click", function(eve) {
    toolSwitch("line");
  }, false);

  document.getElementById("circle").addEventListener("click", function(eve) {
    toolSwitch("circle");
  }, false);

  document.getElementById('save').addEventListener("click", function(e) {
    this.href = canvas.toDataURL();
    this.download = "mydrawing.png";
  }, false);
  //document.body.appendChild(link);

  /*document.getElementById("saveLocal").addEventListener("click", function() {
    toolSwitch("saveLocal");
  }, false);*/

  function toolSwitch(tool) {
    document.removeEventListener('mousemove', draw);
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mousemove', circle);

    if (tool == "pen") {
      document.addEventListener('mousedown', mouseDown);
      document.addEventListener('mouseup', mouseUp);
      document.addEventListener('mousemove', draw);
    }
    if (tool == "line") {
      document.addEventListener('mousedown', mouseDown);
      document.addEventListener('mouseup', mouseUp);
      document.addEventListener('mousemove', mouseMove);
    }
    if (tool == "circle") {
      document.addEventListener('mousedown', mouseDown);
      document.addEventListener('mouseup', mouseUp);
      document.addEventListener('mousemove', circle);
    }
    if (tool == "save") {
      document.addEventListener('mousedown', mouseDown);
      document.addEventListener('mouseup', mouseUp);
      document.addEventListener('mousemove', save);
    }
    /*if (tool == "load") {
      document.addEventListener('mousedown', mouseDown);
      document.addEventListener('mouseup', mouseUp);
      document.addEventListener('mousemove', load);
    }*/
  }

  function draw(e){
    if (mouseEvent) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'white';
      ctx.moveTo(position.x, position.y);
      getPosition(e);
      ctx.lineTo(position.x , position.y);
      ctx.stroke();
    }
  }

  function line(e) {
    if (mouseEvent) {
      //ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "white";
      ctx.moveTo(start_position.x, start_position.y);
      //getPosition(e);
      ctx.lineTo(position.x, position.y);
      ctx.closePath();
      ctx.stroke();
    }
  }


  function circle(e) {
    if (mouseEvent) {
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "white";
      ctx.fillStyle = "white";
      getPosition(e);
      ctx.beginPath();
      ctx.arc(position.x, position.y, 15, 0, Math.PI*2);
      ctx.fill();
    }
  }


  function saveLocal(e) {
    var canvasData = canvas.toDataURL("image/png");
    var ajax = new XMLHttpRequest();
    ajax.open("POST", 'testSave.php', false);
    ajax.setRequestHeader('Content-Type', 'application/upload');
    ajax.send(canvasData);
  }

    /*localStorage.setItem(canvasName, canvas.toDataURL());
    var dataURL = localStorage.getItem(canvasName);
    var img = new Image;
    img.src = dataURL;
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    }
  }*/

  // this function executes when the contents of the file have been fetched
  /*reader.onload = function () {
    var data = JSON.parse(reader.result);
    var image = new Image();
    image.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0); // draw the new image to the screen
    }
    image.src = data.image; // data.image contains the data URL
  };*/





  //document.getElementById("undo").addEventListener("click", undo);

  /*document.getElementById("save").addEventListener("click", function() {
    toolSwitch("save");
  }, false);*/

  /*document.getElementById('save').addEventListener('click', function () {
    // retrieve the canvas data
    var canvasContents = canvas.toDataURL(); // a data URL of the current canvas image
    localStorage.setItem(canvasName, JSON.stringify(linesArray));
    var lines = JSON.parse(localStorage.getItem(canvasName));
    lines.forEach(function(line) {
      ctx.beginPath();
      ctx.strokeStyle = line.color;
      ctx.moveTo(line.x1)
    })
    /*var data = {
      image: canvasContents,
    };
    var string = JSON.stringify(data);
    // create a blob object representing the data as a JSON string
    var file = new Blob([string], {
      type: 'application/json'
    });
    // trigger a click event on an <a> tag to open the file explorer
    var a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });*/

  // event handler for the load button
  /*document.getElementById('load').addEventListener('change', function () {
    if (this.files[0]) {
      // read the contents of the first file in the <input type="file">
      reader.readAsText(this.files[0]);
    }
  });*/



}