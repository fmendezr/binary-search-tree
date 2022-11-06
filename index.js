const nodeFactory  = (data) => {
    return {
        data: data || null,
        left: null,
        right: null,
    }
}

const treeFactory = (array) => {
    let sortedFilteredArray = [... new Set(mergeSort(array))];
    root = buildTree(sortedFilteredArray, 0, sortedFilteredArray.length - 1 );

    function buildTree(arr, start, end){

        if (start > end) return null;

        let mid = parseInt((start + end)  / 2)
        let root = nodeFactory(arr[mid]);

        root.left = buildTree(arr, start, mid - 1);
        root.right = buildTree(arr, mid + 1, end);

        return root;
    }

    return {
        root
    }
}

const mergeSort = (arr) => {

    if (arr.length < 2) return arr;

    const mid = Math.floor(arr.length/2);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid, arr.length)

    return merge(mergeSort(leftArr), mergeSort(rightArr));
}

const merge = (leftArr, rightArr) => {

    const sortedArr = [];
    
    let lI = 0;
    let rI = 0;

    while (lI < leftArr.length || rI < rightArr.length){
        if (leftArr[lI] < rightArr[rI]){
            sortedArr.push(leftArr[lI]);
            lI++;
        } else {
            sortedArr.push(rightArr[rI])
            rI++;
        }
    }

    while (lI < leftArr.length){
        sortedArr.push(leftArr[lI]);
        lI++;
    }

    while (rI < rightArr.length){
        sortedArr.push(rightArr[rI]);
        rI++;
    }

    return sortedArr;
}


// TESTING 
const tree = treeFactory([1, 2, 3, 4, 5, 6, 7, 8,])
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
prettyPrint(tree.root)