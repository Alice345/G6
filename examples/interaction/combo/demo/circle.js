import G6 from '@antv/g6';


const data = {
  nodes: [
    { id: 'node1', x: 350, y: 200, comboId: 'combo1' },
    { id: 'node2', x: 350, y: 250, comboId: 'combo1' },
    { id: 'node3', x: 100, y: 200, comboId: 'combo3' }
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'combo1', target: 'node3' }
  ],
  combos: [
    { id: 'combo1', label: 'Combo 1', parentId: 'combo2' },
    { id: 'combo2', label: 'Combo 2' },
    { id: 'combo3', label: 'Combo 3', collapsed: true },
  ]
};

const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Double click the combo to collapse/expand it. Drag the node or combo to change the hierarchy.';
const graphDiv = document.getElementById('container');
graphDiv.appendChild(descriptionDiv);

const width = document.getElementById('container').scrollWidth;
const height = (document.getElementById('container').scrollHeight || 500) - 20;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
  groupByTypes: false,
  defaultCombo: {
    type: 'circle',
    style: {
      lineWidth: 1,
    },
    labelCfg: {
      refY: 15,
      position: 'bottom',
    }
  },
  modes: {
    default: ['drag-canvas', 'drag-node', 'drag-combo', 'collapse-expand-combo'],
  },
  comboStateStyles: {
    // 鼠标 hover 状态下 combo 样式
    hover: {
      lineWidth: 3
    },
  },
  nodeStateStyles: {
    // 鼠标 hover 状态下节点样式
    hover: {
      lineWidth: 3
    },
  },
});

graph.data(data);
graph.render();

graph.on('combo:mouseenter', evt => {
  const { item } = evt;
  graph.setItemState(item, 'hover', true);
});

graph.on('combo:mouseleave', evt => {
  const { item } = evt;
  graph.setItemState(item, 'hover', false);
});
