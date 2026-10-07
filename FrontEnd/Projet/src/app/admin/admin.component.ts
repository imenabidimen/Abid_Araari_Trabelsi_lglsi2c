import { Component, OnInit } from '@angular/core';
declare var ss: any;
import 'src/assets/js/m.js';
declare var mod: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  desserts: any;
  tunisians: any;
  italians: any;
  asians: any;
  frenchs: any;


  constructor() { }
  title = 'wo';
  url: any;
  sign: any;
  async ngOnInit(): Promise<void> {

    const rep = await fetch("http://127.0.0.1:8000/dessert");
    if (rep.ok) {
      rep.json().then(data => {//raj3etlna objet json data
        this.desserts = data;
        console.log(this.desserts)
      });
    }

    const reponse = await fetch("http://127.0.0.1:8000/tunisian");
    if (reponse.ok) {
      reponse.json().then(data => {//raj3etlna objet json data
        this.tunisians = data;
        console.log(this.tunisians)
      });
    }

    const repo = await fetch("http://127.0.0.1:8000/italian");
    if (repo.ok) {
      repo.json().then(data => {//raj3etlna objet json data
        this.italians = data;
        console.log(this.italians)
      });
    }

    const repon = await fetch("http://127.0.0.1:8000/asian");
    if (repon.ok) {
      repon.json().then(data => {//raj3etlna objet json data
        this.asians = data;
        console.log(this.asians)
      });
    }

    const repons = await fetch("http://127.0.0.1:8000/french");
    if (repons.ok) {
      repons.json().then(data => {//raj3etlna objet json data
        this.frenchs = data;
        console.log(this.frenchs)
      });
    }
  }

