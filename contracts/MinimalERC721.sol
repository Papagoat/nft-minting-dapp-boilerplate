//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MinimalERC721 is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;
    mapping(string => uint8) existingURIs;

    uint256 public maxSupply = 100;

    constructor() ERC721("MinimalERC721", "MERC721") {}

        // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override (ERC721, ERC721Enumerable) {}

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function checkTotalSupply() public view returns (uint) {
        return _tokenIdTracker.current();
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function payToMint(
        address recipient,
        string memory metadataURI,
        uint256 _mintAmount
    ) public payable {
        uint256 newItemId = _tokenIdTracker.current();
        require(_mintAmount > 0, 'Error! Mint amount must be more than 0!');
        require(msg.value >= 0.001 ether, 'Error! Not enough ETH to process this transaction!');

        _tokenIdTracker.increment();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);
        }

    function setTokenURI(
        string memory metadataURI,
        uint256 itemId
    ) public onlyOwner {
            _setTokenURI(itemId, metadataURI);
        }

    function getBalance() public onlyOwner view returns(uint) {
        return address(this).balance;
    }

    function withdrawMoneyTo(address payable _to) public onlyOwner{
        _to.transfer(getBalance());
    }
}
