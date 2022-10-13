
export class TopElementInfo {
  id: number;
  points: number;

  constructor(id: number, points: number,){
      this.id = id;
      this.points =  points;
  }
}

export class Chip {
  chip_name: string;
  num_played: number;

  constructor(chip_name: string, num_played: number,){
      this.chip_name = chip_name;
      this.num_played = num_played;
  }
}

export class GW{
  name: string;
  deadline_time: string;

  constructor(  name: string,
    deadline_time: string,){
      this.name = name;
      this.deadline_time = deadline_time;
  }
}
export class Event {
  id: number;
  name: string;
  deadline: string;
  avarage_entry_score: number;
  finished: boolean;
  data_checked: true;
  highest_scoring_entry: number;
  deadline_time_epoch: number;
  deadline_time_game_offset: number;
  highest_score: number;
  is_previous: boolean;
  is_current: boolean;
  is_next: boolean;
  cup_leagues_created: boolean;
  h2h_ko_matches_created: boolean;
  chip_plays: Chip[];
  most_selected: number;
  most_transferred_in: number;
  top_element: number;
  top_element_info: TopElementInfo;
  transfers_made: number;
  most_captained: number;
  most_vice_captained: number;

  constructor(    id: number,
      name: string,
      deadline: string,
      avarage_entry_score: number,
      finished: boolean,
      data_checked: true,
      highest_scoring_entry: number,
      deadline_time_epoch: number,
      deadline_time_game_offset: number,
      highest_score: number,
      is_previous: boolean,
      is_current: boolean,
      is_next: boolean,
      cup_leagues_created: boolean,
      h2h_ko_matches_created: boolean,
      chip_plays: Chip[],
      most_selected: number,
      most_transferred_in: number,
      top_element: number,
      top_element_info: TopElementInfo,
      transfers_made: number,
      most_captained: number,
      most_vice_captained: number,){
      this.id =  id;
      this.name =  name;
      this.deadline =  deadline;
      this.avarage_entry_score =  avarage_entry_score;
      this.finished = finished;
      this.data_checked =  data_checked;
      this.highest_scoring_entry =  highest_scoring_entry;
      this.deadline_time_epoch =  deadline_time_epoch;
      this.deadline_time_game_offset =  deadline_time_game_offset;
      this.highest_score =  highest_score;
      this.is_previous = is_previous;
      this.is_current =  is_current;
      this.is_next =  is_next;
      this.cup_leagues_created =  cup_leagues_created;
      this.h2h_ko_matches_created =  h2h_ko_matches_created;
      this.chip_plays =  chip_plays;
      this.most_selected =  most_selected;
      this.most_transferred_in = most_transferred_in;
      this.top_element = top_element;
      this.top_element_info = top_element_info;
      this.transfers_made = transfers_made;
      this.most_captained = most_captained;
      this.most_vice_captained = most_vice_captained;
  }
}

export class GameSettings{
  league_join_private_max: number;
  league_join_public_max: number;
  league_max_size_public_classic: number;
  league_max_size_public_h2h: number;
  league_max_size_private_h2h: number;
  league_max_ko_rounds_private_h2h: number;
  league_prefix_public: string;
  league_points_h2h_win: number;
  league_points_h2h_lose: number;
  league_points_h2h_draw: number;
  league_ko_first_instead_of_random: boolean;
  cup_start_event_id: any;
  cup_stop_event: any;
  cup_qualifying_method: any;
  cup_type: any;
  squad_squadplay: number;
  squad_squadsize: number;
  squad_team_limit: number;
  squad_total_spend: number;
  ui_currency_multiplier: number;
  ui_use_special_shirts: boolean;
  ui_special_shirt_exclusions: any[];
  stats_form_days: number;
  sys_vice_captain_enabled: boolean;
  transfers_cap: number;
  transfers_sell_on_fee: number;
  league_h2h_tiebreaks_stats: string[];
  timezone: string;

