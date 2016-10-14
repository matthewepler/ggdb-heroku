class D3timeline {

  constructor(element, newId, timecode) {  
    console.log('constructing new chart', element, newId, timecode);

    const width = 570;
    const height = 80;
    const xPadding = 35;
    const yPadding = 15;

    let viz = d3.select(element).append('svg')
      .attr('id', newId)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('width', width - (xPadding * 2))
      .attr('height', height - (yPadding * 2))
      .attr('id', 'viz')
      .attr('transform', `translate(${xPadding}, ${yPadding})`);
  
    
    // year, month, day, hour, min, sec, ms
    const xMin = new Date(0, 0, 0, 0, 0, 0, 0);
    let xMax = null; 
    let refTime = null; 

    let timeString = '';
    const timeSplit = timecode.split(":");
    if (timeSplit.length === 2) { // under an hour
      xMax = new Date(0, 0, 0, 0, 45, 0, 0);
      refTime = new Date(0, 0, 0, 0, timeSplit[0], timeSplit[1], 0);
    } else if (timesplit.length === 3) { // over an hour
      xMax = new Date(0, 0, 0, 1, 15, 0, 0); // 90 minutes (season 8)
      refTime = new Date(0, 0, 0, 1, timeSplit[0], timeSplit[1], 0);
    }

    const xScale = d3.scaleTime().domain([xMin, xMax]).range([xPadding, width - xPadding]);
    console.log(xScale(new Date(0, 0, 0, 0, 0, 0, 0)), xScale(new Date(0, 0, 0, 0, 22, 30, 0)));
  }
};

export default D3timeline;


