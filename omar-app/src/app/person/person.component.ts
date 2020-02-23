import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PersonService } from '../person.service';
import { MatTableDataSource, PageEvent, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

export interface DialogData {
  pageIndex: number;
  pageSize: number;
}

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  response: any;
  metadata: any;
  people: any[];
  length: number;

  displayedColumns: string[] = ["id", "person_name", "email", "job_title"];
  dataSource = new MatTableDataSource([]);

  pageSizeOptions: number[] = [50, 100];
  pageEvent: PageEvent;
  pageIndex = "1";
  pageSize = this.pageSizeOptions[0].toString();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private personService: PersonService, public dialog: MatDialog) { }

  ngOnInit() {
    this.personService.getPeopleRecords(this.pageIndex, this.pageSize).subscribe(
      response => {
        this.response = response;
        this.metadata = response.metadata;
        this.people = response.people;
        this.dataSource.data = this.people;
        this.length = this.metadata.paging.total_count;
      });
  }

  changePeopleList(event) {
    let index = event.pageIndex + 1;
    this.pageIndex = index.toString();
    this.pageSize = event.pageSize.toString();
    this.personService.getPeopleRecords(this.pageIndex, this.pageSize).subscribe(
      response => {
        this.response = response;
        this.metadata = response.metadata;
        this.people = response.people;
        this.dataSource.data = this.people;
        this.length = this.metadata.paging.total_count;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEmailCharacterFrequency, {
      width: "500px",
      data: { pageIndex: this.pageIndex, pageSize: this.pageSize }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  possibleDuplicatePeople(): void {

  }

}

@Component({
  selector: "dialog-email-character-frequency",
  templateUrl: "dialog-email-character-frequency.html"
})
export class DialogEmailCharacterFrequency {
  emailCharacterFrequency: any[];
  response: any;

  displayedColumns: string[] = ["character", "frequency"];
  dataSource = new MatTableDataSource([]);

  constructor(
    public dialogRef: MatDialogRef<DialogEmailCharacterFrequency>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.frequencyCharacterCounter();
  }

  frequencyCharacterCounter() {
    this.personService.getFrequencyCharacterCounter(this.data.pageIndex, this.data.pageSize).subscribe(
      response => {
        this.response = response;
        this.emailCharacterFrequency = this.response.email_characters;
        this.dataSource.data = this.emailCharacterFrequency;
      }
    );
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
