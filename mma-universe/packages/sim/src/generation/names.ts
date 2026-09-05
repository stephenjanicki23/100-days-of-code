/**
 * Name and origin data for procedural generation.
 *
 * Names are drawn per nationality so that a fighter's name, home region and stylistic
 * background hang together — a Dagestani sambo grappler and a Brazilian jiu-jitsu black belt
 * should not read as the same person with a different label. Nothing here references any
 * real fighter, promotion or gym; the pools are ordinary given names and surnames combined
 * at random.
 */

export interface NationalityProfile {
  readonly code: string;
  readonly name: string;
  readonly regions: readonly string[];
  /** Relative share of the fighter population. */
  readonly weight: number;
  /** Disciplines this country's fighters disproportionately come up through (brief §37). */
  readonly disciplineBias: readonly string[];
  readonly maleFirst: readonly string[];
  readonly femaleFirst: readonly string[];
  readonly last: readonly string[];
}

export const NATIONALITIES: readonly NationalityProfile[] = [
  {
    code: 'USA', name: 'United States', weight: 26,
    regions: ['California', 'Texas', 'Florida', 'New York', 'Colorado', 'Illinois', 'Ohio', 'Pennsylvania', 'Arizona', 'Georgia'],
    disciplineBias: ['folkstyle_wrestling', 'freestyle_wrestling', 'boxing', 'bjj'],
    maleFirst: ['Marcus', 'Cole', 'Dante', 'Tyler', 'Brandon', 'Jared', 'Malik', 'Trevor', 'Devin', 'Corey', 'Shane', 'Austin', 'Xavier', 'Blake'],
    femaleFirst: ['Alexis', 'Danielle', 'Jasmine', 'Cassidy', 'Brooke', 'Morgan', 'Tiana', 'Kayla', 'Sierra', 'Nicole', 'Reagan', 'Simone'],
    last: ['Vale', 'Corbin', 'Hargrove', 'Whitlock', 'Sandoval', 'Brennan', 'Okafor', 'Delgado', 'Mercer', 'Kowalczyk', 'Rhodes', 'Sutton', 'Ferrell', 'Boone', 'Castellano', 'Pike'],
  },
  {
    code: 'BRA', name: 'Brazil', weight: 15,
    regions: ['Rio de Janeiro', 'São Paulo', 'Curitiba', 'Belém', 'Fortaleza', 'Manaus', 'Porto Alegre'],
    disciplineBias: ['bjj', 'muay_thai', 'submission_grappling'],
    maleFirst: ['Rafael', 'Thiago', 'Vinícius', 'Bruno', 'Caio', 'Everton', 'Douglas', 'Matheus', 'Ronaldo', 'Igor', 'Wallace', 'Diego', 'Leandro', 'Fábio'],
    femaleFirst: ['Amanda', 'Larissa', 'Jéssica', 'Bianca', 'Camila', 'Priscila', 'Rayssa', 'Vanessa', 'Tainara', 'Luana'],
    last: ['Moraes', 'Bastos', 'Queiroz', 'Amaral', 'Teixeira', 'Rocha', 'Nogueira', 'Vasconcelos', 'Falcão', 'Bittencourt', 'Andrade', 'Peixoto', 'Cavalcanti', 'Guimarães', 'Barreto', 'Salgado'],
  },
  {
    code: 'RUS', name: 'Russia', weight: 11,
    regions: ['Dagestan', 'Chechnya', 'Moscow', 'Saint Petersburg', 'Krasnodar', 'Bashkortostan', 'Ossetia'],
    disciplineBias: ['sambo', 'freestyle_wrestling', 'judo'],
    maleFirst: ['Ruslan', 'Timur', 'Artem', 'Islam', 'Magomed', 'Shamil', 'Zaur', 'Anatoly', 'Vadim', 'Rustam', 'Askar', 'Gadzhi', 'Denis', 'Ilyas'],
    femaleFirst: ['Yana', 'Anastasia', 'Marina', 'Liana', 'Polina', 'Ksenia', 'Aiza', 'Darya', 'Elvira'],
    last: ['Gaziev', 'Ismailov', 'Tarasov', 'Bekov', 'Kurbanov', 'Zhukov', 'Aliyev', 'Sadulaev', 'Voronin', 'Magomedov', 'Terekhin', 'Nurgaliev', 'Osipov', 'Dzhabrailov', 'Semyonov', 'Rakhimov'],
  },
  {
    code: 'MEX', name: 'Mexico', weight: 6,
    regions: ['Mexico City', 'Guadalajara', 'Monterrey', 'Tijuana', 'Puebla', 'Mérida'],
    disciplineBias: ['boxing', 'bjj'],
    maleFirst: ['Alejandro', 'Emiliano', 'Rodrigo', 'Ángel', 'Iván', 'Santiago', 'Joaquín', 'Ramiro', 'Efraín', 'Cuauhtémoc', 'Néstor', 'Lalo'],
    femaleFirst: ['Valeria', 'Ximena', 'Itzel', 'Renata', 'Fernanda', 'Guadalupe', 'Paola', 'Citlali'],
    last: ['Arreola', 'Zamudio', 'Cervantes', 'Robledo', 'Ontiveros', 'Betancourt', 'Villalobos', 'Escárcega', 'Nájera', 'Quintanilla', 'Serrato', 'Palomino'],
  },
  {
    code: 'ENG', name: 'England', weight: 6,
    regions: ['London', 'Liverpool', 'Manchester', 'Birmingham', 'Newcastle', 'Bristol', 'Leeds'],
    disciplineBias: ['boxing', 'bjj', 'freestyle_wrestling'],
    maleFirst: ['Callum', 'Liam', 'Harvey', 'Reece', 'Declan', 'Josh', 'Kieran', 'Ashley', 'Nathan', 'Ollie', 'Jordan', 'Freddie'],
    femaleFirst: ['Molly', 'Chloe', 'Georgia', 'Hollie', 'Imani', 'Sophie', 'Bethany', 'Amber'],
    last: ['Fenwick', 'Ashcroft', 'Brailsford', 'Hollings', 'Marchetti', 'Wray', 'Pemberton', 'Dunmore', 'Kettering', 'Salford', 'Rennick', 'Trescott'],
  },
  {
    code: 'IRL', name: 'Ireland', weight: 3,
    regions: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Belfast'],
    disciplineBias: ['boxing', 'bjj'],
    maleFirst: ['Cian', 'Eoin', 'Fionn', 'Darragh', 'Padraig', 'Ronan', 'Cormac', 'Oisín', 'Killian'],
    femaleFirst: ['Aoife', 'Saoirse', 'Niamh', 'Róisín', 'Ciara', 'Orla'],
    last: ["O'Rourke", 'Kavanagh', 'Lenihan', 'Mulcahy', 'Doheny', 'Fahey', 'Corrigan', 'Nolan', 'Ferriter', 'Brannigan'],
  },
  {
    code: 'POL', name: 'Poland', weight: 4,
    regions: ['Warsaw', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań', 'Łódź'],
    disciplineBias: ['freestyle_wrestling', 'kickboxing', 'bjj'],
    maleFirst: ['Mateusz', 'Kacper', 'Bartosz', 'Damian', 'Sebastian', 'Marcin', 'Grzegorz', 'Wojciech', 'Rafał', 'Tomasz'],
    femaleFirst: ['Zuzanna', 'Karolina', 'Agnieszka', 'Weronika', 'Magdalena', 'Iwona'],
    last: ['Wysocki', 'Zieliński', 'Ostrowski', 'Malinowski', 'Rutkowski', 'Bąk', 'Sikora', 'Górecki', 'Adamczyk', 'Lewandowicz'],
  },
  {
    code: 'JPN', name: 'Japan', weight: 5,
    regions: ['Tokyo', 'Osaka', 'Saitama', 'Fukuoka', 'Nagoya', 'Sapporo'],
    disciplineBias: ['judo', 'karate', 'submission_grappling', 'freestyle_wrestling'],
    maleFirst: ['Kenta', 'Hiroto', 'Sota', 'Riku', 'Yuma', 'Daiki', 'Naoya', 'Shohei', 'Takumi', 'Ryuji'],
    femaleFirst: ['Ayaka', 'Rina', 'Mei', 'Kaori', 'Yui', 'Saki', 'Natsumi'],
    last: ['Ishimura', 'Kawabata', 'Tsujimoto', 'Nakagawa', 'Ogasawara', 'Hoshino', 'Sakuraba', 'Kondo', 'Mizuhara', 'Fujinami'],
  },
  {
    code: 'KOR', name: 'South Korea', weight: 3,
    regions: ['Seoul', 'Busan', 'Incheon', 'Daegu'],
    disciplineBias: ['taekwondo', 'judo', 'boxing'],
    maleFirst: ['Jae-won', 'Min-seok', 'Do-yun', 'Seung-hyun', 'Tae-yang', 'Ji-ho', 'Chan-woo'],
    femaleFirst: ['Ji-woo', 'Seo-yeon', 'Ha-eun', 'Min-ji', 'Yu-jin'],
    last: ['Baek', 'Choe', 'Hwang', 'Jeong', 'Nam', 'Ryu', 'Seok', 'Yoon', 'Gwak', 'Pyo'],
  },
  {
    code: 'CHN', name: 'China', weight: 4,
    regions: ['Beijing', 'Shanghai', 'Chengdu', 'Guangzhou', 'Xi\'an', 'Inner Mongolia'],
    disciplineBias: ['sanda', 'freestyle_wrestling', 'boxing'],
    maleFirst: ['Wei', 'Haoran', 'Jianguo', 'Zhenyu', 'Lianjie', 'Bolin', 'Qiang', 'Yulong'],
    femaleFirst: ['Yaxin', 'Meilin', 'Jinghua', 'Xiulan', 'Ruoxi'],
    last: ['Bao', 'Cheng', 'Dou', 'Fang', 'Geng', 'Hui', 'Lang', 'Mo', 'Qiao', 'Shen', 'Tang', 'Xue'],
  },
  {
    code: 'THA', name: 'Thailand', weight: 3,
    regions: ['Bangkok', 'Chiang Mai', 'Phuket', 'Buriram', 'Khon Kaen'],
    disciplineBias: ['muay_thai'],
    maleFirst: ['Somchai', 'Anuwat', 'Kiatisak', 'Thanapon', 'Nattapong', 'Sarawut', 'Chaiyaphum'],
    femaleFirst: ['Nong', 'Pim', 'Kanya', 'Sarocha', 'Duangjai'],
    last: ['Sitthichai', 'Rungrueang', 'Phromchan', 'Wongsawat', 'Chaiyasit', 'Boonmee', 'Naruemon'],
  },
  {
    code: 'NGA', name: 'Nigeria', weight: 3,
    regions: ['Lagos', 'Abuja', 'Kano', 'Port Harcourt', 'Ibadan'],
    disciplineBias: ['boxing', 'kickboxing', 'freestyle_wrestling'],
    maleFirst: ['Chidi', 'Emeka', 'Tunde', 'Ifeanyi', 'Obinna', 'Segun', 'Kelechi', 'Femi'],
    femaleFirst: ['Adaeze', 'Ngozi', 'Chiamaka', 'Yewande', 'Zainab'],
    last: ['Adeyemi', 'Nwachukwu', 'Balogun', 'Eze', 'Okonkwo', 'Abiodun', 'Uzoma', 'Olamide'],
  },
  {
    code: 'FRA', name: 'France', weight: 4,
    regions: ['Paris', 'Marseille', 'Lyon', 'Lille', 'Toulouse'],
    disciplineBias: ['judo', 'kickboxing', 'boxing'],
    maleFirst: ['Baptiste', 'Enzo', 'Théo', 'Yanis', 'Nathan', 'Amine', 'Loïc', 'Cédric'],
    femaleFirst: ['Manon', 'Léa', 'Camille', 'Océane', 'Inès'],
    last: ['Lefevre', 'Bouchard', 'Marchand', 'Delacroix', 'Traoré', 'Vasseur', 'Baumann', 'Charrier'],
  },
  {
    code: 'NLD', name: 'Netherlands', weight: 3,
    regions: ['Amsterdam', 'Rotterdam', 'Utrecht', 'Eindhoven', 'The Hague'],
    disciplineBias: ['dutch_kickboxing', 'kickboxing', 'judo'],
    maleFirst: ['Sven', 'Jelle', 'Bram', 'Ruben', 'Thijs', 'Daan', 'Joost', 'Marnix'],
    femaleFirst: ['Fenna', 'Sanne', 'Lieke', 'Maud', 'Roos'],
    last: ['van Dijk', 'Verhoeven', 'Bakker', 'de Groot', 'Hendriks', 'van Leeuwen', 'Kuipers', 'Molenaar'],
  },
  {
    code: 'GEO', name: 'Georgia', weight: 2,
    regions: ['Tbilisi', 'Kutaisi', 'Batumi', 'Gori'],
    disciplineBias: ['judo', 'sambo', 'greco_roman'],
    maleFirst: ['Giorgi', 'Levan', 'Irakli', 'Zurab', 'Nika', 'Beka', 'Vakhtang'],
    femaleFirst: ['Nino', 'Ana', 'Mariam', 'Tamar'],
    last: ['Kvaratskhelia', 'Beridze', 'Chkheidze', 'Gogoladze', 'Tsiklauri', 'Mikaberidze', 'Janashvili'],
  },
  {
    code: 'KAZ', name: 'Kazakhstan', weight: 2,
    regions: ['Almaty', 'Astana', 'Shymkent', 'Karaganda'],
    disciplineBias: ['boxing', 'freestyle_wrestling', 'sambo'],
    maleFirst: ['Yerlan', 'Nurlan', 'Daniyar', 'Almas', 'Bekzat', 'Aidos', 'Sanzhar'],
    femaleFirst: ['Aigerim', 'Dana', 'Zhanel', 'Madina'],
    last: ['Zhaksylykov', 'Serikbayev', 'Tulegenov', 'Abenov', 'Kaliyev', 'Nurpeisov', 'Omarov'],
  },
  {
    code: 'AUS', name: 'Australia', weight: 3,
    regions: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    disciplineBias: ['boxing', 'bjj', 'muay_thai'],
    maleFirst: ['Jayden', 'Kai', 'Lachlan', 'Beau', 'Riley', 'Hamish', 'Tyson'],
    femaleFirst: ['Tayla', 'Indi', 'Bridie', 'Charlee', 'Meg'],
    last: ['Callaghan', 'Whittaker', 'Doust', 'Hardacre', 'Prentice', 'Bannister', 'Tuiala'],
  },
  {
    code: 'CAN', name: 'Canada', weight: 3,
    regions: ['Montréal', 'Toronto', 'Vancouver', 'Calgary', 'Halifax'],
    disciplineBias: ['freestyle_wrestling', 'bjj', 'boxing'],
    maleFirst: ['Étienne', 'Nolan', 'Gabriel', 'Owen', 'Léo', 'Braden', 'Mathis'],
    femaleFirst: ['Élodie', 'Hailey', 'Maude', 'Payton', 'Sadie'],
    last: ['Tremblay', 'Boucher', 'Lapointe', 'Ferland', 'Harrow', 'Beauchamp', 'Cardinal'],
  },
];

export const NICKNAMES: readonly string[] = [
  'The Anvil', 'Bad Intentions', 'Cold Steel', 'The Surgeon', 'Nightfall', 'The Riddle', 'Little Bear',
  'The Blueprint', 'Hurricane', 'The Watchmaker', 'Pitbull', 'Silent Storm', 'The Professor', 'Iron Lung',
  'The Butcher', 'Sandman', 'The Machine', 'Wildfire', 'Steel City', 'The Python', 'Blackout', 'Kingfisher',
  'The Mongoose', 'Thunderclap', 'Ghost', 'The Hammer', 'Quicksand', 'Rolling Thunder', 'The Alchemist',
  'Bonecrusher', 'The Lion', 'Red Mist', 'Stonewall', 'The Barber', 'Highlander', 'The Spider', 'Frostbite',
  'The Cobra', 'Slow Burn', 'The Marshal', 'Gravedigger', 'Firecracker', 'The Technician', 'Deadbolt',
];

/** First half of a gym name. */
export const CAMP_PREFIXES: readonly string[] = [
  'Iron', 'Black', 'Apex', 'Titan', 'Vanguard', 'Granite', 'Storm', 'Crown', 'Sable', 'Forge', 'Summit',
  'Ronin', 'Anvil', 'Wolf', 'Northgate', 'Redline', 'Ironwood', 'Cobalt', 'Hollow', 'Praetorian', 'Kestrel',
  'Meridian', 'Basalt', 'Sundown', 'Ember', 'Bastion', 'Harbor', 'Lodestone', 'Vertex', 'Quarry',
];

export const CAMP_MIDDLES: readonly string[] = [
  'Temple', 'Mountain', 'House', 'Works', 'Yard', 'Ridge', 'Lab', 'Athletic', 'Combat', 'Fight', 'Union',
  'Academy', 'Institute', 'Foundry', 'Compound', 'Circle', 'Row', 'Guard', 'Camp',
];

export const CAMP_SUFFIXES: readonly string[] = [
  'MMA', 'Combat Academy', 'Fight Club', 'Martial Arts', 'Athletics', 'Fight Team', 'Training Center',
  'Combat Sports', 'MMA Academy', 'Performance', 'Gym',
];

const BY_CODE = new Map(NATIONALITIES.map((n) => [n.code, n]));

export function nationality(code: string): NationalityProfile {
  const found = BY_CODE.get(code);
  if (!found) throw new RangeError(`Unknown nationality: ${code}`);
  return found;
}
