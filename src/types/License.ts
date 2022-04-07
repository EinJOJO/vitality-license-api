export enum Product {
  Account_Maxer = 'Account_Maxer',
  Rank_Modifier = 'Rank_Modifier',
  Master_License = 'Master_License',
  Auto_SkillCheck = 'Auto_SkillCheck',
  Bloodpoints_Generator = 'Bloodpoints_Generator',
  DLC_Unlocker = 'DLC_Unlocker',
  Wallhack = 'Wallhack',
}

export interface License {
  id?: number;
  product: Product;
  license: string;
}
