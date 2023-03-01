pragma solidity =0.5.16;
contract Questions{
    uint public count=0;
    struct Paper{
        uint id;
        string hashval;
        string text;
        string issuer;
        string date;
        string branch;
        bool exists;
    }
    mapping(string => Paper)public  papers;
    
    constructor() public{
        createPaper("123", "question", "issuerName", "date", "branch");
    }

    function createPaper(string memory _hashval,string memory _text,string memory _issuer, string memory _date, string memory _branch) public{
        count ++;
        papers[_hashval] = Paper(count, _hashval,_text, _issuer, _date, _branch, true);
    }
}