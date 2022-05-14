# Blockchain-CertificationDApp
Blockchain based Certification DApp

Steps:
1. UI
2. Connection: Metamask <- contract-> Ganache
   - accounts and balances
3. Use '*Ethereum - web3.js*' using address + ABI from complied contract
4. 

# truffle


## Test smart contract

````
truffle create test Certi

````

certi.js is created.

1. check if the contract is deployed correctly using async function

test it with ->
````
truffle test
````
2. if the contract deployed successfully, then call functions inside smart contract

````
const Certi = artifacts.require("Certi");

contract("Certi", function (accounts) {
  it("Testing Contract Deployement", async function () {
    await Certi.deployed();
    return assert.isTrue(true);
  });

  it("Testing Certificate issue", async function () {
    let instance = await Certi.deployed({from: accounts[1]});

    let txRecipt = await instance.newCertificate("EB101", "Ethereum Bootcamp", "Ananthan", "S", "24-04-2022", {from: accounts[1]});

    let result = await instance.certificateDetails("EB101");

    assert.equal(result.courseName, "Ethereum Bootcamp")
    assert.equal(result.candidateName, "Ananthan")
    assert.equal(result.grade, "S")
    assert.equal(result.date, "24-04-2022")

    // console.log(result);
  })
});

````
