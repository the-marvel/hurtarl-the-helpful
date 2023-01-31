import runeSpellsJson from '../content/rune-spells.json'
import spiritSpellsJson from '../content/spirit-spells.json'
import { Spell, SpellType } from '../types/spell';

export class SpellService {
    RuneSpells: Spell[] = [];
    SpiritSpells: Spell[] = [];
    AllSpells: Spell[] = [];

    constructor() {
        this.loadData();
    }

    loadData () {
        runeSpellsJson.forEach(spell => {
            this.RuneSpells.push({Type: SpellType.RuneSpell, ...spell})
        });
        spiritSpellsJson.forEach(spell => {
            this.SpiritSpells.push({Type: SpellType.SpritSpell, ...spell})
        });
        this.AllSpells = this.RuneSpells.concat(this.SpiritSpells);
        console.log('spell svc load', this.AllSpells);
        
    }
}