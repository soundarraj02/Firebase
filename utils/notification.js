const NotificationModel = require("../models/notificationModel");
const admin = require("firebase-admin");
const mongoose = require("mongoose");

exports.sendNotification = async (topic,reciever,title,message,notificationType,image,data={}) => {
  const messaging = admin.messaging();
  var payload = {
    notification: {
      title,
      body: message,
      image:image
    },
    data:data,
    topic: topic
  };

  messaging.send(payload).then((result) => {
    console.log(result);
  });

  await NotificationModel.create({
      reciever: reciever,
      title: title,
      body: message,
      notificationType: notificationType,
      data:data
    });
};
