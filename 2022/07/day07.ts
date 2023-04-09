const input = await Deno.readTextFile("./input.txt").then((input: string) =>
  input.trim()
);

type Dir = {
  dirs: Record<string, Dir>;
  size: number;
};

function isFile(str: string) {
  const fileRegex = /([0-9]+)\s([a-z\.]+)/;

  return Boolean(str.match(fileRegex));
}

function parseFileSize(fileString: string) {
  const [size] = fileString.split(" ");

  return Number(size);
}

function parseDir(dirString: string) {
  const [_, name] = dirString.split(" ");

  return name;
}

function isCd(str: string) {
  return str.startsWith("$ cd");
}

function solve(str: string) {
  const [_, ...lines] = str.split("\n");
  const root: Dir = {
    size: 0,
    dirs: {},
  };

  const [fileSystem] = lines.reduce(
    ([fileStructure, ref], line) => {
      /** Create a directory */
      if (line.startsWith("dir ")) {
        const dirName = parseDir(line);
        return [
          {
            ...fileStructure,
            dirs: {
              ...fileStructure.dirs,
              [dirName]: { dirs: {}, size: 0 },
            },
          },
          ref,
        ];
        /** Add file size to the current directory */
      } else if (isFile(line)) {
        const fileSize = parseFileSize(line);

        console.log({ fileSize, ref });

        ref.size = ref.size + fileSize;

        return [fileStructure, ref];
        /** Move around */
      } else if (isCd(line)) {
        [fileStructure, ref];
      }

      return [fileStructure, ref];
    },
    [root, root]
  );

  return fileSystem;
}

const sample = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

console.log(`sample:  ${JSON.stringify(solve(sample), null, 2)}`);
// console.log(`part 1:  ${solve(input, 0, 4)}`);
// console.log(`part 2:  ${solve(input, 0, 14)}`);