  constructor(    league_join_private_max: number,
      league_join_public_max: number,
      league_max_size_public_classic: number,
      league_max_size_public_h2h: number,
      league_max_size_private_h2h: number,
      league_max_ko_rounds_private_h2h: number,
      league_prefix_public: string,
      league_points_h2h_win: number,
      league_points_h2h_lose: number,
      league_points_h2h_draw: number,
      league_ko_first_instead_of_random: boolean,
      cup_start_event_id: any,
      cup_stop_event: any,
      cup_qualifying_method: any,
      cup_type: any,
      squad_squadplay: number,
      squad_squadsize: number,
      squad_team_limit: number,
      squad_total_spend: number,
      ui_currency_multiplier: number,
      ui_use_special_shirts: boolean,
      ui_special_shirt_exclusions: any[],
      stats_form_days: number,
      sys_vice_captain_enabled: boolean,
      transfers_cap: number,
      transfers_sell_on_fee: number,
      league_h2h_tiebreaks_stats: string[],
      timezone: string,){
          this.league_join_private_max = league_join_private_max;
          this.league_join_public_max = league_join_public_max;
          this.league_max_size_public_classic = league_max_size_public_classic;
          this.league_max_size_public_h2h =league_max_size_public_h2h;
          this.league_max_size_private_h2h = league_max_size_private_h2h;
          this.league_max_ko_rounds_private_h2h = league_max_ko_rounds_private_h2h;
          this.league_prefix_public = league_prefix_public;
          this.league_points_h2h_win = league_points_h2h_win;
          this.league_points_h2h_lose = league_points_h2h_lose;
          this.league_points_h2h_draw = league_points_h2h_draw;
          this.league_ko_first_instead_of_random = league_ko_first_instead_of_random;
          this.cup_start_event_id = cup_start_event_id;
          this.cup_stop_event =cup_stop_event;
          this.cup_qualifying_method = cup_qualifying_method;
          this.cup_type = cup_type;
          this.squad_squadplay = squad_squadplay;
          this.squad_squadsize = squad_squadsize;
          this.squad_team_limit = squad_team_limit;
          this.squad_total_spend = squad_total_spend;
          this.ui_currency_multiplier = ui_currency_multiplier;
          this.ui_use_special_shirts = ui_use_special_shirts;
          this.ui_special_shirt_exclusions = ui_special_shirt_exclusions;
          this.stats_form_days = stats_form_days;
          this.sys_vice_captain_enabled = sys_vice_captain_enabled;
          this.transfers_cap = transfers_cap;
          this.transfers_sell_on_fee = transfers_sell_on_fee;
          this.league_h2h_tiebreaks_stats = league_h2h_tiebreaks_stats;
          this.timezone = timezone;
  }
}

export class Phase {
  id: number;
  name: string;
  start_event: number;
  stop_event: number;

  constructor(    id: number,
      name: string,
      start_event: number,
      stop_event: number,){
      this.id = id;
      this.name = name;
      this.start_event = start_event;
      this.stop_event = stop_event;
  }
}

export class Team {
  code: number;
  draw: number;
  form: any;
  id: number;
  loss: number;
  name: string;
  played: number;
  points: number;
  position: number;
  short_name: string;
  strength: number;
  team_divison: any;
  unavailabel: boolean;
  win: number;
  strength_overall_home: number;
  strength_overall_away: number;
  strength_attack_home: number;
  strength_attack_away: number;
  strength_defence_home: number;
  strength_defence_away: number;
  pulse_id: number;

  constructor(code: number,
      draw: number,
      form: any,
      id: number,
      loss: number,
      name: string,
      played: number,
      points: number,
      position: number,
      short_name: string,
      strength: number,
      team_divison: any,
      unavailabel: boolean,
      win: number,
      strength_overall_home: number,
      strength_overall_away: number,
      strength_attack_home: number,
      strength_attack_away: number,
      strength_defence_home: number,
      strength_defence_away: number,
      pulse_id: number,){
      this.code = code;
      this.draw = draw;
      this.form = form;
      this.id = id;
      this.loss = loss;
      this.name = name;
      this.played = played;
      this.points = points;
      this.position = position;
      this.short_name = short_name;
      this.strength = strength;
      this.team_divison = team_divison;
      this.unavailabel = unavailabel;
      this.win = win;
      this.strength_overall_home = strength_overall_home;
      this.strength_overall_away = strength_overall_away;
      this.strength_attack_home = strength_attack_home;
      this.strength_attack_away = strength_attack_away;
      this.strength_defence_home = strength_defence_home;
      this.strength_defence_away = strength_defence_away;
      this.pulse_id = pulse_id;
  }
}

