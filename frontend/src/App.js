import React, { Component } from 'react';
import './App.css';
import { Button, Form, FormGroup, Label, Input, FormText, Card, CardHeader, CardBody, CardText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    var url ='/api/analyseText';
    fetch(url, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'body': this.state.value})
    })
      .then(resp => resp.json())
      .then(data => data.success ? this.renderData(data.data) : console.log("error"));
    event.preventDefault();
  }

  renderData = (data) => {
    var text = "";
    data.document_tone.tones.forEach((tone) => {
      text += tone.tone_name + ": " + Math.floor(tone.score * 100) + "%\n"
    })
    alert(text)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Form inline className="form" onSubmit={this.handleSubmit}>
            <FormGroup className="firstFormGroup">
              <Input className="firstInput" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Write text here..." />
            </FormGroup>
            <FormGroup>
              <Button disabled={_.isEmpty(this.state.value)}>Analyse</Button>
            </FormGroup>
          </Form>
        </header>
      </div>
    );
  }
}

export default App;
