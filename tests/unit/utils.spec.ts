import Utils from "@/utils/Utils";

/*
describe("getDirsFromTree(nodes)", () => {
  it("it returns dirs only", () => {
    const dirsTree = Utils.getDirsFromTree(filesystem.root);
    expect(dirsTree.length).toBe(2);
    expect(dirsTree[0]?.children?.length).toBe(1);
  });
});
*/

describe("findNodeByKey(node)", () => {
  it("return node", () => {
    let key, node;

    key = "0";
    node = Utils.findNodeByKey(filesystem.root, key);
    expect(node?.key).toBe(key);

    key = "1";
    node = Utils.findNodeByKey(filesystem.root, key);
    expect(node?.key).toBe(key);

    key = "2";
    node = Utils.findNodeByKey(filesystem.root, key);
    expect(node?.key).toBe(key);

    key = "0-1-0";
    node = Utils.findNodeByKey(filesystem.root, key);
    expect(node?.key).toBe(key);

    key = "0-1-1";
    node = Utils.findNodeByKey(filesystem.root, key);
    expect(node?.key).toBe(key);

    key = "abc";
    node = node = Utils.findNodeByKey(filesystem.root, key);
    expect(node?.key).toBeUndefined();
  });
});

describe("getParent(nodes, node)", () => {
  it("it returns parent of node", () => {
    let nodeKey, parentKey, node, parents;

    nodeKey = "0";
    node = Utils.findNodeByKey(filesystem.root, nodeKey);
    parents = Utils.getParents(filesystem.root, node);
    expect(parents).toEqual([]);

    nodeKey = "0-1";
    node = Utils.findNodeByKey(filesystem.root, nodeKey);
    parents = Utils.getParents(filesystem.root, node);
    expect(parents.length).toBe(1);
    expect(parents[0].key).toBe("0");

    nodeKey = "0-1-2";
    parentKey = "0-1";
    node = Utils.findNodeByKey(filesystem.root, nodeKey);
    parents = Utils.getParents(filesystem.root, node);
    expect(parents.length).toBe(2);
  });
});

const filesystem = {
  root: [
    {
      key: "0",
      data: {
        name: "Documents",
        size: "75kb",
        type: "Folder",
      },
      children: [
        {
          key: "0-1",
          data: {
            name: "Home",
            size: "20kb",
            type: "Folder",
          },
          children: [
            {
              key: "0-1-0",
              data: {
                name: "ABC",
                size: "20kb",
                type: "Folder",
              },
            },
            {
              key: "0-1-1",
              data: {
                name: "pic1.jpg",
                size: "20kb",
                type: "Image",
              },
            },
          ],
        },
      ],
    },
    {
      key: "1",
      data: {
        name: "Documents2",
        size: "100kb",
        type: "Folder",
      },
      children: [],
    },
    {
      key: "2",
      data: {
        name: "pic1.jpg",
        size: "20kb",
        type: "Image",
      },
    },
  ],
};
