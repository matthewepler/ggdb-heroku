class timeline {

  constructor(element, id, name) {  
    console.log(id);
    //console.log(element, id, name); 

    const width = 570;
    const height = 80;
    const xPadding = 35;
    const yPadding = 15;

    let viz = d3.select(element).append('svg')
      .attr('id', id)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('width', width - (xPadding * 2))
      .attr('height', height - (yPadding * 2))
      .attr('id', 'viz')
      .attr('transform', `translate(${xPadding}, ${yPadding})`);

  }
};

export default timeline;


