import web3 from './web3';

// const address = '0x4d93a58912Cb3aa51d46b19b962f802be9315F3D';

const address = '0x83AD6FEcd8e358714920B18B6696Bada174A225E';

// const abi = [{"constant":true,"inputs":[{"name":"_skuNumber","type":"uint256"}],"name":"getSpecificProduct","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_SKU","type":"uint256"}],"name":"getPreviousOwnerOfAsset","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getManufacturerName","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"owner","outputs":[{"name":"name","type":"string"},{"name":"geolocation","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_SKU","type":"uint256"},{"name":"_productName","type":"string"},{"name":"_weight","type":"uint256"},{"name":"_geolocation","type":"string"},{"name":"_date","type":"string"}],"name":"createAsset","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getListOfAssetOwnedByManufacturer","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_AssetSender","type":"address"},{"name":"_AssetReceiver","type":"address"},{"name":"_NewOwnerName","type":"string"},{"name":"_SKU","type":"uint256"},{"name":"_geolocation","type":"string"}],"name":"transferToOwner","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_skuNumber","type":"uint256"}],"name":"getCurrentOwnerOfAsset","outputs":[{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_mName","type":"string"},{"name":"_origin","type":"string"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"},{"indexed":false,"name":"SKU","type":"uint256"},{"indexed":false,"name":"message","type":"string"}],"name":"AssetCreate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"},{"indexed":false,"name":"SKU","type":"uint256"},{"indexed":false,"name":"message","type":"string"}],"name":"RejectCreate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"AssetDoesNotExist","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ownerAdd","type":"address"},{"indexed":false,"name":"message","type":"string"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"location","type":"string"},{"indexed":false,"name":"_SKU","type":"uint256"}],"name":"AcceptOwnerships","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ownerAdd","type":"address"},{"indexed":false,"name":"message","type":"string"}],"name":"RejectOwnerships","type":"event"}];
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_SKU",
				"type": "uint256"
			},
			{
				"name": "_productName",
				"type": "string"
			},
			{
				"name": "_weight",
				"type": "uint256"
			},
			{
				"name": "_geolocation",
				"type": "string"
			},
			{
				"name": "_date",
				"type": "string"
			}
		],
		"name": "createAsset",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_AssetSender",
				"type": "address"
			},
			{
				"name": "_AssetReceiver",
				"type": "address"
			},
			{
				"name": "_NewOwnerName",
				"type": "string"
			},
			{
				"name": "_SKU",
				"type": "uint256"
			},
			{
				"name": "_geolocation",
				"type": "string"
			},
			{
				"name": "_date",
				"type": "string"
			}
		],
		"name": "transferToOwner",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_mName",
				"type": "string"
			},
			{
				"name": "_origin",
				"type": "string"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "SKU",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "date",
				"type": "string"
			}
		],
		"name": "AssetCreate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "SKU",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			}
		],
		"name": "RejectCreate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			}
		],
		"name": "AssetDoesNotExist",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "ownerAdd",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "location",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_SKU",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "date",
				"type": "string"
			}
		],
		"name": "AcceptOwnerships",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "ownerAdd",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			}
		],
		"name": "RejectOwnerships",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_skuNumber",
				"type": "uint256"
			}
		],
		"name": "getCurrentOwnerOfAsset",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getListOfAssetOwnedByManufacturer",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getManufacturerName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_SKU",
				"type": "uint256"
			}
		],
		"name": "getPreviousOwnerOfAsset",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_skuNumber",
				"type": "uint256"
			}
		],
		"name": "getSpecificProduct",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "owner",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "geolocation",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
export default new web3.eth.Contract(abi,address);
