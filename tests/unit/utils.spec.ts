import Utils from "@/utils/Utils";

describe("getDirsFromTree(nodes)", () => {
  it("it returns dirs only", () => {
    const dirsTree = Utils.getDirsFromTree(filesystem.root);
    expect(dirsTree.length).toBe(3);
    expect(dirsTree[0]?.children?.length).toBe(1);
    expect(dirsTree[1]?.children?.length).toBe(0);
    expect(dirsTree[2]?.children?.length).toBe(1);
  });
});

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

describe("getPath(nodes, node)", () => {
  it("it returns path to root node", () => {
    let nodeKey, parentKey, node, parents;

    nodeKey = "0";
    node = Utils.findNodeByKey(filesystem.root, nodeKey);
    parents = Utils.getPath(filesystem.root, node);
    expect(parents.length).toBe(1);
    expect(parents[0].key).toBe("0");

    nodeKey = "0-1";
    node = Utils.findNodeByKey(filesystem.root, nodeKey);
    parents = Utils.getPath(filesystem.root, node);
    expect(parents.length).toBe(2);
    expect(parents[0].key).toBe("0");
    expect(parents[1].key).toBe("0-1");

    nodeKey = "0-1-1";
    node = Utils.findNodeByKey(filesystem.root, nodeKey);
    parents = Utils.getPath(filesystem.root, node);
    expect(parents.length).toBe(3);
    expect(parents[0].key).toBe("0");
    expect(parents[1].key).toBe("0-1");
    expect(parents[2].key).toBe("0-1-1");

    nodeKey = "3-1-0-0";
    node = Utils.findNodeByKey(filesystem.root, nodeKey);
    parents = Utils.getPath(filesystem.root, node);
    expect(parents.length).toBe(4);
    expect(parents[0].key).toBe("3");
    expect(parents[1].key).toBe("3-1");
    expect(parents[2].key).toBe("3-1-0");
    expect(parents[3].key).toBe("3-1-0-0");

    nodeKey = "undefined-key";
    node = Utils.findNodeByKey(filesystem.root, nodeKey);
    parents = Utils.getPath(filesystem.root, node);
    expect(parents).toEqual([]);
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
    {
      key: "3",
      data: {
        name: "Testa",
        size: "20kb",
        type: "Folder",
      },
      children: [
        {
          key: "3-0",
          data: {
            name: "pic1.jpg",
            size: "20kb",
            type: "Image",
          },
        },
        {
          key: "3-1",
          data: {
            name: "Pesta",
            size: "20kb",
            type: "Folder",
          },
          children: [
            {
              key: "3-1-0",
              data: {
                name: "Kesta",
                size: "20kb",
                type: "Folder",
              },
              children: [
                {
                  key: "3-1-0-0",
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
      ],
    },
  ],
};
