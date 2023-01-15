
//aktalizace defaultnich hodnot pri nacteni stranky
window.addEventListener('load', () => {
   let pocatecniCastka = calcDestinaceKusy();  //ikdyž není v html selected u prvních prvků formuláře, tak sám JS vloží do value první hodnoty
   document.getElementById("castka").innerHTML=`${pocatecniCastka}`
});
//funkce, ktera nam vypisuje v dokumentu finalni cenu
function vypisVyslednouCenu(){
   let finalDestinaceKusy = calcDestinaceKusy();
   let finalTridaZpatecni = calcTridaZpatecni();
   let konecnaCena = finalDestinaceKusy + finalTridaZpatecni;
   document.getElementById("castka").innerHTML=konecnaCena;
   return konecnaCena;
};
//vypocet zakladni cena letenky * pocet letenek
function calcDestinaceKusy(){
   let cena = parseInt(document.objednavka_letenek.vyber_letenek.value);
   let ks = parseInt(document.objednavka_letenek.pocet.value);
   let cenaDestinaceKusy = cena * ks;
   return cenaDestinaceKusy;
};
//pricteni poplatku za zpatecni let a tridu
function calcTridaZpatecni(){
   //vypocet ceny se zpatecnim letem
   let predchoziCena = calcDestinaceKusy();
   let zpatecniLetenka = 0;
   let priplatekTrida = 0;
   if (document.objednavka_letenek.zpatecni.checked){
      zpatecniLetenka = calcDestinaceKusy();
   }
   let novaCena = predchoziCena + zpatecniLetenka;
   //vypocet ceny s prirazkou podle vybrane tridy
   if(document.objednavka_letenek.trida[1].checked){  //musí být checked (místo obyčejného vložení value) kvůli změně hodnot
      priplatekTrida = novaCena * 0.25;
   }
   else if(document.objednavka_letenek.trida[2].checked){
      priplatekTrida = novaCena * 0.50;
   }
   let cenaZpatecniTrida = zpatecniLetenka + priplatekTrida ;
   return cenaZpatecniTrida;
};
//zpetna vazba klientovi, zda si muze nebo nemuze let dovolit
function odpovedKontrola(){
   let celkoveNaklady = vypisVyslednoCenu();
   let rozpocetKlienta = parseInt(document.form_odpoved.odpoved.value);
   if(rozpocetKlienta >= celkoveNaklady){
      document.querySelector('#ans').classList.add('green');
      document.getElementById("ans").innerHTML=" Na letenky Vám to stačí";
   } else {
      document.querySelector('#ans').classList.add('red');
      document.getElementById("ans").innerHTML=" Tato částka nestačí";
   }
};
//overeni zadavani z klavesnice
$("#poznamky").keypress(function(event){
   let znak = event.which;
   let overZnak = false;
   if(znak == 32){ overZnak = true; }
   else if(48 <= znak && znak <= 57){ overZnak = true; }
   else if(65 <= znak && znak <= 90){ overZnak = true; }
   else if(97 <= znak && znak <= 122){ overZnak = true; }
   return overZnak;
});