exports = async function (changeEvent) {
    const mongodb = context.services.get("mongodb-atlas");
    const myDB = mongodb.db("Hospital-Management-System");
    const reports = myDB.collection("dailyReports");
    const user = myDB.collection("users");
    
      const nodemailer = require('nodemailer');
  
      
    try {
  
      const yesterday_data = reports.find({});
      const data = await yesterday_data
        .toArray((err, result) => {
          return result;
        })
        .slice(-1)[0];
  
      const admin = user.find({});
      const adminData = await admin
        .toArray((err, result) => {
          return result;
        })
        .slice(-1)[0];
  
      const adminMail = adminData.username;
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "somthing@gmail.com",
          pass: "password",
        },
      });
  
      return await transporter.sendMail({
        from: "somthing@gmail.com",
        to: adminMail,
        subject: "YesterDay Report Details!",
        attachments: [
          {
            filename: "logo.png",
            path: __dirname + "/logo.png",
            cid: "logo@",
          },
        ],
        html: `
    <div style=" text-align: center;" >
        <img src="cid:logo@" alt="logo"  
        style=" width: 100%; height: 100px; margin-top: 10px;" />
        <br />
        <hr />
        <br />
        <p>
        <span style=" color: rgb(99, 99, 99); font-weight: bold;">
        ${adminMail}</span>, hi there!
         </p>
         
        <br />    
     
        <p style="margin-top: 20px; color: gray;">
        This link expire in 10 minutes</p>
  
        <h5>Total Income Aomunt   : <b>${data.totalIncomeAmount}</b></h5>
        <h5>Avrage Income Aomunt  : <b>${data.avrageIncome}</b></h5>
        <h5>Patientions Count     : <b>${data.PatientionsCount}</b> </h5>
        <h5>Over-reported Disease : <b>${data.diseaseArr}</b></h5>
        <h5>Reported All Disease  : <b>${data.allDisease}</b></h5>
  
        <p>Thanks and Regards</p>
  
        <div style="margin-top: 50px;">&copy; 2021 Apollo</div>
      </div>
    `,
      });
      
      console.log(`Successfully send daily report Mail to ${adminMail} :)`);
    } catch (err) {
      console.error("Failed to run the function : ", err);
    }
  };
  
