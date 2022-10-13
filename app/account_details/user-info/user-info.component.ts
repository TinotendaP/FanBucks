import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../login.service';
import { UserInfoModel } from '../../validation.model'
import { LocalStorageService } from '../../local_storage.service'


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css', 
  '../fontawesome-free-6.1.2-web/css/all.css']
})
export class UserInfoComponent implements OnInit {

  userInfo: UserInfoModel = {first_name: '',
    last_name: '',
    balance: 0};
  key: string = 'key'

  

  constructor(public userInfoService: UserInfoService, private localStorageService: LocalStorageService) { }


  logOut() {
    this.localStorageService.remove(this.key)
    let token = this.localStorageService.get(this.key)
    console.log(token)
    window.location.reload()
  }

  ngOnInit(){
    this.userInfoService.getToken()
    return this.userInfoService.Balance()
    .subscribe(data=>{this.userInfo = data; console.log(data)})
  }

}
  