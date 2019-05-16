import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Constants } from "../../../constants";

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

  _watsonCall () {
    //console.log(Constants.VISUAL_RECO_URL, Constants.VISUAL_RECO_API_KEY);
    let url = Constants.VISUAL_RECO_URL+"/v3/classify?version=2018-03-19";

    let body = new FormData();
    body.append("images_file", "https://scontent.cdninstagram.com/vp/5a9eb452ee189a9e1e23d48a859a301a/5D58853B/t51.2885-15/sh0.08/e35/s640x640/38421707_226027368081268_4981884440968953856_n.jpg?_nc_ht=scontent.cdninstagram.com");
    body.append("threshold", "0.2");
    body.append("owners", "me");

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type',
      'Content-Type': 'application/json',
      'Authorization': 'Basic '+Constants.VISUAL_RECO_API_KEY,
      'X-Watson-Learning-Opt-Out': 'true'
    });
    let options = { headers: headers };

    console.log(url, body, options)

    this.http.post(url, body, options).toPromise()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
