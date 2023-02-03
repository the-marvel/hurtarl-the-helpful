import React, { Component, useState } from "react";
import type { HeadFC, IPluginRefOptions, PageProps } from "gatsby";
import { Spell, Family } from "../types/spell";
import "../images/sprite-map.css"
import SpellList from "./spell-list/spell-list.component";

export class Index extends Component {

  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <div>
        <main>
          <SpellList></SpellList>
        </main>
      </div>
    );
  }
}

export default Index;

export const Head: HeadFC = () => <title>Hurtarl the Helpful</title>;
