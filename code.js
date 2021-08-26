let results = [null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function rollDie(){
  return Math.round(Math.random()*5 + 1);
}


function rollDice(){ 
  return rollDie() + rollDie();
}

rollButton      =  document.getElementById("roll");
resultBox       =  document.getElementById("resultBox");
graphBox        =  document.getElementById("graph");

thouButton = document.getElementById("rollathou"); 

onRollButtonClick=function(e){
    x=rollDice();
    result.textContent="You rolled a "+x+"!";
    results[x]++;
    console.log(e+ " <sofar>: " + results[x]);
    console.log(" " + e+ " <rolled>: " + x);
    renderGraph();
}
rollButton.addEventListener('click',onRollButtonClick);


onAThouClick=function(e){
  for(i=0;i<1000;i++){
    x=rollDice();
    results[x]++;
  }
  result.textContent="You rolled a thousand times!";
  renderGraph();
}
thouButton.addEventListener('click',onAThouClick);


function blueBoxHeight(k){
  FACTOR=150.0;
  if(k<2 || k>12)
    return "0px";
  n_k=results[k];
  n_nu=results.reduce( (S,n) => {return (n===null?S:Math.max(S,n))} , 1);
  N=results.reduce(   (S,n) => {return S+(n===null?0:n)} , 0);;
  P_k=n_k/n_nu*FACTOR;
  return P_k + "px";
}


renderGraph=function(){
    document.querySelectorAll(" .graphbox-item").forEach(function(x){x.remove()})


    results.forEach(function(n,i){

        if (! (n===null)){
          lambda=document.createElement("div");
          lambda.classList="graphbox-item";

          kappa=document.createElement("div");
          kappa.classList="bluebox";
          kappa.style.height=blueBoxHeight(i);

          mu=document.createElement("div");
          mu.classList="graphbox-item-div1";
          mu.textContent="You Rolled a "+i+" :";

          nu=document.createElement("div");
          nu.classList="graphbox-item-div2";
          nu.textContent=`${n} times`;

          lambda.append(kappa);
          lambda.append(mu);
          lambda.append(nu);
          graphBox.append(lambda);
        }
    });
}