// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        string imageURL;
        uint256 amountCollected;
        bool claimed;
        mapping(address => uint256) contributions;
        address[] contributors;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    event CampaignCreated(uint256 indexed campaignId, address indexed owner, string title, uint256 target, uint256 deadline, string imageURL);
    event ContributionMade(uint256 indexed campaignId, address indexed contributor, uint256 amount);
    event FundsClaimed(uint256 indexed campaignId, address indexed owner, uint256 amount);
    event RefundIssued(uint256 indexed campaignId, address indexed contributor, uint256 amount);

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _imageURL
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(_target > 0, "Target amount must be greater than 0");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = msg.sender;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.imageURL = _imageURL;
        campaign.amountCollected = 0;
        campaign.claimed = false;

        emit CampaignCreated(numberOfCampaigns, msg.sender, _title, _target, _deadline, _imageURL);
        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    function contribute(uint256 _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(msg.value > 0, "Contribution must be greater than 0");

         if (campaign.contributions[msg.sender] == 0) {
            campaign.contributors.push(msg.sender); 
        }

        campaign.contributions[msg.sender] += msg.value;
        campaign.amountCollected += msg.value;

        emit ContributionMade(_campaignId, msg.sender, msg.value);
    }

    function claimFunds(uint256 _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.owner, "Only campaign owner can claim funds");
        require(block.timestamp >= campaign.deadline, "Campaign has not ended yet");
        require(campaign.amountCollected >= campaign.target, "Campaign did not reach target");
        require(!campaign.claimed, "Funds have already been claimed");

        campaign.claimed = true;
        payable(campaign.owner).transfer(campaign.amountCollected);

        emit FundsClaimed(_campaignId, campaign.owner, campaign.amountCollected);
    }

    function getRefund(uint256 _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp >= campaign.deadline, "Campaign has not ended yet");
        require(campaign.amountCollected < campaign.target, "Campaign was successful, no refunds");
        
        uint256 amount = campaign.contributions[msg.sender];
        require(amount > 0, "No contribution found");
        
        campaign.contributions[msg.sender] = 0;
        campaign.amountCollected -= amount;
        payable(msg.sender).transfer(amount);

        emit RefundIssued(_campaignId, msg.sender, amount);
    }

    function getCampaign(uint256 _campaignId) public view returns (
        address owner,
        string memory title,
        string memory description,
        uint256 target,
        uint256 deadline,
        uint256 amountCollected,
        bool claimed,
        string memory imageURL

    ) {
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.owner,
            campaign.title,
            campaign.description,
            campaign.target,
            campaign.deadline,
            campaign.amountCollected,
            campaign.claimed,
            campaign.imageURL
        );
    }

    function getContribution(uint256 _campaignId, address _contributor) public view returns (uint256) {
        return campaigns[_campaignId].contributions[_contributor];
    }

    function getNumberOfCampaigns() public view returns (uint256) {
        return numberOfCampaigns;
    }

    function getContributors(uint256 _campaignId) public view returns (address[] memory) {
        return campaigns[_campaignId].contributors;
    }
} 