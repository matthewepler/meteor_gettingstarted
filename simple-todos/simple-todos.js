Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
<<<<<<< HEAD
  Template.body.helpers({
    tasks: function() {
    	if (Session.get("hideCompleted")) {
=======

Template.body.helpers({
    tasks: function () {
      if (Session.get("hideCompleted")) {
>>>>>>> a404becded3a04713aebe6c449c07f9f42a7ff6d
        // If hide completed is checked, filter tasks
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // Otherwise, return all of the tasks
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
<<<<<<< HEAD
    },
    incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();
=======
>>>>>>> a404becded3a04713aebe6c449c07f9f42a7ff6d
    }
  });


// Event handlers use a dict to describe a) the event and b) the handler
  Template.body.events({
  	"submit .new-task": function (event) {
  		event.preventDefault();
  		var text = event.target.text.value;

<<<<<<< HEAD
      // Insert a task into the collection
  		Tasks.insert({
  			text: text,
        createdAt: new Date(),            // current time
        owner: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username  // username of logged in user
  		});
=======
      Meteor.call("addTask", text);
>>>>>>> a404becded3a04713aebe6c449c07f9f42a7ff6d

  		event.target.text.value = "";
  	},
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

<<<<<<< HEAD
  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });

  Accounts.ui.config({
=======

Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meteor.call("setChecked", this._id, ! this.checked);
    },
    "click .delete": function () {
      Meteor.call("deleteTask", this._id);
    }
  });

Accounts.ui.config({
>>>>>>> a404becded3a04713aebe6c449c07f9f42a7ff6d
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods({
  addTask: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId) {
    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked} });
  }
});
