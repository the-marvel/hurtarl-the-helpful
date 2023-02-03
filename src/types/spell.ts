export interface Spell {
    Name: string;
    Family: Family;
    Runes: string[];
    Points: number;
    CastRange: string,
    Duration: string,
    SpellType: string,
    Description: string[];
}

export enum Family {
    Sprit,
    Rune
}