const ethers = require('ethers')
const path = require('path')
const fs = require('fs')

const transfer = async() => {
	// update the following line to be your private key, with 0x prefix
	let wallet = new ethers.Wallet('0x00AE56C608825F9A72B0A57CB8E21EAEE6150A7C8431A63D13293D468E5647E8')
	// if you are not using rinkeby as your network, change it to the network you are using
	// eg. "https://ropsten.infura.io"
	let provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io', 'unspecified')

	wallet = wallet.connect(provider)

	// update the path to the abi
	let fp = path.resolve('./token.abi')
	let abi = fs.readFileSync(fp, 'utf8')

	// update the address in the following line with your contract address
	let contract = new ethers.Contract('0xe64bd46b023ae732726bfa4c723aa91f4532a62a', abi, wallet)
	contract = contract.connect(wallet)

	// set up event listener
	contract.on("Transfer", (_to, _from, _value, event) => {
		console.log("EVENT:", event)
		console.log("to:", _to)
		console.log("from:", _from)
		console.log("value:", _value.toNumber())
	})

	// send transaction calling "transfer" in contract
	let tx = await contract.transfer('0xE1d300575aBBB8882924e22cc92ADFdAB23aA6Fc', 77)
	await provider.waitForTransaction(tx.hash)
	
	// get the update balance
	let updatedBalance = await contract.balance('0xE1d300575aBBB8882924e22cc92ADFdAB23aA6Fc')
	console.log("updated balance:", updatedBalance.toNumber())
}

transfer()

