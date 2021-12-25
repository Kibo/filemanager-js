import { INode } from "../types";
import Utils from "../utils/Utils";
import axios from "axios";

const SERVER_URL = "http://localhost:3000";

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
  try {
    let response = await axios.post(SERVER_URL + "/manager/filemanager/list", {
      url: url,
    });
    parent.children = response.data;
  } catch (err) {
    throw new Error(err);
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
  try {
    let response = await axios.post(
      SERVER_URL + "/manager/filemanager/rename",
      {
        url: url,
        name: name,
      }
    );
    node.data.name = response.data.name;
  } catch (err) {
    throw new Error(err);
  }

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
  try {
    let response = await axios.post(
      SERVER_URL + "/manager/filemanager/remove",
      {
        url: url,
      }
    );
  } catch (err) {
    throw new Error(err);
  }

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
  try {
    let response = await axios.post(SERVER_URL + "/manager/filemanager/mkdir", {
      url: parentUrl,
      name: name,
    });
    parent?.children?.push(response.data);
  } catch (err) {
    throw new Error(err);
  }

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
  let pack = files.map((f: any) => {
    return {
      objectURL: f.objectURL,
      name: f.name,
      size: f.size,
      type: f.type,
    };
  });

  try {
    let response = await axios.post(
      SERVER_URL + "/manager/filemanager/uploads",
      {
        url: url,
        files: pack,
      }
    );

    if (parent.children) {
      parent.children = [...parent.children, ...response.data];
    }
  } catch (err) {
    throw new Error(err);
  }

  return parent;
}
