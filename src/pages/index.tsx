import React, { Component, useState } from 'react';
import type { HeadFC, IPluginRefOptions, PageProps } from "gatsby"
import { SpellService } from "../services/spells.service"
import { Spell, SpellType } from "../types/spell";

export interface IProps {
}

export interface IState {
  query?: string;
  RuneSpells?: Spell[]
  SpiritSpells?: Spell[]
  DisplayedSpells?: Spell[]
}

export class SpellList extends Component<IProps, IState> {
  spellSvc: SpellService;
  
  constructor (props: {}) {
    super(props);

    this.spellSvc = new SpellService();

    this.state = {
      query: '',
      RuneSpells: [],
      SpiritSpells: [],
      DisplayedSpells: this.fetchSpells()
    }

    console.log('state', this.state);
    
  }

  render() {
    return(
      <div>
        <main>
          <label htmlFor="query">Filter</label>
          <input type={"search"}
              onChange={(e) => this.filterSpells(e)}
              name='query'
              id="query"
              value={this.state.query}>
          </input>
          <h1>Rune Spells</h1>
          <div>{this.getSpellDivs(SpellType.RuneSpell)}</div>
          <h1>Spirit Spells</h1>
          <div>{this.getSpellDivs(SpellType.SpritSpell)}</div>
        </main>
      </div>
    );
  }

  fetchSpells (query: string = "") {
      return this.spellSvc.AllSpells
        .filter(spell => query ==="" ||
          spell.Name.toLowerCase().includes(query.toLowerCase()));
   }

   getSpellDivs (type: SpellType) {
    if (!!this.state.DisplayedSpells)
      return this.state.DisplayedSpells.filter(spell => spell.Type === type)
        .map( spell => {   
          return (<div key={spell.Name} style={{display: "block"}}>
              <h2>{spell.Name}</h2><span>{spell.Runes.join(', ')}</span><br/>
              <span>Points: {spell.Points}</span><br/>
              <span>{spell.Attributes.join(', ')}</span><br/>
              {spell.description.map(paragraph => {
                return (<p>{paragraph}</p>)
              })}
            </div>)
     });
     else return [];
   }

   filterSpells(event: any) {
      this.setState({query: event.target.value});
      const spells = this.fetchSpells(event.target.value);
      this.setState({DisplayedSpells: spells});
   }
}

export default SpellList

export const Head: HeadFC = () => <title>Home Page</title>
