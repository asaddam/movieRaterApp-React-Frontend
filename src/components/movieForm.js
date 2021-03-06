import React, { Component } from 'react';

class MovieForm extends Component {

    state = {
        editedMovie: this.props.movie
    }
    
    cancelClicked = () => {
        this.props.cancelForm()
    }
    inputChange = event => {
        let movie = this.state.editedMovie;
        movie[event.target.name] = event.target.value
        this.setState({editedMovie: movie})
    }
    saveClicked = () => {
        console.log(this.state.editedMovie);
        fetch(`${process.env.REACT_APP_API_URL}api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            }, 
            body: JSON.stringify(this.state.editedMovie)
            }).then( resp => resp.json())
            .then( res => this.props.newMovie(res))
            .catch( error => console.log(error))
    }
    updatedClicked = () => {
        fetch(`${process.env.REACT_APP_API_URL}api/movies/${this.props.movie.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            }, 
            body: JSON.stringify(this.state.editedMovie)
            }).then( resp => resp.json())
            .then( res => this.props.editedMovie(res))
            .catch( error => console.log(error))
    }

    render() {

        const isDisabled = this.state.editedMovie.title.length === 0 ||
                            this.state.editedMovie.description.length === 0

        return (
            <div className='App'>
               <span>Title</span><br/>
               <input type='text' name='title' value={this.props.movie.title} 
                onChange={this.inputChange}></input><br/>
               <span>Description</span><br/>
               <textarea name='description' value={this.props.movie.description}
                onChange={this.inputChange}/><br/>
                { this.props.movie.id ? 
                    <button disabled={isDisabled} onClick={this.updateClicked}>Update</button> :
                    <button disabled={isDisabled} onClick={this.saveClicked}>Save</button> }
               &nbsp; 
               <button onClick={this.cancelClicked}>Cancel</button>
            </div>
        )
    }
}

export default MovieForm;