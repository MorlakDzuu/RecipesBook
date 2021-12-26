import { Component, Input, OnInit } from '@angular/core';
import { Stage } from '../../../models/stage';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  @Input() stage: Stage;

  constructor() { }

  ngOnInit() {
  }

}
