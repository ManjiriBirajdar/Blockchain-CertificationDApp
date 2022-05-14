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
