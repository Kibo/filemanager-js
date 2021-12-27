import { INode } from "../types";
import filesystem from "../data/filesystem.json";
import Utils from "../utils/Utils";
import axios from "axios";
const { v4: uuidv4 } = require("uuid");
let branches: any = filesystem;

// #########################
// ## Mock backend API    ##
// #########################

/**
 * Get all nodes from parent
 *
 * @async
 * @throws {Error} - throw Error when occurs
 *
 * @param {string} url
 * @param {INode} parent - parent folder
 * @return {INode} - updated parent
 */
export async function list(url: string, parent: INode): Promise<INode> {
  if (parent.children && parent.children.length == 0) {
    parent.children = branches[parent.key];
  }
  return parent;
}

/**
 * Rename a node
 *
 * @async
 * @throws {Error} - throw Error when occurs
 *
 * @param {string} url
 * @param {INode} node - the node to rename
 * @param {string} name - new name
 * @return {INode} - updated node
 */
export async function rename(
  url: string,
  node: INode,
  name: string
): Promise<INode> {
  node.data.name = name;
  return node;
}

/**
 * Remove a node
 *
 * @async
 * @throws {Error} - throw Error when occurs
 *
 * @param {string} url
 * @param {INode} node - file or directory node
 * @return {INode} - deleted node
 */
export async function remove(url: string, node: INode): Promise<INode> {
  return node;
}

/**
 * Create a directory
 *
 * @async
 * @throws {Error} - throw Error when occurs
 *
 * @param {string} parentUrl
 * @param {INode} parent
 * @param {string} name - name of the new directory
 * @return {INode} - parent
 */
export async function mkdir(
  parentUrl: string,
  parent: INode,
  name: string
): Promise<INode> {
  let dir = {
    key: uuidv4(),
    data: { name: name, size: "100kb", type: "Folder" },
    children: [],
    leaf: false,
  };

  parent?.children && parent.children.push(dir);
  return parent;
}

/**
 * Uploads files to a directory
 *
 * @async
 * @throws {Error} - throw Error when occurs
 *
 * @param {string} url
 * @param {INode} parent - parent folder
 * @param {Array[]} files
 * @return {INode} - parent
 */
export async function uploads(
  url: string,
  parent: INode,
  files: any
): Promise<INode> {
  let nodes = files.map((f: any) => {
    return {
      key: uuidv4(),
      data: { name: f.name, size: f.size / 1000 + "kb", type: "Image" },
      leaf: true,
    };
  });

  if (parent.children) {
    parent.children = [...parent.children, ...nodes];
  }
  return parent;
}
