import REACT from 'react';
import './App.css';
import Carousel from 'react-bootstrap/Carousel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class App extends REACT.Component{
  constructor(props){
    super(props)
    this.state = {
      moods: []
    }
  }

  componentDidMount(){
    axios
    .get('http://localhost:3002/moods')
    .then(response => {
      console.log(response.data);
      this.setState({
        moods: response.data
      })
    })
  }

  eventHandler = (e) => {
    e.preventDefault();
    // console.log(
    //   'emotion: ', e.target.emotion.value,
    //   'intensity: ', parseInt(e.target.intensity.value)
    // )
    let clientData = {
      emotion : e.target.emotion.value,
      intensity : parseInt(e.target.intensity.value)
    }
    // console.log(clientData)
    axios.post('http://localhost:3002/moods',clientData).then(responseData =>{
      // will create only one new mood, will push new mood to list
      console.log(responseData,responseData.data)
        let newMoods = this.state.moods;
        newMoods.push(responseData.data)
      // set to state to invlude in carousel
        this.setState({
          mood: newMoods
        })
      }) 
  }

  handleDelete = (id) => {
    // need to wrap the handleDelete in the render with another function so that it gets called at the right time
    axios
    .delete(`http:localhost:3001/moods/${id}`)
    .then(responseData => {
      this.setState({
        moods: this.state.moods.filter(x=>x._id !== id)
      })
      console.log('mood deleted')
    })
  }
  render(){
    console.log(this.state.moods)
    return(
      <>
        <Carousel>
          {this.state.moods && this.state.moods.map(mood => (
            <Carousel.Item key={mood._id}>
            <img
              className='d-block w-100' 
              src='https://via.placeholder.com/100x100'
              alt='some moods'
            />
            <Carousel.Caption>
              <h3>{mood.emotion}</h3>
              <h3>{mood.intensity}</h3>
              <Button 
                onClick={()=> this.handleDelete(mood._id)}
                >Delete
              </Button> 
            </Carousel.Caption>
            </Carousel.Item>
          )
          )}
        </Carousel>
        <Form onSubmit={this.eventHandler}>
          <Form.Group controlId='form'>
            <Form.Label/> Emotion
            <Form.Control type='text' name='emotion'/>
            <Form.Text/>
          </Form.Group>
          <Form.Group controlId='form'>
            <Form.Label/> Intensity
            <Form.Control type='text' name='intensity'/>
            <Form.Text/>
          </Form.Group>
          <Button type='submit'>
            Submit
          </Button> 
        </Form>
      </>
    )
  }
}

export default App;
