const nodeFactory  = (data) => {
    return {
        data: data || null,
        left: null,
        right: null,
    }
}

const treeFactory = (array) => {
    let sortedFilteredArray = [... new Set(mergeSort(array))];
    let root = buildTree(sortedFilteredArray, 0, sortedFilteredArray.length - 1 );
    let inorderArr = [];
    let preorderArr = [];
    let postorderArr = [];

    function buildTree(arr, start, end){

        if (start > end) return null;

        let mid = parseInt((start + end)  / 2)
        let root = nodeFactory(arr[mid]);

        root.left = buildTree(arr, start, mid - 1);
        root.right = buildTree(arr, mid + 1, end);

        return root;
    }

    const insert = (value, rootArg = root) => {
        if (rootArg == null){
           return (rootArg = nodeFactory(value));
        }

        if (rootArg.data > value){
            rootArg.left = insert(value, rootArg.left);
        }

        if (rootArg.data < value){
            rootArg.right = insert(value, rootArg.right);
        }

        return rootArg;
    }

    const remove = (value, rootArg = root) => {
        if(rootArg == null) {
            return rootArg
        };

        if(rootArg.data > value){
            rootArg.left = remove(value, rootArg.left);
        } else if (rootArg.data < value){
            rootArg.right = remove(value, rootArg.right);
        }

        else {
            if(rootArg.right == null){
                return rootArg.left;
            } else if (rootArg.left == null){
                return rootArg.right;
            }

            let succesor = rootArg.right;
            while(succesor.left != null){
                succesor = succesor.left
            }

            rootArg.data = succesor.data;
            rootArg.right = remove(rootArg.data, rootArg.right);
        }

        return rootArg; 
    } 

    const find = (value, rootArg = root) => {
        if (rootArg == null) return null;

        if (rootArg.data == value) return rootArg;
        else if (rootArg.data > value){
            return find(value, rootArg.left);
        } else {
            return find(value, rootArg.right)
        }
    }

    const inorder = (rootArg = root) => {
        if(rootArg == null)return;

        if (rootArg.left != null){
            inorder(rootArg.left);
        }

        if (rootArg.data !== undefined){
            inorderArr.push(rootArg.data);
        }

        if (rootArg.right != null){
            inorder(rootArg.right);
        }

        return [... new Set(inorderArr)];
    }

    const preorder = (rootArg = root) => {
        if(rootArg == null)return;

        if(rootArg.data !== undefined){
            preorderArr.push(rootArg.data);
        }

        if(rootArg.left != null){
           preorder(rootArg.left);
        }

        if (rootArg.right != null){
            preorder(rootArg.right)
        }

        return [... new Set(preorderArr)];
    }

    const postorder = (rootArg = root) => {
        if (rootArg == null) return;

        if (rootArg.left != null){
            postorder(rootArg.left);
        }

        if (rootArg.right != null){
            postorder(rootArg.right);
        }

        if (rootArg.data != undefined){
            postorderArr.push(rootArg.data);
        }

        return [... new Set(postorderArr)];
    }

    const height = (node) => {
        if (node == null) return -1;

        let leftHeight = height(node.left);
        let rightHeght = height(node.right);

        return Math.max(leftHeight, rightHeght) + 1; 
    }

    const depth = (targetNode, rootArg = root) => {
        let depthVar = - 1;

        if(targetNode.data < rootArg.data){
            depthVar = depth(targetNode, rootArg.left);
            depthVar++;
        } else if (targetNode.data > rootArg.data){
            depthVar = depth(targetNode, rootArg.right);
            depthVar++; 
        }
        else {
            depthVar++;
        } 

        return depthVar;
    }

    const isBalanced = (rootArg = root) => {
        if (rootArg == null) return true ;

        let lH = height(rootArg.left);
        let rH = height(rootArg.right);

        if(Math.abs(lH - rH) <= 1 && isBalanced(rootArg.left) == true && isBalanced(rootArg.right) == true) return true; 

        return false;
     }

     const rebalance = () => {
        if (root.isBalanced == true) return root;

        let newArr = inorder();
        return buildTree(newArr, 0 , newArr.length)
     }

    return {
        root, 
        insert,
        remove,
        find,
        inorder,
        preorder,
        postorder,
        height, 
        depth,
        isBalanced, rebalance
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

    while (lI < leftArr.length && rI < rightArr.length){
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
const tree = treeFactory([1, 2, 3, 4, 5, 6, 7])
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
prettyPrint(tree.root);

