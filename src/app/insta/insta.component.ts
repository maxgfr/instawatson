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

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
    this.activatedRoute.params.subscribe(params => {
          const access_token = params['access_token'];
          if(access_token) {
            console.log(access_token)
            const promises = [];
            promises.push(this.http.get(`https://api.instagram.com/v1/users/self?access_token=${access_token}`).toPromise())
            promises.push(this.http.get(`https://api.instagram.com/v1/users/self/media/recent?access_token=${access_token}`).toPromise())
            Promise.all(promises)
              .then((res) => {
                console.log(res[0])
                console.log(res[1])
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
