import runeSpellsJson from '../content/rune-spells.json'
import spiritSpellsJson from '../content/spirit-spells.json'
import { Spell, Family } from '../types/spell';

export class SpellService {
    readonly RuneSpells: Spell[] = [];
    readonly SpiritSpells: Spell[] = [];
    readonly AllSpells: Spell[] = [];

    constructor() {
        this.loadData();
    }

    loadData () {
        runeSpellsJson.forEach(spell => {
            this.RuneSpells.push({Family: Family.Rune, ...spell})
        });
        spiritSpellsJson.forEach(spell => {
            this.SpiritSpells.push({Family: Family.Sprit, ...spell})
        });
        this.AllSpells.push(...this.RuneSpells.concat(this.SpiritSpells));        
    }
}