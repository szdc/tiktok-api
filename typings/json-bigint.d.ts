declare module 'json-bigint' {
  declare namespace JSONBig {
    function parse(text: string, reviver?: (key: any, value: any) => any): any;
    function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string;
    function stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;
  }

  declare interface JSONBigOptions {
    storeAsString?: boolean;
    strict?: boolean;
  }

  declare function JSONBig(options: JSONBigOptions): {
    parse: JSONBig.parse;
    stringify: JSONBig.stringify;
  };

  export = JSONBig;
  export as namespace JSONBig;
}
