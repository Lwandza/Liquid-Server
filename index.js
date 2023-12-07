const ethers = require("ethers");
const liquidABI = require("./abi/Token.json");
require("dotenv").config();

async function main(){
    const tokenAddress = "0x2749C9f2f8568d389BBF61ed77784A43C3cD3E19"; 
    const provider = new ethers.providers.WebSocketProvider(`https://lingering-rough-sound.bsc.quiknode.pro/${process.env.QUICK_NODE_KEY}/`);
    const sampleAddress=[
        '0x407993575c91ce7643a4d4cCACc9A98c36eE1BBE',
        '0xAf967C1A979D4600AffCE6BffBaeACFd165A1a2A',
        '0x2DdFdA4a037836bb5F78075D6bc356d6AE06Fd9b',
        '0x079ef53e8533fAc72079930A34b380145f797471'
    ]

    const tokenContract = new ethers.Contract(tokenAddress,liquidABI.abi,provider)
    const totalSupply= await tokenContract.totalSupply()
    // console.log('totalSupply',ethers.utils.formatEther(totalSupply))
    let sum=0
    for (let i = 0; i < sampleAddress.length; i++) {
        const lockedToken= await tokenContract.balanceOf(sampleAddress[i])
        // console.log('WalletContext lockedToken',ethers.utils.formatEther(lockedToken))
        sum+=Number(ethers.utils.formatEther(lockedToken))
    }
    const LeftSupply=ethers.utils.formatEther(totalSupply)-sum
    console.log('Circulating Supply',LeftSupply)
}
main();