import React, { Component, PropTypes } from 'react';
import stackedChart from './helpers/D3stackedChart';
let categoryBars = {}

// stylesheets
import '../assets/stylesheets/StackedBar.scss';

// type, subject, ref, allRefs, default

class StackedBar extends Component {
    constructor(props) {
        super();
        this.state = {
            elementId: null,
        };
    }

    componentDidMount() {
        this.removeChart();
        const newId = "uniqueBarChartId";
        this.setState({ elementId: newId}); 
        this.renderChart(newId);
    }

    componentWillUnmount() {
        this.removeChart();
    }

    createChart(id) {
        this.removeChart();
        this.setState({ elementId: id}); 
        this.renderChart(id, subject);
    }

    removeChart() {
        if (document.getElementById(this.state.elementId)) {
            console.log('removing chart', this.state.elementId);
            d3.select(document.getElementById(this.state.elementId).remove());
        }
    }
                
    renderChart(id) {   
        categoryBars = new stackedChart(this.graphElement, id, this.props.allRefs, this.props.subject);
    }

    render() {
        return (
            <div className='chart-anchor' ref={ c => this.graphElement = c }></div>
        )
    }
}

export default StackedBar;