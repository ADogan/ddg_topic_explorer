  export interface Maintainer {
      github: string;
  }

  export interface Developer {
      url: string;
      type: string;
      name: string;
  }

  export interface SrcOptions {
      source_skip: string;
      skip_image_name: number;
      skip_end: string;
      language: string;
      skip_abstract_paren: number;
      is_wikipedia: number;
      directory: string;
      min_abstract_length: string;
      skip_icon: number;
      is_fanon: number;
      skip_abstract: number;
      is_mediawiki: number;
      skip_qr: string;
      src_info: string;
  }

  export interface Meta {
      id: string;
      maintainer: Maintainer;
      example_query: string;
      src_url?: any;
      description: string;
      src_name: string;
      js_callback_name: string;
      live_date?: any;
      production_state: string;
      designer?: any;
      unsafe: number;
      blockgroup?: any;
      attribution?: any;
      src_id: number;
      created_date?: any;
      developer: Developer[];
      tab: string;
      signal_from: string;
      dev_date?: any;
      src_domain: string;
      perl_module: string;
      topic: string[];
      repo: string;
      is_stackexchange?: any;
      dev_milestone: string;
      producer?: any;
      status: string;
      name: string;
      src_options: SrcOptions;
  }

  export interface Icon {
      Width: string;
      URL: string;
      Height: string;
  }

  export interface Icon2 {
      Width: any;
      Height: any;
      URL: string;
  }

  export interface Topic {
      Result: string;
      Icon: Icon2;
      Text: string;
      FirstURL: string;
      Topics?: Topic[];
      Name?: string;
  }

  export interface DDGTopicsResponse {
      DefinitionURL: string;
      ImageWidth: number;
      Results: any[];
      DefinitionSource: string;
      AbstractText: string;
      Definition: string;
      Heading: string;
      AbstractURL: string;
      meta: Meta;
      Type: string;
      Infobox: string;
      Image: string;
      Answer: string;
      AbstractSource: string;
      Abstract: string;
      ImageHeight: number;
      RelatedTopics: Topic[];
      Entity: string;
      Redirect: string;
      AnswerType: string;
      ImageIsLogo: number;
  }

