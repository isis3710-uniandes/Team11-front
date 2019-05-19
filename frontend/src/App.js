import React, { Component } from 'react';
import Vista from './Components/structure'
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import {IntlProvider, addLocaleData} from 'react-intl';
import esLocaleData from 'react-intl/locale-data/es';
import localeEsMessages from "./locales/es";
import enLocaleData from 'react-intl/locale-data/en';
import localeEnMessages from "./locales/en";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyIiwiaWF0IjoxNTU4MjQxNzQ4LCJleHAiOjE1NTgzMjgxNDh9.WzxdTtj6JrAE_h79gX-ktBJrCMoEtpo5PoLX1xnxnzU',
      userid:-1,
      ADMIN:false,
      logged:false
    }
  }
  componentDidMount(){
    try{/*
    let tok = localStorage.getItem('token', '');
    let usu = localStorage.getItem('userid', '2');
    if(tok && usu && userid==-1){
      this.setState(
        userid: usu;
      )
    }*/}
    catch(e){
      console.log(e);
    }
  }
  actualizar=(token,id,admin)=>{
    localStorage.setItem('admin','true');
    this.setState({
      token: token,
      userid:id,
      ADMIN:admin
    });
    if(admin){
      window.location='/';
    }
    else{
      window.location='perfil';
    }
  }
  componentWillMount(){
      let a=localStorage.getItem('token');
      if(a!==null&&a.length>0){
        this.setState({
          logged:true
        });
      }
      else{
        this.setState({
          logged:false
        });
      }
      let b=localStorage.getItem('admin');
      if(b==='true'){
        this.setState({
          ADMIN:true
        });
      }
      else{
        this.setState({
          ADMIN:false
        });
      }
  }
  render() {
    console.log(this.state.ADMIN);
    addLocaleData(esLocaleData);
    addLocaleData(enLocaleData);

    const language =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage;

    const messages = language.startsWith('es')?localeEsMessages:localeEnMessages;

    return (
      <div className="App">
        <BrowserRouter>
          <IntlProvider locale={language} messages= {messages}>
            <Vista {...this.state} actualizar={this.actualizar}/>
          </IntlProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
