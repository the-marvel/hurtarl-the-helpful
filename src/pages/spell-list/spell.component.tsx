import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { Component } from "react";
import { Family, Spell } from "../../types/spell";


export class SpellTitle extends Component {
    public Spell: Spell; 

    constructor (spell: Spell) {
        super(spell);
        this.Spell = spell;

    }

    render() {
        this.Spell = this.props.parentToChild;

        return (
            <div key={this.Spell.Name} style={{ display: "block" }}>
                <h2>{this.Spell.Name}</h2>
                  <div className="rune-list">
                    {this.Spell.Runes.map(r => {
                      return  <Tooltip title={r} placement="top" arrow><span>
                          <img className={'rune-list ' + r.toLowerCase()}  ></img>
                        </span>
                      </Tooltip>
                    })}
                  </div>
                <strong>{Family[this.Spell.Family]} Spell</strong>
                <br />
                <span>Points: {this.Spell.Points}</span>
                <br />
                <span>{this.Spell.CastRange}, {this.Spell.Duration}, {this.Spell.SpellType}</span>
                <br />
                {this.Spell.Description.map((paragraph) => {
                  return <p>{paragraph}</p>;
                })}
              </div>
        )
    }
}

export default SpellTitle;