import React, { Component, PropTypes } from 'react';
import timeline from './helpers/D3timeline';
let fromToTimeline = {};

// stylesheets
import '../assets/stylesheets/Timeline.scss';

// type, subject, ref, allRefs, default

class Timeline extends Component {
    constructor(props) {
        super();
        this.state = {
            elementId: '',
        };
    }

    componentDidMount() {
        this.createChart(this.props.default, this.props.reference.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.subject !== this.props.subject) {
            this.createChart(nextProps.subject, nextProps.reference.id);
        }
    }

    componentWillUnmount() {
        this.removeChart();
    }

    createChart(subject, id) {
        this.removeChart();
        const newId = String(new Date().getTime());
        this.setState({ elementId: newId }); 

        let datum = {};
        if (this.props.type === "timecode") {
            datum = {"timecode": this.props.reference.timecode};
        } else if (this.props.type === "year") {
            datum = {"year" : this.props.reference.refYear1};
        }
        this.renderChart(newId, subject, datum);
    }

    removeChart() {
        if (document.getElementById(this.state.elementId)) {
            // console.log('removing chart', this.state.elementId);
            d3.select(document.getElementById(this.state.elementId).remove());
        }
    }
                
    renderChart(newId, subject, datum) {  
        // console.log('rendering chart', newId);
        const divWidth = document.getElementById(this.props.reference.id).getBoundingClientRect().width;
        fromToTimeline = new timeline(this.graphElement, newId, subject, datum, this.props.allRefs, this.props.reference.season, 0.9 * divWidth);
    }


    render() {
        return (
            <div className='chart-anchor' ref={ c => this.graphElement = c }></div>
        )
    }
}


export default Timeline;








    

