ACTIONS_PER_TURN = 3;
NUMBER_OF_PLAYERS = 2;

nodes = null;
edges = null;
players = null;

map_initialization = {
    "nodes" : {
        "node_id" : {
            // x,y in game units
            "location" : [0,0],
            "abilities": null,
        }, 
    },
    "edges" : {
        "edge_id" : {
            // "from": node1,
            // "to": node2,
            "abilities": ["attack_advantage"]
        }
    }
};

function Node(location, abilities){
   this.location = location,
   this.abilities = abilities;
}

function Edge(from, to, abilities){
   this.from = from;
   this.to = to;
   this.abilities = abilities;
}

var player_id_ctr = 0;
function Player(){
   var colors = ['red', 'green'];
   this.id = ++player_id_ctr;
   this.money = 0;
   this.victory_points = 0;
   this.color = colors[this.id - 1];
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
    "players" : {
        "player1" : {
            "money" : 3,
            "victory_points" : 5,
        },
        "player2" : {
            "money" : 3,
            "victory_points" : 5,
        },
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

function init() {
    // Add players
    p1 = new Player();
    p2 = new Player();
    game_state.players = [p1, p2];

    // Create map
    
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
