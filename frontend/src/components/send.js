import React, { Component } from 'react';
import { Form, Container, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';

const postEndpoint = '/add_transaction'
const getEndpoint = '/get_chain'
class Send extends Component {
  constructor(props){
    super(props);
    this.state = {
      Receiver: '',
      Donor:'',
      Name:'',
      time: '',
      sender: '',
    }
    this.handleDonor = this.handleDonor.bind(this);
    this.handleReceiver = this.handleReceiver.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleReceiver(event){
    this.setState({ Receiver: event.target.value});
  }
  handleDonor(event){
    this.setState({ Donor: event.target.value});
  }
  handleName(event){
    this.setState({ Name: event.target.value});
  }
  handleAmount(event){
    this.setState({ amount: event.target.value});
  }
  componentDidMount() {
    axios.get(getEndpoint)
      .then(res => {
        const sender = res.data.chain[1].transactions[0].receiver;
        this.setState({ sender });
      })
    }

  handleSubmit(event) {
    event.preventDefault();

      axios.post(postEndpoint, { "Donor": this.state.Donor,
      "Receiver": this.state.Receiver,
      "Name": this.state.Name,
      "time": this.state.time })
       .then(res => {
         console.log(res);
         console.log(res.data);
       })
  }

  render(){
    return (
        <Container>
  <br/>
  <h3><b>Organ Donation</b></h3>
  <h4><b style={{color: '#007bff'}}>Donate organs to anyone.</b> </h4>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row}>
         <Form.Label column sm="2">
           Donor
         </Form.Label>
         <Col sm="8">
           <Form.Control onChange={this.handleDonor} value={this.state.Donor} placeholder="Enter Donor Address" />
         </Col>
       </Form.Group>

       <Form.Group as={Row}>
         <Form.Label column sm="2">
           Receiver
         </Form.Label>
         <Col sm="8">
           <Form.Control onChange={this.handleReceiver} value={this.state.Receiver} placeholder="Enter Receiver Address" />
         </Col>
       </Form.Group>

       <Form.Group as={Row}>
        <Form.Label column sm="2">
          Organ Name
        </Form.Label>
        <Col sm="2">
          <Form.Control onChange={this.handleName} placeholder="Organ Name" value={this.state.Name} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
      <Col sm="5">
      <Button variant="primary" type="submit">
    Send
  </Button>
  </Col>
  </Form.Group>
     </Form>
     <br/><br/>
      </Container>
    );
  }
}

export default Send;
