import React, { Component, useState } from "react";
import type { HeadFC, IPluginRefOptions, PageProps } from "gatsby";
import { SpellService } from "../services/spells.service";
import { Spell, SpellType } from "../types/spell";
import "../images/sprite-map.css"

export interface IProps {}

export interface IState {
  query?: string;
  RuneSpells?: Spell[];
  SpiritSpells?: Spell[];
  DisplayedSpells?: Spell[];
}

export class SpellList extends Component<IProps, IState> {
  spellSvc: SpellService;

  constructor(props: {}) {
    super(props);

    this.spellSvc = new SpellService();

    this.state = {
      query: "",
      RuneSpells: this.fetchSpells().filter((s) => s.Type === SpellType.Rune),
      SpiritSpells: this.fetchSpells().filter(
        (s) => s.Type === SpellType.Sprit
      ),
      DisplayedSpells: this.fetchSpells(),
    };
  }

  render() {
    return (
      <div>
        <main>
          <label htmlFor="query">Filter</label>
          <input
            type={"search"}
            onChange={(e) => this.filterSpells(e)}
            name="query"
            id="query"
            value={this.state.query}
          ></input>
          <div>
            {this.state.DisplayedSpells?.map((spell) => (
              <div key={spell.Name} style={{ display: "block" }}>
                <h2>{spell.Name} {spell.Runes.map(r => {
                    return <img className={r.toLowerCase()}></img>
                  })}</h2>
                <strong>{SpellType[spell.Type]} Spell</strong>
                <br />
                <span>Points: {spell.Points}</span>
                <br />
                <span>{spell.Attributes.join(", ")}</span>
                <br />
                {spell.description.map((paragraph) => {
                  return <p>{paragraph}</p>;
                })}
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  reset() {
    this.setState({ query: "" });
    this.setState({ RuneSpells: this.spellSvc.RuneSpells });
    this.setState({ SpiritSpells: this.spellSvc.SpiritSpells });
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

  getSpellDivs(type: SpellType) {
    if (!!this.state.DisplayedSpells)
      return this.state.DisplayedSpells.filter(
        (spell) => spell.Type === type
      ).map((spell) => {
        return (
          <div key={spell.Name} style={{ display: "block" }}>
            <h2>{spell.Name}</h2>
            <ul>{spell.Runes.map(r => {
              return <li className={r.toLowerCase()}>{r}</li>
            })}</ul>
            <br />
            <span>Points: {spell.Points}</span>
            <br />
            <span>{spell.Attributes.join(", ")}</span>
            <br />
            {spell.description.map((paragraph) => {
              return <p>{paragraph}</p>;
            })}
          </div>
        );
      });
    else return [];
  }

  filterSpells(event: any) {
    this.setState({ query: event.target.value });

    if (event.target.value === '')
      this.setState({DisplayedSpells: this.spellSvc.AllSpells})
    else
    this.setState({
      DisplayedSpells: this.state.DisplayedSpells?.filter((s) => {
        console.log(
          "inside filter",
          s.Name.toLowerCase(),
          event.target.value.toLowerCase(),
          s.Name.toLowerCase().includes(event.target.value.toLowerCase())
        );

        return event.target.value === '' || s.Name.toLowerCase().includes(event.target.value.toLowerCase());
      }),
    });

    console.log("filter", event.target.value, this.state.DisplayedSpells);
  }
}

export default SpellList;

export const Head: HeadFC = () => <title>Home Page</title>;
