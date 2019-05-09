import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'insta',
  templateUrl: './insta.component.html',
  styleUrls: ['./insta.component.css']
})
export class InstaComponent implements OnInit {

  username: string;
  profile_picture: string;
  full_name: string;
  data: [];
  disabled: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
    this.activatedRoute.fragment.subscribe(fragment => {
          const access_token = fragment;
          if(access_token) {
            //console.log(access_token)
            const promises = [];
            promises.push(this.http.get(`https://api.instagram.com/v1/users/self?${access_token}`).toPromise())
            promises.push(this.http.get(`https://api.instagram.com/v1/users/self/media/recent?${access_token}`).toPromise())
            Promise.all(promises)
              .then((res) => {
                //console.log(res[0])
                this.username = res[0].data.username;
                this.profile_picture = res[0].data.profile_picture;
                this.full_name = res[0].data.full_name;
                //console.log(this.username, this.full_name, this.profile_picture);
                //console.log(res[1])
                this.data = res[1].data;
                //console.log(this.data);
                this.disabled = false;
              })
              .catch((error) => {
                console.error(error.message || error);
              });
          }
    });
  }

  ngOnInit() {
  }
}
