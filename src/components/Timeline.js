import React, { Component, PropTypes } from 'react';
import timeline from './helpers/D3timeline';
let fromToTimeline = {};

// stylesheets
import '../assets/stylesheets/Timeline.scss';



class Timeline extends Component {
    constructor(props) {
        super();
        this.state = {
            elementId: '',
        };
    }

    componentDidMount() {
        this.createChart(this.props.default, this.props.id, this.props.timecode);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.subject !== this.props.subject) {
            this.createChart(nextProps.subject, nextProps.id, nextProps.timecode);
        }
    }

    createChart(subject, id, timecode) {
        if (subject && id && timecode) {
            this.removeChart();
            const newID = this.createElementId(subject, id);
            this.renderChart(newID, timecode)
            this.setState({ elementId: newID}); 
        }
    }

    removeChart() {
        if (document.getElementById(this.state.elementId)) {
            console.log('removing chart', this.state.elementId);
            d3.select(document.getElementById(this.state.elementId).remove());
        }
    }

    createElementId(str, id) {
        const elementId = String(str.replace(' ', '').toLowerCase() + id);
        return elementId;
    }
                
    renderChart(newId, timecode) {
        // this is going to load a chart for every reference for this episode. 
        // it should be changed to only render a chart if the parent component is open.        
        fromToTimeline = new timeline(this.fromToGraph, newId, timecode);
    }


    render() {
        return (
            <div id='from-to-chart-anchor' ref={ c => this.fromToGraph = c }></div>
        )
    }
}


export default Timeline;








    

