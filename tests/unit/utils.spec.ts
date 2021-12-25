import Utils from "@/utils/Utils";

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

describe("removeNode(nodes, node)", () => {
  it("it removes node from nodes", () => {
    let nodeKey, node;

    const ROOT = JSON.parse(JSON.stringify(filesystem.root));

    nodeKey = "0-1-1";
    node = Utils.findNodeByKey(ROOT, nodeKey);
    expect(node?.key).toBe(nodeKey);
    Utils.removeNode(ROOT, node);
    node = Utils.findNodeByKey(ROOT, nodeKey);
    expect(node).toBeUndefined();

    nodeKey = "3-1-0";
    node = Utils.findNodeByKey(ROOT, nodeKey);
    expect(node?.key).toBe(nodeKey);
    Utils.removeNode(ROOT, node);
    node = Utils.findNodeByKey(ROOT, nodeKey);
    expect(node).toBeUndefined();

    nodeKey = "2";
    node = Utils.findNodeByKey(ROOT, nodeKey);
    expect(node?.key).toBe(nodeKey);
    Utils.removeNode(ROOT, node);
    node = Utils.findNodeByKey(ROOT, nodeKey);
    expect(node).toBeUndefined();
  });
});

describe("getURL(pathOfNodes)", () => {
  it("it returns URL", () => {
    let key, node, pathOfNodes;

    key = "1";
    node = Utils.findNodeByKey(filesystem.root, key);
    pathOfNodes = Utils.getPath(filesystem.root, node);
    expect(Utils.getUrl(pathOfNodes)).toEqual("/Documents2");

    key = "0-1-1";
    node = Utils.findNodeByKey(filesystem.root, key);
    pathOfNodes = Utils.getPath(filesystem.root, node);
    expect(Utils.getUrl(pathOfNodes)).toEqual("/Documents/Home/pic1.jpg");

    key = "3-1-0-0";
    node = Utils.findNodeByKey(filesystem.root, key);
    pathOfNodes = Utils.getPath(filesystem.root, node);
    expect(Utils.getUrl(pathOfNodes)).toEqual("/Testa/Pesta/Kesta/pic1.jpg");
  });
});

describe("replace(nodes, node)", () => {
  it("it replaces node in list", () => {
    const ROOT = JSON.parse(JSON.stringify(filesystem.root));
    let key, node, n;

    node = {
      key: "1",
      data: {
        name: "Documents2-updated",
        size: "100kb",
        type: "Folder",
      },
      leaf: false,
      children: [],
    };

    n = Utils.findNodeByKey(ROOT, node.key);
    expect(n.data.name).toEqual("Documents2");
    Utils.replace(ROOT, node);
    expect(Utils.findNodeByKey(ROOT, node.key).data.name).toEqual(
      node.data.name
    );

    node = {
      key: "3-1-0-0",
      data: {
        name: "pic100.jpg",
        size: "20kb",
        type: "Image",
      },
      leaf: true,
    };

    n = Utils.findNodeByKey(ROOT, node.key);
    expect(n.data.name).toEqual("pic1.jpg");
    Utils.replace(ROOT, node);
    expect(Utils.findNodeByKey(ROOT, node.key).data.name).toEqual(
      node.data.name
    );
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
      leaf: false,
      children: [
        {
          key: "0-1",
          data: {
            name: "Home",
            size: "20kb",
            type: "Folder",
          },
          leaf: false,
          children: [
            {
              key: "0-1-0",
              data: {
                name: "ABC",
                size: "20kb",
                type: "Folder",
              },
              leaf: false,
              children: [],
            },
            {
              key: "0-1-1",
              data: {
                name: "pic1.jpg",
                size: "20kb",
                type: "Image",
              },
              leaf: true,
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
      leaf: false,
      children: [],
    },
    {
      key: "2",
      data: {
        name: "pic1.jpg",
        size: "20kb",
        type: "Image",
      },
      leaf: true,
    },
    {
      key: "3",
      data: {
        name: "Testa",
        size: "20kb",
        type: "Folder",
      },
      leaf: false,
      children: [
        {
          key: "3-0",
          data: {
            name: "pic1.jpg",
            size: "20kb",
            type: "Image",
          },
          leaf: true,
        },
        {
          key: "3-1",
          data: {
            name: "Pesta",
            size: "20kb",
            type: "Folder",
          },
          leaf: false,
          children: [
            {
              key: "3-1-0",
              data: {
                name: "Kesta",
                size: "20kb",
                type: "Folder",
              },
              leaf: false,
              children: [
                {
                  key: "3-1-0-0",
                  data: {
                    name: "pic1.jpg",
                    size: "20kb",
                    type: "Image",
                  },
                  leaf: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
