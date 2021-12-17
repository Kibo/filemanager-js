/**
 * Base interface for Node (File, Directory) type
 *
 * @key - the unique ID of object
 * @name - the name of file or folder
 * @type - type of file(Image, Text, ...). For directory set "Folder".
 * @children - array of children. This property has only Folder.
 * @leaf - lazy loading indicator. For files set true. For folders set false.
 */
export interface INode {
  key: string;
  data: {
    name: string;
    size: string;
    type: string;
  };
  children?: INode[];
  leaf: boolean;
}
