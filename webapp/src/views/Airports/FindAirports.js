import React, { Component } from 'react';
import { Button, ButtonDropdown, Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import {Link} from "react-router-dom";


class FindAirports extends Component {
  
  constructor(props){
    super(props);
    this.handleClickDeparture = this.handleClickDeparture.bind(this);
    this.handleClickDestination = this.handleClickDestination.bind(this);
   
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(2).fill(false),
      destinationName: "",
      destinationCode: "",
      departureName: "",
      departureCode: "",
     
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i)? !element : false ; });
    this.setState({
      dropdownOpen: newArray,

    });
  }

  handleClickDeparture(event) {
    this.setState({departureName: event.target.name});
     
    

    this.setState({ departureCode: event.target.value});
    

    event.preventDefault();
  }

  handleClickDestination(event) {
    this.setState({
      destinationName: event.target.name,
      destinationCode: event.target.value,
    });
    event.preventDefault();
  }

  
  
   render() {
      return (
          <div className="airports">
         
            <Card>
              <Col>
           
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Airports</strong>
              </CardHeader>
              <CardBody >
              <p>Select the airport of your <code>departure</code> and the one of your <code>destination</code></p>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }} >
                  <DropdownToggle  sm={{ size: '6', offset: 1 }} caret color="primary">
                    Departure
                  </DropdownToggle>
                  <div id="departure-dropdown">
                  <DropdownMenu right>
                  <ul>
                            <li><Button color="link"  block name="Philadelphia, PA: Philadelphia International" value="PHL" onClick={this.handleClickDeparture}>Philadelphia, PA: Philadelphia International</Button></li>  
                            <li><Button color="link"  block name=" American Hour Rapid" value="AA" onClick={this.handleClickDeparture}> American Hour Rapid </Button></li>                            
                          </ul> 
                  </DropdownMenu>
                  </div>
                </ButtonDropdown>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[1]} toggle={() => { this.toggle(1); }}>
                  <DropdownToggle  sm={{ size: '6', offset: 1 }} caret color="success">
                    Destination
                  </DropdownToggle>
                  <DropdownMenu right>
                          <ul>
                            <li><Button color="link"  block name="Philadelphia, PA: Philadelphia International" value="PHL" onClick={this.handleClickDestination}>Philadelphia, PA: Philadelphia International</Button></li>  
                            <li><Button color="link"  block name=" American Hour Rapid" value="AA" onClick={this.handleClickDestination}> American Hour Rapid </Button></li>                            
                           </ul>  
                  </DropdownMenu>
                </ButtonDropdown>
               
              </CardBody>
              </Col>
             

             
          <Row>
          <Col sm={{ size: '6', offset: 1 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-plane"></i><strong>Airport for Departure</strong>
              </CardHeader>
              <CardBody>
               
               <div>Name: {this.state.departureName}</div>
               <div>Code: {this.state.departureCode} </div> 
               <Col sm={{ size: 6, order: 2, offset: 10 }}> 
               <div className="departure-button">
                <Link to='/#/carriers'>
                  <Button color="warning">Carriers</Button>
                </Link>    
               </div>
               </Col>
              </CardBody>
              
            </Card> 
           </Col>
           <Col sm={{ size: '6', offset: 1 }}> 
            <Card>
              <CardHeader>
                <i className="fa fa-plane"></i><strong>Airport Destination</strong>
              </CardHeader>
              <CardBody>
              <div>Name: {this.state.destinationName}</div>
              <div>Code: {this.state.destinationCode} </div> 
              <Col sm={{ size: 6, order: 2, offset: 10 }}> 
                <div className="destination-button">
                  <Link to='/#/carriers'>
                    <Button color="warning">Carriers</Button>
                  </Link> 
                </div>
              </Col>
              </CardBody>
            </Card> 
            </Col> 
          </Row>
          
          <Button outline color="danger" size="lg" block>Find Route</Button>
            
          </Card>

          </div>
          

      );
    }
  }
  
  export default FindAirports;
  