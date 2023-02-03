import React, { Component, useState } from "react";
import type { HeadFC, IPluginRefOptions, PageProps } from "gatsby";
import Tooltip from "@mui/material/Tooltip";
import { SpellService } from "../../services/spells.service";
import { IProps } from "../../types/generics";
import { Spell, Family } from "../../types/spell";

export interface IState {
    query?: string;
    DisplayedSpells?: Spell[];
  }

export class SpellList extends Component<IProps, IState> {
  spellSvc: SpellService;

  constructor(props: {}) {
    super(props);

    this.spellSvc = new SpellService();

    this.state = {
      query: "",
      DisplayedSpells: this.fetchSpells(),
    };
  }

  render() {
    return (
      <div>
          <label htmlFor="query">Filter</label>
          <input
            type={"search"}
            onChange={(e) => this.filterSpells(e)}
            name="query"
            id="query"
            value={this.state.query}>
          </input>
          <div>
            {this.state.DisplayedSpells?.map((spell) => (
              <div key={spell.Name} style={{ display: "block" }}>
                <h2>{spell.Name}</h2>
                  <div className="rune-list">
                    {spell.Runes.map(r => {
                      return  <Tooltip title={r} placement="top" arrow><span>
                          <img className={'rune-list ' + r.toLowerCase()}  ></img>
                        </span>
                      </Tooltip>
                    })}
                  </div>
                <strong>{Family[spell.Family]} Spell</strong>
                <br />
                <span>Points: {spell.Points}</span>
                <br />
                <span>{spell.CastRange}, {spell.Duration}, {spell.SpellType}</span>
                <br />
                {spell.Description.map((paragraph) => {
                  return <p>{paragraph}</p>;
                })}
              </div>
            ))}
          </div>
        </div>
    );
  }

  reset() {
    this.setState({ query: "" });
    this.setState({ DisplayedSpells: this.spellSvc.AllSpells });
  }

  fetchSpells(query: string = "") {
    return this.spellSvc.AllSpells.filter(
      (spell) =>
        query === "" || spell.Name.toLowerCase().includes(query.toLowerCase())
    ).sort((s1, s2) => {
      if (s1.Name < s2.Name) return -1;
      else return 1;
    });
  }

  filterSpells(event: any) {
    this.setState({ query: event.target.value });
    const q = (event.target.value ?? '').toLowerCase();    

    if (q === '')
      this.setState({DisplayedSpells: this.spellSvc.AllSpells})
    else
    this.setState({
      DisplayedSpells: this.spellSvc.AllSpells.filter((s) => {
        console.log(s.Name.toLowerCase(), q.toLowerCase(), s.Name.toLowerCase().includes(q.toLowerCase()));
        
        return s.Name.toLowerCase().includes(q.toLowerCase());
      }),
    });
  }
}
  
export default SpellList;


