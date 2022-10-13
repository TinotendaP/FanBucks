import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { LocalStorageService } from 'src/app/local_storage.service';

@Component({
  selector: 'app-intermediate-page',
  templateUrl: './intermediate-page.component.html',
  styleUrls: ['./intermediate-page.component.css']
})
export class IntermediatePageComponent implements OnInit {
  auth: string = 'key'
  chadzoka: any;

  constructor(private loginService: LoginService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    console.log(this.loginService.token)
    this.chadzoka = this.localStorageService.get(this.auth)
    console.log(this.chadzoka)
  }

}
