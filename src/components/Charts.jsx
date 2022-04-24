import React from 'react';
import { Bar, Cell, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Container, Row, Col } from 'react-bootstrap';
import EventGenrePie from './EventGenrePie';
import EventCityPie from './EventCityPie';

class Charts extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.handlePageHighlighting('charts');
  }

  getData = () => {
    const { locations, originalEvents } = this.props;
    const data = locations.map((location) => {
      const number = originalEvents.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  render() {
    const { originalEvents, locations } = this.props
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#aa33cc', '#cc66aa', '#fd6159', '#bdb6c2', '#8f6677', '#1689d2', '#0d8767', '#f40096', '#FF0000', '#FFFF00', '#000000'];
    return (
      <Container fluid='true' className='mt-3'>
        <Row>
          <Col>
            <EventCityPie events={originalEvents} locations={locations} />
          </Col>
          <Col>
            <EventGenrePie events={originalEvents} />
          </Col>
        </Row>
        <Row fluid='true' style={{ height: '80vh', zIndex: '-1000' }}>
          <ResponsiveContainer width='100%' height={400} >
            {/* <ScatterChart
              width={800}
              height={400}
              margin={{
                top: 20, right: 40, bottom: 20, left: 0,
              }}>
              <CartesianGrid />
              <XAxis type='category' dataKey='city' name="city" />
              <YAxis type='number' dataKey='number' name='events' allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill='#8884d8' />
            </ScatterChart> */}
            <BarChart
              width={800}
              height={400}
              data={this.getData()}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey='city' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='number'>    {
                this.getData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))
              }</Bar>
            </BarChart>
          </ResponsiveContainer>
        </Row>
      </Container>
    );
  }

}

export default Charts;
