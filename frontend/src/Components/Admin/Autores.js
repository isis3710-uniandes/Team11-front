import React from 'react';
import axios from 'axios'
import {FormattedMessage} from 'react-intl';

class AdminAutor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        autores:[],
                        actualAut:{}
                    };
    }

    cambiarActual=(recom)=>{
        this.setState({actualAut:recom});
    }


    componentDidMount() {
        axios.get('https://backwebteam11.herokuapp.com/Autores')
            .then((response) => {
                var state = this.state;
                var autores = response.data;
                state.autores=autores;
                this.setState(state);
            });
    }

    rendGrupos=()=>{
        let rows=this.state.autores.map((el,i)=>{
            return(
                <tr key={i}>
                    <td>{i}</td>
                    <td>{el.nombre}</td>
                    <td>{el.idioma}</td>
                    <td>
                        <button onClick={()=>this.cambiarActual(el)} className="btn btn-outline-success btnz" type="button" data-toggle="collapse" data-target="#editForm"><FormattedMessage id="Edit"/></button>
                    </td>
                    <td>
                        <form>
                            <a href="/" onClick={(event)=>this.deleteUsuario(el.id,event)} className="btn btn-outline-success btnz" type="button" ><FormattedMessage id="Delete"/></a>
                        </form>
                    </td>
                </tr>
            );
        });
        return rows;
    }

    postAutores=(event)=>{
        event.preventDefault();
        let autor=document.getElementById('Input').value;
        let id=parseInt(document.getElementById('idInput').value);
        let lang=document.getElementById('languageInput').value;
        let genre={id:id,nombre:autor,idioma:lang,novelas:[1,2]};
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.post('https://backwebteam11.herokuapp.com/Autores',genre).then(res=>window.location.reload());
    }

    putUsuario=(event)=>{
        event.preventDefault();
        let username=document.getElementById('editUsernameInput').value;
        let novel=document.getElementById('editNovelInput').value;
        let user={...this.state.actualAut};
        user.nombre=username;
        user.idioma=novel;
        let tok = localStorage.getItem('token');
        if(tok){
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.put('https://backwebteam11.herokuapp.com/Autores/'+user.id,user).then(res=>window.location.reload());
        }
    }

    deleteUsuario=(idUser,event)=>{
        event.preventDefault();
        let tok = localStorage.getItem('token');
        if(tok){
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.delete('https://backwebteam11.herokuapp.com/Autores/'+idUser).then(res=>window.location.reload());
        }
    }

    render() {
        return (
            <div className="heightWeb" role="contentinfo">
                <h1><FormattedMessage id="ListAuthorsAdmin"/></h1>
                <button className="btn btn-info btnz" type="button" data-toggle="collapse" data-target="#addForm"><FormattedMessage id="AddAdmin"/></button>
                <div className="collapse" id="addForm">
                    <form>
                        <input aria-label="id" type="text" id="idInput" placeholder="id del autor"/>
                        <input  aria-label="nombre" type="text" id="Input" placeholder="nombre del autor"/>
                        <input  aria-label="idioma" type="text" id="languageInput" placeholder="idioma del autor"/>
                        <button className="btn btn-info btnz" onClick={this.postAutores}><FormattedMessage id="AddAdmin"/></button>
                    </form>
                </div>
                <div className="collapse" id="editForm">
                    <form>
                        <p><FormattedMessage id="EditUserofId"/>: {this.state.actualAut.id}</p>
                        <input type="text" id="editUsernameInput" placeholder="nombre"/>
                        <input type="text" id="editNovelInput" placeholder="idioma"/>
                        <button className="btn btn-info btnz" onClick={this.putUsuario}><FormattedMessage id="EditAdmin"/></button>
                    </form>
                </div>
                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-10">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"><FormattedMessage id="Author"/></th>
                                    <th scope="col"><FormattedMessage id="Language"/></th>
                                    <th scope="col"><FormattedMessage id="Edit"/></th>
                                    <th scope="col"><FormattedMessage id="Delete"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.rendGrupos()}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-1"/>
                </div>
            </div>
        )
    }
}

export default AdminAutor;
