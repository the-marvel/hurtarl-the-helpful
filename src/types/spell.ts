export interface Spell {
    Name: string;
    Type: SpellType;
    Runes: string[];
    Points: number;
    Attributes: string[];
    description: string[];
}

export enum SpellType {
    Sprit,
    Rune
}