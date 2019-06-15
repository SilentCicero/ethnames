pragma solidity ^0.5.0;

interface ENS {
    function owner(bytes32 node) external view returns (address);
}

contract OwnerResolver {
    function supportsInterface(bytes4 interfaceID) external pure returns (bool) {
        return interfaceID == 0x3b3b57de;
    }

    function addr(bytes32 nodeID) external view returns (address) {
        return ENS(0x314159265dD8dbb310642f98f50C066173C1259b).owner(nodeID);
    }
}
