function connectToMetamask(){
    ethereum.request({method: 'eth_requestAccounts'}).then(result => {
        console.log("Accounts: ", result);
    })
}

async function getJSON(){

    //read certi.json
    const response = await fetch('Certi.json');
    const json = await response.json();
    return json;
}

$(document).ready(async function(){

    let myContractJSON = await getJSON();

    //read abi
    const contractABI = myContractJSON.abi;

    //read address
    const contractAddress = myContractJSON.address;

    //web3
    web3 = new Web3(ethereum);

    // my contract object - global element
    myContract = new web3.eth.Contract(contractABI, contractAddress);
})

async function issueCertificate(){
    certificateID = document.getElementById("certificateID").value;
    console.log(certificateID);

    //get courseName
    courseName = document.getElementById("courseName").value;

    //get candidateName
    candidateName = document.getElementById("candidateName").value;

    //get grade
    grade = document.getElementById("grade").value;
    
    //get date
    date = document.getElementById("date").value;
    
    //call newCertificate() function from the smart contract
    let txRecipt = await myContract.methods.newCertificate(certificateID, courseName, candidateName, grade, date)
                                           .send({from: ethereum.selectedAddress, gasLimit: "927000"})
    console.log("Tx Recipt: ",txRecipt);
    alert("Certificate Issued with ID: " + certificateID);
}

async function getCertificateDetails() {
    certificateID = document.getElementById("certificateID").value;
    let result = await myContract.methods.certificateDetails(certificateID).call();
    console.log(result);
    localStorage.setItem("certificateID", certificateID)
    localStorage.setItem("courseName", result.courseName)
    localStorage.setItem("candidateName", result.candidateName)
    localStorage.setItem("grade", result.grade)
    localStorage.setItem("date", result.date)
    var url = "viewCertificate.html"
    window.location.href = url;
}
