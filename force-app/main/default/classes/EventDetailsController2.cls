public with sharing class EventDetailsController2 {
    @AuraEnabled(cacheable=true)
    public static List<Event__c> getEvents() { 
     return [SELECT Id,Name,Name__c,Start_DateTime__c,End_Date_Time__c,Live__c FROM Event__c];
    }
}