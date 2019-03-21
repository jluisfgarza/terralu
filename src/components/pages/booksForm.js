import React from 'react';
import { findDOMNode } from 'react-dom';
import { InputGroup, DropdownButton, Image, MenuItem, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import * as booksActions from '../../actions/booksActions';

class BooksForm extends React.Component {

  constructor(){
    super();
    this.state = {
      images: [{}],
      img: ''
    };
  }

  componentDidMount(){
    this.props.getBooks();
    axios.get('/api/images')
    .then(function(response){
      this.setState({images: response.data});
    }.bind(this))
    .catch(function(err){
      this.setState({images: 'error loading images from the server', img: ''})
    }.bind(this));
  }

  handleSubmit(){
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      image: findDOMNode(this.refs.image).value,
      price: findDOMNode(this.refs.price).value,
    }];
    this.props.postBooks(book);
  }

  handleSlectedImage(imageName){
    this.setState({ img: '/images/' + imageName });
  }

  onDelete(){
    const _id = findDOMNode(this.refs.delete).value;
    this.props.deleteBooks(_id);
  }

  resetForm(){
    //RESET THE FORM FIELDS FOR NEW ENTRY
    this.props.resetButton();

    findDOMNode(this.refs.title).value = '';
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.price).value = '';
    this.setState({ img: ''});
  }

  render(){

    const booksList = this.props.books.map(function(book){
      return(
        <option value={ book._id } key={ book._id }>{ book.title }</option>
      );
    });

    const imagesList = this.state.images.map(function(image, index){
      return(
        <MenuItem key={index} eventKey={image.name} onClick={this.handleSlectedImage.bind(this, image.name)}>{image.name}</MenuItem>
      );
    }, this);

    return(
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
               <FormControl type="text" ref='image' value={this.state.img} />
               <DropdownButton
                 componentClass={InputGroup.Button}
                 id="input-dropdown-addon"
                 title="Select an image"
                 bsStyle='primary'>
                 { imagesList }
               </DropdownButton>
             </InputGroup>
             <Image src={this.state.img} responsive/>
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup controlId='title' validationState={ this.props.validation }>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='Enter title of the book'
                  ref='title'
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup controlId='description' validationState={ this.props.validation }>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='Enter description of the book'
                  ref='description'
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup controlId='price' validationState={ this.props.validation }>
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='Enter price of the book'
                  ref='price'
                />
                <FormControl.Feedback />
              </FormGroup>
              <Button  
                onClick={ (!this.props.msg) ? (this.handleSubmit.bind(this)) : (this.resetForm.bind(this)) } 
                bsStyle={ (!this.props.style) ? ("primary") : (this.props.style) }>
                { (!this.props.msg) ? ("Save Book") : (this.props.msg) }
              </Button>
            </Panel>

            <Panel style={{ marginTop: '25px'}}>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select a book id to delete</ControlLabel>
                <FormControl ref='delete' componentClass="select" placeholder="select">
                  <option value='select'>Select</option>
                  { booksList }
                </FormControl>
              </FormGroup>
              <Button bsStyle='danger' onClick={ this.onDelete.bind(this) }>Delete book</Button>
            </Panel>
          </Col>
        </Row>
      </Well>
    );
  }
}

function mapStateToProps(state){
  return{
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style,
    validation: state.books.validation
  }
}

function mapDispatchToProps(dispatch){
    return{
      postBooks: (book) => dispatch(booksActions.postBooks(book)),
      deleteBooks: (_id) => dispatch(booksActions.deleteBooks(_id)),
      getBooks: () => dispatch(booksActions.getBooks()),
      resetButton: () => dispatch(booksActions.resetButton())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
