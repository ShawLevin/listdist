"use strict";angular.module("mytodoApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/welcome.html",controller:"WelcomeCtrl"}).when("/directory",{templateUrl:"views/directory.html",controller:"DirectoryCtrl"}).when("/admin",{templateUrl:"views/admin.html",controller:"DirectoryCtrl"}).when("/edit",{templateUrl:"views/editItem.html",controller:"EditCtrl"}).otherwise({templateUrl:"views/admin.html",controller:"DirectoryCtrl"})}]),angular.module("mytodoApp").controller("DirectoryCtrl",["$scope","$route","$location",function(a,b,c){var d=new WindowsAzure.MobileServiceClient("https://techtalks.azure-mobile.net/","ItsrWZpJYAHVaDBtBXcyelFeMHZVNN77");a.org=c.$$path,a.tag=c.$$search.tag,a.resultsMsg="Hello World!",null==a.tag?(console.log("no tag so hide the add features"),a.resultsMsg="Please select a tag.",null==!document.getElementById("addBtn")&&(document.getElementById("addBtn").style.display="none")):(console.log("all good got a tag"),a.resultsMsg=""),a.tags=[],a.tags.push("Loading..."),d.getTable("items").where({org:a.org}).take(100).read().done(function(b){a.$apply(function(){a.tags=[];for(var c=0;c<b.length;c++)-1==a.tags.indexOf(b[c].tag)&&a.tags.push(b[c].tag)})},function(a){alert("Error: "+a)}),a.items=[{title:"Loading",details:"The results are being loaded."}],d.getTable("items").where({org:a.org,tag:a.tag}).read().done(function(b){a.$apply(function(){a.items=b})},function(a){alert("Error: "+a)}),a.addList=function(){window.location.href="#"+a.org+"?tag="+a.list},a.updateSort=function(b){a.sorter=b},a.addItem=function(){var b={title:a.search.title,details:a.search.details,link:a.search.link,category:a.search.category,tag:a.tag,etc:a.search.etc,org:a.org};d.getTable("items").insert(b).done(function(c){a.$apply(function(){a.items.push(b),a.search.title=void 0,a.search.link=void 0,a.search.category=void 0,a.search.details=void 0,a.search.etc=void 0})},function(a){alert("Error: "+a)})}}]),angular.module("mytodoApp").controller("WelcomeCtrl",["$scope","$route","$location",function(a,b,c){var d=new WindowsAzure.MobileServiceClient("https://techtalks.azure-mobile.net/","ItsrWZpJYAHVaDBtBXcyelFeMHZVNN77");a.org=c.$$path,a.tag=c.$$search.tag,a.orgs=[],a.orgs.push("Loading..."),d.getTable("items").take(100).read().done(function(b){a.$apply(function(){a.orgs=[];for(var c=0;c<b.length;c++)-1==a.orgs.indexOf(b[c].org)&&a.orgs.push(b[c].org)})},function(a){alert("Error: "+a)}),a.newOrg=function(){window.location.href="#/"+a.norg},a.addItem=function(){var b={title:a.search.title,details:a.search.details,link:a.search.link,category:a.search.category,tag:a.tag,etc:a.search.etc,org:a.org};d.getTable("items").insert(b),a.items.push(b),a.search.title="",a.search.link="",a.search.category="",a.search.details="",a.search.etc=""}}]),angular.module("mytodoApp").controller("EditCtrl",["$scope","$route","$location",function(a,b,c){var d=new WindowsAzure.MobileServiceClient("https://techtalks.azure-mobile.net/","ItsrWZpJYAHVaDBtBXcyelFeMHZVNN77");a.org=c.$$path,a.tag=c.$$search.tag,a.id=c.$$search.id,a.id?(console.log("all good got a tag"),a.tagFlag=!1):alert("No item selected."),a.addList=function(){window.location.href="#"+a.org+"?tag="+a.list},a.tags=[],a.tags.push("Loading..."),a.search={title:"",details:"",link:"",category:"",etc:""},d.getTable("items").where({id:a.id}).take(1).read().done(function(b){a.$apply(function(){var c=b[0];a.search.title=c.title,a.search.details=c.details,a.search.link=c.link,a.search.category=c.category,a.search.etc=c.etc,a.search.tag=c.tag,a.search.org=c.org,a.org=c.org,a.tag=c.tag})},function(a){alert("Error: "+a)}),a.deleteItem=function(){console.log("deleting item");var b={id:a.id};d.getTable("items").del(b).done(function(b){alert("delete complete!"),console.log("redirect to #"+a.org),window.location.href="#"+a.org+"?tag="+a.tag},function(a){alert("Error: "+a)})},a.updateItem=function(){console.log("updating item");var b={id:a.id,title:a.search.title,details:a.search.details,link:a.search.link,category:a.search.category,tag:a.search.tag,etc:a.search.etc,org:a.search.org};d.getTable("items").update(b).done(function(a){console.log("update complete!")},function(a){alert("Error: "+a)})}}]);