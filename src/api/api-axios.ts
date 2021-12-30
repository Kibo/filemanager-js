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
  const list = async function (url: string) {
    try {
      return await axios.post(SERVER_URL + "/manager/filemanager/list", {
        url: url,
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  let { data }: { data: INode[] } = await list(url);
  if (!Array.isArray(data)) {
    throw new Error("Canot read files from " + url);
  }
  parent.children = data;

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
  const rename = async function (url: string, name: string) {
    try {
      return await axios.post(SERVER_URL + "/manager/filemanager/rename", {
        url: url,
        name: name,
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  let { data } = await rename(url, name);
  if (!data.success) {
    throw new Error("Canot rename node with url " + url);
  }
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
  const remove = async function (url: string) {
    try {
      return await axios.post(SERVER_URL + "/manager/filemanager/remove", {
        url: url,
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  let { data } = await remove(url);
  if (!data.success) {
    throw new Error("Canot remove node with url " + url);
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
  const mkdir = async function (url: string, name: string) {
    try {
      return await axios.post(SERVER_URL + "/manager/filemanager/mkdir", {
        url: parentUrl,
        name: name,
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  let { data }: { data: INode } = await mkdir(parentUrl, name);
  if (data?.data?.type != Utils.TYPE_FOLDER) {
    throw new Error("Canot create folder with nam e " + name);
  }
  parent?.children?.push(data);

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

  for (let f of pack) {
    const blob2file = async function (blobUrl: string) {
      try {
        return await axios.get(blobUrl, {
          responseType: "blob",
        });
      } catch (err) {
        throw new Error(err);
      }
    };

    let { data } = await blob2file(f.objectURL);

    const form = new FormData();
    form.append("url", url);
    form.append("file", data, f.name);

    const sendFile = async function (fData: FormData) {
      try {
        return await axios.post(
          SERVER_URL + "/manager/filemanager/uploads",
          fData,
          {
            headers: {
              "Content-Type": `multipart/form-data; boundary=${f.name}`,
            },
          }
        );
      } catch (err) {
        throw new Error(err);
      }
    };

    let { data: child } = await sendFile(form);
    if (!child.key) {
      throw new Error("Canot uploade file with name " + f.name);
    }
    parent?.children?.push(child);
  }

  return parent;
}
