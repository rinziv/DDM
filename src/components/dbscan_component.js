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
  const labels = ['unvisited', 'core', 'border', 'noise'];
  const colors = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(labels);


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
    // const boundaries = selection.node().parentNode.getBoundingClientRect();
    // // eslint-disable-next-line no-console
    // console.log('dimensions', boundaries);

    datum = selection.datum();
    // eslint-disable-next-line no-console
    console.log('dbsviz', datum);
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
        .classed('x-axis', true)
        .attr('transform', `translate(0, ${w})`)
        .call(customXAxis);
      g.append('g')
        .classed('y-axis', true)
        .attr('transform', 'translate(0,0)')
        .call(customYAxis);
      const neighbs = g.append('g')
        .classed('neighborhood', true)
        .attr('transform', `translate(${xs(9)},${ys(9)})`);
      neighbs
        .append('circle')
        .attr('r', xs(1.8))
        .attr('fill', 'none')
        .attr('stroke', 'darkgray')
        .attr('stroke-dasharray', '4');
      neighbs
        .append('line')
        .attr('x2', xs(1.8))
        .attr('stroke', 'darkgray')
        .attr('stroke-weight', 1)
        .attr('stroke-dasharray', '4');
      g.append('g')
        .classed('points', true);
      g.append('g')
        .classed('legend', true)
        .attr('transform', `translate(${w + (2 * margin)},0)`);
    }

    let circles = g.select('.points')
      .selectAll('circle')
      .data(datum.data);

    circles.exit().remove();
    circles = circles.enter()
      .append('circle')
      .merge(circles)
      .attr('r', r)
      .attr('cx', d => xs(d[0]))
      .attr('cy', d => ys(d[1]))
      .on('mouseover', (d) => {
        g.select('.neighborhood')
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr('transform', `translate(${xs(d[0])},${ys(d[1])})`)
        ;
      });
    g.select('.points').on('mouseout', () => {
      g.select('.neighborhood')
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr('transform', `translate(${xs(9)},${ys(9)})`)
      ;
    });
    // todo: add labels with point id
  }

  // eslint-disable-next-line
  me.setIteration = function(_) {
    // eslint-disable-next-line
    if (!arguments.length) return idxIteration;
    idxIteration = _;
    if (idxIteration >= 0) {
      // update label of each point in the datum
      const plabels = datum.data.map(() => labels[0]);

      d3.range(idxIteration).forEach((d) => {
        const key = labels[d + 1];
        datum.iterations[d][key].forEach((p) => { plabels[p] = key; });
      });

      datum.data = datum.data.map((p, i) => ([
        p[0], p[1], plabels[i],
      ]));

      // draw points
      g.select('.points')
        .selectAll('circle')
        .data(datum.data)
        .attr('fill', d => colors(d[2]))
        .attr('opacity', 0.4);

      const entries = g.select('.legend')
        .selectAll('g.entries')
        .data(labels.slice(0, idxIteration + 1));

      entries.exit().remove();
      const gs = entries.enter()
        .append('g')
        .classed('entries', true)
        .attr('transform', (d, i) => `translate(0, ${i * 2 * (r + 1)})`)
        ;
      gs
        .append('text')
        .attr('x', 2 * (r + 1))
        .attr('dy', r / 2)
        .text(d => d);

      gs
        .append('circle')
        .attr('r', r)
        .attr('x', r / 2)
        .attr('y', r / 2)
        .attr('fill', d => colors(d))
        .attr('opacity', 0.4)
      ;

      // draw voronois
      // https://bl.ocks.org/mbostock/3846051
    }
  };

  return me;
}
