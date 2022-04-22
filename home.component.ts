import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public mssg="";
  WorkSheet:any;
  constructor(private homeservice:HomeService) { }

  ngOnInit(): void {
  }

  onFileChange(evt:any){
    // read the file
    const target:DataTransfer= <DataTransfer>(evt.target);

    const fileName=evt.target.files[0].name;
    const fileType=evt.target.files[0].type;

    console.log(fileName+" "+fileType);

    if(fileType!=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"&&fileType!="application/vnd.ms-excel"){
      console.log("File type not supported");
      this.mssg="File type not supported";
    }else{
      console.log("");
      this.mssg="";
    }

    if(target.files.length!==1){
      throw new Error('Cannot use multiple files');
    }

    if(this.mssg==""){
    const reader:FileReader=new FileReader();

    reader.onload= (e:any)=>{
      const bstr=e.target.result;
      // console.log(bstr);
      const wb:XLSX.WorkBook=XLSX.read(bstr,{type:'binary'});
      const wsname:any=wb.SheetNames;
      const ws:XLSX.WorkSheet=wb.Sheets;

      this.WorkSheet=ws;
      
      // console.log(ws);
      this.homeservice.jsonObject(this.WorkSheet).subscribe(
        data=>{
          console.log(data);
      });
      // var sheet_data =XLSX.utils.sheet_to_json(wb.Sheets[wsname[0]],{header:0});
    
    };
    
    reader.readAsBinaryString(target.files[0]);
  }
}

}