export class Element {
  chance_of_playing_next_round: any;
  chance_of_playing_this_round: any;
  code: number;
  cost_change_event: number;
  cost_change_event_fall: number;
  cost_change_start: number;
  cost_change_start_fall: number;
  dreamteam_count: number;
  element_type: number;
  ep_next: string;
  ep_this: string;
  event_points: number;
  first_name: string;
  form: string;
  id: number;
  in_dreamteam: boolean;
  news: string;
  news_added: any;
  now_cost: number;
  photo: string;
  points_per_game: string;
  second_name: string;
  selected_by_percent: string;
  special: boolean;
  special_number: any;
  status: string;
  team: number;
  team_code: number;
  total_points: number;
  transfers_in: number;
  transfers_in_event: number;
  transfers_out: number;
  transfers_out_event: number;
  value_form: string;
  value_season: string;
  web_name: string;
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: string;
  creativity: string;
  threat: string;
  ict_index: string;
  influence_rank: number;
  influence_rank_type: number;
  creativity_rank: number;
  creativity_rank_type: number;
  threat_rank: number;
  threat_rank_type: number;
  ict_index_rank: number;
  ict_index_rank_type: number;
  corners_and_indirect_freekicks_order: number;
  corners_and_indirect_freekicks_text: string;
  direct_freekicks_order: number;
  direct_freekicks_text: string;
  penalties_order: any;
  penalties_text: string;

  constructor(    chance_of_playing_next_round: any,
      chance_of_playing_this_round: any,
      code: number,
      cost_change_event: number,
      cost_change_event_fall: number,
      cost_change_start: number,
      cost_change_start_fall: number,
      dreamteam_count: number,
      element_type: number,
      ep_next: string,
      ep_this: string,
      event_points: number,
      first_name: string,
      form: string,
      id: number,
      in_dreamteam: boolean,
      news: string,
      news_added: any,
      now_cost: number,
      photo: string,
      points_per_game: string,
      second_name: string,
      selected_by_percent: string,
      special: boolean,
      special_number: any,
      status: string,
      team: number,
      team_code: number,
      total_points: number,
      transfers_in: number,
      transfers_in_event: number,
      transfers_out: number,
      transfers_out_event: number,
      value_form: string,
      value_season: string,
      web_name: string,
      minutes: number,
      goals_scored: number,
      assists: number,
      clean_sheets: number,
      goals_conceded: number,
      own_goals: number,
      penalties_saved: number,
      penalties_missed: number,
      yellow_cards: number,
      red_cards: number,
      saves: number,
      bonus: number,
      bps: number,
      influence: string,
      creativity: string,
      threat: string,
      ict_index: string,
      influence_rank: number,
      influence_rank_type: number,
      creativity_rank: number,
      creativity_rank_type: number,
      threat_rank: number,
      threat_rank_type: number,
      ict_index_rank: number,
      ict_index_rank_type: number,
      corners_and_indirect_freekicks_order: number,
      corners_and_indirect_freekicks_text: string,
      direct_freekicks_order: number,
      direct_freekicks_text: string,
      penalties_order: any,
      penalties_text: string,){
      this.chance_of_playing_next_round = chance_of_playing_next_round;
      this.chance_of_playing_this_round = chance_of_playing_this_round;
      this.code = code;
      this.cost_change_event = cost_change_event;
      this.cost_change_event_fall = cost_change_event_fall;
      this.cost_change_start = cost_change_start;
      this.cost_change_start_fall = cost_change_start_fall;
      this.dreamteam_count = dreamteam_count;
      this.element_type = element_type;
      this.ep_next = ep_next;
      this.ep_this = ep_this;
      this.event_points = event_points;
      this.first_name = first_name;
      this.form = form;
      this.id = id;
      this.in_dreamteam = in_dreamteam;
      this.news = news;
      this.news_added = news_added;
      this.now_cost = now_cost;
      this.photo = photo;
      this.points_per_game = points_per_game;
      this.second_name = second_name;
      this.selected_by_percent = selected_by_percent;
      this.special = special;
      this.special_number =special_number;
      this.status = status;
      this.team = team;
      this.team_code = team_code;
      this.total_points = total_points;
      this.transfers_in = transfers_in;
      this.transfers_in_event = transfers_in_event;
      this.transfers_out = transfers_out;
      this.transfers_out_event = transfers_out_event;
      this.value_form = value_form;
      this.value_season = value_season;
      this.web_name = web_name;
      this.minutes = minutes;
      this.goals_scored = goals_scored;
      this.assists = assists;
      this.clean_sheets = clean_sheets;
      this.goals_conceded = goals_conceded;
      this.own_goals = own_goals;
      this.penalties_saved = penalties_saved;
      this.penalties_missed = penalties_missed;
      this.yellow_cards = yellow_cards;
      this.red_cards =red_cards;
      this.saves = saves;
      this.bonus = bonus;
      this.bps = bps;
      this.influence = influence;
      this.creativity = creativity;
      this.threat = threat;
      this.ict_index = ict_index;
      this.influence_rank = influence_rank;
      this.influence_rank_type = influence_rank_type;
      this.creativity_rank = creativity_rank;
      this.creativity_rank_type = creativity_rank_type;
      this.threat_rank = threat_rank;
      this.threat_rank_type = threat_rank_type;
      this.ict_index_rank = ict_index_rank;
      this.ict_index_rank_type = ict_index_rank_type;
      this.corners_and_indirect_freekicks_order = corners_and_indirect_freekicks_order;
      this.corners_and_indirect_freekicks_text = corners_and_indirect_freekicks_text;
      this.direct_freekicks_order = direct_freekicks_order;
      this.direct_freekicks_text = direct_freekicks_text;
      this.penalties_order = penalties_order;
      this.penalties_text = penalties_text;
  }
}

