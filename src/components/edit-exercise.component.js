import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
export default class EditExercise extends Component{
    constructor(props){
        super(props);        
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);        
        this.state = {            
            username:'',
            description:'',
            duration:'',
            date:''
        }
    }
    
    componentDidMount(){        
        axios.get("http://localhost:5000/exercises/"+this.props.match.params.id)
            .then(
                res => {
                    this.setState({
                        username : res.data.username,
                        description : res.data.description,
                        duration : res.data.duration,
                        date : Date.parse(res.data.date)
                    });
                }
            );
    }

    onChangeDescription(e){
        this.setState({
            description:e.target.value
        });
    }

    onChangeDuration(e){
        this.setState({
            duration:e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date:date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const exercise = {     
            username : this.state.username,       
            description : this.state.description,
            duration : this.state.duration,
            date : this.state.date
        }        
        console.log(exercise);
        axios.put("http://localhost:5000/exercises/update/"+this.props.match.params.id, exercise)
            .then(res => console.log(res.data));        
        // window.location = '/';
    }

    render(){
        return(
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Username: </label>
                    <label>{this.state.username}</label>                   
                    </div>
                    <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}