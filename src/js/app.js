import cytoscape from "cytoscape";
import data from '../mock/data.json'
import dagre from "cytoscape-dagre";
cytoscape.use(dagre);


  var defaults = {
    name: "breadthfirst", // dagre breadthfirst
    // dagre algo options, uses default value on undefined
    fit: true, // whether to fit the viewport to the graph
    directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
    padding: 50, // padding on fit
    circle: false, // put depths in concentric circles if true, put depths top down if false
    grid: false, // whether to create an even grid into which the DAG is placed (circle:false only)
    spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    roots: undefined, // the roots of the trees
    maximal: false, // whether to shift nodes down their natural BFS depths in order to avoid upwards edges (DAGS only)
    depthSort: function (a, b) {
      return a.data("weight") - b.data("weight");
    }, // a sorting function to order nodes at equal depth. e.g. function(a, b){ return a.data('weight') - b.data('weight') }
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled,
    animateFilter: function (node, i) {
      return true;
    }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position) {
      return position;
    }, // transform a given node position. Useful for changing flow direction in discrete layouts
  };

let cy = cytoscape({
  container: document.getElementById("cy"),
  boxSelectionEnabled: false,
  autounselectify: true,

  style: [
    {
      selector: "node",
      style: {
        content: "data(id)",
        "background-color": "#ff00ff",
      },
    },

    {
      selector: "edge",
      style: {
        "curve-style": "bezier",
        "target-arrow-shape": "triangle",
        "line-color": "#dd4de2",
        "target-arrow-color": "#dd4de2",
        opacity: 0.5,
      },
    },
    {
      selector: "edge.taxi",
      style: {
        "curve-style": "taxi", // taxi、
        "taxi-direction": "downward", //vertical
        // "taxi-turn": 20,
        // "taxi-turn-min-distance": 5,
      },
    },
    {
      selector: "edge.taxi-m",
      style: {
        "line-color": "#dd4de2",
        // "taxi-turn": 20,
        // "taxi-turn-min-distance": 5,
      },
    },
  ],

  elements: data,

  layout: defaults,
});
