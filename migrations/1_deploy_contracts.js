var Cert = artifacts.require("./Cert.sol")
var Ques = artifacts.require("./Questions.sol")
module.exports = function(deployer){
    deployer.deploy(Cert);
    deployer.deploy(Ques);

};
