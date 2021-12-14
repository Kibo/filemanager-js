export interface INode {
  key: string;
  data: {
    name: string;
    size: string;
    type: string;
  };
  children?: INode[];
}
