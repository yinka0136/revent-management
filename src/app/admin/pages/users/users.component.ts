import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public usersLoading: boolean = false;
  public filterableUsers: any[] = [
    {
      id: '#42159',
      subject: 'Subject Document Matter',
      status: 'resolved',
      date: new Date(),
    },
    {
      id: '#42159',
      subject: 'Subject Document Matter',
      status: 'pending',
      date: new Date(),
    },
    {
      id: '#42159',
      subject: 'Subject Document Matter',
      status: 'resolved',
      date: new Date(),
    },
    {
      id: '#42159',
      subject: 'Subject Document Matter',
      status: 'pending',
      date: new Date(),
    },
  ];
  constructor() {}

  ngOnInit(): void {}

}
