const d3 = require('d3');

export default function () {
  let datum;
  const xs = d3.scaleLinear()
    .domain([0, 10])
    .range([0, 300]);
  const ys = d3.scaleLinear()
    .domain([0, 10])
    .range([300, 0]);
  const xa = d3.axisBottom(xs);
  const ya = d3.axisLeft(ys);

  let g;

  function me(selection) {
    datum = selection.datum();
    // eslint-disable-next-line no-console
    console.log('kmviz', datum);

    if (!g) {
      g = selection.append('g')
        .attr('transform', 'translate(20,20)');
      g.append('g')
        .classed('points', true);
      g.append('g')
        .classed('x-axis', true)
        .attr('transform', 'translate(0,300)')
        .call(xa);
      g.append('g')
        .classed('y-axis', true)
        .attr('transform', 'translate(0,0)')
        .call(ya);
    }

    g.selectAll('circle')
      .data(selection.datum().dataset)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', d => xs(d[0]))
      .attr('cy', d => ys(d[1]));
  }

  return me;
}
