import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

   
  tCountdown(){
    this.countdown = setInterval(() =>{
      this.setState({
        tCount: this.state.tCount -1
      });
      
    },1000) }

  tSet(){
    this.setState({
      tCount: 10
    }, this.tCountdown())    
    }


  componentDidUpdate(){
    if(this.state.tCount <=0){
      clearInterval(this.countdown);}
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {this.tSet(); this.fetchPokemon()}}>Start!</button>
        <h1 className={'timer'} style= {{visibility: this.state.tCount === 0 ? "hidden" : "visible"}}>{this.state.tCount}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} style= {{filter: `brightness(${this.state.tCount > 0 ? 10 :100}%)`}} />
          <h1 className={'pokeName'} style= {{visibility: this.state.tCount > 0 ? "hidden" : "visible"}}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;