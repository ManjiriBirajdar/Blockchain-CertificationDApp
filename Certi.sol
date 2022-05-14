
//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Certi{
    
    address admin;

    //called when creating the smart contract
    //when is it called? everytime the contract is called/invoked ?
    //only while deploying

    constructor(){
        admin = msg.sender;
    }

    struct certificate{
        string courseName;
        string candidateName;
        string grade;
        string date;
    }

    mapping(string => certificate) public certificateDetails;

    //validation of condition before execution of the function
    //only admin has access to creating certifications
    modifier onlyAdmin() {

        require(msg.sender == admin, "insufficient privileges");
        _;
    }


    function newCertificate(string memory _cerificateID,
                            string memory _courseName,
                            string memory _candidateName,
                            string memory _grade,
                            string memory _date) public onlyAdmin{

        certificateDetails[_cerificateID] = certificate(_courseName, _candidateName, _grade, _date);
    }

}
