import cytoscape from "cytoscape";
import data from "../mock/data.json";
import dagre from "cytoscape-dagre";
import $ from "jquery";
import male from '../assets/male.png';
import female from '../assets/female.png';
cytoscape.use(dagre);

const styles = [
  {
    selector: "node",
    style: {
      label: "data(name)",
      "text-wrap": "wrap",
      "text-valign": "center",
      "background-color": "white",
      "background-opacity": 0.5,
      height: 82,
      width: 142,
      shape: "roundrectangle", //cutrectangle roundrectangle
    },
  },
  {
    selector: ":selected",
    style: {
      label: "data(name)",
      "text-valign": "center",
      color: "#ffffff",
      // "text-outline-color": "#242048",
      // "text-outline-width": 1,
      "background-color": "#242048",
    },
  },

  {
    selector: "edge",
    style: {
      "curve-style": "taxi",
      "taxi-direction": "vertical", //['horizontal', 'leftward', 'rightward', 'vertical', 'upward', 'downward', 'auto']
      "taxi-turn": "30",
      width: 2,
      // "target-arrow-shape": "triangle",
      "line-color": "#a9a8ba",
      "target-arrow-color": "#CECECE",
    },
  },
  {
    selector: "edge.taxi-female",
    style: {
      "line-color": "#743635",
      // "taxi-direction": "vertical",
      // "line-style": "dashed",
      width: 1,
      "line-opacity": 0.4,
    },
  },
];

let layout = {
  name: "dagre", // breadthfirst
  // dagre algo options, uses default value on undefined
  // nodeSep: 50, // the separation between adjacent nodes in the same rank
  // edgeSep: 100, // the separation between adjacent edges in the same rank
  // rankSep: 50, // the separation between each rank in the layout
  rankDir: "TB", // 'TB' for top to bottom flow, 'LR' for left to right,
  // avoidOverlap: false,
  // align: undefined, // alignment for rank nodes. Can be 'UL', 'UR', 'DL', or 'DR', where U = up, D = down, L = left, and R = right
  // acyclicer: "greedy", // If set to 'greedy', uses a greedy heuristic for finding a feedback arc set for a graph.
  // // A feedback arc set is a set of edges that can be removed to make a graph acyclic.
  ranker: "tight-tree", // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
  // // general layout options
  fit: true, // whether to fit to viewport
  padding: 50,
  stop: function ({ cy }) {
    cy.zoom(0.8);
    cy.center();
    let node = cy.$(":selected");
    if(node){
      let data = node.data();
      handleSelected(data);
    }else {
      console.log("no select user!");
    }
  },
};

const _$editor = $("#profile-editor");
const _$profile = $("#profile");
const $avatar = _$profile.find("#avatar");
const $name = _$profile.find(".name");
const $lifespa = _$profile.find(".lifespa");
const $gender = _$editor.find("input:radio[name='gender']");
const $fname = _$editor.find("#fname");
const $birthdate = _$editor.find("#birthdate");
const $birthAddress = _$editor.find("#birthAddress");
const $livingAddress = _$editor.find("#livingAddress");
const $userId = $("#user-id");

let cy = cytoscape({
  container: document.getElementById("cy"),
  boxSelectionEnabled: false,
  autounselectify: false,
  style: styles,
  elements: data,
  selectionType: 'single',
  layout,
});


cy.on('tap', 'node', function(evt){
    const node = evt.target;
    handleSelected(node.data());
});

/**
 * const userInfo = {
 *  id: "1712139752",
 *  name: "jerry",
 *  birthDate: null,
 *  deathDate: null,
 *  // families: [],
 *  gender: "男",
 *  isLiving: true,
 *  portraitUrl: null,
 * };
*/

$userId.text('您好, 9527');
function handleSelected(data) {
  setUserInfo(data);
  
}
function setUserInfo(data) {
  let { name, gender, birthDate, isLiving, deathDate, birthAddress, livingAddress, families, portraitUrl } = data;
  $fname.val(name);
  $name.text(name);
  $lifespa.text(isLiving ? "在世": "过世");
  let _g = ["男", "女"].includes(gender) ? gender : "未知";
  $gender.filter(`[value=${_g}]`).prop("checked", true);
  $birthdate.val(birthDate);
  $birthAddress.val(birthAddress);
  $livingAddress.val(livingAddress);
  let _portraitUrl = portraitUrl || (_g == "女" ? female : male);
  $avatar.attr("src", _portraitUrl);
}

// 当前状态
let stepName = '';
function addRelation() {
  stepName = 'add';
  // 1.隐藏tools
  $('.user-wrap').addClass('add-relation');
  setUserInfo({});
}
// 添加关系
$('body').on('click', '.add-relation-btn', function(){
  addRelation();
}).on('click', '#back-btn', function(){
  let node = cy.$(":selected");
    if(node){
      let data = node.data();
      $('.user-wrap').removeClass('add-relation');
      handleSelected(data);
    }else {
      console.log("no select user!");
    }
})
