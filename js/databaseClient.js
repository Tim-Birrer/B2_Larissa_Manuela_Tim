const GROUP_NAME = "b2";
const PASSWORD = "ydo5wgf89jr2tomy";

const SERVER_URL = "https://ict-290.herokuapp.com/sql";
const databaseClient = {
  executeSqlQuery: async (sql) => {
    const payload = {
      group: GROUP_NAME,
      pw: PASSWORD,
      sql: sql,
    };
    try {
      const response = await fetch(SERVER_URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.error) {
        console.error(result.error);
      }
      return result;
    } catch (error) {
      console.error("DB error", error);
    }
  },

  insertInto: async (sqlTable, formData) => {
    let result = null;
    const fields = Object.keys(formData);
    const values = Object.values(formData);

    const sql = `INSERT INTO ${sqlTable} (${fields.join(
      ","
    )}) VALUES ('${values.join("','")}')`;
    try {
      result = await databaseClient.executeSqlQuery(sql);
    } catch (error) {
      console.error("Fehler bei der Datenbank: ", error);
    }
    return result;
  },
};

const testRun = async () => {
  const users = await databaseClient.executeSqlQuery("SELECT * FROM users");
  console.log(users[1]);

  await databaseClient.insertInto("users", {
    name: "myName",
    email: "myEmailAddress",
  });
};
