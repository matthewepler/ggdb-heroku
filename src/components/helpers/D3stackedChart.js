import _ from 'underscore'


class d3stackedChart {

    constructor(element, newId, data, subject, res) {
        //console.log(element, newId, data, subject);

        // VIZ DIMENSIONS + MOUNTING
        let width = null;

        if (res > 1) {
          width = 850;
        } else {
          width = 590;
        }
        const height = 100;
        const xPadding = 10;
        const yPadding = 35;

        let viz = d3.select(element).append('svg')
          .attr('id', newId)
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('width', width - (xPadding * 2))
          .attr('height', height - (yPadding * 2))
          .attr('id', 'viz')
          .attr('transform', `translate(${xPadding}, ${yPadding})`);
      
       
       // PREP DATA
       const totalRefs = data.length;
       const categories = _.groupBy(data, 'refCategory');
       let catList = [];
       for (let key in categories) {
            catList.push({
                cat: key,
                size: categories[key].length
            });
       }
       catList = _.sortBy(catList, "size").reverse()

       let bar = viz.selectAll('g')
                    .data(catList)
                    .enter()
                    .append('g');

        let totalX = 0;
        const chartWidth = width - (xPadding * 2);
        const colorScale = d3.scaleLinear()
                            .domain([catList[catList.length -1].size,catList[0].size])
                            .range([0.2, 1]);

        bar.append('rect')
            .attr('class', 'chunk')
            .attr('height', '20')
            .attr('width', function(d) {
                return (chartWidth * d.size) / totalRefs;
            })
            .attr('x', function(d) {
                const thisX = totalX;
                totalX += (chartWidth * d.size) / totalRefs;
                return thisX;
            })
            .style('stroke', 'white')
            .style('fill', 'white')
            .style('opacity', function(d) {
                return colorScale(d.size);
            });

        totalX=0;
        bar.append('text')
          .attr('class', 'textDiv')
          .text(function(d) {
            return d.cat + ' (' + ((d.size/totalRefs)*100) + '%)';
          })
          .attr('transform', function(d) {
            const thisX = totalX;
            totalX += (chartWidth * d.size) / totalRefs;
            const chunkWidth = (chartWidth * d.size) / totalRefs;
            return `translate(${thisX + chunkWidth/2},-10)`;
          })
          .style('display', function(d) {
            return d.cat === subject ? 'block' : 'none'
          })
          .style('text-anchor', function(d) {
            if (d.size <= 1) {
                return 'end'
            } else {
                return 'middle'
            }
          })
          .style('color', 'darkslategrey')
          .style('fill', 'darkslategrey');

        totalX=0
        bar.append('line')
          .attr('class', 'border')
          .attr('x1', '0')
          .attr('y1', '0')
          .attr('x2', '0')
          .attr('y2', '20')
          .style('stroke', 'white')
          .style('stroke-width', '1')
          .attr('transform', function(d) {
            const thisX = totalX;
            totalX += (chartWidth * d.size) / totalRefs;
            const chunkWidth = (chartWidth * d.size) / totalRefs;
            return `translate(${thisX + chunkWidth}, 0)`;
          })

        totalX=0
        bar.append('line')
          .attr('class', 'underline')
          .attr('x1', '0')
          .attr('y1', '20')
          .attr('x2', function(d) {
            return (chartWidth * d.size) / totalRefs;
          })
          .attr('y2', '20')
          .attr('transform', function(d) {
            const thisX = totalX;
            totalX += (chartWidth * d.size) / totalRefs;
            return `translate(${thisX}, 0)`;
          })
          .style('display', 'none')
          .style('stroke', 'darkslategrey')
          .style('stroke-width', '1');



        bar.on("mouseenter", function(d, i) {
            let chunk = d3.select(this);
            chunk.select('text')
                 .style('display', 'block');
            chunk.select('line.underline')
                .style('display', 'block');

        });

        bar.on("mouseleave", function(d, i) {
            let chunk = d3.select(this); 
            chunk.select('text')
               .style('display', function(d) {
                return d.cat === subject ? 'block' : 'none'
               });
            chunk.select('line.underline')
                .style('display', 'none');
        });
    }
}

export default d3stackedChart;

// add line
// display subject by default