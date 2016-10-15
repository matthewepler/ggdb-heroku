import _ from 'underscore';

class D3timeline {

  constructor(element, newId, subject, datum, allRefs, season) { 
  // this.fromToGraph, newId, subject, datum, this.props.allRefs , this.props.reference.season
    //console.log('constructing new chart', element, newId, subject, timecode);
    //console.log(allRefs);
    //console.log('datum', datum);
    //console.log(subject);

    // VIZ DIMENSIONS + MOUNTING
    const width = 590;
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
   let vizRefs = [];
   let xMin, xMax = null;
   
   if (datum.hasOwnProperty('timecode')) {
      for (let r in allRefs) {
        if (allRefs[r].from === subject) {
          vizRefs.push(allRefs[r]);
        }
      }

      xMin = new Date(0, 0, 0, 0, 0, 0, 0);
      if(season === "8") {
        xMax = new Date(0, 0, 0, 1, 15, 0, 0); // 90 minutes (season 8)
      } else {
        xMax = new Date(0, 0, 0, 0, 45, 0, 0);
      }
   } else if (datum.hasOwnProperty('year')) {
      vizRefs = _.sortBy(allRefs, 'refYear1');
      xMin = new Date(vizRefs[0].refYear1);
      xMax = new Date(vizRefs[vizRefs.length-1].refYear1);
   }

    
    // SCALES + AXIS
    const xScale = d3.scaleTime().domain([xMin, xMax]).range([xPadding, width - xPadding*2]);
    const xAxis = d3.axisBottom(xScale);

    if (datum.hasOwnProperty('timecode')) {
      xAxis.ticks(d3.timeMinute.every(5));
      xAxis.tickFormat(d3.timeFormat("%M"));
    } else if (datum.hasOwnProperty('year')) {
      xAxis.ticks(7);
      xAxis.tickFormat(d3.timeFormat("%Y"));
    }
    
    
    viz.append('g')
        .attr('class', 'x-axis')
        .call(xAxis).style('transform', 'translate(0px, 25px)');
    
    // DOTS + DATA BINDING
    let dots = viz.selectAll('g.dots')
                    .data(vizRefs) 
                    .enter()
                    .append('g')
                    .attr('class', 'dots');

     const self = this;
     let thisDate = null;
     if (datum.hasOwnProperty('timecode')) {
        thisDate = this.parseDate(datum.timecode);
     } else if (datum.hasOwnProperty('year')) {
        thisDate = new Date(datum.year);
     }

     dots.append('circle')
          .attr('r', 8)
          .attr('transform', function(d) {
            if (datum.hasOwnProperty('timecode')) {
              const x = self.parseDate(d.timecode);
              return `translate(${xScale(x)}, 0)`
            } else if (datum.hasOwnProperty('year')) {
              return `translate(${xScale(new Date(d.refYear1))}, 0)`
            }
          })
          .style('fill', 'white')
          .style('stroke', "white")
          .style('opacity', '0.30')
          .attr('id', function(d) {
            if (datum.hasOwnProperty('timecode')) {
              return thisDate.getTime() === self.parseDate(d.timecode).getTime() ? "focus" : ""
            } else if (datum.hasOwnProperty('year')) {
              return thisDate.getTime() === new Date(d.refYear1).getTime() ? "focus" : ""
            }
          });

      // highlight the circle that represents this reference
      // this is dumb to do it like this but it's the only way i could get it to work. see below}
      dots.append('circle')
          .attr('r', 8)
          .style('fill', 'none')
          .style('stroke', 'white')
          .attr('transform', function(d) {
            if (datum.hasOwnProperty('timecode')) {
              const x = self.parseDate(d.timecode);
              return `translate(${xScale(x)}, 0)`
            } else if (datum.hasOwnProperty('year')) {
              return `translate(${xScale(new Date(d.refYear1))}, 0)`
            }
          })
          .attr('opacity', function(d) {
            if (datum.hasOwnProperty('timecode')) {
              return thisDate.getTime() === self.parseDate(d.timecode).getTime() ? "1" : "0"
            } else if (datum.hasOwnProperty('year')) {
              return thisDate.getTime() === new Date(d.refYear1).getTime() ? "1" : "0"
            }
          });
      dots.append('line')
          .attr('x1', '0')
          .attr('y1', '7')
          .attr('x2', '0')
          .attr('y2', '25')
          .style('stroke', 'white')
          .style('stroke-width', '1')
          .attr('transform', function(d) {
            if (datum.hasOwnProperty('timecode')) {
              const x = self.parseDate(d.timecode);
              return `translate(${xScale(x)}, 0)`
            } else if (datum.hasOwnProperty('year')) {
              return `translate(${xScale(new Date(d.refYear1))}, 0)`
            }
          })
          .attr('opacity', function(d) {
            if (datum.hasOwnProperty('timecode')) {
              return thisDate.getTime() === self.parseDate(d.timecode).getTime() ? "1" : "0"
            } else if (datum.hasOwnProperty('year')) {
              return thisDate.getTime() === new Date(d.refYear1).getTime() ? "1" : "0"
            }
          });


      dots.append('text')
          .attr('class', 'textDiv')
          .text(function(d) {
             return d.refName;
          })
          .style('display', 'none')
          .style('text-anchor', function(d) {
            let x = null;
            if (datum.hasOwnProperty('timecode')) {
              x = self.parseDate(d.timecode); 
            } else if (datum.hasOwnProperty('year')) {
              x = new Date(d.refYear1);
            }
            
            if (xScale(x) < .1 * width) {
              return 'start';
            } else if (xScale(x) >= .1 * width && xScale(x) < .9 * width) {
              return 'middle';
            } else if (xScale(x) > .9 * width) {
              return 'end';
            }
          })
          .style('transform', function(d) {
              let x = null;
              if (datum.hasOwnProperty('timecode')) {
                x = self.parseDate(d.timecode); 
              } else if (datum.hasOwnProperty('year')) {
                x = new Date(d.refYear1);
              }
              return `translate(${xScale(x)}px, -20px)`
            });   

      d3.selectAll('g > text.textDiv').each(function(d) {
        const xOffset = 15;
        let padding = 10;
        var r = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        var barWidth = this.innerHTML.length * 6.75 + padding;
        r.setAttributeNS(null, 'width', barWidth);
        r.setAttributeNS(null, 'height', '25');
        r.setAttributeNS(null, 'y', '-38');
        let x = null;
        if (datum.hasOwnProperty('timecode')) {
          x = self.parseDate(d.timecode); 
        } else if (datum.hasOwnProperty('year')) {
          x = new Date(d.refYear1);
        } 
        if (xScale(x) < .1 * width) {
          r.setAttributeNS(null, 'x', xScale(x) - padding);
        } else if (xScale(x) >= .1 * width && xScale(x) < .9 * width) {
          r.setAttributeNS(null, 'x', xScale(x) - barWidth/2);
        } else if (xScale(x) > .9 * width) {
          r.setAttributeNS(null, 'x', xScale(x) - barWidth + padding);
        }
       
        this.parentNode.insertBefore(r, this);
      });


      // if (datum.hasOwnProperty('timecode')) {
      //         return thisDate.getTime() === self.parseDate(d.timecode).getTime() ? "1" : "0.3"
      //       } else if (datum.hasOwnProperty('year')) {
      //         return thisDate.getTime() === new Date(d.refYear1).getTime() ? "1" : "0.3"
      //       }
     // d3.select('#focus').call(function(selection) {
        // if this circle matches the subject circle...
        // or if the xScale return is the same for the xScale return of the datum <++
        // let x = null;
        // if (datum.hasOwnProperty('timecode')) {
        //     x = xScale(self.parseDate(datum.timecode));
        // } else if (datum.hasOwnProperty('year')) {
        //     x = xScale(new Date(datum.year));
        // }
        
        // if (x !== null) {
        //   selection.append('line')
        //             .attr('x1', x)
        //             .attr('y1', '7')
        //             .attr('x2', x)
        //             .attr('y2', '25')
        //             .style('stroke', 'white')
        // /            .style('stroke-width', '1')

          // const c = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
          // c.setAttribute('cx', x);
          // c.setAttribute('cy', '0');
          // c.setAttribute('rx', '8');
          // c.setAttribute('ry', '8');
          // c.setAttribute('stroke', 'white');
          // c.setAttribute('fill', 'none');
          // selection.append(c);
      //   }
      // });

      dots.on("mouseenter", function(d, i) {
        let dot = d3.select(this);
        dot.select('circle')
           .style('stroke', 'darkslategrey');
        dot.select('text')
          .style('display', 'block');
        dot.select('rect')
          .style('display', 'block');
        dot.select('text.dateText')
          .style('display', 'block');
        dot.select('line.dateline')
          .style('display', 'block');
      });

      dots.on("mouseleave", function(d, i) {
        let dot = d3.select(this); 
        dot.select('circle')
           .style('stroke', 'white');
        dot.select('text')
           .style('display', 'none');
        dot.select('rect')
           .style('display', 'none');
        dot.select('text.dateText')
          .style('display', 'none');
        dot.select('line.dateline')
          .style('display', 'none');
      });

      dots.on("click", function(d, i) {
        // or just go to the fucking link , goddammit. 
        window.location = `http://localhost:5000/?season=${d.season}&episode=${d.episode}&id=${d.id}`

        // var toPos = document.getElementById(d.id).getBoundingClientRect().top;
        // var fromPos = window.scrollY;
        // if (fromPos > toPos) {
        //   window.scrollTo(0, fromPos - (toPos*-1));
        // } else {
        //   window.scroll(0, (toPos - (fromPos*-1));
        // }
      });
   
  }

  parseDate(str) {
    const timeSplit = str.split(":");
    if (timeSplit.length === 2) { // 45 min (seasons 1-7)
      return new Date(0, 0, 0, 0, timeSplit[0], timeSplit[1], 0);
    } else if (timesplit.length === 3) { // over an hour
      return new Date(0, 0, 0, timeSplit[0], timeSplit[1], timeSplit[2], 0);
    }
  }

};

export default D3timeline;


