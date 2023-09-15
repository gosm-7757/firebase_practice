/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
var admin = require("firebase-admin");

var serviceAccount = require("./web-project-f4346-firebase-adminsdk-dg3je-3c695ae88a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

 // 리전을 지정해줘야 빠름 (미국으로 갈 수도 있음)
exports.hello = functions.region('asia-northeast3').https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("안녕하세요");
});  //   /hello로 접속하면 '안녕하세요'를 보내주자 

// node.js 18버전 이상이면 안될 수도 있다.


// 채팅을 걸면 알림을 줘보자
exports.createAlert = functions.region('asia-northeast3').
firestore.document('chatroom/{docid}').onCreate((snapshot, context)=>{ // 채팅방 생성되면 아래 코드 실행해줘 (onUpdate, onDelete)
    //snapshot.data() // 새로 생성할 게시물 (.product, who 등등)
    //context             // 게시물 경로가 들어감
    var product =snapshot.data().제목;
    var who = snapshot.data().who;

    db.collection('user').doc(who[0]).update({alert : "누군가 채팅을 걸었습니다."})
    db.collection('user').doc(who[1]).update({alert : "누군가 채팅을 걸었습니다."})
})