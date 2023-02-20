import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, Calendar, CalendarApi } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormControl,Validators } from '@angular/forms';
import { every } from 'rxjs';

declare var $:any

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css']
})
export class UserCalendarComponent {
  calendarVisible = true;
  currentEvents: EventApi[] = []
  calendarOptions  : CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    nowIndicator: true,
    // initialEvents: data, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  eventGuid = 0;
  clickInfo : any;
  position : any;
  constructor(private changeDetector: ChangeDetectorRef,private http: HttpClient,private fb:FormBuilder) {
  }

  eventAddForm : any;

  ngOnInit(): void {
    this.eventAddForm = this.fb.group({
      title:['',[Validators.required]],
      repeat : ['0'],
      monday : [''],
      tuesday : [''],
      wednesday : [''],
      thursday : [''],
      friday : [''],
      saturday : [''],
      sunday : ['']
    })

    this.http.get('assets/calendarEvents.json').subscribe(
      (res:any)=>{
        let data = res
        for(let i in res){
          data[i].id = this.createEventId()
        }
        this.calendarOptions.events = data
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleEventClick(clickInfo: EventClickArg) {
    $('#deleteEvent').modal('show')
    this.clickInfo = clickInfo;
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  createEventId() {
    return String(this.eventGuid++);
  }

  delete(){
    this.clickInfo.event.remove();
    this.clickInfo = null
  }

  selectRecurringEvent(data:any){
    let everyDay = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
    if(data.value == "everyDay"){
      for(let i in everyDay){
        this.eventAddForm.controls[everyDay[i]].setValue(true);
      }
    }
    else if(data.value == "0"){
      for(let i in everyDay){
        this.eventAddForm.controls[everyDay[i]].setValue(false);
      }
    }
    else if(data.value == "everyWeekDay"){
      for(let i=0; i<5; i++){
        this.eventAddForm.controls[everyDay[i]].setValue(true);
      }
      for(let i=5; i<7; i++){
        this.eventAddForm.controls[everyDay[i]].setValue(false);
      }
    }
    else if(data.value == "everyWeekEnd"){
      for(let i=0; i<5; i++){
        this.eventAddForm.controls[everyDay[i]].setValue(false);
      }
      for(let i=5; i<7; i++){
        this.eventAddForm.controls[everyDay[i]].setValue(true);
      }
    }
  }

}