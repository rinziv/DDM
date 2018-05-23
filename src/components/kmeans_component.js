const d3 = require('d3');

export default function () {
  let datum;
  const w = 400;
  const margin = 20;
  const r = 8;
  const xs = d3.scaleLinear()
    .domain([0, 10])
    .range([0, w]);
  const ys = d3.scaleLinear()
    .domain([0, 10])
    .range([w, 0]);
  const xa = d3.axisTop(xs).tickSize(w);
  const ya = d3.axisRight(ys).tickSize(w);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);

  const voronoi = d3.voronoi()
    .extent([[-1, -1], [w + 1, w + 1]]);

  let idxIteration = -1;

  let g;

  function customYAxis(gc) {
    gc.call(ya);
    gc.select('.domain').remove();
    gc.selectAll('.tick line')
      .attr('stroke', '#aaa')
      .attr('stroke-dasharray', '2,2');
    gc.selectAll('.tick text')
      .attr('x', -9).attr('dy', -5);
  }

  function customXAxis(gc) {
    gc.call(xa);
    gc.select('.domain').remove();
    gc.selectAll('.tick line')
      .attr('stroke', '#aaa')
      .attr('stroke-dasharray', '2,2');
    gc.selectAll('.tick text')
      .attr('y', -4).attr('dx', -7);
  }

  function me(selection) {
    const boundaries = selection.node().parentNode.getBoundingClientRect();
    // eslint-disable-next-line no-console
    console.log('dimensions', boundaries);

    datum = selection.datum();
    // eslint-disable-next-line no-console
    console.log('kmviz', datum);
    idxIteration = 0;

    if (!g) {
      selection
        .append('clipPath')
        .attr('id', 'ellipse-clip')
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', w)
        .attr('height', w);
      g = selection.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);
      g.append('g')
        .classed('polygons', true);
      g.append('g')
        .classed('x-axis', true)
        .attr('transform', `translate(0, ${w})`)
        .call(customXAxis);
      g.append('g')
        .classed('y-axis', true)
        .attr('transform', 'translate(0,0)')
        .call(customYAxis);
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
      .attr('r', r)
      .attr('cx', d => xs(d[0]))
      .attr('cy', d => ys(d[1]));
  }

  // eslint-disable-next-line
  me.setIteration = function(_) {
    const t = d3.transition()
      .duration(750)
      .ease(d3.easeLinear);

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
        .attr('r', r + 4);
      g.select('.centroids')
        .selectAll('circle')
        .transition(t)
        .attr('cx', d => xs(d[0]))
        .attr('cy', d => ys(d[1]))
        .attr('fill', (d, i) => colors(i));
      const polygons = g.select('.polygons')
        .selectAll('path')
        .data(voronoi.polygons(datum.iterations[idxIteration].centers));
      polygons
        .enter()
        .append('path')
        .attr('clip-path', 'url(#ellipse-clip)');
      g.select('.polygons')
        .selectAll('path')
        .transition(t)
        // eslint-disable-next-line
        .attr('d', d => {
          const proj = d.map(p => [xs(p[0]), ys(p[1])]);
          // eslint-disable-next-line
          return `M${proj.join('L')}Z`;
        })
        .attr('fill', (d, i) => colors(i));
    }
  };

  return me;
}
