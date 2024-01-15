public with sharing class EventDetailsController2 {
    @AuraEnabled(cacheable=true)
    public static List<Event__c> getEvents() { 
     return [SELECT Id,Name,Name__c,Start_DateTime__c,End_Date_Time__c,Live__c FROM Event__c];
    }
}
//Name,Event_Detail__c,Location__c,Location__r.Name,Event_Organizer__c,Event_Organizer__r.Name