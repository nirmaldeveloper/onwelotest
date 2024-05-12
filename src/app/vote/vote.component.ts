import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';

interface ContestantVoted {
  Id:number|undefined;
  Name: string|undefined;
}

interface Voter {
  Id:number;
  Name: string;
  Voted: ContestantVoted[];
  selected:boolean;
}

interface Contestant {
  Id:number;
  Name: string;
  Votes: number;
  selected:boolean;
}

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  
  title:string;
  VoterName: string;
  CandidateName: string;
  SubmitVoteForm: FormGroup;
  addingVoter: Boolean;
  addingContestant: Boolean;
  constructor(){
    this.title = 'Voting Application';
    this.VoterName = "";
    this.CandidateName = "";
    this.SubmitVoteForm = new FormGroup({
      voterControl: new FormControl<Voter | null>(null, Validators.required),
      contestantControl: new FormControl<Contestant | null>(null, Validators.required)
      });
    this.addingVoter = false;
    this.addingContestant = false;
  }

  ngOnInit(): void{
    
  }
  
  
 addContestant = ()=>{
  this.addingContestant = true;
 }
 cancelContestantAdding = ()=>{
  this.addingContestant = false;
 }
 addVoter = () => {
  this.addingVoter = true;
 }
 cancelVoterAddition = () =>{
  this.addingVoter = false;
 }
 addContestantToList = () =>{
  this.contestants.push({Id:this.contestants.length+1, Name:this.CandidateName, Votes:1, selected:false});
  this.CandidateName = "";
 }
 addVoterToList = () => {
  this.voters.push({Id:this.voters.length+1, Name:this.VoterName, Voted:[], selected:false});
  this.VoterName = "";
 }
voters:Voter[] = [{Id:1,Name:'Peppa', Voted:[], selected:false},{Id:2,Name:'Rumcajs', Voted: [], selected:false}];
contestants:Contestant[] = [{Id:1,Name:'Johnny Bravo', Votes:1, selected:false},{Id:2,Name:'Pluto', Votes:1, selected:false}];
submitVote = () => {
  this.voters.map(ele => {
    if(ele.Id == this.SubmitVoteForm.value.voterControl?.Id && 
      ele.Voted.findIndex
    (obj=>{return (obj.Id == this.SubmitVoteForm.value.contestantControl?.Id && obj.Name == this.SubmitVoteForm.value.contestantControl?.Name)}))
    {
      let ContestantVotedToAdd = {Id:this.SubmitVoteForm.value.contestantControl?.Id,Name:this.SubmitVoteForm.value.contestantControl?.Name}; 
      if(ele.Voted.length == 0){
        ele.Voted.push(ContestantVotedToAdd);
        this.contestants.map(cObj=>{if(cObj.Id == ContestantVotedToAdd.Id){
          cObj.Votes+=1;
          console.log(cObj);
        }});
        console.log(ele);
      }
    }}); 
}
}
