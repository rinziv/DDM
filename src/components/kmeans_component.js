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
  const colors = d3.scaleOrdinal(d3.schemeCategory10);

  let idxIteration = -1;

  let g;

  function me(selection) {
    datum = selection.datum();
    // eslint-disable-next-line no-console
    console.log('kmviz', datum);
    idxIteration = 0;

    if (!g) {
      g = selection.append('g')
        .attr('transform', 'translate(30,30)');
      g.append('g')
        .classed('x-axis', true)
        .attr('transform', 'translate(0,300)')
        .call(xa);
      g.append('g')
        .classed('y-axis', true)
        .attr('transform', 'translate(0,0)')
        .call(ya);
      g.append('g')
        .classed('points', true);
      g.append('g')
        .classed('centroids', true);
    }

    const circles = g.select('.points')
      .selectAll('circle')
      .data(selection.datum().dataset);

    circles.exit().remove();
    circles.enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', d => xs(d[0]))
      .attr('cy', d => ys(d[1]));
  }

  // eslint-disable-next-line
  me.setIteration = function (_) {
    // eslint-disable-next-line
    if (!arguments.length) return idxIteration;
    idxIteration = _;
    if (idxIteration >= 0) {
      // draw points
      g.select('.points')
        .selectAll('circle')
        .data(datum.iterations[idxIteration].labels)
        .attr('fill', d => colors(d))
        .attr('opacity', 0.4);

      // draw voronois
      // https://bl.ocks.org/mbostock/3846051

      // draw centroids
      const centroids = g.select('.centroids')
        .selectAll('circle')
        .data(datum.iterations[idxIteration].centers);
      centroids.exit().remove();
      centroids.enter()
        .append('circle')
        .classed('centroid', true)
        .attr('r', 7)
        .attr('cx', d => xs(d[0]))
        .attr('cy', d => ys(d[1]))
        .attr('fill', (d, i) => colors(i));
    }
  };

  return me;
}
