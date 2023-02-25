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
    document.querySelector('style')!.textContent += "@media screen and (max-width:767px) { .fc-toolbar.fc-header-toolbar {flex-direction:column;} .fc-toolbar-chunk { display: table-row; text-align:center; padding:5px 0; } }";
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
    $('#selectSlot').modal('show')
    this.clickInfo = clickInfo;
    console.log(clickInfo)
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  createEventId() {
    return String(this.eventGuid++);
  }

  selectSlot(){
    this.clickInfo = null
  }

}