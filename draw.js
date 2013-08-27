function GameView() {
  var stage = new Kinetic.Stage({
    container: 'container',
    width: 800,
    height: 600
  });
  
  var mapLayer = new Kinetic.Layer();
  var uiLayer = new Kinetic.Layer();
  
  function makeCircle(x, y, radius, fill) {
    return new Kinetic.Circle({
      x: x,
      y: y,
      radius: radius,
      fill: fill,
      stroke: 'black',
      strokeWidth: 4
    });
  }
  
  function lineThroughPoints(arr) {
    return new Kinetic.Line({
      points: arr,
      stroke: 'black',
      strokeWidth: 3,
      lineCap: 'round',
      lineJoin: 'round'
    });
  }
  
  function lineThroughShapes() {
    var arr = Array.prototype.slice.call(arguments, 0);
    return lineThroughPoints(arr.map(function(shape) {
      return shape.getAbsolutePosition();
    }));
  }
  function lineThroughNodes() {
    var arr = Array.prototype.slice.call(arguments, 0);
    return lineThroughPoints(arr.map(function(node) {
      return { x: node.position[0] * 40, y: node.position[1] * 40 };
    }));
  }
  
  function drawNode(node) {
    mapLayer.add(makeCircle(node.position[0] * 40, node.position[1] * 40, 20, node.fill));
    var offset = 0;
    for (var i = 0; i < node.abilities.length; i++) {
      var ability = node.abilities[i];
      var square = new Kinetic.Rect({
        x: node.position[0] * 40 + 10,
        y: node.position[1] * 40 - 20 + offset,
        width: 10,
        height: 10,
        fill: ability.fill,
        stroke: 'black',
        strokeWidth: 1
      });
      offset += 11;
      mapLayer.add(square);
    }
  }

  this.drawMap = function(map) {
    // add the shape to the mapLayer
    $.each(map.edges, function(id, edge) {
      mapLayer.add(lineThroughNodes(map.nodes[edge.from], map.nodes[edge.to]));
    });
    $.each(map.nodes, function(id, node) {
      drawNode(node);
    });
    
    // add the mapLayer to the stage
    stage.add(mapLayer);
  } 
  function drawPlayerStats(player) {
    var playerGroup = new Kinetic.Group();
    var boundingBox = new Kinetic.Rect({
      x: 0,
      y: 0,
      width: 50,
      height: 50,
      fill: player.color,
      cornerRadius: 2,
      strokeWidth: 2,
      stroke: 'black',
    });
    playerGroup.add(boundingBox);
    var moneyIcon = new Kinetic.Rect({
      x: 5,
      y: 5,
      width: 10,
      height: 10,
      fill: 'yellow',
      stroke: 'black',
      strokeWidth: 1,
    });
    playerGroup.add(moneyIcon);
    var pointsIcon = new Kinetic.Rect({
      x: 5,
      y: 20,
      width: 10,
      height: 10,
      fill: 'blue',
      stroke: 'black',
      strokeWidth: 1,
    });
    playerGroup.add(pointsIcon);
    var moneyText = new Kinetic.Text({
      x: 20,
      y: 5,
      text: player.money,
      fontSize: 10,
      fontFamily: 'Calibri',
      fill: 'black'
    });
    playerGroup.add(moneyText);
    var pointsText = new Kinetic.Text({
      x: 20,
      y: 20,
      text: player.victory_points,
      fontSize: 10,
      fontFamily: 'Calibri',
      fill: 'black'
    });
    playerGroup.add(pointsText);
  
    switch(player.id) {
      case 1:
        playerGroup.setAbsolutePosition(5, stage.getHeight() - 45);
        break;
      case 2:
        playerGroup.setAbsolutePosition(stage.getWidth() - 55, stage.getHeight() - 45);
        break;
    }
    uiLayer.add(playerGroup);
  }
  
  this.drawUI = function(players) {
    $.each(players, function(index, player) {
      drawPlayerStats(player); 
    });
    stage.add(uiLayer);
  }
}
