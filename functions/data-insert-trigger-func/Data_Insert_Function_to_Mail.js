exports = async function (changeEvent) {
    const mongodb = context.services.get("mongodb-atlas");
    const myDB = mongodb.db("Hospital-Management-System");
    const reports = myDB.collection("dailyReports");
  
    // if (changeEvent.operationType !== "CREATE") { return }
  
    try {
  
        console.log("Successfully run the function @JacksonKasi :)");
      
    } catch (err) {
      console.error("Failed to run the function @JacksonKasi :( ", err);
    }
  };
  