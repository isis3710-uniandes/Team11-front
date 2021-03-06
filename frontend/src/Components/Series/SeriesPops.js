import Novelas from '../Novelas/Novelas';
import axios from 'axios'

//const getNovelas;
class SeriesPops extends Novelas {
    
    componentDidMount() {
        this.setState({hide:true});
        axios.get('https://backwebteam11.herokuapp.com/Novelas')
            .then((response) => {
                var state = this.state;
                var novelas = response.data;
                novelas.sort((a, b) => b.ranking - a.ranking);
                state.pagina = 0;
                // pueden cambiar el tamaño de partion aca
                state.tablasNovela = this.getTablasNovela(novelas,5);
                return state;
            })
            .then((newState) => {
                this.setState(newState);
            });
        axios.get('https://backwebteam11.herokuapp.com/Generos')
            .then((response) => {
                var gen = response.data.map((el)=>[el.genero,el.id,el.novelas]);
                this.setState({generos:gen});
            });
        axios.get('https://backwebteam11.herokuapp.com/Autores')
            .then((response) => {
                var aut = response.data.map((el)=>[el.nombre,el.id,el.novelas]);
                this.setState({autores:aut});
            });
    }
}

export default SeriesPops;
