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
    @track data;
    @track error;
    @track columns = columns;
    @track searchString;
    @track initialRecords;
 
    @wire(getEvents)
    wiredAccount({ error, data }) {
        if (data) {
            console.log(data);
            this.data = data;
            this.initialRecords = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
 
    handleSearch(event) {
        const searchKey = event.target.value.toLowerCase();
 
        if (searchKey) {
            this.data = this.initialRecords;
 
            if (this.data) {
                let searchRecords = [];
 
                for (let record of this.data) {
                    let valuesArray = Object.values(record);
 
                    for (let val of valuesArray) {
                        console.log('val is ' + val);
                        let strVal = String(val);
 
                        if (strVal) {
 
                            if (strVal.toLowerCase().includes(searchKey)) {
                                searchRecords.push(record);
                                break;
                            }
                        }
                    }
                }
 
                console.log('Matched Accounts are ' + JSON.stringify(searchRecords));
                this.data = searchRecords;
            }
        } else {
            this.data = this.initialRecords;
        }
    }
}