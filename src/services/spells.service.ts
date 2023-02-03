import runeSpellsJson from '../content/rune-spells.json'
import spiritSpellsJson from '../content/spirit-spells.json'
import { Spell, SpellType } from '../types/spell';

export class SpellService {
    readonly RuneSpells: Spell[] = [];
    readonly SpiritSpells: Spell[] = [];
    readonly AllSpells: Spell[] = [];

    constructor() {
        this.loadData();
    }

    loadData () {
        runeSpellsJson.forEach(spell => {
            this.RuneSpells.push({Type: SpellType.Rune, ...spell})
        });
        spiritSpellsJson.forEach(spell => {
            this.SpiritSpells.push({Type: SpellType.Sprit, ...spell})
        });
        this.AllSpells.push(...this.RuneSpells.concat(this.SpiritSpells));        
    }
}