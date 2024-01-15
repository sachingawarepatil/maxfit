// eventList.js
import { LightningElement, wire, track } from 'lwc';
import getEvents from '@salesforce/apex/EventDetailsController2.getEvents';

const columns = [
    { label: 'Event Name', fieldName: 'Name__c', type: 'text' },
    { label: 'Start Date Time', fieldName: 'Start_DateTime__c', type: 'date' },
    { label: 'End Date Time', fieldName: 'End_Date_Time__c', type: 'date' },
    { label: 'Live?', fieldName: 'Live__c', type:'boolean' },
];

export default class EventList extends LightningElement {
    searchTerm = '';
    @track events;
    @track filteredEvents;
    columns = columns;

    @wire(getEvents)
    wiredEvents({ error, data }) {
        if (data) {
            window.console.log("data" +data)
            this.events = data;
            this.error=undefined;
            this.filterEvents();
        } else if (error) {
            window.console.log("errors" +error);
            his.error = JSON.stringify(error)
            this.events=undefined;

        }
    }

    handleSearch(event) {
        this.searchTerm = event.target.value.toLowerCase();
        this.filterEvents();
    }

    filterEvents() {
        this.filteredEvents = this.events.filter(
            (event) => event.Name.toLowerCase().includes(this.searchTerm)
        );
    }
}
