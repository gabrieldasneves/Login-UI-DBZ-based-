import React, {Component} from 'react';
import TechItem from './TechItem'

class TechList extends Component {
    state = {
        newTech:'',
        techs:[]
    };

    //executado assim que o componente aparece em tela
    componentDidMount(){
        const techs = localStorage.getItem('techs');
        if (techs){
            this.setState({techs:JSON.parse(techs)});
        }
    }

    //executado sempre que houver alterações nas props ou estado
    componentDidUpdate(_, prevState){
        //this.props, this.state
        if (prevState.techs != this.state.techs){
            localStorage.setItem('techs',JSON.stringify(this.state.techs));
        }
    }

    //executado quando o componente deixa de existir
    componentWillUnmount(){
        
    }

    handleInputChange = e => {
        this.setState({newTech: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({techs:[...this.state.techs, this.state.newTech], newTech:''})
    }

    handleDelete = (tech) => {
        this.setState({techs: this.state.techs.filter(t => t != tech)});
    }

    render(){
        return(
            <div class='content'>
                
                <form onSubmit={this.handleSubmit}>
                    <h1> {this.state.newTech} </h1>
                    <ul>
                        {this.state.techs.map(tech => <TechItem key={tech} tech = {tech} onDelete={() => this.handleDelete(tech)}/>)}
                    </ul>
                    <input type='text' placeholder='escreve ai' value={this.state.newTech} onChange={this.handleInputChange} />
                    <button type= 'submit'>Enviar</button>
                </form>
            </div>
        );
    }
} 

export default TechList;