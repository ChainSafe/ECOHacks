pragma solidity ^0.5.0;

contract Token {
    uint256 TOTAL_SUPPLY = 2 * 10 ** 18;
    
    mapping(address => uint256) public balance;
    
    event Transfer(address _to, address _from, uint256 _value);
    
    constructor() public {
        balance[msg.sender] = TOTAL_SUPPLY;
    }
    
    function transfer(address _to, uint256 _value) public {
        require(balance[msg.sender] >= _value);
        balance[msg.sender] -= _value;
        balance[_to] += _value;
        emit Transfer(_to, msg.sender, _value);
    }
}