/*
  async LoginClick() {

    var user = (<HTMLInputElement>document.getElementById("user")).value;
    var pwd = (<HTMLInputElement>document.getElementById("pwd")).value;
    const response = await fetch("http://127.0.0.1:8000/user", {
      method: 'POST',
      body: `{"user":"${user}","pwd":"${pwd}"}`
    });
    if (response.ok) {
      response.json().then(function (data) {
        if (JSON.stringify(data) != "[]") {
          let datas = JSON.parse(JSON.stringify(data));
          localStorage.setItem("nom", datas["0"].nom);
          localStorage.setItem("prenom", datas["0"].prenom);
          localStorage.setItem("img", datas["0"].img_etu);
          localStorage.setItem("id", datas["0"].id_etu);
          localStorage.setItem("isLoggedin", "true");
          window.location.reload();
        }
        else {
          var d = document.getElementById("wrong");
          if (!d) { document.getElementById("logform")!.insertAdjacentHTML('beforeend', '<b style="color: red;" id = "wrong">Email/password invalid</b>'); }

        }

      });

    }
  }

*/

  async Add() {

    //awel haja bech ne5dhou el values mtaa el inputs mteena lkol w nhotouhom fi des variables
    var nom = (<HTMLInputElement>document.getElementById("nom")).value;
    var price = (<HTMLInputElement>document.getElementById("price")).value;
    var type = (<HTMLInputElement>document.getElementById("type")).value;
    var desc = (<HTMLInputElement>document.getElementById("desc")).value;
    var ad = (<HTMLInputElement>document.getElementById("ad")).value;
    const response = await fetch("http://127.0.0.1:8000/add", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: `{"nom":"${nom}" , "type":"${type}" ,"ad":"${ad}", "price":"${price}" , "desc":"${desc}" , "img":"${this.url}" }`
    });

    if (response.ok) {
      response.json().then(function (data) {
        if (data && data.ok) {
          window.location.reload();
          alert("done");
        } else {
          alert("Error detected");
        }

      });
    }
  }

  onSelectFile(event: any) {
    console.log("here");
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = async (data) => {
        this.url = data.target?.result as string;
      }
    }
  }

  imaaa() {
    new ss();
  }

  async delete1(name: string) {  
    const response = await fetch("http://127.0.0.1:8000/delete1", {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: `{"user":"${name}"}`
    });
    if (response.ok) {
      window.location.reload();
      alert(" deleted")
    } else {
      alert(" error")
    }
  }

  async delete2(name: string) {
    // var user = (<HTMLInputElement>document.getElementById("nom2")).innerHTML;

    const response = await fetch("http://127.0.0.1:8000/delete2", {
      method: 'delete',
      body: `{"user":"${name}"}`
    });
    if (response.ok) {
      window.location.reload();
      alert(" deleted")
    } else {
      alert(" wrong")
    }
  }

  async delete3(name: string) {
  

    const response = await fetch("http://127.0.0.1:8000/delete3", {
      method: 'delete',
      body: `{"user":"${name}"}`
    });
    if (response.ok) {
      window.location.reload();
      alert(" deleted")
    } else {
      alert(" error")
    }
  }

  async delete4(name: string) {
    

    const response = await fetch("http://127.0.0.1:8000/delete4", {
      method: 'delete',
      body: `{"user":"${name}"}`
    });
    if (response.ok) {
      window.location.reload();
      alert(" deleted")
    } else {
      alert(" error")
    }
  }

  async delete5(name: string) {
    // var user = (<HTMLInputElement>document.getElementById("asian.nom_dish")).innerHTML;

    const response = await fetch("http://127.0.0.1:8000/delete5", {
      method: 'delete',
      body: `{"user":"${name}"}`
    });
    if (response.ok) {
      window.location.reload();
      alert(" delated ")
    } else {
      alert(" error")
    }
  }

  async updat1(name: string, pwd:string) {
  
   
    var p = (<HTMLInputElement>document.getElementById("p1")).innerHTML;
    var a = (<HTMLInputElement>document.getElementById("ad1")).innerHTML;
    const response = await fetch("http://127.0.0.1:8000/update1", {
      method: 'POST',
      body: `{"user":"${name}","pwd":"${pwd}","p":"${p}","a":"${a}"}`
    });
    if (response.ok) {


      response.json().then(function (data) {
        if (JSON.stringify(data) != "[]") {
          let datas = JSON.parse(JSON.stringify(data));
          localStorage.setItem("nom1", datas["0"].nom1);
          localStorage.setItem("prenom1", datas["0"].prenom1);
          localStorage.setItem("p1", datas["0"].p1);
          localStorage.setItem("a1", datas["0"].a1);
          window.location.reload();
          alert(" done ")
        }
        else {
          alert(" error detected")
        }

      });
    }}

  async updat2(name: string) {
    var pwd = (<HTMLInputElement>document.getElementById("d2")).innerHTML;
    var p = (<HTMLInputElement>document.getElementById("p2")).innerHTML;
    var a = (<HTMLInputElement>document.getElementById("ad2")).innerHTML;
    const response = await fetch("http://127.0.0.1:8000/update2", {
      method: 'POST',
      body: `{"user":"${name}","pwd":"${pwd}","p":"${p}","a":"${a}"}`
    });
    if (response.ok) {


      response.json().then(function (data) {
        if (JSON.stringify(data) != "[]") {
          let datas = JSON.parse(JSON.stringify(data));
          localStorage.setItem("nom2", datas["0"].nom2);
          localStorage.setItem("prenom2", datas["0"].prenom2);
          localStorage.setItem("p2", datas["0"].p2);
          localStorage.setItem("a2", datas["0"].a2);
          window.location.reload();
          alert(" done ")
        }
        else {
          alert(" error detected")
        }

      });




    }
  }

  async updat3(name: string) {

    
    var pwd = (<HTMLInputElement>document.getElementById("d5")).innerHTML;
    var p = (<HTMLInputElement>document.getElementById("p5")).innerHTML;
    var a = (<HTMLInputElement>document.getElementById("ad5")).innerHTML;
    const response = await fetch("http://127.0.0.1:8000/update3", {
      method: 'POST',
      body: `{"user":"${name}","pwd":"${pwd}","p":"${p}","a":"${a}"}`
    });
    if (response.ok) {


      response.json().then(function (data) {
        if (JSON.stringify(data) != "[]") {
          let datas = JSON.parse(JSON.stringify(data));
          localStorage.setItem("nom5", datas["0"].nom5);
          localStorage.setItem("prenom5", datas["0"].prenom5);
          localStorage.setItem("p5", datas["0"].p5);
          localStorage.setItem("a5", datas["0"].a5);
          window.location.reload();
          alert(" done ")
        }
        else {
          alert(" error detected ")
        }

      });




    }
  }



  async updat4(name: string) {

    
    var pwd = (<HTMLInputElement>document.getElementById("d4")).innerHTML;
    var p = (<HTMLInputElement>document.getElementById("p4")).innerHTML;
    var a = (<HTMLInputElement>document.getElementById("ad4")).innerHTML;
    const response = await fetch("http://127.0.0.1:8000/update4", {
      method: 'POST',
      body: `{"user":"${name}","pwd":"${pwd}","p":"${p}","a":"${a}"}`
    });
    if (response.ok) {


      response.json().then(function (data) {
        if (JSON.stringify(data) != "[]") {
          let datas = JSON.parse(JSON.stringify(data));
          localStorage.setItem("nom4", datas["0"].nom4);
          localStorage.setItem("prenom4", datas["0"].prenom4);
          localStorage.setItem("p4", datas["0"].p4);
          localStorage.setItem("a4", datas["0"].a4);
          window.location.reload();
          alert(" done ")
        }
        else {
          alert(" error detected")
        }

      });




    }
  }


  async updat5(name: string) {

  
    var pwd = (<HTMLInputElement>document.getElementById("d3")).innerHTML;
    var p = (<HTMLInputElement>document.getElementById("p3")).innerHTML;
    var a = (<HTMLInputElement>document.getElementById("ad3")).innerHTML;
    const response = await fetch("http://127.0.0.1:8000/update5", {
      method: 'POST',
      body: `{"user":"${name}","pwd":"${pwd}","p":"${p}","a":"${a}"}`
    });
    if (response.ok) {


      response.json().then(function (data) {
        if (JSON.stringify(data) != "[]") {
          let datas = JSON.parse(JSON.stringify(data));
          localStorage.setItem("nom3", datas["0"].nom3);
          localStorage.setItem("prenom3", datas["0"].prenom3);
          localStorage.setItem("p3", datas["0"].p3);
          localStorage.setItem("a3", datas["0"].a3);
          window.location.reload();
          alert(" done ")
        }
        else {
          alert(" error detected ")
        }

      });




    }
  }



  modal() {
    new mod();
  }
}