export class ElementStat {
  label: string;
  name: string;

  constructor(    label: string,
      name: string,){
      this.label = label;
      this.name = name;
  }
}

export class ElementType {
  id: number;
  plural_name: string;
  plural_name_short: string;
  singular_name: string;
  singular_name_short: string;
  squad_select: number;
  squad_min_play: number;
  squad_max_play: number;
  ui_shirt_specific: boolean;
  sub_positions_locked: number[];
  element_count: number;

  constructor( id: number, plural_name: string,
      plural_name_short: string,
      singular_name: string,
      singular_name_short: string,
      squad_select: number,
      squad_min_play: number,
      squad_max_play: number,
      ui_shirt_specific: boolean,
      sub_positions_locked: number[],
      element_count: number,){
      this.id = id;
      this.plural_name = plural_name;
      this.plural_name_short = plural_name_short;
      this.singular_name = singular_name;
      this.singular_name_short = singular_name_short;
      this.squad_select = squad_select;
      this.squad_min_play = squad_min_play;
      this.squad_max_play = squad_max_play;
      this.ui_shirt_specific = ui_shirt_specific;
      this.sub_positions_locked = sub_positions_locked;
      this.element_count = element_count;
  }
}

export class ApiModel {
  events: Event[];
  game_settings: GameSettings;
  phases: Phase[];
  teams: Team[];
  total_players: number;
  elements: Element[];
  element_stats: ElementStat[];
  element_types: ElementType[];

  constructor(    events: Event[],
  game_settings: GameSettings,
  phases: Phase[],
  teams: Team[],
  total_players: number,
  elements: Element[],
  element_stats: ElementStat[],
  element_types: ElementType[],){
      this.events = events;
      this.game_settings = game_settings;
      this.phases = phases;
      this.teams = teams;
      this.total_players = total_players;
      this.elements = elements;
      this.element_stats = element_stats;
      this.element_types = element_types;
  }
}

export class Crate {
    name: string;
    constructor (name: string){
      this.name=name;
    }
  }

export class Squad {
  name: string;
  players: Element[];

  constructor(name: string, players: Element[]){
    this.name=name;
    this.players=players;
  }
}

export class AllPlayers {
  gk: Element[];
  df: Element[];
  mf: Element[];
  fw: Element[];
  bench: Element[];
  
  constructor(  gk: Element[],
    df: Element[],
    mf: Element[],
    fw: Element[],
    bench: Element[],){
     this.gk = gk;
     this.df = df;
     this.mf = mf;
     this.fw = fw;
     this.bench = bench;
  }
}

export class PlayerModel {
  players: Element[];
  constructor(players: Element[]){
    this.players=players;
  }
}

export class JoinTournModel {
  owner: number;
  tournament: number;
  team_name: string;
  points: number;
  squad: any;
  team: any;
  team_bench: any;

  constructor(  owner: number,
    tournament: number,
    team_name: string,
    points: number,
    squad: PlayerModel,
    team: PlayerModel,
    team_bench: PlayerModel){
      this.owner = owner;
      this.tournament = tournament;
      this.team_name = team_name;
      this.points = points;
      this.squad = squad;
      this.team = team;
      this.team_bench = team_bench;
  }
}