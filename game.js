ACTIONS_PER_TURN = 3;
NUMBER_OF_PLAYERS = 2;

// TODO: Design, possibly split out a file for different things...
//  - Game State
//  - Map State
//  - Unit Types and their properties
//  - Node/Edge types and their possible abilities

map_initialization = null;

function Node(position, abilities){
   this.position = position,
   this.abilities = abilities;
}

function Edge(from, to, abilities){
   console.log("type",from.type);
   this.from = from;
   this.to = to;
   this.abilities = abilities;
}

function Player(){
   this.money = 0;
   this.victory_points = 0;
}

Player.prototype.add_victory_points = function(quantity){
    this.victory_points += quantity;
}

Player.prototype.add_money = function(quantity){
    this.money += quantity;
}

UNIT_TYPES = ['light', 'heavy', 'cavalry']; // TODO: make subclasses
function Unit(unittype, owner) {
    this.unittype = unittype;
    this.owner = owner;
}

game_state = {
    "general" : {
        "round_number" : 0,
        "whose_turn" : 0,
        "actions_remaining" : 2,
    },
    "players" : [],
    "map" : {
        "nodes" : {},
        "edges" : {},
    },
    "map_state" : {
        "node_id" : {
            "units" : {
                //unit1
            },
            "tower" : {
                "owner" : null
            },
        }

    }

    // units : {
    //     unit_id : {
    //        type : light_infantry,
    //        owner : player1,
    //    }
    // }
};

function getRemote(remote_url) {
    return $.ajax({
        type: "GET",
        url: remote_url,
        async: false,
        dataType: "json",
    }).responseText;
};

function preload() {
    map_initialization = JSON.parse(getRemote("data/gamemap-original.json")).map;
}

function init() {
    preload();

    // Add players
    p1 = new Player();
    p2 = new Player();
    game_state.players = [p1, p2];

    // Create map
    $.each(map_initialization.nodes, function(index, value) {
      var node = new Node(value.position, value.abilities);
      game_state.map.nodes[index] = node;
      console.log(index, value);
    });
    console.log(game_state.map);

    $.each(map_initialization.edges, function(index, value) {
      var edge = new Edge(value.from, value.to, value.abilities);
      game_state.map.edges[index] = edge;
      console.log(index, value);
    });
    console.log(game_state.map);

    // Add initial units
    
    
    
    // Initialize turn state and actions
}

function update() {
    ;
}

function draw() {
    ;
}

function create_map(map_init) {
    ;
}

function do_action(action_name, options) {
    ;
}