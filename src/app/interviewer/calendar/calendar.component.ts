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
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
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
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
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
  selectInfo: DateSelectArg|undefined;
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

  handleDateSelect(selectInfo: DateSelectArg) {
    $('#enterAvailableTime').modal('show')
    this.selectInfo = selectInfo
    console.log(this.currentEvents)
  }

  addEvent(){
    let daysofweek = []
    let everyDay = [
      {day:'monday',value:1},
      {day:'tuesday',value:2},
      {day:'wednesday',value:3},
      {day:'thursday',value:4},
      {day:'friday',value:5},
      {day:'saturday',value:6},
      {day:'sunday',value:0}
    ];
    for(let i in everyDay){
      if(this.eventAddForm.value[everyDay[i].day]){
        daysofweek.push(everyDay[i].value)
      }
    }
    const calendarApi = this.selectInfo?.view.calendar;
    calendarApi?.unselect(); // clear date selection
    if (this.eventAddForm.valid) {
      if(daysofweek.length == 0){
        calendarApi?.addEvent({
          id: this.createEventId(),
          title:this.eventAddForm.value.title,
          start: this.selectInfo?.startStr,
          backgroundColor: "#015d4b",
          textColor : "white",
          end: this.selectInfo?.endStr,
          allDay: this.selectInfo?.allDay
        });
      }
      else if(daysofweek.length > 0){
        let start = this.selectInfo?.start;
        let end = this.selectInfo?.end;
        let startHours = start?.getHours();
        let startMinutes = start?.getMinutes();
        let startSeconds = start?.getSeconds();
        let endHours = end?.getHours();
        let endMinutes = end?.getMinutes();
        let endSeconds = end?.getSeconds();
        const startTime = `${startHours?.toString().padStart(2, '0')}:${startMinutes?.toString().padStart(2, '0')}:${startSeconds?.toString().padStart(2, '0')}`;
        const endTime = `${endHours?.toString().padStart(2, '0')}:${endMinutes?.toString().padStart(2, '0')}:${endSeconds?.toString().padStart(2, '0')}`;
        calendarApi?.addEvent({
          id: this.createEventId(),
          title:this.eventAddForm.value.title,
          allDay: this.selectInfo?.allDay,
          backgroundColor: "#015d4b",
          textColor : "white",
          daysOfWeek : daysofweek,
          startTime : startTime,
          endTime : endTime
        });
      }
    }
    this.selectInfo = undefined
    $('#enterAvailableTime').modal('hide');
    this.eventAddForm.reset()
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