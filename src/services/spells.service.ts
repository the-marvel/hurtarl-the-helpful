import * as runeSpellsJson from '../data/rune-spells.json'
import * as spiritSpellsJson from '../data/spirit-spells.json'
import { Spell } from '../types/spell';

export class SpellService {
    RuneSpells: Spell[] = [];
    SpiritSpells: Spell[] = [];

    constructor() {
        runeSpellsJson && runeSpellsJson.map( spell => {
            this.RuneSpells.push(spell as Spell)
        });
    }

    loadData (path:string) {

    }
}