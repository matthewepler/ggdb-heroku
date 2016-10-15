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
        const newID = this.createElementId(subject, id);
        this.setState({ elementId: newID}); 

        let datum = {};
        if (this.props.type === "timecode") {
            datum = {"timecode": this.props.reference.timecode};
        } else if (this.props.type === "year") {
            datum = {"year" : this.props.reference.refYear1};
        }
        this.renderChart(newID, subject, datum);
    }

    removeChart() {
        if (document.getElementById(this.state.elementId)) {
            console.log('removing chart', this.state.elementId);
            d3.select(document.getElementById(this.state.elementId).remove());
        }
    }

    createElementId(str, id) {
        if (this.props.type === 'timecode') {
            return String(str.replace(' ', '').toLowerCase() + id);
        } else if (this.props.type === 'year') {
            return String(str + id);
        }
    }
                
    renderChart(newId, subject, datum) {   
        fromToTimeline = new timeline(this.graphElement, newId, subject, datum, this.props.allRefs, this.props.reference.season);
    }


    render() {
        return (
            <div className='chart-anchor' ref={ c => this.graphElement = c }></div>
        )
    }
}


export default Timeline;








    

