const { expect } = require('chai')
const { ethers } = require('hardhat')
describe('MinimalERC721 Test', () => {
    let my_nft;
    let metadataURI;

    before(async () => {
        [deployer, account1, account2] = await ethers.getSigners();
        const MY_NFT = await ethers.getContractFactory("MinimalERC721");
        my_nft = await MY_NFT.deploy();
        await my_nft.deployed();
    });
    describe('Mint contract', async () => {

        it('able to mint 1 nft', async () => {
            metadataURI = 1;
            mintAmount = 1;
            const mintNFT = await my_nft.payToMint(account1.address, metadataURI, mintAmount, { value: ethers.utils.parseEther("1") });
            const mintNFTTransaction = await mintNFT.wait();
            expect(mintNFTTransaction.status).to.equal(1);
        });

        it('fails to mint if mintAmount = 0', async () => {
            metadataURI = 1;
            mintAmount = 0;
            const mintNFT = my_nft.payToMint(deployer.address, metadataURI, mintAmount, { value: ethers.utils.parseEther("1") });
            await expect(mintNFT).to.be.revertedWith('Error! Mint amount must be more than 0!');
        });

        it('fails to mint if eth amount is insufficient', async () => {
            metadataURI = 1;
            mintAmount = 1;
            const mintNFT = my_nft.payToMint(deployer.address, metadataURI, mintAmount, { value: ethers.utils.parseEther("0") });
            await expect(mintNFT).to.be.revertedWith('Error! Not enough ETH to process this transaction!');
        });

        it('cannot withdraw if not owner', async () => {
            const withdrawMoney = my_nft.connect(account1).withdrawMoneyTo(account2.address)
            await expect(withdrawMoney).to.be.revertedWith('Ownable: caller is not the owner');
        });

        it('can withdraw if owner', async () => {
            const withdrawMoney = my_nft.connect(deployer).withdrawMoneyTo(account2.address)
            const withdrawalTransaction = await withdrawMoney;
            const withdrawalStatus = await withdrawalTransaction.wait();
            expect(withdrawalStatus.status).to.equal(1);
        });
    })
})
