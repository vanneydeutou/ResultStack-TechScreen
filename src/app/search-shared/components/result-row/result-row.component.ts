import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

interface ResultRow {
  username: string;
  avatar: string;
  location: string;
  realName: string;
  email: string;
  publicRepoCount: number;
  accountCreationTimestamp: string;
  accountLastUpdateTimeStamp: string;
}

@Component({
  selector: 'app-result-row',
  templateUrl: './result-row.component.html',
  styleUrls: ['./result-row.component.scss'],
})
export class ResultRowComponent implements OnInit {
  @Input() singleRow!: any;

  constructor() {}

  ngOnInit(): void {}
}
