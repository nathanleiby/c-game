var abilities = {
  corn : {
    fill: 'yellow'
  },
  light : {
    fill: 'green'
  },
  heavy : {
    fill: 'red'
  },
  cavalry : {
    fill: 'orange'
  },
  crystal : {
    fill: 'blue'
  },
};
var nodes = {
node1 : {
// x,y in game units
position: {x: 100, y: 100},
fill: 'red',
abilities: [abilities.corn],
},
node2 : {
// x,y in game units
position: {x: 300, y: 100 },
fill: 'green',
abilities: [abilities.heavy, abilities.cavalry],
},
node3 : {
  position: { x: 200, y: 300 },
  fill: 'yellow',
  abilities: [abilities.crystal, abilities.crystal, abilities.light],
},
};
var edges = {
edge1 : {
from: nodes.node1,
to: nodes.node2,
abilities: []
},
edge2 : {
  from: nodes.node2,
  to: nodes.node3,
  abilities: []
}
};
var stage = new Kinetic.Stage({
  container: 'container',
  width: 800,
  height: 600
});

var mapLayer = new Kinetic.Layer();

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
    return node.position;
  }));
}

function drawNode(node) {
  mapLayer.add(makeCircle(node.position.x, node.position.y, 20, node.fill));
  var offset = 0;
  for (var i = 0; i < node.abilities.length; i++) {
    var ability = node.abilities[i];
    var square = new Kinetic.Rect({
x: node.position.x + 10,
y: node.position.y - 20 + offset,
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
     // add the shape to the mapLayer
     // add the shape to the mapLayer
for (var edgeId in edges) {
  var edge = edges[edgeId];
  mapLayer.add(lineThroughNodes(edge.from, edge.to));
}
for (var nodeId in nodes) {
  var node = nodes[nodeId];
  drawNode(node);
}

// add the mapLayer to the stage
stage.add(mapLayer);

var uiLayer = new Kinetic.Layer();
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

drawPlayerStats({ id: 1, money: 3, victory_points: 2, color: 'orange' }); 
drawPlayerStats({ id: 2, money: 0, victory_points: 12, color: 'cyan' }); 

stage.add(uiLayer);
