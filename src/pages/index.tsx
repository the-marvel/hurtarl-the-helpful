import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { SpellService } from "../services/spells.service"
import { Spell } from "../types/spell";
import { useState } from "react";

const [spells, setSpells] = useState(fetchSpells(''));

const updateState = (index) => (e) => {
  const newArray = spells.map((item, i) => {
    if (index === i) {
      return { ...item, [e.target.name]: e.target.value };
    } else {
      return item;
    }
  });
  setSpells(newArray);
};

function fetchSpells(query: string = "") {
 return new SpellService().RuneSpells
  .filter(spell => {
    console.log('fetch', query);
    
    return !query ||
    query.toString().trim() === "" ||
     spell.Name.includes(query) ||
     spell.Attributes.join('').includes(query) ||
     spell.Runes.join('').includes(query) ||
     spell.description.includes(query)
  })
  .map( spell => {   
      return (<div key={spell.Name} style={{display: "block"}}>
        <h2>{spell.Name}</h2><span>{spell.Runes.join(', ')}</span><br/>
        <span>Points: {spell.Points}</span><br/>
        <span>{spell.Attributes.join(', ')}</span><br/>
        <p><span>{spell.description}</span></p>
        </div>)
  });
}

function filterSpells (event: any) {
  console.log('event handler', event);
  
  spells = fetchSpells(event.target.value);
  console.log('after event handler', spells.length);
}

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <input type={"search"} onChange={filterSpells} name='query'></input>
      {spells}
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
